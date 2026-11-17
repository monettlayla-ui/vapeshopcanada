// Sends every URL in the live sitemap to Bing, Yandex and other IndexNow search engines.
// Usage: npm run indexnow -- https://www.vapesshopcanada.com
const KEY = "367f9710afb4fed83c0c875e2484da18";

const site = (process.argv[2] || "https://www.vapesshopcanada.com").replace(/\/+$/, "");
const host = new URL(site).host;
const keyLocation = `${site}/${KEY}.txt`;

const sitemapRes = await fetch(`${site}/sitemap.xml`);
if (!sitemapRes.ok) {
  console.error(`Could not read ${site}/sitemap.xml (HTTP ${sitemapRes.status}). Is the site live?`);
  process.exit(1);
}
const xml = await sitemapRes.text();
const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(/&amp;/g, "&"));
console.log(`Found ${urls.length} URLs in the sitemap.`);
if (urls.length === 0) process.exit(1);

// Check the key file is reachable first, otherwise every submission is rejected.
const keyRes = await fetch(keyLocation);
if (!keyRes.ok || (await keyRes.text()).trim() !== KEY) {
  console.error(`Key file not reachable at ${keyLocation}. Deploy the site first.`);
  process.exit(1);
}

// IndexNow accepts up to 10,000 URLs per request.
for (let i = 0; i < urls.length; i += 10000) {
  const batch = urls.slice(i, i + 10000);
  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList: batch }),
  });
  console.log(`Submitted ${batch.length} URLs: HTTP ${res.status} ${res.statusText}`);
  if (res.status >= 400) console.error(await res.text());
}
