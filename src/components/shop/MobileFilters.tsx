import { getCategoryList } from "@/lib/products";
import { CategorySelect } from "./CategorySelect";

type Props = { activeCategory?: string; search?: string };

/** Phone/tablet version of the sidebar: search box and a category dropdown across the top. */
export async function MobileFilters({ activeCategory, search }: Props) {
  const categories = await getCategoryList();

  return (
    <div className="space-y-3 rounded-md border border-slate-200 bg-slate-50 p-3 lg:hidden">
      <form action="/shop" method="get" role="search" className="flex gap-2">
        {activeCategory && <input type="hidden" name="category" value={activeCategory} />}
        <div className="relative min-w-0 flex-1">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-500" aria-hidden>
            <circle cx="10.5" cy="10.5" r="6" />
            <path d="m15 15 5 5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            name="s"
            defaultValue={search}
            aria-label="Search products"
            placeholder="Search products..."
            className="h-11 w-full rounded-sm border border-slate-300 bg-white pr-3 pl-9 text-[15px] text-slate-800 outline-none focus:border-blue-600"
          />
        </div>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-sm bg-blue-600 px-4 text-[15px] font-semibold text-white transition hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      <CategorySelect
        categories={categories.map((c) => ({ slug: c.slug, name: c.name, count: c.count }))}
        value={activeCategory ?? ""}
      />
    </div>
  );
}
