import { ImageFrame } from "@/modules/shared/ui/src/components";

interface AlliancesCouncilProps {
  eyebrow: string;
  title: string;
  description: string;
  role: string;
  image: { src: string; alt: string };
}

export function AlliancesCouncil({ eyebrow, title, description, role, image }: AlliancesCouncilProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
            <h2 className="text-h2 mt-3 font-display text-ink">{title}</h2>
            <p className="mt-4 text-body-lg text-ink-secondary">{description}</p>
            <p className="mt-6 text-body text-ink">{role}</p>
          </div>
          <ImageFrame src={image.src} alt={image.alt} />
        </div>
      </div>
    </section>
  );
}
