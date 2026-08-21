"use client";

import { useRef } from "react";
import { useReveal } from "@/hooks/useReveal";
import styles from "./TheTeam.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

type CardType = "stat" | "text";

interface Card {
  type: CardType;
  value?: string;
  label: string;
  description: string;
}

const CARDS: Card[] = [
  {
    type: "stat",
    value: "20+",
    label: "Experts",
    description:
      "Engineers, scientists, and solutions specialists working at the intersection of research and technology.",
  },
  {
    type: "stat",
    value: "20+",
    label: "Years of Experience",
    description:
      "Building secure, large-scale computing environments for mission-critical research.",
  },
  {
    type: "stat",
    value: "100%",
    label: "Focused on Impact",
    description:
      "Powering scientific discovery today and enabling the innovations of tomorrow.",
  },
  {
    type: "text",
    label: "Built for Tomorrow",
    description:
      "A collaborative team committed to advancing science through expertise, innovation, and operational excellence.",
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2, styles.delay3];

function TeamCard({ card, index }: { card: Card; index: number }) {
  const [ref, visible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const delay = DELAY_CLASSES[index] ?? "";

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
      ref={ref}
      className={`${styles.revealY} ${visible ? styles.visible : ""} ${delay}`}
    >
      <div
        ref={glowRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={styles.glowBorder}
      >
        <div className={styles.cardInner}>
          {card.type === "stat" ? (
            <>
              <p className={styles.statValue}>{card.value}</p>
              <p className={styles.statLabel}>{card.label}</p>
            </>
          ) : (
            <p className={styles.textLabel}>{card.label}</p>
          )}
          <p className={styles.cardDesc}>{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export function TheTeam() {
  const [headerRef, headerVisible] = useReveal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>

        {/* Header */}
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.revealY} ${headerVisible ? styles.visible : ""}`}
        >
          <p className={styles.eyebrow}>The Team</p>
          <h2 className={styles.title}>The people behind the infrastructure</h2>
        </div>

        {/* Two paragraphs with red left border */}
        <div className={styles.parasRow}>
          <p className={styles.para}>
            <SpinTwo /> is built by scientists and engineers who understand
            research—and build the technology that powers it.
          </p>
          <p className={styles.para}>
            Our team brings deep expertise in high-performance computing,
            scientific workflows, AI, and cloud technologies. We partner closely
            with researchers to deliver a secure, reliable platform that
            accelerates discovery and advances health for all.
          </p>
        </div>

        {/* Stat cards */}
        <div className={styles.cardsGrid}>
          {CARDS.map((card, i) => (
            <TeamCard key={card.label} card={card} index={i} />
          ))}
        </div>

        {/* Tagline */}
        <div className={styles.taglineRow}>
          <div className={styles.taglineLineLong} />
          <p className={styles.taglineText}>
            Powering Discovery. Advancing Health. Together.
          </p>
          <div className={styles.taglineLineShort} />
        </div>

      </div>
    </section>
  );
}
