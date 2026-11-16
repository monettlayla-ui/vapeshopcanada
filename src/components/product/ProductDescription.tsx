import type { Product } from "@/lib/products";

/** "Description" tab: renders the product description exactly as scraped. */
export function ProductDescription({ product }: { product: Product }) {
  if (!product.description_html) return null;

  return (
    <section className="mt-16">
      <div className="border-t-[3px] border-blue-600 sm:border-t sm:border-slate-200">
        <h2 className="inline-block pt-3 sm:-mt-px sm:border-t-2 sm:border-blue-600 pr-6 text-base font-bold text-slate-700">
          Description
        </h2>
      </div>
      {/* Content is our own scraped product data, not user input. */}
      <div
        className="product-description mt-6 text-base leading-relaxed text-slate-700"
        dangerouslySetInnerHTML={{ __html: product.description_html }}
      />
    </section>
  );
}
