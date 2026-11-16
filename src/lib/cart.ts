/** What the cart remembers about a product (a snapshot taken when it was added). */
export type CartItem = {
  slug: string;
  title: string;
  href: string;
  image: string | null;
  /** Price paid per item (the sale price when on sale). */
  price: number;
  /** Regular price, only set when the product is on sale. */
  regularPrice: number | null;
  qty: number;
};

export type ShippingMethod = "standard" | "express";

/** Flat shipping fee per delivery option (added to any non-empty order). */
export const SHIPPING_METHODS: Record<ShippingMethod, { label: string; fee: number }> = {
  standard: { label: "Standard Shipping:", fee: 20 },
  express: { label: "Express Shipping:", fee: 35 },
};

export const CART_STORAGE_KEY = "vape-shop-canada-cart";

export const roundMoney = (n: number) => Math.round(n * 100) / 100;

/** "50.62" style saving percentage, or null when not on sale. */
export function savedPercent(item: Pick<CartItem, "price" | "regularPrice">): string | null {
  if (!item.regularPrice || item.regularPrice <= item.price) return null;
  return ((1 - item.price / item.regularPrice) * 100).toFixed(2);
}

/** Read and validate a saved cart; anything malformed is dropped. */
export function parseStoredCart(raw: string | null): CartItem[] {
  if (!raw) return [];
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return [];
    return data.filter(
      (i): i is CartItem =>
        !!i &&
        typeof i.slug === "string" &&
        typeof i.title === "string" &&
        typeof i.href === "string" &&
        typeof i.price === "number" &&
        Number.isInteger(i.qty) &&
        i.qty > 0,
    );
  } catch {
    return [];
  }
}
