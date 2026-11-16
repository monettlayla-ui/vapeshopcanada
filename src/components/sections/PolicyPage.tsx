import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

/** Reads a scraped page's text and swaps the old country name for Canada. */
async function loadPolicy(folder: string) {
  "use cache";
  cacheLife("max");
  const file = path.join(process.cwd(), "public", "vapesshopaustralia", "pages", folder, "page.json");
  const data = JSON.parse(await readFile(file, "utf8")) as { title: string; text: string };
  const blocks = data.text
    .replace(/Australian dollars/g, "Canadian dollars")
    .replace(/Australia/g, "Canada")
    .replace(/Australian/g, "Canadian")
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean)
    // A short block with no full stop is a heading.
    .map((text) => ({ text, heading: text.length < 60 && !text.endsWith(".") }));
  return { title: data.title, blocks };
}

export async function PolicyPage({ folder, bigFirstHeading = true }: { folder: string; bigFirstHeading?: boolean }) {
  const { title, blocks } = await loadPolicy(folder);
  return (
    <section className="bg-white pb-16">
      <h1 className="px-4 pt-2 text-[2rem] font-medium leading-tight text-slate-800 sm:px-0">{title}</h1>
      <div className="mx-auto max-w-[1300px] px-4 text-center">
        {blocks.map((b, i) =>
          b.heading ? (
            i === 0 && bigFirstHeading ? (
              <h2 key={i} className="mt-8 text-[2rem] font-medium text-slate-800">{b.text}</h2>
            ) : (
              <h3 key={i} className="mt-8 text-2xl font-medium text-slate-800">{b.text}</h3>
            )
          ) : (
            <p key={i} className="mt-5 text-[15px] leading-relaxed text-slate-700">{b.text}</p>
          ),
        )}
      </div>
    </section>
  );
}
