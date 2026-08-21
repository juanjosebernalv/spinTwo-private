"use client";

import React, { type ReactNode, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

import { useReveal } from "@/hooks/useReveal";
import { imgSrc } from "@/lib/imgSrc";
import styles from "./FounderProfiles.module.css";

/* ── SpinTwo brand inline ─────────────────────────── */
function SpinTwo() {
  return (
    <span className={styles.spinTwoBase}>
      <span className={styles.spinTwoPrefix}>spin</span>
      <span className={styles.spinTwoSuffix}>Two</span>
    </span>
  );
}

/* ── Types ────────────────────────────────────────── */
interface StandardAchievement {
  title: ReactNode;
  description: ReactNode;
  highlighted?: boolean;
}

interface DualAchievement {
  title: ReactNode;
  leftDesc: ReactNode;
  rightDesc: string;
  circleColor: string;
  titleColor: string;
  borderColor: string;
  dividerColor: string;
}

interface MemberBase {
  role: string;
  name: string;
  linkedinHref: string;
  image: string;
  imageLeft: boolean;
  bio: ReactNode[];
  quote: string;
}

interface StandardMember extends MemberBase {
  achievementStyle: "standard";
  achievements: StandardAchievement[];
}

interface DualMember extends MemberBase {
  achievementStyle: "dual";
  achievements: DualAchievement[];
}

type Member = StandardMember | DualMember;

/* ── Delay classes ────────────────────────────────── */
const DELAYS = [
  undefined,
  styles.delay1,
  styles.delay2,
  styles.delay3,
  styles.delay4,
  styles.delay5,
];

/* ── Achievement list (standard) ─────────────────── */
function StandardAchievementList({
  achievements,
}: {
  achievements: StandardAchievement[];
}) {
  return (
    <div className={styles.achievementList}>
      {achievements.map((item, i) => {
        const [ref, visible] = useReveal(); // eslint-disable-line react-hooks/rules-of-hooks
        const delay = DELAYS[Math.min(i, DELAYS.length - 1)] ?? "";

        if (item.highlighted) {
          return (
            <div
              key={i}
              ref={ref}
              className={`${styles.achievementItemHighlighted} ${styles.revealY} ${visible ? styles.visible : ""} ${delay}`}
            >
              <div className={styles.thumbWrap}>
                <Image
                  src={imgSrc("/images/thumb.png")}
                  alt=""
                  width={64}
                  height={64}
                  className={styles.thumbImg}
                />
              </div>
              <div className={styles.achievementContentHighlighted}>
                <p className={styles.achievementHighlightedText}>
                  {item.description}
                </p>
              </div>
            </div>
          );
        }

        return (
          <div
            key={i}
            ref={ref}
            className={`${styles.achievementItem} ${styles.revealY} ${visible ? styles.visible : ""} ${delay}`}
          >
            <div className={styles.thumbWrap}>
              <Image
                src={imgSrc("/images/thumb.png")}
                alt=""
                width={56}
                height={56}
                className={styles.thumbImg}
              />
            </div>
            <div className={styles.achievementContent}>
              <p className={styles.achievementTitle}>{item.title}</p>
              <p className={styles.achievementDesc}>{item.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ── Achievement list (dual — Stephanie) ─────────── */
function DualAchievementList({
  achievements,
}: {
  achievements: DualAchievement[];
}) {
  return (
    <div className={styles.dualList}>
      {achievements.map((item, i) => {
        const [ref, visible] = useReveal(); // eslint-disable-line react-hooks/rules-of-hooks
        const delay = DELAYS[Math.min(i, DELAYS.length - 1)] ?? "";

        return (
          <div
            key={i}
            ref={ref}
            className={`${styles.dualCard} ${styles.revealY} ${visible ? styles.visible : ""} ${delay}`}
            style={{
              "--dual-border": item.borderColor,
              "--dual-circle": item.circleColor,
              "--dual-divider": item.dividerColor,
              "--dual-title": item.titleColor,
            } as React.CSSProperties}
          >
            <div className={styles.dualCircle} />
            <div className={styles.dualLeftCol}>
              <p className={styles.dualCardTitle}>{item.title}</p>
              <p className={styles.dualCardLeftDesc}>{item.leftDesc}</p>
            </div>
            <div className={styles.dualVerticalDivider} />
            <p className={styles.dualCardRightDesc}>{item.rightDesc}</p>
          </div>
        );
      })}
    </div>
  );
}

/* ── Member section ───────────────────────────────── */
function MemberSection({ member }: { member: Member }) {
  const [imgRef, imgVisible] = useReveal();
  const [contentRef, contentVisible] = useReveal();

  const imgRevealClass = member.imageLeft ? styles.revealLeft : styles.revealRight;
  const gridClass = member.imageLeft ? styles.memberGrid : styles.memberGridReversed;

  const imageEl = (
    <div
      ref={imgRef}
      className={`${imgRevealClass} ${imgVisible ? styles.visible : ""}`}
    >
      <div className={styles.imageWrap}>
        <Image
          src={member.image}
          alt={member.name}
          fill
          className={styles.image}
          sizes="(max-width: 1024px) 100vw, 36vw"
        />
        <div className={styles.quoteOverlay}>
          <p className={styles.quoteIcon}>&ldquo;</p>
          <p className={styles.quoteText}>{member.quote}</p>
        </div>
      </div>
    </div>
  );

  const contentEl = (
    <div
      ref={contentRef}
      className={`${styles.revealY} ${contentVisible ? styles.visible : ""}`}
    >
          <p className={styles.roleLabel}>{member.role}</p>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{member.name}</h2>
            <Link
              href={member.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkedinBtn}
            >
              <LinkedInIcon className={styles.linkedinIcon} sx={{ fontSize: 16 }} />
              View on LinkedIn
            </Link>
          </div>

          <div className={styles.bioBlock}>
            {member.bio.map((para, i) => (
              <p key={i} className={styles.bioPara}>{para}</p>
            ))}
          </div>

          <div className={styles.achievementsHeaderRow}>
            <span className={styles.achievementsLabel}>Key Achievements &amp; Impact</span>
            <div className={styles.achievementsLine} />
          </div>

          {member.achievementStyle === "standard" ? (
            <StandardAchievementList achievements={member.achievements} />
          ) : (
            <DualAchievementList achievements={member.achievements} />
          )}
    </div>
  );

  return (
    <div className={styles.memberBlock}>
      <div className={gridClass}>
        {member.imageLeft ? (
          <>
            {imageEl}
            {contentEl}
          </>
        ) : (
          <>
            {contentEl}
            {imageEl}
          </>
        )}
      </div>
    </div>
  );
}

/* ── Main export ──────────────────────────────────── */
export function FounderProfiles() {
  const MEMBERS: Member[] = [
    /* ── Hugo Hernández ───────────────────────────── */
    {
      role: "Co-Founder",
      name: "Hugo Hernández",
      linkedinHref: "https://www.linkedin.com/in/hugohernandez/",
      image: imgSrc("/images/hugo.jpg"),
      imageLeft: true,
      bio: [
        "Hugo brings more than 25 years of leadership in High-Performance Computing (HPC), Artificial Intelligence, research cyberinfrastructure, and scientific computing. A former experimental particle physicist, he has designed, deployed, and operated mission-critical computational platforms for leading federal agencies, national laboratories, and research institutions, enabling breakthrough science across biomedical research, aerospace engineering, and data-intensive discovery.",
        "Throughout his career, Hugo has pioneered advanced computing environments for organizations including the National Institutes of Health (NIH), the Food and Drug Administration (FDA), NASA Johnson Space Center, and UCLA. He currently leads the computation and operations of Scientific Computing Infrastructure at NCATS, integrating HPC, AI, Kubernetes, hybrid cloud, and secure research environments into a unified platform supporting translational science and next-generation biomedical research.",
      ],
      achievementStyle: "standard",
      achievements: [
        {
          title: <>NIH / NIAID &mdash; Director&apos;s Award (2010)</>,
          description:
            "Recognized for designing and building the first Linux-based HPC cluster at NIAID under Dr. Anthony Fauci.",
        },
        {
          title: "NIH / NCATS",
          description:
            "Built two HPC clusters for drug discovery and life sciences research, providing the computational foundation for mission-critical programs.",
        },
        {
          title: "UCLA",
          description:
            "Built UCLA's first Linux-based HPC cluster for the Laboratory of Neurosciences in 2007.",
        },
        {
          title: "FDA",
          description:
            "Principal technical lead for computing infrastructure supporting the FDA's mission in food safety and nutrition.",
        },
        {
          title: "NASA",
          description:
            "Led HPC deployments, workflow tuning, and containerization for the NASA-JSC GNC program as part of Artemis, enabling advanced simulations and analyses that support mission-critical space exploration.",
        },
        {
          highlighted: true,
          title: "",
          description:
            "Hugo brings a unique combination of scientific depth and engineering leadership to solve complex computational challenges and build high-performance environments that accelerate discovery and mission impact.",
        },
      ],
      quote:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },

    /* ── Eduardo Luiggi ───────────────────────────── */
    {
      role: "Co-Founder",
      name: "Eduardo Luiggi",
      linkedinHref: "https://www.linkedin.com/in/eduardoluiggi/",
      image: imgSrc("/images/eduardo.jpg"),
      imageLeft: false,
      bio: [
        "Eduardo is a former physicist and senior data scientist with extensive experience applying advanced statistical analysis, machine learning, and scientific computing across research, industry, and federal environments.",
        "His scientific career began in High-Energy Physics at Fermilab, where he and Hugo first worked together on large-scale computational analysis. He later contributed to the International CERN collaboration associated with the discovery of the Higgs boson and developed an extensive academic research background at the University of Colorado.",
        "Beyond academia, Eduardo has led and supported data science initiatives in the private sector and for multiple federal agencies outside NIH. His expertise includes frequentist and Bayesian methods, predictive modeling, large-scale data analysis, analytical pipeline design, and the translation of complex scientific data into actionable insight.",
      ],
      achievementStyle: "standard",
      achievements: [
        {
          title: "Fermilab",
          description:
            "High-Energy Physics research where Eduardo and Hugo first collaborated, applying large-scale scientific computing to particle physics experiments.",
        },
        {
          title: "CERN",
          description:
            "Physicist in the international scientific collaboration associated with the discovery of the Higgs boson, contributing to large-scale data analysis and scientific computing.",
        },
        {
          title: "University of Colorado",
          description:
            "Conducted advanced scientific research in experimental physics, computational analysis, and statistical methodologies.",
        },
        {
          title: "Data Science",
          description:
            "Expert in frequentist and Bayesian statistical methods, machine learning, predictive modeling, and the design of scalable analytical pipelines for complex scientific and business datasets.",
        },
        {
          title: "Federal & Private Sector",
          description:
            "Delivered data science and AI solutions for commercial organizations and multiple U.S. federal agencies outside NIH, transforming complex data into operational intelligence and decision support.",
        },
        {
          highlighted: true,
          title: "",
          description:
            "Eduardo combines a strong foundation in physics and scientific research with deep expertise in data science and analytics to solve complex problems and deliver data-driven impact across science, industry, and government.",
        },
      ],
      quote:
        "Bridging the gap between raw scientific data and the infrastructure needed to extract meaning from it at scale.",
    },

    /* ── Stephanie Noya ───────────────────────────── */
    {
      role: "President",
      name: "Stephanie Noya",
      linkedinHref: "https://www.linkedin.com/in/stephanienoya/",
      image: imgSrc("/images/stephanie.jpg"),
      imageLeft: true,
      bio: [
        <>
          Stephanie leads <SpinTwo />
          &apos;s operations, client relationships, and strategic growth, ensuring that the
          company&apos;s technical expertise translates into dependable execution, clear
          accountability, and long-term client value. She plays a central role in aligning
          delivery, partnerships, and business operations so that every engagement is managed
          with consistency, responsiveness, and operational discipline.
        </>,
        <>
          She is also driving <SpinTwo />
          &apos;s expansion into new markets, including the private and energy sectors, while
          helping build the company&apos;s presence across Latin America. Drawing on her
          experience leading projects and scaling operational and logistics capabilities
          throughout the region, Stephanie works closely with <SpinTwo />
          &apos;s technical teams to bring advanced computing solutions closer to organizations
          with growing needs in High-Performance Computing, AI, and data-intensive operations.
        </>,
        <>
          Her vision is grounded in accessibility. Stephanie believes that supercomputing and
          AI infrastructure should not feel complex or out of reach. Her focus is to simplify
          how <SpinTwo /> delivers these systems — keeping the technical complexity within the
          company while giving clients an experience that is practical, understandable, and
          aligned with their mission. Through this approach, she is helping democratize access
          to advanced computing for industries and organizations that may have never viewed
          these technologies as attainable.
        </>,
      ],
      achievementStyle: "dual",
      achievements: [
        {
          title: "Operations",
          leftDesc: "Leads client satisfaction, delivery accountability, and company operations.",
          rightDesc:
            "Ensures exceptional execution and client success through disciplined processes, clear communication, and operational excellence.",
          circleColor: "#FDEAEA",
          titleColor: "#C61A27",
          borderColor: "#F5CECE",
          dividerColor: "#E09090",
        },
        {
          title: "Strategy",
          leftDesc: <><SpinTwo />&apos;s strategic direction and partner relationships.</>,
          rightDesc:
            "Builds and nurtures strategic partnerships that strengthen capabilities, expand reach, and create long-term value for clients.",
          circleColor: "#DAE4F0",
          titleColor: "#2B4C7E",
          borderColor: "#C0D4E8",
          dividerColor: "#8AAED0",
        },
        {
          title: "Growth",
          leftDesc: (
            <>
              Expands <SpinTwo /> into new markets and industries, including the private and
              energy sectors across Latin America.
            </>
          ),
          rightDesc:
            "Leverages her experience across Latin America to open new opportunities and bring world-class computing solutions closer to clients.",
          circleColor: "#D4EDD4",
          titleColor: "#3A7A3A",
          borderColor: "#B8D8B8",
          dividerColor: "#7AAA7A",
        },
        {
          title: "Access",
          leftDesc:
            "Champions the democratization of supercomputing, making advanced and AI computing simple and approachable for every client.",
          rightDesc:
            "Simplifies complex technology so clients can focus on outcomes, not infrastructure — empowering more organizations to achieve more.",
          circleColor: "#E8D5F0",
          titleColor: "#7B2D8B",
          borderColor: "#D4B8E8",
          dividerColor: "#A87AC8",
        },
      ],
      quote:
        "Translating technical excellence into client outcomes, building the organizational foundation that lets the science speak for itself.",
    },
  ];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {MEMBERS.map((member) => (
          <MemberSection key={member.name} member={member} />
        ))}
      </div>
    </section>
  );
}
