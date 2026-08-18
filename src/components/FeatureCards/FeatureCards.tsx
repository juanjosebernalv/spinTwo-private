"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import FlashOnIcon from "@mui/icons-material/FlashOn";
import FlagIcon from "@mui/icons-material/Flag";
import SettingsIcon from "@mui/icons-material/Settings";
import HandshakeIcon from "@mui/icons-material/Handshake";

import { useReveal } from "@/hooks/useReveal";
import styles from "./FeatureCards.module.css";

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

const FEATURES: Feature[] = [
  {
    icon: <FlashOnIcon sx={{ fontSize: 24, color: "#fff" }} />,
    title: "Performance",
    description: "Improve compute performance without unnecessary new hardware",
  },
  {
    icon: <FlagIcon sx={{ fontSize: 24, color: "#fff" }} />,
    title: "Scalability",
    description: "Scale on-prem, in the cloud, or hybrid built for your workload",
  },
  {
    icon: <SettingsIcon sx={{ fontSize: 24, color: "#fff" }} />,
    title: "Customization",
    description: "Architected for your exact computational challenge",
  },
  {
    icon: <HandshakeIcon sx={{ fontSize: 24, color: "#fff" }} />,
    title: "Partnership",
    description:
      "Long-term support with a strategic, not transactional, focus",
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2, styles.delay3];

function GlowCard({ feature, index }: { feature: Feature; index: number }) {
  const [revealRef, visible] = useReveal();
  const cardRef = useRef<HTMLDivElement>(null);

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--y", `${e.clientY - rect.top}px`);
  }

  function onMouseLeave() {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty("--x", "50%");
    el.style.setProperty("--y", "50%");
  }

  const delayClass = DELAY_CLASSES[index] ?? "";

  return (
    <div
      ref={revealRef}
      className={`${styles.cardWrapper} ${styles.reveal} ${visible ? styles.visible : ""} ${delayClass}`}
    >
      <div
        ref={cardRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={styles.glowBorder}
      >
        <div className={styles.cardInner}>
          <div className={styles.cardHeader}>
            <div className={styles.iconContainer}>
              {feature.icon}
            </div>
            <h3 className={styles.cardTitle}>
              {feature.title}
            </h3>
          </div>
          <p className={styles.cardDescription}>
            {feature.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FeatureCards() {
  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        {FEATURES.map((feature, i) => (
          <GlowCard key={feature.title} feature={feature} index={i} />
        ))}
      </div>
    </section>
  );
}
