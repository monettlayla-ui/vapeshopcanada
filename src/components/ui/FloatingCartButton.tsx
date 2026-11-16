"use client";

import { useCart } from "@/components/cart/CartProvider";
import { CartIcon } from "./CartIcon";

/** Round cart button fixed to the bottom-left. Shows the item count and opens the cart drawer. */
export function FloatingCartButton() {
  const { count, open } = useCart();

  return (
    <button
      type="button"
      onClick={open}
      aria-label={`Open cart, ${count} items`}
      className="fixed bottom-6 left-4 z-50 flex h-15 w-15 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
    >
      <CartIcon className="h-6 w-6" />
      <span className="absolute -top-1 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 text-xs font-bold">
        {count}
      </span>
    </button>
  );
}
