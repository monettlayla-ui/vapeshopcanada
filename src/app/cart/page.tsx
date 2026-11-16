import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { CartPageContent } from "@/components/cart/CartPageContent";

export const metadata: Metadata = { title: "Cart - Vape Shop Canada" };

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
