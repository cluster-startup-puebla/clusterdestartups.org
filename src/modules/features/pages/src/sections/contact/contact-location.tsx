import { Link2, MapPin } from "lucide-react";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface ContactLocationProps {
  eyebrow: string;
  title: string;
  description: string;
  addressLabel: string;
  address: string;
  addressHref?: string;
  mapNote: string;
  socialLabel: string;
  social: { label: string; href: string }[];
}

const MAP_LINK = "https://www.google.com/maps?q=19.113973,-98.246581";

export function ContactLocation({
  eyebrow,
  title,
  description,
  addressLabel,
  address,
  addressHref,
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
          <a
            href={addressHref || MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-md border border-line bg-elevated p-8 text-center transition hover:border-brand hover:shadow-lg"
          >
            <MapPin strokeWidth={1.5} size={48} className="text-brand" aria-hidden="true" />
            <p className="text-body font-medium text-ink">{address}</p>
            <span className="text-small text-link">{mapNote}</span>
          </a>
          <div className="card h-fit p-8">
            <div className="flex items-start gap-3">
              <MapPin strokeWidth={1.5} size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-h4 font-display text-ink">{addressLabel}</h3>
                {addressHref ? (
                  <a href={addressHref} target="_blank" rel="noopener noreferrer" className="mt-2 block text-body text-link hover:underline">
                    {address}
                  </a>
                ) : (
                  <p className="mt-2 text-body text-ink-secondary">{address}</p>
                )}
              </div>
            </div>
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
