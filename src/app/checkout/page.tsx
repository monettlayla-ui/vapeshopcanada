import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Image from "next/image";
import Link from "next/link";
import { CheckoutContent } from "@/components/checkout/CheckoutContent";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: 'Checkout',
  description: 'Complete your Vape Shop Canada order.',
  path: '/checkout',
  noindex: true,
});

export default function CheckoutPage() {
  return (
    <>
      {/* Slim header: just the logo, so nothing distracts from the order. */}
      <header className="h-16 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center px-6">
          <Link href="/" aria-label={siteConfig.name}>
            <Image
              src={siteConfig.logo.dark}
              alt={siteConfig.name}
              width={siteConfig.logo.width}
              height={siteConfig.logo.height}
              className="h-14 w-auto"
              priority
            />
          </Link>
        </div>
      </header>
      <main>
        <CheckoutContent />
      </main>
    </>
  );
}
