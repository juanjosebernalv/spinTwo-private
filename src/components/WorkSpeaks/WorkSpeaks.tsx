"use client";

import Image from "next/image";
import { useRef } from "react";
import CheckIcon from "@mui/icons-material/Check";

import { useReveal } from "@/hooks/useReveal";
import styles from "./WorkSpeaks.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

const TRUST_ITEMS = [
  {
    title: "3 Federal Agencies Supported",
    description:
      "Our founders have supported HPC infrastructure across three major U.S. government agencies, including NIH and FDA",
  },
  {
    title: "NIH Director's Award 2010",
    description:
      "Recognized for HPC deployment for next-gen genomics analysis at the National Institutes of Health, the government's highest research recognition.",
  },
  {
    title: "NASA Artemis & Crew Dragon",
    description:
      "Our co-founder assisted in the optimization of Monte Carlo simulations for human spaceflights. Precision is not optional when lives are involved.",
  },
  {
    title: "CERN Higgs Boson Discovery",
    description:
      "Our co-founder contributed to the discovery that reshaped particle physics. That scientific mindset fuels every engagement today.",
  },
];

export function WorkSpeaks() {
  const [leftRef, leftVisible] = useReveal();
  const [rightRef, rightVisible] = useReveal();
  const glowRef = useRef<HTMLDivElement>(null);

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
    <section className={styles.section}>
      <div className={styles.grid}>

        {/* Left */}
        <div
          ref={leftRef}
          className={`${styles.leftColumn} ${styles.revealLeft} ${leftVisible ? styles.visible : ""}`}
        >
          <div className={styles.headerBlock}>
            <p className={styles.eyebrow}>Proven Results</p>
            <h2 className={styles.sectionTitle}>
              The work speaks
            </h2>
          </div>

          <blockquote className={styles.blockquote}>
            <p className={styles.quoteText}>
              &ldquo;With VAST Data, we process large datasets much faster,
              allowing scientists to spend more time on research rather than
              waiting for data to process.&rdquo;
            </p>
          </blockquote>

          <div>
            <p className={styles.attributionName}>Hugo Hernandez</p>
            <p className={styles.attributionRole}>
              Co-Founder, <SpinTwo /> on the life sciences deployment
            </p>
          </div>

          <div className={styles.imageWrapper}>
            <Image
              src="/images/works-speaks.jpg"
              alt="Life sciences HPC deployment"
              width={640}
              height={380}
              className={styles.image}
            />
          </div>
        </div>

        {/* Right — trust card */}
        <div
          ref={rightRef}
          className={`${styles.revealRight} ${rightVisible ? styles.visible : ""}`}
        >
          <div
            ref={glowRef}
            onMouseMove={onMouseMove}
            onMouseLeave={onMouseLeave}
            className={styles.glowBorder}
          >
            <div className={styles.trustCardInner}>
              <p className={styles.trustCardEyebrow}>
                Why Clients Trust <SpinTwo />
              </p>

              <ul className={styles.trustList}>
                {TRUST_ITEMS.map((item, i) => (
                  <li
                    key={item.title}
                    className={i > 0 ? styles.trustItemBordered : styles.trustItem}
                  >
                    <div className={styles.checkIconContainer}>
                      <CheckIcon className={styles.checkIcon} sx={{ fontSize: 16 }} />
                    </div>
                    <div>
                      <h4 className={styles.trustItemTitle}>{item.title}</h4>
                      <p className={styles.trustItemDescription}>
                        {item.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
