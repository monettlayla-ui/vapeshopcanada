import type { Metadata } from "next";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/hero/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { contactHero } from "@/config/site";

export const metadata: Metadata = { title: "Contact us - Vape Shop Canada" };

export default function ContactPage() {
  return (
    <>
      <Header variant="overlay-dark" />
      <main>
        <PageHero {...contactHero} shade={false} />
        <ContactSection />
      </main>
      <FloatingCartButton />
    </>
  );
}
