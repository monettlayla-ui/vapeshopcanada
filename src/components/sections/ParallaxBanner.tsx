import Image from "next/image";
import { promoBanner as c } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

/**
 * Parallax reveal banner.
 * The image is `fixed` to the viewport, but the section clips it (clip-path),
 * so it only shows through this section's window. As you scroll, the content
 * above and below slides over a stationary image.
 */
export function ParallaxBanner() {
  return (
    <section className="relative h-[85vh] min-h-[480px] [clip-path:inset(0)]">
      <div className="fixed inset-0 h-screen w-full">
        <Image
          src={c.image}
          alt={c.imageAlt}
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>

      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-6 sm:px-12">
        <p className="text-base font-bold text-white [text-shadow:0_1px_6px_rgba(0,0,0,0.35)]">
          {c.eyebrow}
        </p>
        <h2 className="mt-8 max-w-[480px] text-2xl leading-snug font-semibold text-[#e00000] [text-shadow:0_1px_6px_rgba(0,0,0,0.35)] sm:text-3xl">
          {c.title}
        </h2>
        <ButtonLink href={c.cta.href} className="mt-16 self-center !px-7 !py-3 text-[15px] font-medium">
          {c.cta.label}
        </ButtonLink>
      </div>
    </section>
  );
}
