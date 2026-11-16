import { cacheLife } from "next/cache";
import fs from "node:fs/promises";
import path from "node:path";
import type { CartItem } from "./cart";
import { localizeJson } from "./localize";

const DATA_DIR = path.join(/*turbopackIgnore: true*/ process.cwd(), "public", "vapesshopaustralia");

/**
 * The live store hides its default category ("New Products") from the public API,
 * so products that only belong to it were scraped with no categories.
 */
const DEFAULT_CATEGORY = {
  name: "New Products",
  slug: "new-products",
  url: "https://vapesshopaustralia.com/product-category/new-products/",
};

export type Product = {
  id: string;
  title: string;
  description: string | null;
  description_html: string | null;
  short_description: string | null;
  short_description_html: string | null;
  sku: string | null;
  price: number | null;
  sale_price: number | null;
  on_sale: boolean;
  in_stock: boolean;
  url: string;
  tags: { name: string; slug: string }[];
  images: { position: number; local_path: string | null; original_url: string; alt: string | null }[];
  categories: { name: string; slug: string }[];
  stored_in: string;
};

export type ProductIndexEntry = {
  id: string;
  title: string;
  price: number | null;
  sale_price: number | null;
  categories: string[];
  path: string;
};

export type CategoryInfo = { slug: string; name: string; count: number };

export type ShopSort = "default" | "popularity" | "rating" | "date" | "price" | "price-desc";

/** Sorts whose order comes from the live store (saved in shop_orders.json). */
const SAVED_ORDER_KEY = { default: "default", popularity: "popularity", rating: "rating", date: "latest" } as const;

// The big shared files (product index, shop orders, categories) are parsed once per
// server process and kept in memory. Only finished values are stored, never promises.
const SHARED_FILES = new Set(["products_index.json", "shop_orders.json", "categories_index.json"]);
const memo = new Map<string, unknown>();

async function readJson<T>(relPath: string): Promise<T> {
  if (memo.has(relPath)) return memo.get(relPath) as T;
  const value = localizeJson(JSON.parse(await fs.readFile(path.join(/*turbopackIgnore: true*/ DATA_DIR, relPath), "utf-8")) as T);
  if (SHARED_FILES.has(relPath)) memo.set(relPath, value);
  return value;
}

// Plain (uncached) loaders. The exported "use cache" functions below call these
// directly instead of calling each other, which keeps concurrent renders safe.
let indexMemo: ProductIndexEntry[] | undefined;

async function loadIndex(): Promise<ProductIndexEntry[]> {
  if (indexMemo) return indexMemo;
  const index = await readJson<ProductIndexEntry[]>("products_index.json");
  indexMemo = index.map((e) => ({
    ...e,
    categories: e.categories.length ? e.categories : [DEFAULT_CATEGORY.slug],
  }));
  return indexMemo;
}

async function loadProduct(slug: string, index: ProductIndexEntry[]): Promise<Product | null> {
  const entry = index.find((p) => p.id === slug);
  if (!entry) return null;
  const product = await readJson<Product>(entry.path);
  if (product.categories.length === 0) product.categories = [DEFAULT_CATEGORY];
  return product;
}

async function loadProducts(slugs: string[], index: ProductIndexEntry[]): Promise<Product[]> {
  const all = await Promise.all(slugs.map((slug) => loadProduct(slug, index)));
  return all.filter((p): p is Product => p !== null);
}

/** Lightweight list of every product (id, title, prices, categories, path). */
export async function getProductIndex(): Promise<ProductIndexEntry[]> {
  "use cache";
  cacheLife("max");
  return loadIndex();
}

export async function getAllProductSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("max");
  return (await loadIndex()).map((p) => p.id);
}

/** Load one scraped product by slug. */
export async function getProduct(slug: string): Promise<Product | null> {
  "use cache";
  cacheLife("max");
  return loadProduct(slug, await loadIndex());
}

export async function getProducts(slugs: string[]): Promise<Product[]> {
  "use cache";
  cacheLife("max");
  return loadProducts(slugs, await loadIndex());
}

/**
 * Related products: other products from the same category, starting from the
 * ones that follow the current product in that category (wrapping around).
 */
export async function getRelatedProducts(product: Product, limit = 4): Promise<Product[]> {
  "use cache";
  cacheLife("max");
  const categorySlug = product.categories[0]?.slug;
  if (!categorySlug) return [];
  const index = await loadIndex();
  const sameCategory = index.filter((p) => p.categories.includes(categorySlug));
  const at = sameCategory.findIndex((p) => p.id === product.id);
  const ordered = [...sameCategory.slice(at + 1), ...sameCategory.slice(0, Math.max(at, 0))];
  return loadProducts(ordered.slice(0, limit).map((p) => p.id), index);
}

/** All categories with product counts, in the live shop sidebar order. */
export async function getCategoryList(): Promise<CategoryInfo[]> {
  "use cache";
  cacheLife("max");
  const [cats, index] = await Promise.all([
    readJson<{ id: string; name: string }[]>("categories_index.json"),
    loadIndex(),
  ]);
  const counts = new Map<string, number>();
  for (const p of index) for (const slug of p.categories) counts.set(slug, (counts.get(slug) ?? 0) + 1);
  return cats
    .map((c) => ({ slug: c.id, name: c.name, count: counts.get(c.id) ?? 0 }))
    .sort((a, b) => {
      // "New Products" is pinned to the top on the live shop; the rest are A–Z.
      if (a.slug === DEFAULT_CATEGORY.slug) return -1;
      if (b.slug === DEFAULT_CATEGORY.slug) return 1;
      return a.name.localeCompare(b.name, "en", { sensitivity: "base" });
    });
}

export const SHOP_PAGE_SIZE = 12;

/** One page of shop results (slugs only), filtered by category / search and sorted. */
export async function queryShop(
  category: string,
  search: string,
  sort: ShopSort,
  page: number,
): Promise<{ total: number; totalPages: number; page: number; slugs: string[] }> {
  "use cache";
  cacheLife("max");
  const [index, orders] = await Promise.all([
    loadIndex(),
    readJson<Record<"default" | "popularity" | "rating" | "latest", string[]>>("shop_orders.json"),
  ]);
  // Price sorts start from the default order so equal prices keep the live order.
  const order = orders[sort in SAVED_ORDER_KEY ? SAVED_ORDER_KEY[sort as keyof typeof SAVED_ORDER_KEY] : "default"];
  const byId = new Map(index.map((p) => [p.id, p]));
  let items = order.map((slug) => byId.get(slug)).filter((p): p is ProductIndexEntry => !!p);

  if (category) items = items.filter((p) => p.categories.includes(category));
  const words = search.toLowerCase().split(/\s+/).filter(Boolean);
  if (words.length) items = items.filter((p) => words.every((w) => p.title.toLowerCase().includes(w)));

  const price = (p: ProductIndexEntry) => p.sale_price ?? p.price ?? 0;
  if (sort === "price") items = [...items].sort((a, b) => price(a) - price(b));
  if (sort === "price-desc") items = [...items].sort((a, b) => price(b) - price(a));

  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / SHOP_PAGE_SIZE));
  const current = Math.min(Math.max(1, page), totalPages);
  const slugs = items.slice((current - 1) * SHOP_PAGE_SIZE, current * SHOP_PAGE_SIZE).map((p) => p.id);
  return { total, totalPages, page: current, slugs };
}

/** Public URL of a product's first downloaded image. */
export function productImageUrl(p: Product): string | null {
  const local = p.images[0]?.local_path;
  return local ? `/vapesshopaustralia/${local}` : (p.images[0]?.original_url ?? null);
}

export function productHref(slug: string): string {
  return `/product/${slug}`;
}

export { formatPrice } from "./format";

/** Snapshot of a product for the cart (without a quantity). */
export function toCartItem(p: Product): Omit<CartItem, "qty"> {
  const onSale = p.on_sale && p.sale_price !== null;
  return {
    slug: p.id,
    title: p.title,
    href: productHref(p.id),
    image: productImageUrl(p),
    price: onSale ? (p.sale_price as number) : (p.price ?? 0),
    regularPrice: onSale ? p.price : null,
  };
}
