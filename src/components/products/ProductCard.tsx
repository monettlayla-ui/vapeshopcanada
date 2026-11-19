import Image from "next/image";
import Link from "next/link";
import { AddToCartButton, QuickAddButton } from "@/components/cart/AddToCartButton";
import {
  formatPrice,
  productHref,
  productImageUrl,
  toCartItem,
  type Product,
} from "@/lib/products";

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  const image = productImageUrl(product);
  const onSale = product.on_sale && product.sale_price !== null;
  const category = product.categories[0]?.name;
  const href = productHref(product.id);
  const cartItem = toCartItem(product);

  return (
    <article className="group flex flex-col">
      <div className="relative">
        <Link
          href={href}
          prefetch={false}
          className="relative block aspect-square overflow-hidden bg-white"
        >
          {image && (
            <Image
              src={image}
              alt={product.title}
              fill
              priority={priority}
              sizes="(min-width: 1024px) 25vw, 50vw"
              className="object-cover"
            />
          )}
          {onSale && (
            <span className="absolute top-2 left-2 rounded-full bg-white px-2.5 py-1 text-xs sm:top-4 sm:left-4 sm:px-3 sm:py-1.5 sm:text-sm font-semibold text-slate-700 shadow">
              Sale!
            </span>
          )}
        </Link>
        <QuickAddButton item={cartItem} inStock={product.in_stock} />
      </div>

      <div className="px-1 pt-3 sm:pt-5">
        {category && (
          <p className="text-xs text-slate-500 sm:text-sm">{category}</p>
        )}
        <h3 className="mt-1.5 text-sm leading-snug sm:mt-2 sm:text-base font-medium text-slate-800">
          <Link href={href} prefetch={false} className="hover:text-blue-600">
            {product.title}
          </Link>
        </h3>

        <p className="mt-2 text-sm sm:mt-3 sm:text-[15px]">
          {onSale ? (
            <>
              <del className="text-slate-400">
                {formatPrice(product.price ?? 0)}
              </del>{" "}
              <ins className="font-bold text-slate-800 no-underline">
                {formatPrice(product.sale_price!)}
              </ins>
            </>
          ) : (
            <span className="font-bold text-slate-800">
              {formatPrice(product.price ?? 0)}
            </span>
          )}
        </p>

        <AddToCartButton item={cartItem} inStock={product.in_stock} />
      </div>
    </article>
  );
}
