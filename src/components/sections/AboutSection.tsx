import Image from "next/image";
import { aboutContent as c } from "@/config/site";

/** "About Us" intro, then the mission text beside an image. */
export function AboutSection() {
  return (
    <section className="bg-white px-4 py-12 sm:py-16">
      <div className="mx-auto max-w-7xl">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl sm:font-medium">{c.title}</h2>
          <p className="mt-6 text-base leading-relaxed text-slate-700">{c.intro}</p>
        </div>

        <div className="mt-10 grid sm:mt-16 items-center gap-10 md:grid-cols-2 md:gap-8">
          <Image
            src={c.mission.image}
            alt={c.mission.imageAlt}
            width={540}
            height={540}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="mx-auto h-auto w-full max-w-[540px]"
          />

          <div className="text-center">
            <h2 className="text-2xl font-semibold text-slate-800 sm:text-3xl sm:font-medium">{c.mission.title}</h2>
            <div className="mx-auto mt-6 max-w-xl space-y-5 text-base leading-relaxed text-slate-700">
              {c.mission.paragraphs.map((text, i) => (
                <p key={i}>{text}</p>
              ))}
            </div>
          </div>
        </div>

        <p className="mt-12 text-center text-base leading-relaxed text-slate-700">{c.closing}</p>
      </div>
    </section>
  );
}
