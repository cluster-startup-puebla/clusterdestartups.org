import { Link } from "@/modules/cores/i18n/src/config/routing";
import { ArrowRight, Cpu, Presentation, Wrench } from "lucide-react";
import { ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";

interface HubHighlight {
  icon: "fablab" | "ia" | "auditorio";
  title: string;
  description: string;
}

interface HubProps {
  eyebrow: string;
  title: string;
  description: string;
  highlights: HubHighlight[];
  imageFabLabSrc: string;
  imageFabLabAlt: string;
  imageNaveBSrc: string;
  imageNaveBAlt: string;
  linkLabel: string;
}

const ICONS = {
  fablab: Wrench,
  ia: Cpu,
  auditorio: Presentation,
} as const;

export function Hub({
  eyebrow,
  title,
  description,
  highlights,
  imageFabLabSrc,
  imageFabLabAlt,
  imageNaveBSrc,
  imageNaveBAlt,
  linkLabel,
}: HubProps) {
  return (
    <section className="bg-surface-subtle">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <ImageFrame src={imageFabLabSrc} alt={imageFabLabAlt} />
          <ImageFrame src={imageNaveBSrc} alt={imageNaveBAlt} />
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-3">
          {highlights.map((highlight) => {
            const Icon = ICONS[highlight.icon];
            return (
              <div key={highlight.title} className="card p-6">
                <Icon strokeWidth={1.5} className="h-6 w-6 text-brand" aria-hidden />
                <h3 className="mt-4 text-h4 text-ink font-display">{highlight.title}</h3>
                <p className="mt-2 text-body text-ink-secondary">{highlight.description}</p>
              </div>
            );
          })}
        </div>
        <Link
          href="/hub"
          className="mt-8 inline-flex items-center gap-2 text-body font-medium text-link"
        >
          {linkLabel}
          <ArrowRight strokeWidth={1.5} className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
