import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PolicyPage } from "@/components/sections/PolicyPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = { title: "Terms & Conditions - Vape Shop Canada" };

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
