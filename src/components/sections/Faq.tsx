import { faqContent as c } from "@/config/site";

/** Centered list of questions (bold) and answers. */
export function Faq() {
  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="text-3xl font-medium text-slate-800 sm:text-4xl">{c.title}</h2>

        <dl className="mt-8 space-y-8 text-[15px] text-slate-700 sm:text-base">
          {c.items.map((item) => (
            <div key={item.q}>
              <dt className="font-bold text-slate-800">{item.q}</dt>
              <dd className="mt-1">{item.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
