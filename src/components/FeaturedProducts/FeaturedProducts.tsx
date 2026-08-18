"use client";

import Link from "next/link";
import { useRef } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useReveal } from "@/hooks/useReveal";
import styles from "./FeaturedProducts.module.css";

type ProductVariant = "dark" | "light";

interface Product {
  variant: ProductVariant;
  prefix: string;
  suffix: string;
  subtitle: string;
  features: string[];
  href: string;
}

const PRODUCTS: Product[] = [
  {
    variant: "dark",
    prefix: "spin",
    suffix: "Up",
    subtitle: "Optimize Your Existing Infrastructure",
    features: [
      "Infrastructure assessment",
      "Code optimization",
      "ThinLinc for Remote Visualization",
      "Personalized engineering support",
    ],
    href: "/products/spinup",
  },
  {
    variant: "light",
    prefix: "spin",
    suffix: "Build",
    subtitle: "Design & Deploy New HPC Systems",
    features: [
      "On-prem, cloud, or hybrid deployments",
      "HPC, AI, ML, and big data stack design",
      "Procurement and installation",
      "Full engineering support",
    ],
    href: "/products/spinbuild",
  },
  {
    variant: "light",
    prefix: "spin",
    suffix: "Data",
    subtitle: "Understanding your Dataflows",
    features: [
      "Standardization & Normalization",
      "Real-Time Dashboard",
      "Scientific Methods",
      "Automation Enablement",
    ],
    href: "/products/spindata",
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2];

function ProductName({
  prefix,
  suffix,
  dark,
  size = "lg",
}: {
  prefix: string;
  suffix: string;
  dark?: boolean;
  size?: "lg" | "sm";
}) {
  return (
    <span className={size === "lg" ? styles.productNameLg : styles.productNameSm}>
      <span className={dark ? styles.productNamePrefixDark : styles.productNamePrefixLight}>
        {prefix}
      </span>
      <span className={styles.productNameSuffix}>{suffix}</span>
    </span>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [revealRef, visible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const isDark = product.variant === "dark";
  const delayClass = DELAY_CLASSES[index] ?? "";

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = glowRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  function onMouseLeave() {
    const el = glowRef.current;
    if (!el) return;
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
  }

  return (
    <div
      ref={revealRef}
      className={`${styles.cardWrapper} ${styles.reveal} ${visible ? styles.visible : ""} ${delayClass}`}
    >
      <div
        ref={glowRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={styles.glowBorder}
      >
        <div className={styles.cardInner}>
          <div className={isDark ? styles.cardHeaderDark : styles.cardHeaderLight}>
            <ProductName prefix={product.prefix} suffix={product.suffix} dark={isDark} />
            <p className={isDark ? styles.cardSubtitleDark : styles.cardSubtitleLight}>
              {product.subtitle}
            </p>
          </div>

          <div className={styles.cardBody}>
            <ul className={styles.featuresList}>
              {product.features.map((f) => (
                <li key={f} className={styles.featureItem}>
                  <ArrowForwardIcon
                    sx={{ fontSize: 16, marginTop: "2px" }}
                    className={styles.featureIcon}
                  />
                  <span className={styles.featureText}>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href={product.href}
              className={`${styles.exploreButton} ${isDark ? styles.exploreButtonDark : styles.exploreButtonLight}`}
            >
              <span>Explore</span>
              <ProductName prefix={product.prefix} suffix={product.suffix} size="sm" />
              <ArrowForwardIcon sx={{ fontSize: 16 }} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <div>
            <p className={styles.eyebrow}>Featured Products</p>
            <h2 className={styles.sectionTitle}>
              &ldquo;Sometimes you need better insights. Sometimes you need new
              hardware. We&apos;ll tell you which.&rdquo;
            </h2>
          </div>
          <div className={styles.sectionSub}>
            <p className={styles.sectionSubText}>
              Three products, one methodology: diagnose the actual problem first,
              then determine the right path forward.
            </p>
          </div>
        </div>

        <div className={styles.cardsGrid}>
          {PRODUCTS.map((product, i) => (
            <ProductCard key={product.suffix} product={product} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
