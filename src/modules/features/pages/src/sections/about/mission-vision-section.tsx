import { Eye, Target } from "lucide-react";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface MissionVisionSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  mission: { title: string; text: string };
  vision: { title: string; text: string };
}

export function MissionVisionSection({
  eyebrow,
  title,
  description,
  mission,
  vision,
}: MissionVisionSectionProps) {
  const blocks = [
    { icon: Target, ...mission },
    { icon: Eye, ...vision },
  ];

  return (
    <section className="bg-surface-subtle py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {blocks.map((block) => (
            <article key={block.title} className="card p-8">
              <span className="flex h-11 w-11 items-center justify-center rounded-md bg-brand text-on-brand">
                <block.icon size={24} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <h3 className="text-h3 mt-6 font-display text-ink">{block.title}</h3>
              <p className="mt-3 text-body text-ink-secondary">{block.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
