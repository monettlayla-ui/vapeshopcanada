import { features } from "@/config/site";
import { FeatureIcon } from "@/components/ui/FeatureIcon";

/** Three trust points: icon on the left, centred heading and text. */
export function Features() {
  return (
    <section className="bg-white px-4 py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3 md:gap-8">
        {features.map((f) => (
          <div key={f.title} className="flex items-start gap-4">
            <FeatureIcon name={f.icon} />
            <div className="flex-1 text-center">
              <h3 className="text-lg font-medium text-slate-800">{f.title}</h3>
              <p className="mx-auto mt-1 max-w-xs text-[15px] leading-8 text-slate-700">{f.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
