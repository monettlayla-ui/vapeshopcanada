import { PAYMENT_METHODS, type CheckoutForm } from "./checkout";
import { SHIPPING_METHODS, type ShippingMethod } from "./cart";
import { formatPrice } from "./format";

export type OrderLine = { title: string; qty: number; unitPrice: number };

export type Order = {
  number: string;
  form: CheckoutForm;
  lines: OrderLine[];
  subtotal: number;
  shippingMethod: ShippingMethod;
  shipping: number;
  total: number;
};

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

function addressLines(f: CheckoutForm): string[] {
  return f.shipDifferent
    ? [f.shipStreet, `${f.shipCity}, ${f.shipProvince} ${f.shipPostalCode}`, f.country]
    : [f.street, ...(f.apartment ? [f.apartment] : []), `${f.city}, ${f.province} ${f.postalCode}`, f.country];
}

function billingLine(f: CheckoutForm): string {
  return `${f.street}${f.apartment ? ", " + f.apartment : ""}, ${f.city}, ${f.province} ${f.postalCode}, ${f.country}`;
}

/** Plain-text version (also what mail apps show when HTML is off). */
export function orderText(o: Order): string {
  const f = o.form;
  return [
    `NEW ORDER ${o.number}`,
    "",
    "CUSTOMER",
    `Name: ${f.firstName} ${f.lastName}`,
    `Email: ${f.email}`,
    `Phone: ${f.phone}`,
    "",
    "SHIP TO",
    ...addressLines(f),
    ...(f.shipDifferent ? ["", `Billing address: ${billingLine(f)}`] : []),
    "",
    "ITEMS",
    ...o.lines.map((l) => `- ${l.qty} x ${l.title} @ ${formatPrice(l.unitPrice)} = ${formatPrice(l.unitPrice * l.qty)}`),
    "",
    `Subtotal: ${formatPrice(o.subtotal)}`,
    `${SHIPPING_METHODS[o.shippingMethod].label} ${formatPrice(o.shipping)}`,
    `TOTAL: ${formatPrice(o.total)}`,
    "",
    `Payment method: ${PAYMENT_METHODS[f.payment].label}`,
    ...(f.notes ? ["", "Customer notes:", f.notes] : []),
  ].join("\n");
}

export function orderHtml(o: Order, intro?: string): string {
  const f = o.form;
  const td = "padding:6px 8px;border-bottom:1px solid #e2e8f0";
  const row = (a: string, b: string) =>
    `<tr><td style="padding:4px 12px 4px 0;color:#64748b">${esc(a)}</td><td style="padding:4px 0">${esc(b)}</td></tr>`;
  const items = o.lines
    .map(
      (l) =>
        `<tr><td style="${td}">${esc(l.title)}</td><td style="${td};text-align:center">${l.qty}</td><td style="${td};text-align:right">${formatPrice(l.unitPrice * l.qty)}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;max-width:620px">
<h2 style="margin:0 0 4px">${intro ? esc(intro) : `New order ${esc(o.number)}`}</h2>
<p style="margin:0 0 16px;color:#64748b">Order ${esc(o.number)}</p>
<h3 style="margin:16px 0 6px">Customer</h3>
<table>${row("Name", `${f.firstName} ${f.lastName}`)}${row("Email", f.email)}${row("Phone", f.phone)}</table>
<h3 style="margin:16px 0 6px">Ship to</h3>
<p style="margin:0">${addressLines(f).map(esc).join("<br>")}</p>
${f.shipDifferent ? `<p style="margin:8px 0 0;color:#64748b">Billing address: ${esc(billingLine(f))}</p>` : ""}
<h3 style="margin:16px 0 6px">Items</h3>
<table style="width:100%;border-collapse:collapse"><tr style="background:#f1f5f9"><th style="padding:6px 8px;text-align:left">Product</th><th style="padding:6px 8px">Qty</th><th style="padding:6px 8px;text-align:right">Price</th></tr>${items}</table>
<p style="text-align:right;margin:10px 0 0">Subtotal: ${formatPrice(o.subtotal)}<br>${esc(SHIPPING_METHODS[o.shippingMethod].label)} ${formatPrice(o.shipping)}<br><strong style="font-size:16px">Total: ${formatPrice(o.total)}</strong></p>
<p style="margin:16px 0 0"><strong>Payment method:</strong> ${esc(PAYMENT_METHODS[f.payment].label)}</p>
${f.notes ? `<p style="margin:10px 0 0"><strong>Customer notes:</strong><br>${esc(f.notes).replace(/\n/g, "<br>")}</p>` : ""}
</div>`;
}
