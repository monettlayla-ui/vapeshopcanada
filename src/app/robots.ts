import type { MetadataRoute } from "next";
import { absoluteUrl, seoConfig } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private or useless-to-search pages: the cart, checkout, order endpoint and internal search results.
        disallow: ["/api/", "/cart", "/checkout", "/*?s=", "/*&s="],
      },
    ],
    sitemap: absoluteUrl("/sitemap.xml"),
    host: seoConfig.url,
  };
}
