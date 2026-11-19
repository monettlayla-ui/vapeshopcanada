import type { Metadata } from "next";

/**
 * Single source of truth for business details used by SEO (metadata, structured data, sitemap).
 * Keep these identical everywhere a search engine can see them.
 */
export const seoConfig = {
  name: "Vape Shop Canada",
  /** Live production address (the apex domain redirects here). No trailing slash. */
  url: "https://www.vapesshopcanada.com",
  domain: "www.vapesshopcanada.com",
  telephone: "+17829100204",
  /** Set to the business mailbox on the domain once it exists. Left out of structured data while empty. */
  email: "sales@vapesshopcanada.com",
  /** Online-only store serving all of Canada, so no street address is published. */
  areaServed: "Canada",
  /** Real social profile URLs only. Leave empty until they exist. */
  sameAs: [] as string[],
  locale: "en_CA",
  description:
    "Buy disposable vapes, vape kits, pods, e-liquids and nicotine pouches online in Canada. Authentic brands like Geek Bar, Bimo, Airmez and HQD with fast Canada-wide delivery from Vape Shop Canada.",
  keywords: [
    "vape shop Canada",
    "buy vapes online Canada",
    "disposable vapes Canada",
    "vape kits Canada",
    "e-liquids Canada",
    "nicotine pouches Canada",
    "Brisk Bar Canada",
    "Geek Bar Canada",
    "HQD Canada",
    "vape delivery Canada",
  ],
  logo: "/logo.png",
  /** Default share image (1280x853 photo). */
  shareImage: "/images/hero-1.jpg",
};

export const absoluteUrl = (path = "/") => new URL(path, seoConfig.url).toString();

/** Shorten text to a search-snippet length without cutting a word in half. */
export function snippet(text: string | null | undefined, max = 155): string {
  const clean = (text ?? "").replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 80 ? cut.lastIndexOf(" ") : cut.length).replace(/[,.;:\s-]+$/, "")}…`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
};

/** Per-page metadata with its own canonical, Open Graph and Twitter card. */
export function pageMetadata({ title, description, path, image, noindex }: PageMetaInput): Metadata {
  const img = image ?? seoConfig.shareImage;
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: false } : undefined,
    openGraph: {
      type: "website",
      locale: seoConfig.locale,
      siteName: seoConfig.name,
      title,
      description,
      url: path,
      images: [{ url: img, alt: title }],
    },
    twitter: { card: "summary_large_image", title, description, images: [img] },
  };
}

/** Return policy shown to Google: returns accepted within 48 hours (2 days) of delivery, Canada only. */
export const merchantReturnPolicy = {
  "@type": "MerchantReturnPolicy",
  applicableCountry: "CA",
  returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
  merchantReturnDays: 2,
  merchantReturnLink: absoluteUrl("/refund-policy"),
};

const shippingRate = (name: string, value: number, days: number) => ({
  "@type": "OfferShippingDetails",
  shippingLabel: name,
  shippingRate: { "@type": "MonetaryAmount", value: value.toFixed(2), currency: "CAD" },
  shippingDestination: { "@type": "DefinedRegion", addressCountry: "CA" },
  deliveryTime: {
    "@type": "ShippingDeliveryTime",
    handlingTime: { "@type": "QuantitativeValue", minValue: 0, maxValue: 0, unitCode: "DAY" },
    transitTime: { "@type": "QuantitativeValue", minValue: days, maxValue: days, unitCode: "DAY" },
  },
});

/** Shipping options shown to Google: $20 standard (2 business days) and $35 express (1 business day). */
export const shippingDetails = [shippingRate("Standard Shipping", 20, 2), shippingRate("Express Shipping", 35, 1)];
