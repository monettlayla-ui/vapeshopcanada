import Image from "next/image";
import Link from "next/link";
import { formatPrice, productImageUrl, toCartItem, type Product } from "@/lib/products";
import { AddToCart } from "./AddToCart";

export function ProductDetail({ product }: { product: Product }) {
  const image = productImageUrl(product);
  const onSale = product.on_sale && product.sale_price !== null;
  const category = product.categories[0];
  const categories = product.categories;
  // "- Lowest price. - Secure payments." is a list on the live site.
  const bullets = (product.short_description ?? "")
    .split(/(?:^|\s)-\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const isList = (product.short_description ?? "").trim().startsWith("-") && bullets.length > 1;

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,480px)_1fr] lg:gap-14">
      {/* Gallery */}
      <div className="relative mx-1.5 aspect-square overflow-hidden bg-white shadow-[0_10px_40px_rgba(0,0,0,0.15)]">
        {image && (
          <Image
            src={image}
            alt={product.images[0]?.alt || product.title}
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        )}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="absolute top-5 right-5 h-5 w-5 text-slate-700" aria-hidden>
          <circle cx="10.5" cy="10.5" r="6" />
          <path d="m15 15 5 5" strokeLinecap="round" />
        </svg>
        {onSale && (
          <span className="absolute top-5 left-5 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-slate-700 shadow">
            Sale!
          </span>
        )}
      </div>

      {/* Summary */}
      <div>
        <nav aria-label="Breadcrumb" className="text-sm text-slate-500">
          <Link href="/" className="hover:text-slate-800">Home</Link>
          {category && (
            <>
              {" / "}
              <Link href={`/shop?category=${category.slug}`} className="hover:text-slate-800">
                {category.name}
              </Link>
            </>
          )}
          {" / "}
          <span>{product.title}</span>
        </nav>

        {categories.length > 0 && (
          <p className="mt-4 text-sm text-blue-600">
            {categories.map((c, i) => (
              <span key={c.slug}>
                <Link href={`/shop?category=${c.slug}`} className="hover:text-blue-800">
                  {c.name}
                </Link>
                {i < categories.length - 1 && ", "}
              </span>
            ))}
          </p>
        )}

        <h1 className="mt-3 text-xl leading-snug font-semibold text-slate-800">
          {product.title}
        </h1>

        <p className="mt-3 text-2xl">
          {onSale ? (
            <>
              <del className="text-slate-400">{formatPrice(product.price ?? 0)}</del>{" "}
              <ins className="font-bold text-slate-800 no-underline">{formatPrice(product.sale_price!)}</ins>
            </>
          ) : (
            <span className="font-bold text-slate-800">{formatPrice(product.price ?? 0)}</span>
          )}
        </p>

        {product.short_description &&
          (isList ? (
            <ul className="mt-5 list-disc space-y-1 pl-9 text-[15px] text-slate-700 marker:text-slate-800 sm:pl-6 sm:text-sm">
              {bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-5 text-sm text-slate-600">{product.short_description}</p>
          ))}

        {!product.in_stock && <p className="mt-4 font-semibold text-red-600">Out of stock</p>}

        <div className="mt-8">
          <AddToCart item={toCartItem(product)} inStock={product.in_stock} />
        </div>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 border-t border-slate-200 pt-4 text-sm text-slate-700">
          {categories.length > 0 && (
            <p>
              <strong>{categories.length > 1 ? "Categories:" : "Category:"}</strong>{" "}
              {categories.map((c, i) => (
                <span key={c.slug}>
                  <Link href={`/shop?category=${c.slug}`} className="text-blue-600 hover:underline">
                    {c.name}
                  </Link>
                  {i < categories.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
          {product.tags.length > 0 && (
            <p>
              <strong>Tags:</strong>{" "}
              {product.tags.map((t, i) => (
                <span key={t.slug}>
                  <Link href={`/shop?tag=${t.slug}`} className="text-blue-600 hover:underline">
                    {t.name}
                  </Link>
                  {i < product.tags.length - 1 && ", "}
                </span>
              ))}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
