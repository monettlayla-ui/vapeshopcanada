import { getRelatedProducts, type Product } from "@/lib/products";
import { ProductGrid } from "@/components/products/ProductGrid";

export async function RelatedProducts({ product }: { product: Product }) {
  const related = await getRelatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="mb-8 text-xl font-medium text-slate-800">Related products</h2>
      <ProductGrid products={related} />
    </section>
  );
}
