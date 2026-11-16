"use client";

import { useState } from "react";
import { useCart } from "@/components/cart/CartProvider";
import type { CartItem } from "@/lib/cart";

type AddToCartProps = { item: Omit<CartItem, "qty">; inStock?: boolean };

/** Quantity stepper + Add To Cart button for the product page. */
export function AddToCart({ item, inStock = true }: AddToCartProps) {
  const [qty, setQty] = useState(1);
  const { add } = useCart();
  const stepBtn = "h-10 w-9 text-base text-slate-700 hover:bg-slate-100";

  return (
    <div className="flex items-center gap-5">
      <div className="flex items-center border border-slate-300">
        <button type="button" aria-label="Decrease quantity" className={stepBtn} onClick={() => setQty((q) => Math.max(1, q - 1))}>
          -
        </button>
        <input
          type="number"
          min={1}
          value={qty}
          aria-label="Quantity"
          onChange={(e) => setQty(Math.max(1, Number(e.target.value) || 1))}
          className="h-10 w-12 [appearance:textfield] border-x border-slate-300 text-center text-slate-800 outline-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        <button type="button" aria-label="Increase quantity" className={stepBtn} onClick={() => setQty((q) => q + 1)}>
          +
        </button>
      </div>

      <button
        type="button"
        disabled={!inStock}
        onClick={() => add(item, qty)}
        className="h-10 rounded-sm bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-400"
      >
        {inStock ? "Add To Cart" : "Out of stock"}
      </button>
    </div>
  );
}
