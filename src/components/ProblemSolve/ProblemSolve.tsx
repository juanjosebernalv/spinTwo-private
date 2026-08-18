"use client";

import Image from "next/image";
import { useRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

import { useReveal } from "@/hooks/useReveal";
import styles from "./ProblemSolve.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

type CardVariant = "bad" | "good";

interface Card {
  variant: CardVariant;
  title: React.ReactNode;
  description: React.ReactNode;
}

const CARDS: Card[] = [
  {
    variant: "bad",
    title: "What most HPC vendors do",
    description: (
      <>
        <strong>Receive RFP →</strong> propose hardware → deploy → leave. Your
        workload performance is your problem.
      </>
    ),
  },
  {
    variant: "good",
    title: (
      <>
        What <SpinTwo /> does
      </>
    ),
    description: (
      <>
        <strong>Diagnose your actual workload →</strong> identify the root cause
        → recommend the right solution which is sometimes not new hardware at
        all.
      </>
    ),
  },
  {
    variant: "good",
    title: "Why it matters",
    description:
      "We diagnosed a life sciences client's pipeline bottleneck, redesigned the infrastructure with VAST Data as the storage layer, and reduced a 7-year analysis to weeks.",
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2];

function RevealCard({ card, index }: { card: Card; index: number }) {
  const [revealRef, visible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);

  const isBad = card.variant === "bad";
  const Icon = isBad ? CloseIcon : CheckIcon;
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
      className={`${styles.cardWrapper} ${styles.revealY} ${visible ? styles.visible : ""} ${delayClass}`}
    >
      <div
        ref={glowRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={styles.glowBorder}
      >
        <div className={styles.cardInner}>
          <div className={isBad ? styles.iconBad : styles.iconGood}>
            <Icon className={isBad ? styles.iconColorBad : styles.iconColorGood} sx={{ fontSize: 18 }} />
          </div>
          <div>
            <h4 className={styles.cardTitle}>{card.title}</h4>
            <p className={styles.cardDescription}>
              {card.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProblemSolve() {
  const [imageRef, imageVisible] = useReveal();

  return (
    <section className={styles.section}>
      <div className={styles.grid}>
        <div
          ref={imageRef}
          className={`${styles.imageWrapper} ${styles.revealXLeft} ${imageVisible ? styles.visible : ""}`}
        >
          <Image
            src="/images/problem-solve.png"
            alt="HPC infrastructure dashboard"
            fill
            className={styles.image}
          />
        </div>

        <div className={styles.contentColumn}>
          <p className={styles.eyebrow}>The Problem We Solve</p>

          <h2 className={styles.sectionTitle}>
            Avoid having your HPC project fail before it even starts
          </h2>

          <div className={styles.bodyText}>
            <p>
              The vendor sells you hardware. The hardware underperforms.
              You&apos;re not sure if it&apos;s the spec, the config, or the
              workload. The next RFP goes out and the cycle repeats.
            </p>
            <p className={styles.bodyTextStrong}>
              The problem was never the hardware. Typically, it was that nobody
              diagnosed the actual computational challenge before proposing a
              solution.
            </p>
          </div>

          <div className={styles.cardsList}>
            {CARDS.map((card, i) => (
              <RevealCard key={i} card={card} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
