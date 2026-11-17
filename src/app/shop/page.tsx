import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategoryList } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { buildShopUrl } from "@/lib/shop-url";
import { Header } from "@/components/layout/Header";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { ShopContent } from "@/components/shop/ShopContent";
import { ShopSkeleton } from "@/components/shop/ShopSkeleton";

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export async function generateMetadata({ searchParams }: PageProps<"/shop">): Promise<Metadata> {
  const sp = await searchParams;
  const category = first(sp.category) ?? "";
  const search = (first(sp.s) ?? "").trim();
  const page = Math.max(1, parseInt(first(sp.page) ?? "1", 10) || 1);

  // Internal search results are not useful in Google.
  if (search) {
    return pageMetadata({
      title: "Search results",
      description: "Search results at Vape Shop Canada.",
      path: "/shop",
      noindex: true,
    });
  }

  const name = category ? (await getCategoryList()).find((c) => c.slug === category)?.name : undefined;
  const suffix = page > 1 ? ` - Page ${page}` : "";
  const path = buildShopUrl({ category: name ? category : undefined, page });

  if (name) {
    return pageMetadata({
      title: `${name} - Buy Online in Canada${suffix}`,
      description: `Shop ${name} at Vape Shop Canada. Authentic products, great prices and fast Canada-wide delivery.${suffix}`,
      path,
    });
  }
  return pageMetadata({
    title: `Shop All Vapes, E-Liquids & Pods${suffix}`,
    description: `Browse every vape, disposable, pod, e-liquid and accessory at Vape Shop Canada. Filter by brand and category with fast Canada-wide delivery.${suffix}`,
    path,
  });
}

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
