import type { Metadata } from "next";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { ShopContent } from "@/components/shop/ShopContent";
import { ShopSkeleton } from "@/components/shop/ShopSkeleton";

export const metadata: Metadata = { title: "Shop - Vape Shop Canada" };

export default function ShopPage({ searchParams }: PageProps<"/shop">) {
  return (
    <>
      <Header variant="solid" />
      <main>
        {/* The URL (?category, ?s, ?page) is only known per request, so stream it in. */}
        <Suspense fallback={<ShopSkeleton />}>
          <ShopContent searchParams={searchParams} />
        </Suspense>
      </main>
      <FloatingCartButton />
    </>
  );
}
