import type { Product } from "@/lib/products";
import { ProductCard } from "./ProductCard";

type ProductGridProps = {
  products: Product[];
  /** home: 4 across from large screens. shop: narrower area next to the sidebar. */
  columns?: "home" | "shop";
  /** How many of the first cards are above the fold and should load eagerly. */
  priorityCount?: number;
};

const columnClasses = {
  home: "sm:grid-cols-2 lg:grid-cols-4",
  shop: "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
};

export function ProductGrid({ products, columns = "home", priorityCount = 0 }: ProductGridProps) {
  return (
    <div className={`grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-10 ${columnClasses[columns]}`}>
      {products.map((p, i) => (
        <ProductCard key={p.id} product={p} priority={i < priorityCount} />
      ))}
    </div>
  );
}
