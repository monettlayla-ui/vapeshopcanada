import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = pageMetadata({
  title: 'Privacy Policy',
  description: 'How Vape Shop Canada collects, uses and protects your personal information, and your rights to access, update or delete it.',
  path: '/privacy-policy',
});

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header variant="solid" />
      <main>
        <PolicyPage folder="privacy-policy-2" bigFirstHeading={false} />
      </main>
      <FloatingCartButton />
    </>
  );
}
