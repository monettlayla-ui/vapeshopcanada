"use client";

import { useRouter } from "next/navigation";
import { buildShopUrl } from "@/lib/shop-url";

const options = [
  { value: "default", label: "Default sorting" },
  { value: "popularity", label: "Sort by popularity" },
  { value: "rating", label: "Sort by average rating" },
  { value: "date", label: "Sort by latest" },
  { value: "price", label: "Sort by price: low to high" },
  { value: "price-desc", label: "Sort by price: high to low" },
];

type SortSelectProps = { value: string; category?: string; search?: string };

export function SortSelect({ value, category, search }: SortSelectProps) {
  const router = useRouter();

  return (
    <select
      aria-label="Shop order"
      value={value}
      onChange={(e) => router.push(buildShopUrl({ category, s: search, orderby: e.target.value }))}
      className="h-10 cursor-pointer bg-transparent pr-2 text-[15px] text-slate-700 outline-none"
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );
}
