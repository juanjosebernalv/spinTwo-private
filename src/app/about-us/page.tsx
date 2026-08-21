"use client";

import { CTA } from "@/components/CTA/CTA";
import { Hero } from "@/components/Hero/Hero";
import { FounderProfiles } from "@/components/FounderProfiles/FounderProfiles";
import { ImageCtaBanner } from "@/components/ImageCtaBanner/ImageCtaBanner";
import { MissionValues } from "@/components/MissionValues/MissionValues";
import { WhySpinTwo } from "@/components/WhySpinTwo/WhySpinTwo";
import { NameOrigin } from "@/components/NameOrigin/NameOrigin";
import { OurStory } from "@/components/OurStory/OurStory";
import { StatsBar } from "@/components/StatsBar/StatsBar";
import { TheTeam } from "@/components/TheTeam/TheTeam";
import { useTranslation } from "@/hooks/useTranslation";
import { imgSrc } from "@/lib/imgSrc";
import { HomeCtaBanner } from '@/components/HomeCtaBanner/HomeCtaBanner';

function SpinTwo({ dark }: { dark?: boolean }) {
  return (
    <span className="font-sans font-bold text-[0.85em]">
      <span className={dark ? "text-white" : "text-brand-dark"}>spin</span>
      <span className="text-brand-red">Two</span>
    </span>
  );
}

export default function AboutUsPage() {
  const { t } = useTranslation();
  const page = t.pages.aboutUs;

  return (
    <>
      <Hero
        eyebrow={<>ABOUT <SpinTwo dark /></>}
        title={
          <>
            We understand the challenge,{" "}
            <span className="text-brand-red">not just the hardware</span>
          </>
        }
        subtitle={
          <>
            <SpinTwo dark /> was founded by researchers who spent careers inside the
            world&apos;s most demanding computing environments, from CERN&apos;s
            particle physics grid to NIH genomics infrastructure. We didn&apos;t learn
            HPC from a vendor catalog. We learned it by needing it.
          </>
        }
        primaryCta={{ label: "Work With Us", href: "/contact-us" }}
        secondaryCta={{ label: "See Our Case Studies", href: "/case-studies" }}
        backgroundImage={imgSrc("/images/about-bg.png")}
      />
      <NameOrigin />
      <StatsBar />
      <OurStory />
      <ImageCtaBanner
        backgroundImage={imgSrc("/images/about-bg-2.jpg")}
        title="We know the problem because we lived it"
        primaryCta={{ label: "Work With Us", href: "/contact-us" }}
        secondaryCta={{ label: "See Our Case Studies", href: "/case-studies" }}
      />
      <TheTeam />
      <FounderProfiles />
      <MissionValues />
      <WhySpinTwo />
      {/* <CTA
        title={page.cta.title}
        subtitle={page.cta.subtitle}
        buttonLabel={page.cta.buttonLabel}
        href="/contact-us"
      /> */}
      <HomeCtaBanner />
    </>
  );
}
