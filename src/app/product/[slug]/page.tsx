import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductDescription } from "@/components/product/ProductDescription";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { getAllProductSlugs, getProduct } from "@/lib/products";

export async function generateStaticParams() {
  return (await getAllProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  return { title: product ? `${product.title} - Vape Shop Canada` : "Product not found" };
}

/** Everything that depends on the URL lives here, inside a Suspense boundary. */
async function ProductBody({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  return (
    <>
      <ProductDetail product={product} />
      <ProductDescription product={product} />
      <RelatedProducts product={product} />
    </>
  );
}

function ProductSkeleton() {
  return (
    <div aria-hidden="true" className="grid animate-pulse gap-10 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-14">
      <div className="mx-1.5 aspect-square bg-slate-100" />
      <div className="space-y-4">
        <div className="h-4 w-2/3 rounded bg-slate-100" />
        <div className="h-6 w-3/4 rounded bg-slate-100" />
        <div className="h-8 w-24 rounded bg-slate-100" />
        <div className="h-10 w-48 rounded bg-slate-100" />
      </div>
    </div>
  );
}

export default function ProductPage({ params }: PageProps<"/product/[slug]">) {
  return (
    <>
      <Header variant="solid" />
      <main className="mx-auto max-w-7xl px-2 py-8 sm:px-6 sm:py-16">
        <Suspense fallback={<ProductSkeleton />}>
          <ProductBody params={params} />
        </Suspense>
      </main>
      <FloatingCartButton />
    </>
  );
}
