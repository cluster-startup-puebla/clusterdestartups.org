import { Link2, MapPin } from "lucide-react";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface ContactLocationProps {
  eyebrow: string;
  title: string;
  description: string;
  addressLabel: string;
  address: string;
  mapTitle: string;
  mapNote: string;
  socialLabel: string;
  social: { label: string; href: string }[];
}

const MAP_EMBED_SRC = "https://www.google.com/maps?q=CERHAN+II+Cuautlancingo&output=embed";

export function ContactLocation({
  eyebrow,
  title,
  description,
  addressLabel,
  address,
  mapTitle,
  mapNote,
  socialLabel,
  social,
}: ContactLocationProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <iframe
            src={MAP_EMBED_SRC}
            title={mapTitle}
            loading="lazy"
            className="min-h-80 w-full rounded-md border border-line bg-elevated"
          />
          <div className="card h-fit p-8">
            <div className="flex items-start gap-3">
              <MapPin strokeWidth={1.5} size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-h4 font-display text-ink">{addressLabel}</h3>
                <p className="mt-2 text-body text-ink-secondary">{address}</p>
              </div>
            </div>
            <p className="mt-4 text-small text-ink-muted">{mapNote}</p>
            <div className="mt-8 border-t border-line pt-6">
              <p className="text-micro uppercase tracking-wider text-ink-muted">{socialLabel}</p>
              <ul className="mt-4 space-y-3">
                {social.map((item) => (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-link"
                    >
                      <Link2 strokeWidth={1.5} size={20} aria-hidden="true" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
