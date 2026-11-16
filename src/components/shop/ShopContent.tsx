import Link from "next/link";
import { ProductGrid } from "@/components/products/ProductGrid";
import { Pagination } from "./Pagination";
import { MobileFilters } from "./MobileFilters";
import { ShopSidebar } from "./ShopSidebar";
import { SortSelect } from "./SortSelect";
import { getCategoryList, getProducts, queryShop, SHOP_PAGE_SIZE, type ShopSort } from "@/lib/products";

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const SORTS: ShopSort[] = ["popularity", "rating", "date", "price", "price-desc"];

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

function resultsText(total: number, page: number): string {
  if (total === 0) return "No products were found matching your selection.";
  if (total === 1) return "Showing the single result";
  if (total <= SHOP_PAGE_SIZE) return `Showing all ${total} results`;
  const start = (page - 1) * SHOP_PAGE_SIZE + 1;
  const end = Math.min(page * SHOP_PAGE_SIZE, total);
  return `Showing ${start}–${end} of ${total} results`;
}

/** The whole shop page body. Reads the URL (?category, ?s, ?orderby, ?page). */
export async function ShopContent({ searchParams }: { searchParams: SearchParams }) {
  const sp = await searchParams;
  const category = first(sp.category) ?? "";
  const search = (first(sp.s) ?? "").trim().slice(0, 100);
  const orderbyParam = first(sp.orderby);
  const orderby: ShopSort = SORTS.includes(orderbyParam as ShopSort) ? (orderbyParam as ShopSort) : "default";
  const pageParam = parseInt(first(sp.page) ?? "1", 10);

  const [result, categories] = await Promise.all([
    queryShop(category, search, orderby, Number.isFinite(pageParam) ? pageParam : 1),
    getCategoryList(),
  ]);
  const products = await getProducts(result.slugs);
  const categoryName = categories.find((c) => c.slug === category)?.name;

  const title = search ? `Search results for “${search}”` : (categoryName ?? "Shop");

  return (
    <div className="mx-auto grid max-w-7xl gap-6 px-2 py-6 sm:px-6 sm:py-16 lg:grid-cols-[360px_1fr] lg:gap-0">
      <MobileFilters activeCategory={category || undefined} search={search || undefined} />
      <ShopSidebar activeCategory={category || undefined} search={search || undefined} />

      <section className="lg:pl-12">
        <nav aria-label="Breadcrumb" className="hidden text-[15px] lg:block text-slate-500">
          <Link href="/" className="hover:text-slate-800">Home</Link>
          {" / "}
          {categoryName || search ? (
            <>
              <Link href="/shop" className="hover:text-slate-800">Shop</Link>
              {categoryName && ` / ${categoryName}`}
            </>
          ) : (
            "Shop"
          )}
        </nav>

        <h1 className="text-[1.75rem] font-normal text-slate-800 sm:text-4xl lg:mt-6">{title}</h1>

        <div className="mt-4 flex flex-wrap lg:mt-10 items-center justify-between gap-4">
          <p className="text-[15px] text-slate-700">{resultsText(result.total, result.page)}</p>
          {result.total > 1 && (
            <SortSelect value={orderby} category={category || undefined} search={search || undefined} />
          )}
        </div>

        <div className="mt-6 lg:mt-8">
          <ProductGrid products={products} columns="shop" priorityCount={4} />
        </div>

        <Pagination
          current={result.page}
          total={result.totalPages}
          params={{ category: category || undefined, s: search || undefined, orderby }}
        />
      </section>
    </div>
  );
}
