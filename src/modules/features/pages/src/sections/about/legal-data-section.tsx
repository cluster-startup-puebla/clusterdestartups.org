import { Button, SectionHeader } from "@/modules/shared/ui/src/components";

interface LegalFact {
  label: string;
  value: string;
}

interface LegalDataSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  facts: LegalFact[];
  ctaLabel: string;
}

export function LegalDataSection({
  eyebrow,
  title,
  description,
  facts,
  ctaLabel,
}: LegalDataSectionProps) {
  return (
    <section className="bg-surface py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="card mt-12 grid gap-6 p-8 sm:grid-cols-3">
          {facts.map((fact) => (
            <div key={fact.label}>
              <p className="text-micro uppercase tracking-wider text-ink-muted">{fact.label}</p>
              <p className="mt-2 text-body font-medium text-ink">{fact.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Button variant="secondary" href="/contacto">
            {ctaLabel}
          </Button>
        </div>
      </div>
    </section>
  );
}
