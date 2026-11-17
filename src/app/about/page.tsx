import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/hero/PageHero";
import { AboutSection } from "@/components/sections/AboutSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { aboutHero } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: 'About Us',
  description: 'Learn about Vape Shop Canada: our mission to deliver authentic disposable vapes, vape kits, pods and e-liquids to customers across Canada with fast, discreet delivery.',
  path: '/about',
});

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
