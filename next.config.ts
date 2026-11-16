import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  // Product images never change once scraped: let browsers and the CDN keep them for a year.
  images: { minimumCacheTTL: 60 * 60 * 24 * 365 },
  async headers() {
    const immutable = [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }];
    return [
      { source: "/images/:path*", headers: immutable },
      { source: "/vapesshopaustralia/categories/:path*/images/:file*", headers: immutable },
    ];
  },
  // The shop page reads the product JSON files at request time, so ship them with the server
  // bundle on Vercel (the images are served from the CDN and are not included).
  outputFileTracingIncludes: {
    "/*": ["./public/vapesshopaustralia/**/*.json"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
