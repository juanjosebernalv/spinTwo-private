"use client";

import Image from "next/image";
import { useRef } from "react";

import { useReveal } from "@/hooks/useReveal";
import { imgSrc } from "@/lib/imgSrc";
import styles from "./WhySpinTwo.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

const ITEMS = [
  {
    title: "We diagnose before we propose",
    body: "Every engagement starts with a free infrastructure assessment. We identify what's actually causing the performance problem before recommending a solution. Sometimes that's new hardware. Often it isn't.",
  },
  {
    title: "We've worked inside the environments we build for",
    body: "Most infrastructure vendors understand the hardware. We understand the workload. There is a difference between specifying a system and having been the researcher whose experiment depended on it. That experience changes how we diagnose, what questions we ask first, and what we consider a successful outcome. We do not start with a product. We start with your problem.",
  },
  {
    title: "We stay through the full ROI cycle",
    body: "We don't define success as a successful deployment. We define it as the point where your team stops thinking about infrastructure and starts focusing entirely on the work it was built to support.",
  },
  {
    title: "We're honest when you don't need us",
    body: "If your current infrastructure can be optimized without a new deployment, we'll tell you that. Our long-term business depends on the accuracy of our advice, not the size of the first engagement.",
  },
];

export function WhySpinTwo() {
  const [leftRef, leftVisible] = useReveal();
  const [imgRef, imgVisible] = useReveal();
  const [cardRef, cardVisible] = useReveal();
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
      <div className={styles.container}>
        <div className={styles.grid}>

          {/* ── Left column ── */}
          <div
            ref={leftRef}
            className={`${styles.left} ${styles.revealLeft} ${leftVisible ? styles.visible : ""}`}
          >
            <p className={styles.eyebrow}>WHY <SpinTwo /></p>
            <h2 className={styles.title}>
              What makes us different isn&apos;t what we sell, it&apos;s how we think
            </h2>
            <p className={styles.body}>
              Every HPC vendor will tell you they have experience, comprehensive solutions, and a
              client-centric approach. Those are table stakes. What they can&apos;t say is that
              they&apos;ve been the researchers waiting on the infrastructure they now build.
            </p>
            <p className={styles.body}>
              That experience changes everything about how we diagnose, design, and deliver.
            </p>
            <div
              ref={imgRef}
              className={`${styles.imageWrap} ${styles.revealY} ${imgVisible ? styles.visible : ""} ${styles.imgDelay}`}
            >
              <Image
                src={imgSrc("/images/about-bg-3.jpg")}
                alt="SpinTwo team working on infrastructure"
                fill
                className={styles.image}
                sizes="(max-width: 1024px) 100vw, 45vw"
              />
            </div>
          </div>

          {/* ── Right card ── */}
          <div
            ref={cardRef}
            className={`${styles.cardOuter} ${styles.revealRight} ${cardVisible ? styles.visible : ""}`}
          >
            <div
              ref={glowRef}
              onMouseMove={onMouseMove}
              onMouseLeave={onMouseLeave}
              className={styles.glowBorder}
            >
              <div className={styles.card}>
                {ITEMS.map((item, i) => (
                  <div key={i} className={styles.item}>
                    <div className={styles.numCircle}>
                      <span className={styles.num}>{i + 1}</span>
                    </div>
                    <div className={styles.itemContent}>
                      <p className={styles.itemTitle}>{item.title}</p>
                      <p className={styles.itemBody}>{item.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
