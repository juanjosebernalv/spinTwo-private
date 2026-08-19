import Image from "next/image";
import Link from "next/link";

interface HeroCta {
  label: string;
  href: string;
}

export interface HeroProps {
  title: string;
  subtitle: string;
  primaryCta?: HeroCta;
  secondaryCta?: HeroCta;
  /**
   * Path to the background image (relative to /public).
   * When provided the hero renders in full-screen mode with a dark overlay.
   */
  backgroundImage?: string;
  /**
   * Path to a background video (relative to /public).
   * Takes precedence over backgroundImage when both are supplied.
   */
  backgroundVideo?: string;
  eyebrow?: string;
}

export function Hero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundVideo,
  eyebrow,
}: HeroProps) {
  if (backgroundVideo) {
    return <VideoHero {...{ title, subtitle, primaryCta, secondaryCta, backgroundVideo }} />;
  }

  if (backgroundImage) {
    return <ImageHero {...{ title, subtitle, primaryCta, secondaryCta, backgroundImage }} />;
  }

  return <SimpleHero {...{ title, subtitle, primaryCta, secondaryCta, eyebrow }} />;
}

/* ------------------------------------------------------------------ */
/* Full-screen hero with background video + dark overlay               */
/* ------------------------------------------------------------------ */

type ContentProps = Pick<HeroProps, "primaryCta" | "secondaryCta"> & { title: string; subtitle: string };

function HeroContent({ title, subtitle, primaryCta, secondaryCta }: ContentProps) {
  return (
    <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-24">
      <div className="w-full sm:max-w-[52%]">
        <h1 className="text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        <p className="mt-6 text-base leading-relaxed text-white/80 sm:text-lg">
          {subtitle}
        </p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-col gap-4 sm:w-fit">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="inline-flex w-full items-center justify-center bg-brand-red px-6 py-4 text-sm font-bold text-white uppercase transition-colors hover:bg-brand-red-dark"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="inline-flex w-full items-center justify-center border border-white px-6 py-4 text-sm font-bold tracking-widest text-white uppercase transition-colors hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function VideoHero({ title, subtitle, primaryCta, secondaryCta, backgroundVideo }: ContentProps & { backgroundVideo: string }) {
  return (
    <section className="relative flex items-center overflow-hidden sm:min-h-[90vh]">
      {/* Background video — autoplay, muted, loop, no controls */}
      <video
        src={backgroundVideo}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        className="absolute inset-0 h-full w-full object-cover object-center pointer-events-none"
        aria-hidden="true"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <HeroContent {...{ title, subtitle, primaryCta, secondaryCta }} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Full-screen hero with background image + dark overlay               */
/* ------------------------------------------------------------------ */

function ImageHero({ title, subtitle, primaryCta, secondaryCta, backgroundImage }: ContentProps & { backgroundImage: string }) {
  return (
    <section className="relative flex items-center overflow-hidden sm:min-h-[90vh]">
      {/* Background image */}
      <Image
        src={backgroundImage}
        alt=""
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70" />

      <HeroContent {...{ title, subtitle, primaryCta, secondaryCta }} />
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Simple hero (no background image) — used as fallback                */
/* ------------------------------------------------------------------ */

function SimpleHero({ title, subtitle, primaryCta, secondaryCta, eyebrow }: Omit<HeroProps, "backgroundImage">) {
  return (
    <section className="border-b border-black/5 bg-linear-to-b from-black/[0.02] to-transparent dark:border-white/10 dark:from-white/[0.03]">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-6 px-6 py-20 sm:py-28">
        {eyebrow && (
          <p className="text-sm font-semibold uppercase text-current/70">
            {eyebrow}
          </p>
        )}
        <h1 className="text-balance text-4xl font-bold sm:text-5xl">
          {title}
        </h1>
        <p className="max-w-2xl text-lg text-current/70">{subtitle}</p>
        {(primaryCta || secondaryCta) && (
          <div className="mt-2 flex flex-wrap gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className="rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className="rounded-full border border-black/15 px-6 py-3 text-sm font-semibold text-current transition-colors hover:bg-black/5 dark:border-white/20 dark:hover:bg-white/10"
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
