import { aboutContent } from "@/config/site";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

const c = aboutContent.why;

/** "Why choose us" blurb plus three icon columns. */
export function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4 md:gap-8">
        <div>
          <h2 className="text-base font-semibold text-slate-800">{c.title}</h2>
          <div className="mt-6 w-14 border-t border-slate-400" />
          <p className="mt-8 text-center text-[15px] leading-[1.75] text-slate-700 sm:text-base">{c.text}</p>
        </div>

        {c.items.map((item, i) => (
          <div key={item.title} className="flex items-start gap-3">
            <FeatureIcon name={item.icon} dark={i === 0} />
            <div>
              <h3 className="text-xl leading-8 font-medium text-slate-800">{item.title}</h3>
              <p className="text-[15px] leading-[1.75] text-slate-700 sm:text-base">{item.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
