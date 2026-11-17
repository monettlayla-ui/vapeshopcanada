import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Header } from "@/components/layout/Header";
import { PageHero } from "@/components/hero/PageHero";
import { ContactSection } from "@/components/sections/ContactSection";
import { FloatingCartButton } from "@/components/ui/FloatingCartButton";
import { contactHero } from "@/config/site";

export const metadata: Metadata = pageMetadata({
  title: 'Contact Us',
  description: 'Contact Vape Shop Canada for help with orders, products and delivery. Call +1 (782) 910-0204 or send us a message.',
  path: '/contact',
});

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
