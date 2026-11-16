import Image from "next/image";
import { categoryBanners } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";

/** Two side-by-side promo banners that link to shop categories. */
export function CategoryBanners() {
  return (
    <section className="bg-white px-4 pb-8 sm:pb-10">
      <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">
        {categoryBanners.map((b) => (
          <div key={b.title} className="relative isolate flex min-h-[320px] items-center overflow-hidden text-white md:min-h-[430px]">
            <Image
              src={b.image}
              alt={b.imageAlt}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="-z-10 object-cover"
            />
            <div className="absolute inset-0 -z-10 bg-black/15" />

            <div className="max-w-[260px] pl-8 sm:pl-[13%]">
              <h2 className="text-2xl font-medium sm:text-3xl">{b.title}</h2>
              <p className="mt-4 text-[15px] leading-relaxed">{b.text}</p>
              <ButtonLink href={b.cta.href} className="mt-12 !px-6 !py-3 text-[15px] font-medium">
                {b.cta.label}
              </ButtonLink>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
