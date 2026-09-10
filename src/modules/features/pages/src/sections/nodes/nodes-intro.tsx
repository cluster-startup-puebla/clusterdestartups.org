import { SectionHeader } from "@/modules/shared/ui/src/components";

interface NodesIntroProps {
  eyebrow: string;
  title: string;
  description: string;
  pillars: { title: string; description: string }[];
}

export function NodesIntro({ eyebrow, title, description, pillars }: NodesIntroProps) {
  return (
    <section className="bg-surface py-16 lg:py-32">
      <div className="container-site">
        <div className="max-w-2xl">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="card p-8">
              <h3 className="text-h3 font-display text-ink">{pillar.title}</h3>
              <p className="mt-3 text-body text-ink-secondary">{pillar.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
