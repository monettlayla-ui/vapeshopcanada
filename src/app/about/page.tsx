import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/hero/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { aboutHero } from "@/config/site";

export const metadata: Metadata = { title: "About us - Vape Shop Canada" };

export default function AboutPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero {...aboutHero} />
        <AboutSection />
        <WhyChooseUs />
      </main>
      <FloatingCartButton />
    </>
  );
}
