import { heroContent as c } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { HeroSlideshow } from "./HeroSlideshow";

export function Hero() {
  return (
    <section className="relative isolate flex min-h-svh items-center overflow-hidden text-white">
      <HeroSlideshow
        slides={c.slides}
        durationMs={c.slideDurationMs}
        fadeMs={c.fadeDurationMs}
      />

      <div className="mx-auto w-full max-w-7xl px-6 pt-32 pb-16">
        <div className="max-w-xl text-center">
          <p className="text-base font-bold sm:text-lg">{c.eyebrow}</p>

          <h1 className="mt-8 leading-[1.1]">
            <span className="block text-5xl font-medium sm:text-7xl">{c.titleTop}</span>
            <span className="mt-2 block text-5xl font-medium uppercase sm:text-7xl">
              {c.titleBottom}
            </span>
          </h1>

          <p className="mt-8 text-base font-bold sm:text-xl">{c.subtitle}</p>

          <ButtonLink href={c.cta.href} className="mt-10">
            {c.cta.label}
          </ButtonLink>
        </div>
      </div>
    </section>
  );
}
