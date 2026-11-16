export type ShopParams = {
  category?: string;
  s?: string;
  orderby?: string;
  page?: number;
};

/** Build a /shop URL, leaving out empty and default values. */
export function buildShopUrl({ category, s, orderby, page }: ShopParams): string {
  const q = new URLSearchParams();
  if (category) q.set("category", category);
  if (s) q.set("s", s);
  if (orderby && orderby !== "default") q.set("orderby", orderby);
  if (page && page > 1) q.set("page", String(page));
  const qs = q.toString();
  return qs ? `/shop?${qs}` : "/shop";
}
