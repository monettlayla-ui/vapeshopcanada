import { readFile } from "node:fs/promises";
import path from "node:path";
import { cacheLife } from "next/cache";

async function loadFaq() {
  "use cache";
  cacheLife("max");
  const file = path.join(process.cwd(), "public", "vapesshopaustralia", "pages", "faq", "page.json");
  const data = JSON.parse(await readFile(file, "utf8")) as { title: string; text: string };
  const [heading, ...rest] = data.text
    .replace(/Australian/g, "Canadian")
    .replace(/Australia/g, "Canada")
    .split(/\n\s*\n/)
    .map((b) => b.trim())
    .filter(Boolean);
  const items = rest.map((block) => {
    const [question, ...answer] = block.split("\n");
    return { question, answer: answer.join(" ") };
  });
  return { title: data.title, heading: heading.replace(/\s\S\s(?=Vape)/, " – "), items };
}

export async function FaqPage() {
  const { title, heading, items } = await loadFaq();
  return (
    <section className="bg-white pb-16">
      <h1 className="px-4 pt-2 text-[2rem] font-medium leading-tight text-slate-800 sm:px-0">{title}</h1>
      <div className="mx-auto max-w-[1000px] px-4 text-center">
        <h2 className="mt-8 text-[2rem] font-medium text-slate-800">{heading}</h2>
        <div className="space-y-6 text-[15px] leading-relaxed text-slate-700">
          {items.map((item) => (
            <div key={item.question}>
              <h3 className="font-bold text-slate-800">{item.question}</h3>
              <p>{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
