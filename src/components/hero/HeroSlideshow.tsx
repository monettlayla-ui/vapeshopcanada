"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type Slide = { src: string; alt: string };

type HeroSlideshowProps = {
  slides: Slide[];
  durationMs: number;
  fadeMs: number;
};

/** Full-bleed background that cross-fades between images. */
export function HeroSlideshow({ slides, durationMs, fadeMs }: HeroSlideshowProps) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), durationMs);
    return () => clearInterval(id);
  }, [slides.length, durationMs]);

  return (
    <div className="absolute inset-0 -z-10 bg-black">
      {slides.map((slide, i) => (
        <Image
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          fill
          sizes="100vw"
          priority={i === 0}
          className="object-cover"
          style={{
            opacity: i === active ? 1 : 0,
            transition: `opacity ${fadeMs}ms ease-in-out`,
          }}
        />
      ))}
      {/* Darken for text legibility */}
      <div className="absolute inset-0 bg-black/45" />
    </div>
  );
}
