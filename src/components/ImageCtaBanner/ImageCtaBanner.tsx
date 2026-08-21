import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import styles from "./ImageCtaBanner.module.css";

interface Cta {
  label: string;
  href: string;
}

interface ImageCtaBannerProps {
  backgroundImage: string;
  title: ReactNode;
  primaryCta: Cta;
  secondaryCta?: Cta;
}

export function ImageCtaBanner({
  backgroundImage,
  title,
  primaryCta,
  secondaryCta,
}: ImageCtaBannerProps) {
  return (
    <section className={styles.section}>
      <Image
        src={backgroundImage}
        alt=""
        fill
        className={styles.bg}
        sizes="100vw"
      />
      <div className={styles.overlay} />
      <div className={styles.content}>
        <div className={styles.inner}>
          <h2 className={styles.title}>{title}</h2>
          <div className={styles.ctaRow}>
            <Link href={primaryCta.href} className={styles.ctaPrimary}>
              {primaryCta.label}
              <ArrowForwardIcon sx={{ fontSize: 14 }} />
            </Link>
            {secondaryCta && (
              <Link href={secondaryCta.href} className={styles.ctaSecondary}>
                {secondaryCta.label}
                <ArrowForwardIcon sx={{ fontSize: 14 }} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
