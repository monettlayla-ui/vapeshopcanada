import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { FaqPage } from "@/components/sections/FaqPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = pageMetadata({
  title: 'FAQ',
  description: 'Answers to common questions about buying vapes online in Canada: products, delivery, authenticity, nicotine vapes and customer support.',
  path: '/faq',
});

export default function FaqRoute() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <FaqPage />
      </main>
      <FloatingCartButton />
    </>
  );
}
