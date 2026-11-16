import { SHIPPING_METHODS, type CartItem, type ShippingMethod } from "./cart";
import { formatPrice } from "./format";

/** Orders below this total (items + shipping) can't be placed. */
export const MIN_ORDER_TOTAL = 200;

export const minOrderMessage = (total: number) =>
  `You must have an order with a minimum of ${formatPrice(MIN_ORDER_TOTAL)} to place your order, your current order total is ${formatPrice(total)}.`;

export const COUNTRIES = ["Canada"];

export const PROVINCES = [
  "Alberta",
  "British Columbia",
  "Manitoba",
  "New Brunswick",
  "Newfoundland and Labrador",
  "Northwest Territories",
  "Nova Scotia",
  "Nunavut",
  "Ontario",
  "Prince Edward Island",
  "Quebec",
  "Saskatchewan",
  "Yukon",
];

export type PaymentMethod = "bank" | "payid";

export const PAYMENT_METHODS: Record<PaymentMethod, { label: string; note: string }> = {
  bank: {
    label: "Bank transfer",
    note: "After submitting your order, kindly contact support for payment details.",
  },
  payid: {
    label: "PAYID",
    note: "After submitting your order, kindly contact support for PayID payment details.",
  },
};

export type CheckoutForm = {
  email: string;
  firstName: string;
  lastName: string;
  country: string;
  street: string;
  apartment: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  shipDifferent: boolean;
  shipStreet: string;
  shipCity: string;
  shipProvince: string;
  shipPostalCode: string;
  notes: string;
  payment: PaymentMethod;
};

export const EMPTY_FORM: CheckoutForm = {
  email: "",
  firstName: "",
  lastName: "",
  country: COUNTRIES[0],
  street: "",
  apartment: "",
  city: "",
  province: "",
  postalCode: "",
  phone: "",
  shipDifferent: false,
  shipStreet: "",
  shipCity: "",
  shipProvince: "",
  shipPostalCode: "",
  notes: "",
  payment: "bank",
};

export type FieldErrors = Partial<Record<Exclude<keyof CheckoutForm, "shipDifferent">, string>>;

/** Required-field checks. Returns an error message per invalid field. */
export function validateCheckout(f: CheckoutForm): FieldErrors {
  const errors: FieldErrors = {};
  if (!f.email.trim()) errors.email = "Email Address is required";
  else if (!/^\S+@\S+\.\S+$/.test(f.email.trim())) errors.email = "Enter a valid email address";
  if (!f.firstName.trim()) errors.firstName = "First name is required";
  if (!f.lastName.trim()) errors.lastName = "Last name is required";
  if (!f.country) errors.country = "Country is required";
  if (!f.street.trim()) errors.street = "Street address is required";
  if (!f.city.trim()) errors.city = "Town / City is required";
  if (!f.province) errors.province = "Province is required";
  if (!f.postalCode.trim()) errors.postalCode = "Postal code is required";
  if (!f.phone.trim()) errors.phone = "Phone is required";
  else if (f.phone.replace(/\D/g, "").length < 7) errors.phone = "Enter a valid phone number";
  if (f.shipDifferent) {
    if (!f.shipStreet.trim()) errors.shipStreet = "Street address is required";
    if (!f.shipCity.trim()) errors.shipCity = "Town / City is required";
    if (!f.shipProvince) errors.shipProvince = "Province is required";
    if (!f.shipPostalCode.trim()) errors.shipPostalCode = "Postal code is required";
  }
  return errors;
}

type OrderSummary = {
  items: CartItem[];
  subtotal: number;
  shippingMethod: ShippingMethod;
  shipping: number;
  total: number;
};

/**
 * There is no payment or order system behind the site yet, so placing an order
 * opens the customer's email app with the full order written out, addressed to the store.
 */
export function buildOrderMailto(email: string, f: CheckoutForm, o: OrderSummary): string {
  const lines = [
    `New order from ${f.firstName} ${f.lastName}`,
    "",
    "ITEMS",
    ...o.items.map((i) => `- ${i.qty} x ${i.title}: ${formatPrice(i.price * i.qty)}`),
    "",
    `Subtotal: ${formatPrice(o.subtotal)}`,
    `${SHIPPING_METHODS[o.shippingMethod].label} ${formatPrice(o.shipping)}`,
    `Total: ${formatPrice(o.total)}`,
    "",
    "CONTACT",
    `Email: ${f.email}`,
    `Phone: ${f.phone}`,
    "",
    "SHIP TO",
    `${f.firstName} ${f.lastName}`,
    ...(f.shipDifferent
      ? [f.shipStreet, `${f.shipCity}, ${f.shipProvince} ${f.shipPostalCode}`, f.country]
      : [
          f.street,
          ...(f.apartment ? [f.apartment] : []),
          `${f.city}, ${f.province} ${f.postalCode}`,
          f.country,
        ]),
    ...(f.shipDifferent ? ["", `BILLING ADDRESS: ${f.street}, ${f.city}, ${f.province} ${f.postalCode}`] : []),
    "",
    `Payment: ${PAYMENT_METHODS[f.payment].label}`,
    ...(f.notes ? ["", "NOTES", f.notes] : []),
  ];
  return `mailto:${email}?subject=${encodeURIComponent(`New order from ${f.firstName} ${f.lastName}`)}&body=${encodeURIComponent(lines.join("\n"))}`;
}
