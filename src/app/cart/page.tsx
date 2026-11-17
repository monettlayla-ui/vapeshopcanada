import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = pageMetadata({
  title: 'Cart',
  description: 'Review the items in your Vape Shop Canada cart.',
  path: '/cart',
  noindex: true,
});

export default function CartPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <CartPageContent />
      </main>
    </>
  );
}
