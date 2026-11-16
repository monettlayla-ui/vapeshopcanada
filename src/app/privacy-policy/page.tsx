import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = { title: "Privacy Policy - Vape Shop Canada" };

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
