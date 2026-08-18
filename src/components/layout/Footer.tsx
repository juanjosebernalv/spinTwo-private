"use client";

import Image from "next/image";
import Link from "next/link";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import YouTubeIcon from "@mui/icons-material/YouTube";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import { useTranslation } from "@/hooks/useTranslation";
import styles from "./Footer.module.css";

function SpinTwoLogo({ variant }: { variant?: "white" | "gray" }) {
  const suffixClass = variant === "white"
    ? styles.spinTwoWhite
    : variant === "gray"
    ? styles.spinTwoGray
    : styles.spinTwoSuffix;

  return (
    <span className={styles.spinTwoBase}>
      <span>spin</span>
      <span className={suffixClass}>Two</span>
    </span>
  );
}

export function Footer() {
  const { t } = useTranslation();

  const companyLinks = [
    { href: "/about-us", label: t.common.nav.aboutUs, hasDropdown: false },
    { href: "/products", label: t.common.nav.products, hasDropdown: true },
    { href: "/services", label: t.common.nav.services, hasDropdown: true },
    { href: "/case-studies", label: t.common.nav.caseStudies, hasDropdown: false },
    { href: "/industries", label: t.common.nav.industries, hasDropdown: false },
    { href: "/resources", label: t.common.nav.resources, hasDropdown: true },
  ];

  return (
    <footer>
      {/* Main dark footer */}
      <div className={styles.darkSection}>
        <div className={styles.darkGrid}>
          {/* Logo + socials */}
          <div className={styles.brandColumn}>
            <div>
              <Image
                src="/images/spin-two-logo.png"
                alt="SpinTwo"
                width={160}
                height={60}
                className={styles.logoImage}
              />
            </div>
            <div className={styles.socialsRow}>
              {[
                { Icon: LinkedInIcon, label: "LinkedIn", href: "https://linkedin.com" },
                { Icon: InstagramIcon, label: "Instagram", href: "https://instagram.com" },
                { Icon: YouTubeIcon, label: "YouTube", href: "https://youtube.com" },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  <Icon fontSize="medium" />
                  <span className={styles.socialLabel}>{label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className={styles.columnHeading}>{t.common.footer.company}</h3>
            <ul className={styles.linkList}>
              {companyLinks.map(({ href, label, hasDropdown }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={styles.footerLink}
                  >
                    {label}
                    {hasDropdown && (
                      <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className={styles.columnHeading}>{t.common.footer.legal}</h3>
            <ul className={styles.linkList}>
              <li>
                <Link href="/terms" className={styles.footerLink}>
                  {t.common.footer.termsConditions}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className={styles.footerLink}>
                  {t.common.footer.privacyPolicy}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className={styles.columnHeading}>{t.common.footer.stayInLoop}</h3>
            <p className={styles.newsletterDesc}>
              {t.common.footer.stayInLoopDesc}{" "}
              <SpinTwoLogo variant="white" />.
            </p>
            <input
              type="email"
              placeholder={t.common.footer.emailPlaceholder}
              className={styles.emailInput}
            />
            <button className={styles.subscribeButton}>
              {t.common.footer.subscribe}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className={styles.bottomBar}>
        <div className={styles.bottomInner}>
          <div className={styles.addressBlock}>
            <p className={styles.companyName}>
              <SpinTwoLogo />, {t.common.footer.llc}
            </p>
            <p className={styles.addressLine}>{t.common.footer.address1}</p>
            <p className={styles.addressLinePlain}>{t.common.footer.address2}</p>
          </div>
          <div className={styles.contactBlock}>
            <p className={styles.contactLine}>
              Phone: {t.common.footer.phone}
            </p>
            <p className={styles.contactLine}>
              Email: {t.common.footer.contactEmail}
            </p>
          </div>
        </div>
        <div className={styles.copyrightRow}>
          <span>© {t.common.footer.copyrightYear}</span>
          <span>
            {t.common.footer.copyright}{" "}
            <SpinTwoLogo variant="gray" />,{" "}
            {t.common.footer.rights}
          </span>
          <Link href="/terms" className={styles.copyrightLink}>
            {t.common.footer.termsConditions}
          </Link>
          <Link href="/privacy" className={styles.copyrightLink}>
            {t.common.footer.privacyPolicy}
          </Link>
        </div>
      </div>
    </footer>
  );
}
