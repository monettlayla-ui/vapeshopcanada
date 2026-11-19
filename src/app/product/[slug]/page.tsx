import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { Header } from "@/components/layout/Header";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { ProductDetail } from "@/components/product/ProductDetail";
import { ProductDescription } from "@/components/product/ProductDescription";
import { RelatedProducts } from "@/components/product/RelatedProducts";
import { JsonLd } from "@/components/seo/JsonLd";
import { formatPrice, getAllProductSlugs, getProduct, productImageUrl } from "@/lib/products";
import { brandFromTitle } from "@/lib/brand";
import { absoluteUrl, merchantReturnPolicy, pageMetadata, seoConfig, shippingDetails, snippet } from "@/lib/seo";

export async function generateStaticParams() {
  return (await getAllProductSlugs()).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/product/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) return { title: "Product not found", robots: { index: false, follow: false } };

  const category = product.categories[0]?.name;
  const price = product.on_sale && product.sale_price !== null ? product.sale_price : product.price;
  const image = productImageUrl(product) ?? undefined;
  const description = snippet(
    `${product.title}${category ? ` - ${category}` : ""}. ${product.short_description ?? product.description ?? ""} Buy online in Canada${
      price !== null ? ` for ${formatPrice(price)}` : ""
    } with fast delivery from Vape Shop Canada.`,
  );
  const meta = pageMetadata({ title: product.title, description, path: `/product/${product.id}`, image });
  return { ...meta, openGraph: { ...meta.openGraph, type: "website" } };
}

/** Everything that depends on the URL lives here, inside a Suspense boundary. */
async function ProductBody({ params }: { params: PageProps<"/product/[slug]">["params"] }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const price = product.on_sale && product.sale_price !== null ? product.sale_price : product.price;
  const image = productImageUrl(product);
  const category = product.categories[0];
  const brand = brandFromTitle(product.title);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        "@id": absoluteUrl(`/product/${product.id}#product`),
        name: product.title,
        description: snippet(product.description ?? product.title, 500),
        ...(image ? { image: [absoluteUrl(image)] } : {}),
        sku: product.sku ?? product.id,
        ...(category ? { category: category.name } : {}),
        ...(brand ? { brand: { "@type": "Brand", name: brand } } : {}),
        ...(price !== null
          ? {
              offers: {
                "@type": "Offer",
                url: absoluteUrl(`/product/${product.id}`),
                priceCurrency: "CAD",
                price: price.toFixed(2),
                itemCondition: "https://schema.org/NewCondition",
                availability: product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                seller: { "@type": "Organization", name: seoConfig.name },
                shippingDetails,
                hasMerchantReturnPolicy: merchantReturnPolicy,
              },
            }
          : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Shop", item: absoluteUrl("/shop") },
          ...(category
            ? [{ "@type": "ListItem", position: 3, name: category.name, item: absoluteUrl(`/shop?category=${category.slug}`) }]
            : []),
          { "@type": "ListItem", position: category ? 4 : 3, name: product.title },
        ],
      },
    ],
  };

  return (
    <>
      <JsonLd data={jsonLd} />
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
