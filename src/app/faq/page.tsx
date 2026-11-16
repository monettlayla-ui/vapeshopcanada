import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { FaqPage } from "@/components/sections/FaqPage";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export const metadata: Metadata = { title: "FAQ - Vape Shop Canada" };

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
