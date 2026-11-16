"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";
import { OrderSummary } from "./OrderSummary";

/** Phone-only bar above the checkout form: tap to show or hide the order summary. */
export function MobileSummary() {
  const { total } = useCart();
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-slate-300 bg-[#f3f3f3] lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-order-summary"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between px-4 py-5 text-left"
      >
        <span className="flex items-center gap-2 text-[17px] font-medium text-slate-900">
          {open ? "Hide Order Summary" : "Show Order Summary"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
            aria-hidden
          >
            <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <span className="text-xl font-semibold text-slate-900">{formatPrice(total)}</span>
      </button>

      {open && (
        <div id="mobile-order-summary" className="border-t border-slate-300 bg-white px-4 py-6">
          <OrderSummary />
        </div>
      )}
    </div>
  );
}
