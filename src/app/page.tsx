"use client";

import { FeatureCards } from "@/components/FeatureCards/FeatureCards";
import { Hero } from "@/components/Hero/Hero";
import { ProblemSolve } from "@/components/ProblemSolve/ProblemSolve";
import { FeaturedProducts } from "@/components/FeaturedProducts/FeaturedProducts";
import { HomeCtaBanner } from "@/components/HomeCtaBanner/HomeCtaBanner";
import { WorkSpeaks } from "@/components/WorkSpeaks/WorkSpeaks";
import { HowWeWork } from "@/components/HowWeWork/HowWeWork";
import { IndustriesGrid } from "@/components/IndustriesGrid/IndustriesGrid";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { VideoSection } from "@/components/VideoSection/VideoSection";
import { useTranslation } from "@/hooks/useTranslation";
import { imgSrc } from "@/lib/imgSrc";

export default function HomePage() {
  const { t } = useTranslation();
  const page = t.pages.home;

  return (
    <>
      <Hero
        backgroundImage={imgSrc("/images/home-bg.jpg")}
        title={page.hero.title}
        subtitle={page.hero.subtitle}
        primaryCta={{ label: page.hero.ctaPrimary, href: "/contact-us" }}
        secondaryCta={{ label: page.hero.ctaSecondary, href: "/case-studies" }}
      />
      <FeatureCards />
      <ProblemSolve />
      <StatsBar />
      <VideoSection />
      <HowWeWork />
      <IndustriesGrid />
      <FeaturedProducts />
      <WorkSpeaks />
      <HomeCtaBanner />
    </>
  );
}
