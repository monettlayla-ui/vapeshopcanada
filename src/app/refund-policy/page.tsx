import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = { title: "Refund Policy - Vape Shop Canada" };

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
