"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { SHIPPING_METHODS, type CartItem, type ShippingMethod } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import { EmptyCart } from "./EmptyCart";
import { useCart } from "./CartProvider";
import { CouponForm } from "./CouponForm";

const th = "px-4 py-3.5 text-left text-[15px] font-bold text-slate-800";
const stepBtn = "h-10 w-10 text-lg text-slate-700 hover:bg-slate-100 disabled:text-slate-300";

function CartRow({ item }: { item: CartItem }) {
  const { setQty, remove } = useCart();

  return (
    <tr className="border-t border-slate-300 align-middle">
      <td className="w-14 py-4 pr-0 pl-4">
        <button
          type="button"
          onClick={() => remove(item.slug)}
          aria-label={`Remove ${item.title} from cart`}
          className="text-slate-400 hover:text-red-600"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-6 w-6" aria-hidden="true">
            <circle cx="12" cy="12" r="9.5" />
            <path d="m9 9 6 6m0-6-6 6" strokeLinecap="round" />
          </svg>
        </button>
      </td>
      <td className="w-24 px-4 py-4">
        <div className="relative h-[70px] w-[70px] bg-slate-100">
          {item.image && <Image src={item.image} alt={item.title} fill unoptimized sizes="70px" className="object-cover" />}
        </div>
      </td>
      <td className="min-w-[220px] px-4 py-4">
        <Link href={item.href} className="text-[15px] leading-relaxed font-semibold text-blue-600 hover:underline">
          {item.title}
        </Link>
      </td>
      <td className="px-4 py-4 text-[15px] text-slate-800">{formatPrice(item.price)}</td>
      <td className="px-4 py-4">
        <div className="inline-flex items-center border border-slate-300">
          <button
            type="button"
            aria-label="Decrease quantity"
            disabled={item.qty <= 1}
            onClick={() => setQty(item.slug, item.qty - 1)}
            className={stepBtn}
          >
            -
          </button>
          <input
            type="number"
            min={1}
            value={item.qty}
            aria-label={`Quantity of ${item.title}`}
            onChange={(e) => setQty(item.slug, Number(e.target.value))}
            className="h-10 w-12 [appearance:textfield] border-x border-slate-300 text-center text-blue-700 outline-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <button type="button" aria-label="Increase quantity" onClick={() => setQty(item.slug, item.qty + 1)} className={stepBtn}>
            +
          </button>
        </div>
      </td>
      <td className="px-4 py-4 text-[15px] text-slate-800">{formatPrice(item.price * item.qty)}</td>
    </tr>
  );
}

function CartTotals() {
  const { subtotal, shippingMethod, setShippingMethod, shipping, total } = useCart();
  const [couponOpen, setCouponOpen] = useState(false);
  const row = "border-b border-slate-300";
  const labelCell = "w-[34%] py-4 pr-4 align-top text-[15px] font-bold text-slate-800";

  return (
    <div className="border border-slate-300">
      <h2 className="bg-[#eff4f9] px-8 py-6 text-3xl font-semibold text-slate-800">Cart totals</h2>

      <div className="px-5 py-2">
        <table className="w-full">
          <tbody>
            <tr className={row}>
              <th scope="row" className={`${labelCell} text-left`}>
                Subtotal
              </th>
              <td className="py-4 text-[15px] text-slate-700">{formatPrice(subtotal)}</td>
            </tr>
            <tr className={row}>
              <th scope="row" className={`${labelCell} text-left`}>
                Shipment
              </th>
              <td className="py-4">
                <ul className="space-y-2">
                  {(Object.keys(SHIPPING_METHODS) as ShippingMethod[]).map((key) => (
                    <li key={key}>
                      <label className="flex cursor-pointer items-start gap-2 text-sm text-slate-900">
                        <input
                          type="radio"
                          name="shipping"
                          value={key}
                          checked={shippingMethod === key}
                          onChange={() => setShippingMethod(key)}
                          className="mt-1 accent-blue-600"
                        />
                        <span>
                          {SHIPPING_METHODS[key].label}{" "}
                          <strong className="block">{formatPrice(SHIPPING_METHODS[key].fee)}</strong>
                        </span>
                      </label>
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-700">
                  Shipping to <strong className="font-bold text-slate-800">Canada</strong>.
                </p>
                <Link href="/checkout" className="mt-6 block text-[15px] text-blue-600 hover:underline">
                  Change address
                </Link>
              </td>
            </tr>
            <tr className={row}>
              <th scope="row" className={`${labelCell} text-left`}>
                Total
              </th>
              <td className="py-4 text-[15px] text-slate-700" data-shipping={shipping}>
                {formatPrice(total)}
              </td>
            </tr>
          </tbody>
        </table>

        <div className="pt-6 pb-4">
          <button
            type="button"
            onClick={() => setCouponOpen((o) => !o)}
            aria-expanded={couponOpen}
            className="text-[15px] text-slate-700 hover:text-slate-900"
          >
            Have a coupon?
          </button>
          {couponOpen && (
            <div className="mt-3">
              <CouponForm />
            </div>
          )}
        </div>

        <Link
          href="/checkout"
          className="mb-3 flex h-14 items-center justify-center rounded-sm bg-blue-600 text-base font-semibold text-white hover:bg-blue-700"
        >
          Proceed to checkout
        </Link>
      </div>
    </div>
  );
}

/** The /cart page: empty message, or the cart table beside the cart totals. */
export function CartPageContent() {
  const { items, ready } = useCart();

  if (!ready) return <div className="min-h-[60vh]" aria-hidden="true" />;
  if (items.length === 0) return <EmptyCart />;

  return (
    <section className="mx-auto max-w-7xl px-6 pt-14 pb-24">
      <h1 className="text-3xl font-semibold text-slate-800 sm:text-[32px]">Cart</h1>

      <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1fr_360px]">
        <div className="overflow-x-auto border border-slate-300">
          <table className="w-full min-w-[640px]">
            <thead className="bg-[#eff4f9]">
              <tr>
                <th className={th}>
                  <span className="sr-only">Remove</span>
                </th>
                <th className={th}>
                  <span className="sr-only">Image</span>
                </th>
                <th className={th}>Product</th>
                <th className={th}>Price</th>
                <th className={th}>Quantity</th>
                <th className={th}>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <CartRow key={item.slug} item={item} />
              ))}
            </tbody>
          </table>
        </div>

        <CartTotals />
      </div>
    </section>
  );
}
