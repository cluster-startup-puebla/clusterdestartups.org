import { Building2, GraduationCap, Landmark } from "lucide-react";
import { ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";

interface HelixActor {
  title: string;
  text: string;
}

interface TripleHelixSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  actors: HelixActor[];
}

const ICONS = [Landmark, GraduationCap, Building2];

export function TripleHelixSection({
  eyebrow,
  title,
  description,
  image,
  actors,
}: TripleHelixSectionProps) {
  return (
    <section className="bg-surface py-16 lg:py-24 lg:py-32">
      <div className="container-site">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <ImageFrame src={image.src} alt={image.alt} ratio="4 / 3" />
          <ul className="flex flex-col gap-6">
            {actors.map((actor, i) => {
              const Icon = ICONS[i % ICONS.length];
              return (
                <li key={actor.title} className="card flex gap-5 p-6">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-on-brand">
                    <Icon size={20} strokeWidth={1.5} aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="text-h4 font-display text-ink">{actor.title}</h3>
                    <p className="mt-2 text-small text-ink-secondary">{actor.text}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
