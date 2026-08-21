"use client";

import { useRef, type ElementType } from "react";
import BiotechIcon from "@mui/icons-material/Biotech";
import HandshakeIcon from "@mui/icons-material/Handshake";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import Diversity3Icon from "@mui/icons-material/Diversity3";

import { useReveal } from "@/hooks/useReveal";
import styles from "./MissionValues.module.css";

interface Value {
  icon: ElementType;
  title: string;
  body: string;
}

const VALUES: Value[] = [
  {
    icon: BiotechIcon,
    title: "Scientific Rigor",
    body: "We approach every infrastructure problem the way we'd approach a research question: with a hypothesis, a methodology, and a measurable outcome.",
  },
  {
    icon: HandshakeIcon,
    title: "Ownership",
    body: "We take responsibility for results, not just deliverables. If the infrastructure doesn't perform, that's our problem to solve, not yours to manage.",
  },
  {
    icon: QueryStatsIcon,
    title: "Honest Diagnosis",
    body: "We'll tell you when you don't need new hardware. We'll tell you when you do. Our value is in the accuracy of the answer, not the size of the proposal.",
  },
  {
    icon: Diversity3Icon,
    title: "Partnership",
    body: "We don't deploy and disappear. We stay through the full ROI cycle, because we know what it costs when infrastructure fails a team mid-research.",
  },
];

const DELAYS = [undefined, styles.delay1, styles.delay2, styles.delay3];

function ValueCard({ value, index }: { value: Value; index: number }) {
  const [ref, visible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);
  const delay = DELAYS[Math.min(index, DELAYS.length - 1)] ?? "";
  const Icon = value.icon;

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
        <div className={styles.valueCard}>
          <div className={styles.iconWrap}>
            <Icon className={styles.icon} sx={{ fontSize: 22 }} />
          </div>
          <h3 className={styles.valueTitle}>{value.title}</h3>
          <p className={styles.valueBody}>{value.body}</p>
        </div>
      </div>
    </div>
  );
}

export function MissionValues() {
  const [headerRef, headerVisible] = useReveal();
  const [missionRef, missionVisible] = useReveal();
  const [visionRef, visionVisible] = useReveal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div
          ref={headerRef}
          className={`${styles.header} ${styles.revealY} ${headerVisible ? styles.visible : ""}`}
        >
          <p className={styles.eyebrow}>What We Stand For</p>
          <h2 className={styles.title}>Mission, Vision and Values</h2>
          <p className={styles.subtitle}>
            Not boilerplate. The actual convictions that shape how we work.
          </p>
        </div>

        <div className={styles.mvGrid}>
          <div
            ref={missionRef}
            className={`${styles.missionCard} ${styles.revealLeft} ${missionVisible ? styles.visible : ""}`}
          >
            <h3 className={styles.mvTitle}>Mission</h3>
            <p className={styles.mvBody}>
              To enable scientific and organizational breakthroughs by building the
              infrastructure that makes them possible, starting with a diagnosis of the
              actual problem, not a catalog of available products.
            </p>
          </div>
          <div
            ref={visionRef}
            className={`${styles.visionCard} ${styles.revealRight} ${visionVisible ? styles.visible : ""}`}
          >
            <h3 className={styles.mvTitle}>Vision</h3>
            <p className={styles.mvBody}>
              A world where no research team, federal agency, or organization is held
              back by infrastructure that wasn&apos;t built to understand what
              they&apos;re actually trying to compute.
            </p>
          </div>
        </div>

        <div className={styles.valuesGrid}>
          {VALUES.map((v, i) => (
            <ValueCard key={v.title} value={v} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
