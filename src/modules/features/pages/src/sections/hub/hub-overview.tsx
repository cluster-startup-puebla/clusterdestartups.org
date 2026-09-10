import { ImageFrame, Stat } from "@/modules/shared/ui/src/components";

interface HubOverviewProps {
  eyebrow: string;
  title: string;
  description: string;
  address: string;
  navItems: { name: string; statusLabel: string; statusTone: "active" | "pending" }[];
  image: { src: string; alt: string };
  stats: { value: string; label: string; note?: string }[];
}

export function HubOverview({
  eyebrow,
  title,
  description,
  address,
  navItems,
  image,
  stats,
}: HubOverviewProps) {
  return (
    <section className="bg-surface py-16 lg:py-32">
      <div className="container-site">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
            <h1 className="text-h1 mt-3 font-display text-ink">{title}</h1>
            <p className="mt-4 text-body-lg text-ink-secondary">{description}</p>
            <p className="mt-6 text-body text-ink-muted">{address}</p>
            <ul className="mt-8 flex flex-col gap-3">
              {navItems.map((item) => (
                <li
                  key={item.name}
                  className="flex items-center justify-between rounded-md border border-line bg-elevated px-5 py-4"
                >
                  <span className="text-body font-medium text-ink">{item.name}</span>
                  <span
                    className={
                      item.statusTone === "active" ? "badge-brand" : "badge-brand text-ink-muted"
                    }
                  >
                    {item.statusLabel}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <ImageFrame src={image.src} alt={image.alt} priority />
        </div>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stats.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </div>
      </div>
    </section>
  );
}
