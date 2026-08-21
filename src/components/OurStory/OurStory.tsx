"use client";

import { useRef, type ReactNode } from "react";
import DoneIcon from "@mui/icons-material/Done";

import { useReveal } from "@/hooks/useReveal";
import styles from "./OurStory.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

interface Card {
  title: ReactNode;
  body: ReactNode;
}

const CARDS: Card[] = [
  {
    title: <>Before <SpinTwo />, Eduardo Luiggi</>,
    body: "Worked as a physicist in High Energy Physics, first alongside Hugo on an experiment at Fermilab, then as part of the large scientific collaboration at CERN that discovered the Higgs Boson. His background spans statistical data analysis using frequentist and Bayesian techniques applied to complex scientific datasets.",
  },
  {
    title: <>Before <SpinTwo />, Hugo Hernández</>,
    body: "Started in supercomputing alongside Eduardo at Fermilab. Went on to design, build, and manage the very first Linux-based HPC cluster at NIAID under Dr. Anthony Fauci's direction, recognized with the NIH Director's Award in 2010. Built two HPC clusters for NIH/NCATS used for drug discovery and life sciences. Built UCLA's first Linux-based HPC cluster for the Laboratory of Neurosciences in 2007. Built one HPC cluster for the FDA/CFSAN. Served as principal technical lead for computing infrastructure supporting the FDA's mission to address challenges in food safety and nutrition. Led HPC deployments, workflow tuning, and containerization for the NASA-JSC GNC program as part of Artemis.",
  },
  {
    title: "The founding insight",
    body: <>Every failed HPC deployment they&apos;d witnessed had the same root cause: the infrastructure was specified by people who didn&apos;t understand the workload. The fix wasn&apos;t better hardware. It was better diagnosis. <strong>Better configuration.</strong></>,
  },
];

const DELAY_CLASSES = [undefined, styles.delay1, styles.delay2];

function StoryCard({ card, index }: { card: Card; index: number }) {
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
      className={`${styles.revealCard} ${visible ? styles.visible : ""} ${delay}`}
    >
      <div
        ref={glowRef}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        className={styles.glowBorder}
      >
        <div className={styles.cardInner}>
          <div className={styles.checkWrap}>
            <DoneIcon className={styles.checkIcon} sx={{ fontSize: 16 }} />
          </div>
          <div className={styles.cardContent}>
            <p className={styles.cardTitle}>{card.title}</p>
            <p className={styles.cardBody}>{card.body}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function OurStory() {
  const [leftRef, leftVisible] = useReveal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* Left — narrative */}
          <div
            ref={leftRef}
            className={`${styles.left} ${styles.revealLeft} ${leftVisible ? styles.visible : ""}`}
          >
            <p className={styles.eyebrow}>Our Story</p>
            <h2 className={styles.title}>
              We built <SpinTwo /> because we were the researchers waiting on
              the infrastructure
            </h2>
            <p className={styles.body}>
              Hugo and Eduardo first worked together as physicists on a High
              Energy Physics experiment at Fermilab, and it was there, running
              experiments on supercomputing systems, that their paths into
              advanced computing began. Eduardo went on to work as a physicist
              in the scientific collaboration at CERN that discovered the Higgs
              Boson. Hugo went on to design and operate HPC infrastructure for
              some of the most demanding federal{" "}
              <strong>and academic</strong> research programs in the country,
              including NIH, NASA, <strong>FDA, and UCLA</strong>. They
              weren&apos;t IT vendors who learned to talk to scientists.
            </p>
            <p className={styles.body}>
              They were scientists who understood, from the inside, what it
              actually costs when infrastructure fails a research team: a
              delayed publication, a missed grant cycle, a result that
              can&apos;t be reproduced.
            </p>
            <p className={styles.body}>
              <SpinTwo /> was founded on a single conviction: the people
              building HPC infrastructure should understand the workloads it
              was built to serve. Not just the hardware specs. The science
              behind the compute.
            </p>
          </div>

          {/* Right — story cards */}
          <div className={styles.right}>
            {CARDS.map((card, i) => (
              <StoryCard key={i} card={card} index={i} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
