import Image from "next/image";

type PageHeroProps = {
  title: string;
  image: string;
  imageAlt: string;
  /** Small line above the title. */
  eyebrow?: string;
  /** Dark gradient behind the header; turn off for light images. */
  shade?: boolean;
};

/** Inner-page hero: full-width background image with the page title on the left. */
export function PageHero({ title, image, imageAlt, eyebrow, shade = true }: PageHeroProps) {
  return (
    <section className="relative isolate flex h-[300px] sm:h-[70vh] sm:min-h-[460px] items-center overflow-hidden text-white">
      <Image src={image} alt={imageAlt} fill priority sizes="100vw" className="-z-10 object-cover" />
      {shade && <div className="absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/40 to-transparent" />}

      <div className="mx-auto w-full max-w-7xl px-6 pt-16 sm:pt-24">
        {eyebrow && <p className="text-base font-bold">{eyebrow}</p>}
        <h1
          className={`text-3xl font-semibold sm:text-5xl ${eyebrow ? "mt-3" : ""} ${
            shade ? "[text-shadow:0_1px_8px_rgba(0,0,0,0.3)]" : ""
          }`}
        >
          {title}
        </h1>
      </div>
    </section>
  );
}
