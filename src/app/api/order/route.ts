import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { COUNTRIES, MIN_ORDER_TOTAL, PAYMENT_METHODS, PROVINCES, hasProvinceList, validateCheckout, type CheckoutForm, type PaymentMethod } from "@/lib/checkout";
import { SHIPPING_METHODS, roundMoney, type ShippingMethod } from "@/lib/cart";
import { orderHtml, orderText, type Order, type OrderLine } from "@/lib/order-email";
import { getProduct } from "@/lib/products";

// Very small in-memory limiter (per server instance): 5 orders per IP per 10 minutes.
const hits = new Map<string, number[]>();
function limited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < 10 * 60 * 1000);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > 5;
}

const fail = (error: string, status: number) => NextResponse.json({ ok: false, error }, { status });

// Preferred: send through the business mailbox itself (Hostinger SMTP). Falls back to Resend if configured.
const smtpConfigured = () => Boolean(process.env.SMTP_USER && process.env.SMTP_PASSWORD);
const fromAddress = () => process.env.ORDER_FROM_EMAIL || `Vape Shop Canada <${process.env.SMTP_USER}>`;

async function sendMail(opts: { to: string; subject: string; text: string; html: string; replyTo?: string }) {
  if (smtpConfigured()) {
    const port = Number(process.env.SMTP_PORT ?? 465);
    const transport = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.hostinger.com",
      port,
      secure: port === 465,
      auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD },
    });
    await transport.sendMail({
      from: fromAddress(),
      to: opts.to,
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      replyTo: opts.replyTo,
    });
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: fromAddress(),
      to: [opts.to],
      subject: opts.subject,
      text: opts.text,
      html: opts.html,
      ...(opts.replyTo ? { reply_to: opts.replyTo } : {}),
    }),
  });
  if (!res.ok) throw new Error(`Resend ${res.status}: ${(await res.text()).slice(0, 300)}`);
}

type Body = {
  form?: CheckoutForm;
  items?: { slug?: string; qty?: number }[];
  shippingMethod?: string;
  website?: string;
};

export async function POST(req: Request) {
  // The shop owner sets these in the host's environment settings (never in the code).
  const toEmail = process.env.ORDER_TO_EMAIL || process.env.SMTP_USER;
  const resendReady = Boolean(process.env.RESEND_API_KEY && process.env.ORDER_FROM_EMAIL);
  if (!toEmail || !(smtpConfigured() || resendReady)) return fail("not_configured", 503);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (limited(ip)) return fail("Too many orders from this connection. Please try again later.", 429);

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return fail("Invalid request.", 400);
  }

  // Bots fill the hidden "website" field; pretend it worked.
  if (body.website) return NextResponse.json({ ok: true, number: "VSC-0000" });

  if (!body.form || typeof body.form !== "object") return fail("Please check your details and try again.", 400);
  // Keep only the known fields, all as trimmed, length-limited text.
  const raw = body.form as unknown as Record<string, unknown>;
  const text = (v: unknown) => (typeof v === "string" ? v.trim().slice(0, 500) : "");
  const form: CheckoutForm = {
    email: text(raw.email),
    firstName: text(raw.firstName),
    lastName: text(raw.lastName),
    country: text(raw.country),
    street: text(raw.street),
    apartment: text(raw.apartment),
    city: text(raw.city),
    province: text(raw.province),
    postalCode: text(raw.postalCode),
    phone: text(raw.phone),
    shipDifferent: raw.shipDifferent === true,
    shipStreet: text(raw.shipStreet),
    shipCity: text(raw.shipCity),
    shipProvince: text(raw.shipProvince),
    shipPostalCode: text(raw.shipPostalCode),
    notes: text(raw.notes),
    payment: (typeof raw.payment === "string" && raw.payment in PAYMENT_METHODS ? raw.payment : "etransfer") as PaymentMethod,
  };
  if (Object.keys(validateCheckout(form)).length > 0) {
    return fail("Please check your details and try again.", 400);
  }
  if (!COUNTRIES.includes(form.country) || (hasProvinceList(form.country) && !PROVINCES.includes(form.province))) {
    return fail("Please check your details and try again.", 400);
  }
  const shippingMethod = body.shippingMethod as ShippingMethod;
  if (!(shippingMethod in SHIPPING_METHODS)) return fail("Choose a shipping method.", 400);
  if (!Array.isArray(body.items) || body.items.length === 0 || body.items.length > 100) {
    return fail("Your cart is empty.", 400);
  }

  // Prices come from our own catalog, never from the browser.
  const lines: OrderLine[] = [];
  for (const it of body.items) {
    const qty = Number(it.qty);
    if (!it.slug || !Number.isInteger(qty) || qty < 1 || qty > 999) return fail("Invalid cart.", 400);
    const product = await getProduct(it.slug);
    if (!product || product.price === null) return fail("A product in your cart is no longer available.", 400);
    const unitPrice = product.on_sale && product.sale_price !== null ? product.sale_price : product.price;
    lines.push({ title: product.title, qty, unitPrice });
  }

  const subtotal = roundMoney(lines.reduce((s, l) => s + l.unitPrice * l.qty, 0));
  const shipping = SHIPPING_METHODS[shippingMethod].fee;
  const total = roundMoney(subtotal + shipping);
  if (total < MIN_ORDER_TOTAL) return fail("Your order is below the minimum order amount.", 400);

  const number = `VSC-${Date.now().toString(36).toUpperCase()}`;
  const order: Order = { number, form, lines, subtotal, shippingMethod, shipping, total };

  try {
    await sendMail({
      to: toEmail,
      subject: `New order ${number} - ${form.firstName} ${form.lastName} ($${total.toFixed(2)})`,
      text: orderText(order),
      html: orderHtml(order),
      replyTo: form.email.trim(),
    });
  } catch (e) {
    console.error("Order email failed", e);
    return fail("We could not send your order. Please try again or contact us.", 502);
  }

  // Optional confirmation to the customer; a failure here must not fail the order.
  // On by default; set SEND_CUSTOMER_CONFIRMATION=false to turn it off.
  if (process.env.SEND_CUSTOMER_CONFIRMATION !== "false") {
    try {
      await sendMail({
        to: form.email.trim(),
        subject: `We received your order ${number}`,
        text: `Thank you for your order. We will contact you with payment details.\n\n${orderText(order)}`,
        html: orderHtml(order, "Thank you for your order"),
        replyTo: toEmail,
      });
    } catch (e) {
      console.error("Customer confirmation failed", e);
    }
  }

  return NextResponse.json({ ok: true, number });
}
