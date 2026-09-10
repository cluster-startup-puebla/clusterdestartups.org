import { Badge, ImageFrame } from "@/modules/shared/ui/src/components";

interface NodesMapProps {
  eyebrow: string;
  title: string;
  description: string;
  map: { src: string; alt: string };
  anchors: { name: string; statusLabel: string; description: string }[];
}

export function NodesMap({ eyebrow, title, description, map, anchors }: NodesMapProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
          <h2 className="text-h2 mt-3 font-display text-ink">{title}</h2>
          <p className="mt-4 text-body-lg text-ink-secondary">{description}</p>
        </div>
        <div className="mt-12 grid items-start gap-12 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <ImageFrame src={map.src} alt={map.alt} ratio="4 / 3" />
          </div>
          <div className="flex flex-col gap-6 lg:col-span-2">
            {anchors.map((anchor) => (
              <div key={anchor.name} className="card p-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-h4 font-display text-ink">{anchor.name}</h3>
                  <Badge>{anchor.statusLabel}</Badge>
                </div>
                <p className="mt-3 text-body text-ink-secondary">{anchor.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
