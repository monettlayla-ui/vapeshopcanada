import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = pageMetadata({
  title: 'Terms & Conditions',
  description: 'Terms and conditions for using Vape Shop Canada: use of the website, orders and payments, shipping and delivery, returns and liability.',
  path: '/terms-conditions',
});

export default function TermsPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <PolicyPage folder="terms-conditions" />
      </main>
      <FloatingCartButton />
    </>
  );
}
