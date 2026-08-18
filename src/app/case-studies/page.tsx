"use client";

import { CTA } from "@/components/CTA/CTA";
import { Hero } from "@/components/Hero/Hero";
import { ItemGrid } from "@/components/ItemGrid/ItemGrid";
import { useTranslation } from "@/hooks/useTranslation";

export default function CaseStudiesPage() {
  const { t } = useTranslation();
  const page = t.pages.caseStudies;

  return (
    <>
      <Hero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        primaryCta={{ label: page.hero.ctaPrimary, href: "#case-studies-list" }}
        secondaryCta={{ label: page.hero.ctaSecondary, href: "/contact-us" }}
      />
      <div id="case-studies-list">
        <ItemGrid title={page.list.title} items={page.list.items} />
      </div>
      <CTA
        title={page.cta.title}
        subtitle={page.cta.subtitle}
        buttonLabel={page.cta.buttonLabel}
        href="/contact-us"
      />
    </>
  );
}
