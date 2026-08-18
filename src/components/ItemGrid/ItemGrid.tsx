export interface GridItem {
  title: string;
  description: string;
}

export interface ItemGridProps {
  title: string;
  items: GridItem[];
}

/**
 * Reusable card grid used to list features, services, products, etc.
 * Content is always passed in via props sourced from the JSON dictionaries.
 */
export function ItemGrid({ title, items }: ItemGridProps) {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <h2 className="text-2xl font-semibold">{title}</h2>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <article
            key={item.title}
            className="rounded-2xl border border-black/10 p-6 dark:border-white/15"
          >
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="mt-2 text-sm text-current/70">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
