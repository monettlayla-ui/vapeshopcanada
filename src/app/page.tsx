import { Header } from "@/components/layout/Header";
import { Hero } from "@/components/hero/Hero";
import { TextSection } from "@/components/sections/TextSection";
import { ParallaxBanner } from "@/components/sections/ParallaxBanner";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { CategoryBanners } from "@/components/sections/CategoryBanners";
import { FeaturedProducts } from "@/components/sections/FeaturedProducts";
import { extraSections, alfakherContent, airmezBimoContent, airmezBimoProductRows, alfakherProductRows, eLiquidsContent, gunnpodsContent, gunnpodsProductRows, homeProductRows, hqdContent, hqdProductRows, briskBarContent, briskBarProductRows, introContent, mrFogContent, mrFogProductRows, smokelessContent, smokelessProductRows, vaporassoContent, vaporassoProductRows } from "@/config/site";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <TextSection {...introContent} />
        {homeProductRows.map((row, i) => (
          <FeaturedProducts key={row.slugs[0]} {...row} priorityCount={i < 2 ? 4 : 0} />
        ))}
        <CategoryBanners />
        <TextSection {...eLiquidsContent} compact />
        <ParallaxBanner />
        <TextSection {...briskBarContent} tight />
        {briskBarProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection {...smokelessContent} tight />
        {smokelessProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection title={extraSections.pouches.title} paragraphs={extraSections.pouches.paragraphs} tight />
        {extraSections.pouches.rows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <Features />
        <TextSection {...alfakherContent} />
        {alfakherProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection {...hqdContent} />
        {hqdProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection title={extraSections.geekBar.title} paragraphs={extraSections.geekBar.paragraphs} tight />
        {extraSections.geekBar.rows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <Faq />
        <TextSection {...gunnpodsContent} />
        {gunnpodsProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection {...vaporassoContent} />
        {vaporassoProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection {...mrFogContent} />
        {mrFogProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection title={extraSections.eLiquids.title} paragraphs={extraSections.eLiquids.paragraphs} tight />
        {extraSections.eLiquids.rows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection {...airmezBimoContent} />
        {airmezBimoProductRows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
        <TextSection title={extraSections.glass.title} paragraphs={extraSections.glass.paragraphs} tight />
        {extraSections.glass.rows.map((row) => (
          <FeaturedProducts key={row.slugs[0]} {...row} />
        ))}
      </main>
      <FloatingCartButton />
    </>
  );
}
