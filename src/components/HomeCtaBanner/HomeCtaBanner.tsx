import Link from "next/link";
import styles from "./HomeCtaBanner.module.css";

function ProductName({ children }: { children: string }) {
  const [prefix, suffix] = [children.slice(0, 4), children.slice(4)];
  return (
    <span className={styles.productNameBase}>
      {prefix}
      <span className={styles.productNameSuffix}>{suffix}</span>
    </span>
  );
}

export function HomeCtaBanner() {
  return (
    <section className={styles.section}>
      {/* Content */}
      <div className={styles.container}>
        <h2 className={styles.heading}>
          Not sure if you need optimization or a new deployment?
        </h2>
        <p className={styles.body}>
          Start with a free infrastructure assessment. We&apos;ll analyze your
          environment, identify what&apos;s costing you performance, and tell you
          honestly what the right next step is, whether that&apos;s{" "}
          <ProductName>spinUp</ProductName>,{" "}
          <ProductName>spinBuild</ProductName>,{" "}
          <ProductName>spinData</ProductName>, or something else entirely.
        </p>

        <div className={styles.ctaRow}>
          <Link
            href="/contact-us"
            className={styles.ctaPrimary}
          >
            Schedule Free Consultation
          </Link>
          <Link
            href="/case-studies"
            className={styles.ctaSecondary}
          >
            Download the Life Sciences Success Story
          </Link>
        </div>
      </div>
    </section>
  );
}
