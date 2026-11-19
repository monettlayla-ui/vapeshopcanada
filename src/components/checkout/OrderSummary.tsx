"use client";

import Image from "next/image";
import { useState, type FormEvent } from "react";
import { SHIPPING_METHODS } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/components/cart/CartProvider";

/** Right-hand side of the checkout: items, coupon box and totals. */
export function OrderSummary() {
  const { items, subtotal, shippingMethod, shipping, total } = useCart();
  const [code, setCode] = useState("");
  const [message, setMessage] = useState("");

  function applyCode(e: FormEvent) {
    e.preventDefault();
    // No discount codes exist yet, so every code is reported as invalid.
    setMessage("Sorry, that coupon code isn't valid.");
  }

  return (
    <div>
      <ul className="space-y-6">
        {items.map((item) => (
          <li key={item.slug} className="flex items-center gap-4">
            <div className="relative h-[70px] w-[70px] shrink-0 rounded-sm bg-slate-100">
              {item.image && (
                <Image src={item.image} alt="" fill unoptimized sizes="70px" className="rounded-sm object-cover" />
              )}
              <span className="absolute -top-2 -right-2 flex h-6 min-w-6 items-center justify-center rounded-full bg-[#d6a5b5] px-1 text-xs font-semibold text-white">
                {item.qty}
              </span>
            </div>
            <p className="flex-1 text-[15px] leading-snug font-semibold text-slate-900">{item.title}</p>
            <p className="text-[15px] font-semibold text-slate-900">{formatPrice(item.price * item.qty)}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={applyCode} className="mt-8 flex gap-4">
        <input
          value={code}
          onChange={(e) => {
            setCode(e.target.value);
            setMessage("");
          }}
          aria-label="Coupon Code"
          placeholder="Coupon Code"
          className="h-[52px] min-w-0 flex-1 rounded-[4px] border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#c98aa0]"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="h-[52px] w-[135px] shrink-0 rounded-[4px] bg-[#c98aa0] text-base font-semibold text-white transition hover:bg-[#bb7a91] disabled:cursor-not-allowed disabled:bg-[#d6a5b5]"
        >
          Apply
        </button>
      </form>
      {message && (
        <p role="status" className="mt-2 text-sm text-[#e02b1d]">
          {message}
        </p>
      )}

      <dl className="mt-8 space-y-4 text-[15px] text-slate-900">
        <div className="flex justify-between font-semibold">
          <dt>Subtotal</dt>
          <dd>{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-6 font-semibold">
          <dt>Shipping</dt>
          <dd className="text-right">
            {SHIPPING_METHODS[shippingMethod].label}
            <br />
            {formatPrice(shipping)}
          </dd>
        </div>
        <div className="flex items-baseline justify-between pt-2 text-xl font-bold">
          <dt>Total</dt>
          <dd className="text-[22px]">{formatPrice(total)}</dd>
        </div>
      </dl>
    </div>
  );
}
