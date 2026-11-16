"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { savedPercent, type CartItem } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "./CartProvider";
import { CouponForm } from "./CouponForm";

const stepBtn =
  "flex h-7 w-8 items-center justify-center border text-base leading-none text-slate-700 disabled:cursor-not-allowed disabled:text-slate-400";

function DrawerItem({ item }: { item: CartItem }) {
  const { setQty, remove, close } = useCart();
  const saved = savedPercent(item);

  return (
    <li className="flex gap-4 border-b border-slate-200 px-5 py-5">
      <div className="relative h-[75px] w-[75px] shrink-0 overflow-hidden rounded-md bg-slate-100">
        {item.image && <Image src={item.image} alt={item.title} fill sizes="75px" className="object-cover" />}
        {saved && (
          <span className="absolute top-1 right-1 rounded-sm bg-blue-600 px-1.5 py-0.5 text-[11px] font-semibold text-white">
            Sale!
          </span>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <Link href={item.href} onClick={close} className="block text-[15px] leading-snug font-semibold text-blue-700 hover:underline">
          {item.title}
        </Link>
        <p className="mt-3 text-sm font-bold text-slate-900">{formatPrice(item.price)}</p>
        {saved && <p className="mt-1 text-xs text-emerald-600">You saved {saved}%</p>}
        <button type="button" onClick={() => remove(item.slug)} className="mt-1 text-xs text-slate-800 underline">
          Remove
        </button>
      </div>

      <div className="flex shrink-0 flex-col items-center gap-1 self-start">
        <button
          type="button"
          aria-label={`Increase quantity of ${item.title}`}
          onClick={() => setQty(item.slug, item.qty + 1)}
          className={`${stepBtn} border-slate-300 bg-white`}
        >
          +
        </button>
        <span className="flex h-6 w-8 items-center justify-center text-sm text-slate-800" aria-label="Quantity">
          {item.qty}
        </span>
        <button
          type="button"
          aria-label={`Decrease quantity of ${item.title}`}
          disabled={item.qty <= 1}
          onClick={() => setQty(item.slug, item.qty - 1)}
          className={`${stepBtn} border-slate-200 bg-slate-100`}
        >
          −
        </button>
      </div>
    </li>
  );
}

/** Slide-in cart panel (right side). Opens when a product is added or the cart button is pressed. */
export function CartDrawer() {
  const { items, count, subtotal, shipping, total, isOpen, close } = useCart();
  const [couponOpen, setCouponOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Escape closes, the page behind doesn't scroll, and focus moves into the panel.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [isOpen, close]);

  return (
    <>
      <div
        onClick={close}
        aria-hidden="true"
        className={`fixed inset-0 z-[60] bg-black/30 transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Review your cart"
        inert={!isOpen}
        className={`fixed inset-y-0 right-0 z-[70] flex w-[calc(100%-3.5rem)] max-w-[448px] sm:w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-5">
          <button
            ref={closeRef}
            type="button"
            onClick={close}
            aria-label="Close cart"
            className="flex h-8 w-9 items-center justify-center border border-slate-300 text-slate-900 hover:bg-slate-100"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-5 w-6" aria-hidden="true">
              <path d="M2 12h19M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <h2 className="text-xl font-medium text-slate-900">Review Your Cart</h2>
          <span className="flex h-8 min-w-8 items-center justify-center rounded-sm bg-slate-100 px-2 text-sm text-slate-800">
            {count}
          </span>
        </div>

        {items.length === 0 ? (
          <div className="flex-1 border-t border-slate-200 px-5 py-10 text-center">
            <p className="text-[15px] text-slate-700">Your cart is currently empty.</p>
            <Link
              href="/shop"
              onClick={close}
              className="mt-6 inline-block rounded-sm bg-blue-600 px-7 py-3 text-[15px] font-semibold text-white hover:bg-blue-700"
            >
              Return to shop
            </Link>
          </div>
        ) : (
          <>
            <ul className="flex-1 overflow-y-auto border-t border-slate-200">
              {items.map((item) => (
                <DrawerItem key={item.slug} item={item} />
              ))}
            </ul>

            <div className="border-t border-slate-200 shadow-[0_-6px_12px_rgba(0,0,0,0.06)]">
              <button
                type="button"
                onClick={() => setCouponOpen((o) => !o)}
                aria-expanded={couponOpen}
                className="flex w-full items-center justify-between px-5 py-4 text-left text-sm text-slate-800"
              >
                Got a Discount Code?
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`h-5 w-5 transition-transform ${couponOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                >
                  <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {couponOpen && (
                <div className="px-5 pb-4">
                  <CouponForm />
                </div>
              )}

              {[
                ["Subtotal", subtotal],
                ["Shipping", shipping],
                ["Total", total],
              ].map(([label, value]) => (
                <div
                  key={label as string}
                  className="flex items-center justify-between border-t border-slate-200 px-5 py-3.5 font-semibold text-slate-900"
                >
                  <span>{label}</span>
                  <span>{formatPrice(value as number)}</span>
                </div>
              ))}

              <div className="px-5 pt-4 pb-5">
                <Link
                  href="/checkout"
                  onClick={close}
                  className="flex h-12 items-center justify-center rounded-sm bg-blue-600 text-lg font-semibold text-white hover:bg-blue-700"
                >
                  Proceed to Checkout →
                </Link>
              </div>
            </div>
          </>
        )}
      </aside>
    </>
  );
}
