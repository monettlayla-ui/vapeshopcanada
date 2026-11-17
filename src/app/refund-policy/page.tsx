import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = pageMetadata({
  title: 'Refund Policy',
  description: 'Vape Shop Canada refund policy: when refunds are accepted for damaged, defective or incorrect vape products and how to request one.',
  path: '/refund-policy',
});

export default function RefundPolicyPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <PolicyPage folder="refund-policy" />
      </main>
      <FloatingCartButton />
    </>
  );
}
