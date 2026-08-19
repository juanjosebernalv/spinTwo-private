import Link from "next/link";

export interface CTAProps {
  title: string;
  subtitle: string;
  buttonLabel: string;
  href: string;
}

/**
 * Shared call-to-action banner reused across pages. Content is entirely
 * driven by props sourced from the JSON dictionaries.
 */
export function CTA({ title, subtitle, buttonLabel, href }: CTAProps) {
  return (
    <section className="border-t border-black/5 dark:border-white/10">
      <div className="mx-auto flex max-w-5xl flex-col items-start gap-4 px-6 py-16 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-wide">{title}</h2>
          <p className="mt-2 text-current/70">{subtitle}</p>
        </div>
        <Link
          href={href}
          className="shrink-0 rounded-full bg-foreground px-6 py-3 text-sm font-semibold text-background transition-opacity hover:opacity-90"
        >
          {buttonLabel}
        </Link>
      </div>
    </section>
  );
}
