import type { MetadataRoute } from "next";
import { getAllProductSlugs, getCategoryList } from "@/lib/products";
import { absoluteUrl } from "@/lib/seo";
import { buildShopUrl } from "@/lib/shop-url";

type Entry = MetadataRoute.Sitemap[number];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, categories] = await Promise.all([getAllProductSlugs(), getCategoryList()]);
  const now = new Date();

  const pages: Entry[] = [
    { url: absoluteUrl("/"), changeFrequency: "daily", priority: 1 },
    { url: absoluteUrl("/shop"), changeFrequency: "daily", priority: 0.9 },
    { url: absoluteUrl("/about"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/faq"), changeFrequency: "monthly", priority: 0.5 },
    { url: absoluteUrl("/refund-policy"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms-conditions"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/privacy-policy"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const categoryPages: Entry[] = categories
    .filter((c) => c.count > 0)
    .map((c) => ({
      url: absoluteUrl(buildShopUrl({ category: c.slug })),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  const productPages: Entry[] = slugs.map((slug) => ({
    url: absoluteUrl(`/product/${slug}`),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...pages, ...categoryPages, ...productPages].map((e) => ({ ...e, lastModified: now }));
}
