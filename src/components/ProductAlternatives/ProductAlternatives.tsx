import Link from "next/link";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function SpinProduct({ prefix, suffix }: { prefix: string; suffix: string }) {
  return (
    <span className="font-bold">
      <span className="text-brand-dark">{prefix}</span>
      <span className="text-brand-red">{suffix}</span>
    </span>
  );
}

interface ProductCard {
  prefix: string;
  suffix: string;
  description: React.ReactNode;
  buttonLabel: string;
  href: string;
}

const cards: ProductCard[] = [
  {
    prefix: "spin",
    suffix: "Build",
    description: (
      <>
        When your workloads have outgrown what optimization can solve,{" "}
        <SpinProduct prefix="spin" suffix="Build" /> designs and deploys a new
        HPC system built precisely for your needs.
      </>
    ),
    buttonLabel: "LEARN ABOUT SPINBUILD",
    href: "/products/spinbuild",
  },
  {
    prefix: "spin",
    suffix: "Data",
    description: (
      <>
        If your bottleneck is data fragmentation or lack of AI-ready pipelines
        rather than compute performance,{" "}
        <SpinProduct prefix="spin" suffix="Data" /> may be the right starting
        point.
      </>
    ),
    buttonLabel: "LEARN ABOUT SPINDATA",
    href: "/products/spindata",
  },
];

export function ProductAlternatives() {
  return (
    <section className="bg-[#EEF2F6] px-6 py-16">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-2xl font-bold tracking-wide text-gray-900">
          Not sure <SpinProduct prefix="spin" suffix="Up" /> is right for you?
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {cards.map((card) => (
            <div
              key={card.href}
              className="flex flex-col rounded-xl bg-white p-8 shadow-sm"
            >
              <p className="mb-4 text-xl">
                <SpinProduct prefix={card.prefix} suffix={card.suffix} />
              </p>
              <p className="mb-8 flex-1 text-sm leading-relaxed text-gray-600">
                {card.description}
              </p>
              <Link
                href={card.href}
                className="flex items-center justify-between bg-brand-red px-6 py-4 text-sm font-bold tracking-widest text-white transition-colors hover:bg-brand-red-dark"
              >
                {card.buttonLabel}
                <ArrowForwardIcon sx={{ fontSize: 18 }} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
