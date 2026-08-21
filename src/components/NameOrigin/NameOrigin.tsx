import Link from "next/link";
import styles from "./NameOrigin.module.css";

function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

export function NameOrigin() {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <p className={styles.eyebrow}>The Origin of Our Name</p>
        <h2 className={styles.title}>
          Born from physics. Built for scientific computing.
        </h2>
        <p className={styles.body}>
          <SpinTwo /> reflects our founders&apos; background in particle physics
          and the scientific principles that shaped the company. The name
          references the graviton — a hypothetical quantum particle associated
          with gravity and characterized by a{" "}
          <span className={styles.spinLabel}>spin</span> of{" "}
          <span className={styles.spinNumber}>2</span>. Our logo incorporates a
          Feynman diagram, the visual language physicists use to represent
          particle interactions. Together, these elements connect our scientific
          heritage with our mission: building advanced computing environments
          that enable discovery.
        </p>
        <div className={styles.ctaRow}>
          <Link href="/about-us/name" className={styles.cta}>
            Explore the Science Behind Our Name
          </Link>
        </div>
      </div>
    </section>
  );
}
