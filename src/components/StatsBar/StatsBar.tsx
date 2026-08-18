"use client";

import { useReveal } from "@/hooks/useReveal";
import styles from "./StatsBar.module.css";

interface Stat {
  value: string;
  label: string;
  description: string;
}

const STATS: Stat[] = [
  {
    value: "50+",
    label: "Years combined experience",
    description: "From CERN to federal agencies",
  },
  {
    value: "1.4B",
    label: "Brain images processing enabled",
    description: "Infrastructure we built for NIH neuroimaging research",
  },
  {
    value: "7yr→wk",
    label: "Analysis time reduced",
    description: "Now being optimized to hours",
  },
  {
    value: "3",
    label: "Federal agencies supported",
    description: "By our founders across their careers",
  },
];

function borderClass(i: number): string {
  const classes: string[] = [];
  if (i % 2 === 0) classes.push("border-r");
  if (i < 2) classes.push("border-b", "sm:border-b-0");
  if (i < 3) classes.push("sm:border-r");
  if (i === 3) classes.push("sm:border-r-0");
  return classes.join(" ");
}

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2, styles.delay3];

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const [ref, visible] = useReveal();
  const delayClass = DELAY_CLASSES[index] ?? "";

  return (
    <div
      ref={ref}
      className={`${styles.statItem} ${borderClass(index)} ${styles.reveal} ${visible ? styles.visible : ""} ${delayClass}`}
    >
      <div className={styles.statInner}>
        <p className={styles.statValue}>{stat.value}</p>
        <p className={styles.statLabel}>{stat.label}</p>
        <p className={styles.statDescription}>{stat.description}</p>
      </div>
    </div>
  );
}

export function StatsBar() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {STATS.map((stat, i) => (
            <StatItem key={stat.value} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
