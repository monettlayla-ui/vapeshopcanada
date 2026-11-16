import Link from "next/link";
import { getCategoryList } from "@/lib/products";
import { buildShopUrl } from "@/lib/shop-url";

type ShopSidebarProps = { activeCategory?: string; search?: string };

/** Left column: product search and the category list with counts. */
export async function ShopSidebar({ activeCategory, search }: ShopSidebarProps) {
  const categories = await getCategoryList();

  return (
    <aside className="hidden lg:block lg:border-r lg:border-slate-300 lg:pr-10">
      <form action="/shop" method="get" role="search">
        <label htmlFor="shop-search" className="block text-sm font-semibold text-slate-800">
          Search
        </label>
        <div className="mt-3 flex gap-3">
          <input
            id="shop-search"
            type="search"
            name="s"
            defaultValue={search}
            placeholder="Search products..."
            className="h-11 min-w-0 flex-1 border border-slate-300 px-3 text-[15px] text-slate-800 outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            className="h-11 shrink-0 rounded-sm bg-blue-600 px-5 text-[15px] font-semibold text-white transition hover:bg-blue-700"
          >
            Search
          </button>
        </div>
      </form>

      <nav aria-label="Product categories" className="mt-12">
        <ul className="space-y-3 pl-3 text-[15px]">
          {categories.map((c) => (
            <li key={c.slug}>
              <Link
                href={buildShopUrl({ category: c.slug })}
                className={`hover:underline ${activeCategory === c.slug ? "font-bold text-blue-800" : "text-blue-600"}`}
              >
                {c.name}
              </Link>{" "}
              <span className="text-slate-700">({c.count})</span>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
