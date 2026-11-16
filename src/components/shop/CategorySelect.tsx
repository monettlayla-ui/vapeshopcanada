"use client";

import { useRouter } from "next/navigation";
import { buildShopUrl } from "@/lib/shop-url";

type Props = {
  categories: { slug: string; name: string; count: number }[];
  value: string;
};

/** Dropdown that replaces the long category list on small screens. */
export function CategorySelect({ categories, value }: Props) {
  const router = useRouter();

  return (
    <select
      aria-label="Product category"
      value={value}
      onChange={(e) => router.push(buildShopUrl({ category: e.target.value || undefined }))}
      className="h-11 w-full cursor-pointer rounded-sm border border-slate-300 bg-white px-3 text-[15px] text-slate-800 outline-none focus:border-blue-600"
    >
      <option value="">All categories</option>
      {categories.map((c) => (
        <option key={c.slug} value={c.slug}>
          {c.name} ({c.count})
        </option>
      ))}
    </select>
  );
}
