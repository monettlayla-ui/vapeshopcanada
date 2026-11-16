"use client";

import type { CartItem } from "@/lib/cart";
import { BagIcon } from "@/components/ui/CartIcon";
import { useCart } from "./CartProvider";

type Props = { item: Omit<CartItem, "qty">; inStock?: boolean };

/** Blue "Add to cart" button under a product card. Shows a tick once the item is in the cart. */
export function AddToCartButton({ item, inStock = true }: Props) {
  const { add, has } = useCart();
  const inCart = has(item.slug);

  return (
    <button
      type="button"
      disabled={!inStock}
      onClick={() => add(item)}
      className="mt-3 inline-flex items-center gap-2 rounded-sm bg-blue-600 px-4 py-2.5 text-sm sm:mt-4 sm:px-8 sm:py-3.5 sm:text-base font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
    >
      {inStock ? "Add to cart" : "Out of stock"}
      {inStock && inCart && (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="h-4 w-4" aria-label="In cart">
          <path d="m5 13 4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

/** Round bag icon that fades in over a product image on hover. */
export function QuickAddButton({ item, inStock = true }: Props) {
  const { add } = useCart();
  if (!inStock) return null;

  return (
    <button
      type="button"
      onClick={() => add(item)}
      aria-label={`Add ${item.title} to cart`}
      className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-900 opacity-0 shadow transition-opacity duration-200 group-hover:opacity-100 hover:bg-amber-200 focus-visible:opacity-100"
    >
      <BagIcon className="h-5 w-5" />
    </button>
  );
}
