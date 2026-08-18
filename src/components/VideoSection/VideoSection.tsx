"use client";

import Image from "next/image";
import { useState } from "react";

import { useReveal } from "@/hooks/useReveal";
import styles from "./VideoSection.module.css";

const VIDEO_ID = "4LHQ_2iVZU0";

function SpinTwo({ sm }: { sm?: boolean }) {
  return (
    <span className={`${styles.spinTwoBase}${sm ? " " + styles.spinTwoSm : ""}`}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

function YoutubeEmbed({ videoId }: { videoId: string }) {
  const [active, setActive] = useState(false);

  return (
    <div className={styles.embedWrapper}>
      {active ? (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
          title="What is HPC and how is spinTwo democratizing technology?"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className={styles.iframe}
        />
      ) : (
        <>
          <Image
            src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt="Video thumbnail"
            fill
            className={styles.thumbnail}
            sizes="(max-width: 896px) 100vw, 896px"
          />
          <div className={styles.overlay} />
          <button
            onClick={() => setActive(true)}
            aria-label="Play video"
            className={styles.playButtonContainer}
          >
            <span className={styles.playButton}>
              <svg
                viewBox="0 0 24 24"
                className={styles.playIcon}
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </>
      )}
    </div>
  );
}

export function VideoSection() {
  const [ref, visible] = useReveal();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <p className={styles.eyebrow}>What is HPC?</p>
          <h2 className={styles.sectionTitle}>
            How <SpinTwo /> is democratizing scientific computing
          </h2>
          <p className={styles.sectionSubText}>
            A short explainer on what High-Performance Computing is and how{" "}
            <SpinTwo sm /> makes it accessible to every
            organization that needs it.
          </p>
        </div>

        <div
          ref={ref}
          className={`${styles.reveal} ${visible ? styles.visible : ""}`}
        >
          <YoutubeEmbed videoId={VIDEO_ID} />
        </div>
      </div>
    </section>
  );
}
