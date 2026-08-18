"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

import { useTranslation } from "@/hooks/useTranslation";
import navStyles from "./Navbar.module.css";

/* ------------------------------------------------------------------ */
/* Types                                                                */
/* ------------------------------------------------------------------ */

interface SpinItem {
  kind: "spin";
  href: string;
  prefix: string;
  suffix: string;
}

interface PlainItem {
  kind: "plain";
  href: string;
  label: string;
  icon?: React.ReactNode;
}

type DropdownItem = SpinItem | PlainItem;

interface NavItem {
  href: string;
  label: string;
  dropdown?: DropdownItem[];
}

/* ------------------------------------------------------------------ */
/* Brand icons                                                          */
/* ------------------------------------------------------------------ */

function ThinLincIcon() {
  return (
    <svg viewBox="0 0 24 24" className={navStyles.thinLincSvg} aria-hidden="true" fill="none">
      <rect width="24" height="24" rx="4" fill="#1565C0" />
      <path d="M6 7h12M6 12h8M6 17h10" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

function OpenOnDemandIcon() {
  return (
    <span className={navStyles.thinLincIconWrapper}>
      <span className={navStyles.thinLincBadge}>
        OPEN
      </span>
      <svg viewBox="0 0 20 20" className={navStyles.openOnDemandSvg} fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v4.19L7.47 9.16a.75.75 0 0 0-1.06 1.06l3 3a.75.75 0 0 0 1.06 0l3-3a.75.75 1 0-1.06-1.06l-1.78 1.78V6.75Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/* Active underline — re-mounts on pathname change to re-trigger anim  */
/* ------------------------------------------------------------------ */

function ActiveUnderline({ pathname }: { pathname: string }) {
  return (
    <span
      key={pathname}
      aria-hidden="true"
      className={navStyles.activeUnderline}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Dropdown panel                                                       */
/* ------------------------------------------------------------------ */

function DropdownPanel({ items }: { items: DropdownItem[] }) {
  return (
    <ul className={navStyles.dropdownPanel}>
      {items.map((item) =>
        item.kind === "spin" ? (
          <li key={item.href}>
            <Link
              href={item.href}
              className={navStyles.dropdownItem}
            >
              <span className={navStyles.dropdownItemPrefix}>{item.prefix}</span>
              <span className={navStyles.dropdownItemSuffix}>{item.suffix}</span>
            </Link>
          </li>
        ) : (
          <li key={item.href}>
            <Link
              href={item.href}
              className={navStyles.dropdownPlainItem}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        )
      )}
    </ul>
  );
}

/* ------------------------------------------------------------------ */
/* Single desktop nav item                                              */
/* ------------------------------------------------------------------ */

function DesktopNavItem({
  item,
  isActive,
  pathname,
}: {
  item: NavItem;
  isActive: boolean;
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (!open) return;
    function handle(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open]);

  // Close dropdown when route changes
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const linkClass = `${navStyles.navLink} ${open || isActive ? navStyles.navLinkActive : navStyles.navLinkInactive}`;

  if (!item.dropdown) {
    return (
      <li>
        <Link href={item.href} aria-current={isActive ? "page" : undefined} className={linkClass}>
          {item.label}
          {isActive && <ActiveUnderline pathname={pathname} />}
        </Link>
      </li>
    );
  }

  return (
    <li ref={ref} className={navStyles.dropdownListItem}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className={linkClass}
      >
        {item.label}
        <KeyboardArrowDownIcon
          sx={{ fontSize: 16 }}
          className={`${navStyles.chevron} ${open ? navStyles.chevronOpen : ""}`}
        />
        {isActive && <ActiveUnderline pathname={pathname} />}
      </button>

      {open && <DropdownPanel items={item.dropdown} />}
    </li>
  );
}

/* ------------------------------------------------------------------ */
/* Main Navbar                                                          */
/* ------------------------------------------------------------------ */

export function Navbar() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Close mobile menu on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const items: NavItem[] = [
    { href: "/about-us", label: t.common.nav.aboutUs },
    {
      href: "/products",
      label: t.common.nav.products,
      dropdown: [
        { kind: "spin", href: "/products/spinup", prefix: "spin", suffix: "Up" },
        { kind: "spin", href: "/products/spinbuild", prefix: "spin", suffix: "Build" },
        { kind: "spin", href: "/products/spindata", prefix: "spin", suffix: "Data" },
        { kind: "plain", href: "/products/thinlinc", label: "ThinLinc", icon: <ThinLincIcon /> },
      ],
    },
    {
      href: "/services",
      label: t.common.nav.services,
      dropdown: [
        { kind: "plain", href: "/services/ato-preparation", label: "ATO Preparation for HPC Environments" },
        { kind: "plain", href: "/services/open-on-demand", label: "On Demand", icon: <OpenOnDemandIcon /> },
      ],
    },
    { href: "/case-studies", label: t.common.nav.caseStudies },
    { href: "/industries", label: t.common.nav.industries },
    {
      href: "/resources",
      label: t.common.nav.resources,
      dropdown: [
        { kind: "plain", href: "/resources/blog", label: "Blog" },
        { kind: "plain", href: "/resources/capability-statement", label: "Download our capability statement" },
      ],
    },
  ];

  return (
    <nav aria-label={t.common.nav_aria.primaryNavigation} className={navStyles.nav}>
      {/* Mobile burger */}
      <button
        type="button"
        onClick={() => setMobileOpen((o) => !o)}
        aria-expanded={mobileOpen}
        aria-label={mobileOpen ? t.common.nav_aria.closeMenu : t.common.nav_aria.openMenu}
        className={navStyles.mobileBurger}
      >
        {mobileOpen ? <CloseIcon /> : <MenuIcon />}
      </button>

      {/* Desktop */}
      <ul className={navStyles.desktopList}>
        {items.map((item) => (
          <DesktopNavItem
            key={item.href}
            item={item}
            pathname={pathname}
            isActive={pathname === item.href || pathname.startsWith(item.href + "/")}
          />
        ))}
      </ul>

      {/* Mobile menu */}
      {mobileOpen && (
        <ul className={navStyles.mobileMenu}>
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className={`${navStyles.mobileItem} ${
                  pathname === item.href ? navStyles.mobileItemActive : navStyles.mobileItemInactive
                }`}
              >
                {item.label}
                {item.dropdown && <KeyboardArrowDownIcon sx={{ fontSize: 16 }} />}
              </Link>
            </li>
          ))}
          <li className={navStyles.mobileCtaDivider}>
            <Link
              href="/contact-us"
              className={navStyles.mobileCtaLink}
            >
              {t.common.nav.contactUs}
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
}
