import Image from "next/image";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        {/* Logo */}
        <Link href="/" className={styles.logoLink}>
          <Image
            src="/images/spin-two-logo.png"
            alt="SpinTwo"
            width={140}
            height={52}
            className={styles.logoImage}
            priority
          />
        </Link>

        {/* Nav — grows to fill available space */}
        <div className={styles.navWrapper}>
          <Navbar />

          {/* Right actions */}
          <div className={styles.rightActions}>
            <div className={styles.supportGroup}>
              <Link
                href="/contact-us"
                className={styles.supportLink}
              >
                Client Support
                <ArrowForwardSmall />
              </Link>
              <span className={styles.phone}>+1 (346) 327-7867</span>
            </div>

            <Link
              href="/contact-us"
              className={styles.contactCta}
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function ArrowForwardSmall() {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="currentColor"
      className={styles.arrowIcon}
      aria-hidden="true"
    >
      <path d="M8.22 2.97a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.44 8.5H2.75a.75.75 0 0 1 0-1.5h8.69L8.22 4.03a.75.75 0 0 1 0-1.06Z" />
    </svg>
  );
}
