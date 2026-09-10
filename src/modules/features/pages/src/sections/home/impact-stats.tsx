import { SectionHeader, Stat } from "@/modules/shared/ui/src/components";

interface StatItem {
  value: string;
  label: string;
  note: string;
}

interface ImpactStatsProps {
  eyebrow: string;
  title: string;
  description: string;
  footnote: string;
  stats: StatItem[];
}

export function ImpactStats({ eyebrow, title, description, footnote, stats }: ImpactStatsProps) {
  return (
    <section className="bg-surface-subtle">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} note={stat.note} />
          ))}
        </div>
        <p className="mt-8 text-small text-ink-muted">{footnote}</p>
      </div>
    </section>
  );
}
