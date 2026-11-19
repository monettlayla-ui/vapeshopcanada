import type { Metadata } from "next";
import { Geist, Geist_Mono, Marcellus } from "next/font/google";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { CartProvider } from "@/components/cart/CartProvider";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/ui/ScrollToTop";
import { FooterGate } from "@/components/layout/FooterGate";
import { AgeGate } from "@/components/layout/AgeGate";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, seoConfig } from "@/lib/seo";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const marcellus = Marcellus({
  variable: "--font-marcellus",
  subsets: ["latin"],
  weight: "400",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.url),
  title: {
    default: "Vape Shop Canada | Buy Disposable Vapes, E-Liquids & Pods Online",
    template: "%s | Vape Shop Canada",
  },
  description: seoConfig.description,
  keywords: seoConfig.keywords,
  authors: [{ name: seoConfig.name, url: seoConfig.url }],
  creator: seoConfig.name,
  publisher: seoConfig.name,
  applicationName: seoConfig.name,
  robots: { index: true, follow: true },
  // Every page sets its own canonical; this one only covers the home page.
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: seoConfig.locale,
    siteName: seoConfig.name,
    title: "Vape Shop Canada | Buy Disposable Vapes, E-Liquids & Pods Online",
    description: seoConfig.description,
    url: "/",
    images: [{ url: seoConfig.shareImage, width: 1280, height: 853, alt: "Vape Shop Canada" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vape Shop Canada | Buy Disposable Vapes, E-Liquids & Pods Online",
    description: seoConfig.description,
    images: [seoConfig.shareImage],
  },
};

const storeJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "OnlineStore",
      "@id": `${seoConfig.url}/#store`,
      name: seoConfig.name,
      description: seoConfig.description,
      url: seoConfig.url,
      logo: absoluteUrl(seoConfig.logo),
      image: absoluteUrl(seoConfig.shareImage),
      telephone: seoConfig.telephone,
      ...(seoConfig.email ? { email: seoConfig.email } : {}),
      areaServed: { "@type": "Country", name: seoConfig.areaServed },
      currenciesAccepted: "CAD",
      contactPoint: {
        "@type": "ContactPoint",
        telephone: seoConfig.telephone,
        contactType: "customer service",
        areaServed: "CA",
        availableLanguage: "English",
      },
      ...(seoConfig.sameAs.length ? { sameAs: seoConfig.sameAs } : {}),
    },
    {
      "@type": "WebSite",
      "@id": `${seoConfig.url}/#website`,
      url: seoConfig.url,
      name: seoConfig.name,
      inLanguage: "en-CA",
      publisher: { "@id": `${seoConfig.url}/#store` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${seoConfig.url}/shop?s={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${marcellus.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd data={storeJsonLd} />
        <CartProvider>
          {children}
          <FooterGate>
            <Footer />
          </FooterGate>
          <CartDrawer />
          <ScrollToTop />
          <AgeGate />
        </CartProvider>
      </body>
    </html>
  );
}
