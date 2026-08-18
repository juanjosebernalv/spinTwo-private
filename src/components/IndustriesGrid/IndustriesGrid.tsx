"use client";

import Link from "next/link";
import { useRef } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import AssuredWorkloadIcon from "@mui/icons-material/AssuredWorkload";
import FactoryIcon from "@mui/icons-material/Factory";
import OfflineBoltIcon from "@mui/icons-material/OfflineBolt";
import SchoolIcon from "@mui/icons-material/School";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";

import { useReveal } from "@/hooks/useReveal";
import styles from "./IndustriesGrid.module.css";

interface Industry {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const INDUSTRIES: Industry[] = [
  {
    icon: <AccountBalanceIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Government",
    description:
      "Cutting-edge infrastructure to address complex data analytics aligned with the government's mission, built on our founders' direct experience inside federal agencies.",
  },
  {
    icon: <VolunteerActivismIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Healthcare",
    description:
      "Data is vast, complex, and underutilized. With advanced computing we transform it into actionable insights that accelerate discovery, improve outcomes, and power the next generation of medical innovation.",
  },
  {
    icon: <SchoolIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Academia & Research",
    description:
      "We've been the researchers waiting on failing pipelines before a grant deadline. We build HPC the way we wished someone had built it for us.",
  },
  {
    icon: <OfflineBoltIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Energy Sector",
    description:
      "We've modeled physical systems at particle physics scale. We bring that same scientific rigor to your energy processes, turning complex data into optimization opportunities through advanced analytics.",
  },
  {
    icon: <FactoryIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Manufacturing & Engineering",
    description:
      "We treat your CFD and FEA pipelines the way our founders approached simulations for NASA, precision first. Your digital twin will run right, not just fast.",
  },
  {
    icon: <AssuredWorkloadIcon sx={{ fontSize: 22, color: "#E00822" }} />,
    title: "Financial Sector",
    description:
      "Scalable HPC and AI for portfolio simulation, real-time risk modeling, fraud detection, and high frequency trading infrastructure.",
  },
];

const DELAY_CLASSES = [
  undefined,
  styles.delay1,
  styles.delay2,
  styles.delay3,
  styles.delay4,
  styles.delay5,
];

function IndustryCard({ industry, index }: { industry: Industry; index: number }) {
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
          <div className={styles.iconContainer}>
            {industry.icon}
          </div>
          <h3 className={styles.cardTitle}>{industry.title}</h3>
          <p className={styles.cardDescription}>
            {industry.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function IndustriesGrid() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>Industries We Serve</p>
          <h2 className={styles.sectionTitle}>
            Solving complex challenges across sectors
          </h2>
          <p className={styles.sectionSubText}>
            Our scientific methodology applies to every industry. Different
            workloads, same rigorous approach: diagnose first, then build.
          </p>
        </div>

        <div className={styles.cardsGrid}>
          {INDUSTRIES.map((industry, i) => (
            <IndustryCard key={industry.title} industry={industry} index={i} />
          ))}
        </div>

        <div className={styles.ctaRow}>
          <Link href="/industries" className={styles.ctaButton}>
            See Use Cases by Sector
          </Link>
        </div>
      </div>
    </section>
  );
}
