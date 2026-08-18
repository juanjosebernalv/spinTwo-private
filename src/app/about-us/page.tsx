"use client";

import { CTA } from "@/components/CTA/CTA";
import { Hero } from "@/components/Hero/Hero";
import { ItemGrid } from "@/components/ItemGrid/ItemGrid";
import { useTranslation } from "@/hooks/useTranslation";

export default function AboutUsPage() {
  const { t } = useTranslation();
  const page = t.pages.aboutUs;

  return (
    <>
      <Hero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        primaryCta={{ label: page.hero.ctaPrimary, href: "/contact-us" }}
        secondaryCta={{ label: page.hero.ctaSecondary, href: "/services" }}
      />
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="text-2xl font-semibold">{page.mission.title}</h2>
        <p className="mt-4 max-w-3xl text-current/70">{page.mission.body}</p>
      </section>
      <ItemGrid title={page.values.title} items={page.values.items} />
      <CTA
        title={page.cta.title}
        subtitle={page.cta.subtitle}
        buttonLabel={page.cta.buttonLabel}
        href="/contact-us"
      />
    </>
  );
}
