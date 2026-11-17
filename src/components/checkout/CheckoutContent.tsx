"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { contactContent } from "@/config/site";
import { SHIPPING_METHODS, type ShippingMethod } from "@/lib/cart";
import {
  COUNTRIES,
  EMPTY_FORM,
  MIN_ORDER_TOTAL,
  PAYMENT_METHODS,
  PROVINCES,
  hasProvinceList,
  buildOrderMailto,
  minOrderMessage,
  validateCheckout,
  type CheckoutForm,
  type PaymentMethod,
} from "@/lib/checkout";
import { formatPrice } from "@/lib/format";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useCart } from "@/components/cart/CartProvider";
import { SectionHeading, SelectField, TextField } from "./Fields";
import { MobileSummary } from "./MobileSummary";
import { OrderSummary } from "./OrderSummary";

const radioCard = "flex cursor-pointer items-center justify-between gap-4 px-4 py-4 text-[15px]";

/** Checkout page: billing form on a pink panel (left), order summary on white (right). */
export function CheckoutContent() {
  const cart = useCart();
  const [form, setForm] = useState<CheckoutForm>(EMPTY_FORM);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [confirmation, setConfirmation] = useState<{ number: string; email: string } | null>(null);

  if (confirmation) {
    return (
      <div className="mx-auto max-w-xl px-6 py-20 text-center">
        <h1 className="text-3xl font-medium text-slate-800">Thank you, your order has been received</h1>
        <p className="mt-4 text-slate-700">
          Order number: <strong>{confirmation.number}</strong>
        </p>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-700">
          We will contact you at {confirmation.email} with the payment details to complete your order.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-block rounded-[4px] bg-[#c98aa0] px-8 py-3.5 font-semibold text-white hover:bg-[#bb7a91]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  if (!cart.ready) return <div className="min-h-[70vh]" aria-hidden="true" />;
  if (cart.items.length === 0) return <EmptyCart />;

  const errors = validateCheckout(form);
  const shown = (key: keyof typeof errors) => (touched[key] || submitted ? errors[key] : undefined);
  const belowMinimum = cart.total < MIN_ORDER_TOTAL;
  // The order can only be placed when every field is valid and the minimum is met.
  const canOrder = !belowMinimum && Object.keys(errors).length === 0;

  const set = <K extends keyof CheckoutForm>(key: K, value: CheckoutForm[K]) =>
    setForm((f) => ({ ...f, [key]: value }));
  const blur = (key: string) => () => setTouched((t) => ({ ...t, [key]: true }));
  const field = (key: keyof typeof errors, label: string) => ({
    id: key,
    label,
    value: form[key] as string,
    error: shown(key),
    onChange: (v: string) => set(key, v as never),
    onBlur: blur(key),
  });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    setServerError("");
    if (belowMinimum || Object.keys(errors).length > 0 || sending) return;
    const website = String(new FormData(e.currentTarget).get("website") ?? "");

    setSending(true);
    try {
      const res = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form,
          website,
          shippingMethod: cart.shippingMethod,
          items: cart.items.map((i) => ({ slug: i.slug, qty: i.qty })),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; number?: string; error?: string };

      if (res.ok && data.ok) {
        setConfirmation({ number: data.number ?? "", email: form.email.trim() });
        cart.clear();
        window.scrollTo({ top: 0 });
        return;
      }
      if (data.error === "not_configured") {
        // Order emails are not set up on this server yet: fall back to the customer's email app.
        window.location.href = buildOrderMailto(contactContent.email, form, {
          items: cart.items,
          subtotal: cart.subtotal,
          shippingMethod: cart.shippingMethod,
          shipping: cart.shipping,
          total: cart.total,
        });
        setPlaced(true);
        return;
      }
      setServerError(data.error || "Something went wrong. Please try again.");
    } catch {
      setServerError("Could not reach the server. Check your connection and try again.");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
    <MobileSummary />
    <div className="grid min-h-[calc(100vh-4rem)] lg:grid-cols-2">
      {/* Left: form */}
      <div className="bg-[#f6e9ec]">
        <form onSubmit={onSubmit} noValidate className="ml-auto w-full max-w-[640px] space-y-8 px-6 py-10 lg:pr-12">
          {belowMinimum && (
            <div role="alert" className="rounded-[4px] border border-[#e02b1d] bg-[#fff5f4] p-4 text-[15px] font-medium text-[#e02b1d]">
              <ul className="list-disc space-y-1 pl-5">
                <li>{minOrderMessage(cart.total)}</li>
              </ul>
            </div>
          )}

          {placed && (
            <div role="status" className="rounded-[4px] border border-[#2f9e44] bg-white p-4 text-[15px] text-slate-800">
              Your order details have opened in your email app. Send that email to complete your order. Your cart is
              unchanged until then.
            </div>
          )}

          <section className="space-y-4">
            <SectionHeading>Contact</SectionHeading>
            <TextField {...field("email", "Email Address")} type="email" autoComplete="email" />
          </section>

          <section className="space-y-4">
            <SectionHeading>Billing Details</SectionHeading>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField {...field("firstName", "Jane")} autoComplete="given-name" />
              <TextField {...field("lastName", "Doe")} autoComplete="family-name" />
            </div>
            <SelectField
              {...field("country", "Country / Region")}
              onChange={(v) => setForm((f) => ({ ...f, country: v, province: "", shipProvince: "" }))}
              options={COUNTRIES}
              autoComplete="country-name"
            />
            <TextField {...field("street", "House number and street name")} autoComplete="address-line1" />
            <TextField {...field("apartment", "Apartment, suite, unit, etc.")} autoComplete="address-line2" />
            <div className="grid gap-4 sm:grid-cols-3">
              <TextField {...field("city", "Town / City")} autoComplete="address-level2" />
              {hasProvinceList(form.country) ? (
                <SelectField {...field("province", "Province")} options={PROVINCES} autoComplete="address-level1" />
              ) : (
                <TextField {...field("province", "State / Province / Region")} autoComplete="address-level1" />
              )}
              <TextField {...field("postalCode", "Postal / ZIP code")} autoComplete="postal-code" />
            </div>
            <TextField {...field("phone", "+1 415 555 0142")} type="tel" autoComplete="tel" />

            <label className="flex cursor-pointer items-center gap-3 pt-1 text-[17px] text-slate-800 [font-family:var(--font-marcellus),Georgia,serif]">
              <input
                type="checkbox"
                checked={form.shipDifferent}
                onChange={(e) => set("shipDifferent", e.target.checked)}
                className="h-4 w-4 accent-[#c98aa0]"
              />
              Ship to a different address?
            </label>

            {form.shipDifferent && (
              <div className="space-y-4 rounded-[4px] border border-[#e5d3d9] bg-white/60 p-4">
                <TextField {...field("shipStreet", "Shipping street address")} autoComplete="shipping address-line1" />
                <div className="grid gap-4 sm:grid-cols-3">
                  <TextField {...field("shipCity", "Town / City")} autoComplete="shipping address-level2" />
                  {hasProvinceList(form.country) ? (
                    <SelectField {...field("shipProvince", "Province")} options={PROVINCES} autoComplete="shipping address-level1" />
                  ) : (
                    <TextField {...field("shipProvince", "State / Province / Region")} autoComplete="shipping address-level1" />
                  )}
                  <TextField {...field("shipPostalCode", "Postal / ZIP code")} autoComplete="shipping postal-code" />
                </div>
              </div>
            )}

            <textarea
              value={form.notes}
              onChange={(e) => set("notes", e.target.value)}
              aria-label="Notes about your order"
              placeholder="Notes about your order, e.g. special notes for delivery."
              rows={3}
              className="w-full rounded-[4px] border border-slate-300 bg-white px-3 py-3 text-[15px] text-slate-800 outline-none placeholder:text-slate-500 focus:border-[#c98aa0]"
            />
          </section>

          <section className="space-y-4">
            <SectionHeading>Shipping</SectionHeading>
            <div className="divide-y divide-slate-300 overflow-hidden rounded-[4px] border border-[#d6a5b5] bg-white">
              {(Object.keys(SHIPPING_METHODS) as ShippingMethod[]).map((key) => (
                <label key={key} className={`${radioCard} ${cart.shippingMethod === key ? "bg-[#faf3f5]" : ""}`}>
                  <span className="flex items-center gap-3 font-semibold text-slate-600">
                    <input
                      type="radio"
                      name="shipping"
                      checked={cart.shippingMethod === key}
                      onChange={() => cart.setShippingMethod(key)}
                      className="h-4 w-4 accent-[#c98aa0]"
                    />
                    {SHIPPING_METHODS[key].label}
                  </span>
                  <span className="font-semibold text-slate-900">{formatPrice(SHIPPING_METHODS[key].fee)}</span>
                </label>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <SectionHeading>Payment</SectionHeading>
            <div className="divide-y divide-slate-300 overflow-hidden rounded-[4px] border border-[#d6a5b5] bg-white">
              {(Object.keys(PAYMENT_METHODS) as PaymentMethod[]).map((key) => (
                <div key={key}>
                  <label className={radioCard}>
                    <span className="flex items-center gap-3 text-[14px] font-semibold text-slate-600">
                      <input
                        type="radio"
                        name="payment"
                        checked={form.payment === key}
                        onChange={() => set("payment", key)}
                        className="h-4 w-4 accent-[#c98aa0]"
                      />
                      {PAYMENT_METHODS[key].label}
                    </span>
                  </label>
                  {form.payment === key && (
                    <p className="border-t border-slate-300 bg-slate-50 px-4 py-4 text-[14px] text-slate-900">
                      {PAYMENT_METHODS[key].note}
                    </p>
                  )}
                </div>
              ))}
            </div>

            <p className="text-justify text-[13px] leading-relaxed text-slate-600">
              Your personal data will be used to process your order, support your experience throughout this website,
              and for other purposes described in our{" "}
              <Link href="/privacy-policy" className="font-semibold text-[#c98aa0] hover:underline">
                privacy policy
              </Link>
              .
            </p>

            {/* Honeypot: hidden from people, filled in by bots. */}
            <input
              type="text"
              name="website"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              className="absolute -left-[9999px] h-0 w-0 opacity-0"
            />

            {serverError && (
              <p role="alert" className="rounded-[4px] border border-[#e02b1d] bg-[#fff5f4] p-3 text-[14px] text-[#e02b1d]">
                {serverError}
              </p>
            )}

            <button
              type="submit"
              disabled={sending}
              aria-disabled={!canOrder || sending}
              className={`flex h-14 w-full items-center justify-center gap-3 rounded-[4px] text-lg font-semibold text-white transition ${
                canOrder
                  ? "bg-[#e0457b] shadow-md shadow-[#e0457b]/30 hover:bg-[#cc3a6d] disabled:opacity-80"
                  : "cursor-not-allowed bg-[#d6a5b5]"
              }`}
            >
              {canOrder ? (
                /* Unlocked: every field is OK */
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17 8h-1V6a4 4 0 0 0-7.7-1.5l1.9.7A2 2 0 0 1 14 6v2H7a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-9a2 2 0 0 0-2-2Z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                  <path d="M17 9V7a5 5 0 0 0-10 0v2H5v12h14V9h-2Zm-8-2a3 3 0 0 1 6 0v2H9V7Z" />
                </svg>
              )}
              {sending ? "Sending your order..." : "Place Order"} {!sending && <span>{formatPrice(cart.total)}</span>}
            </button>
          </section>
        </form>
      </div>

      {/* Right: order summary */}
      <div className="hidden border-t border-[#e5d3d9] bg-white lg:block lg:border-t-0 lg:border-l">
        <div className="mr-auto w-full max-w-[560px] px-6 py-10 lg:sticky lg:top-0 lg:pl-12">
          <OrderSummary />
        </div>
      </div>
    </div>
    </>
  );
}
