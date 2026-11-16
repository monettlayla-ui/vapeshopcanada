import { getProducts } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";

type FeaturedProductsProps = { slugs: string[]; title?: string; priorityCount?: number };

/** One row of products (with optional heading), loaded by slug from the scraped data. */
export async function FeaturedProducts({ slugs, title, priorityCount = 0 }: FeaturedProductsProps) {
  const products = await getProducts(slugs);

  return (
    <section className={`bg-white px-4 pb-12 sm:pb-16 ${title ? "pt-20 sm:pt-32" : ""}`}>
      <div className="mx-auto max-w-7xl">
        {title && (
          <h2 className="mb-8 text-center text-2xl font-medium text-slate-800 sm:text-3xl">{title}</h2>
        )}
        <ProductGrid products={products} priorityCount={priorityCount} />
      </div>
    </section>
  );
}
