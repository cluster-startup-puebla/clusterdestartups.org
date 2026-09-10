import { Badge, ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";

interface EcosystemLevel {
  badge: string;
  title: string;
  description: string;
}

interface EcosystemStructureSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  levels: EcosystemLevel[];
  image: { src: string; alt: string };
}

export function EcosystemStructureSection({
  eyebrow,
  title,
  description,
  levels,
  image,
}: EcosystemStructureSectionProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ol className="flex flex-col divide-y divide-line rounded-md border border-line">
            {levels.map((level) => (
              <li key={level.badge} className="flex gap-4 p-5">
                <Badge className="shrink-0 self-start">{level.badge}</Badge>
                <div>
                  <h3 className="text-body font-medium text-ink">{level.title}</h3>
                  <p className="mt-1 text-small text-ink-secondary">{level.description}</p>
                </div>
              </li>
            ))}
          </ol>
          <ImageFrame src={image.src} alt={image.alt} ratio="4 / 3" />
        </div>
      </div>
    </section>
  );
}
