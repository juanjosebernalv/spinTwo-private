"use client";

import { useRef } from "react";

import { useReveal } from "@/hooks/useReveal";
import styles from "./HowWeWork.module.css";

interface Step {
  number: number;
  title: string;
  description: string;
  badge: string;
}

const STEPS: Step[] = [
  {
    number: 1,
    title: "Free Infrastructure Assessment",
    description:
      "We analyze your current environment, identify performance gaps, and quantify what they're costing you. No obligation, no pitch just findings.",
    badge: "NO COMMITMENT REQUIRED",
  },
  {
    number: 2,
    title: "Discovery & Recommendation",
    description:
      "We present findings and a recommended path forward, tailored to your workload and budget. You'll know exactly what the problem is and what it would take to fix it.",
    badge: "TRANSPARENT · NO SURPRISES",
  },
  {
    number: 3,
    title: "Delivery & Partnership",
    description:
      "We build, deploy, and stay. Our team remains engaged through the full ROI cycle not just the installation. Your success metrics are ours as well.",
    badge: "LONG-TERM ENGAGEMENT",
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2];

function StepCard({ step, index }: { step: Step; index: number }) {
  const [revealRef, visible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);
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
          <div className={styles.cardHeader}>
            <div className={styles.stepNumber}>
              {step.number}
            </div>
            <h3 className={styles.stepTitle}>{step.title}</h3>
          </div>
          <p className={styles.stepDescription}>
            {step.description}
          </p>
          <div className={styles.badgeRow}>
            <span className={styles.badge}>
              {step.badge}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HowWeWork() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>How We Work</p>
          <h2 className={styles.sectionTitle}>
            Every engagement starts with a diagnosis
          </h2>
          <p className={styles.sectionSubText}>
            Not a proposal. Not a product demo. A diagnosis. We understand your
            problem before we touch a rack.
          </p>
        </div>

        <div className={styles.stepsRow}>
          {STEPS.map((step, i) => (
            <StepCard key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
