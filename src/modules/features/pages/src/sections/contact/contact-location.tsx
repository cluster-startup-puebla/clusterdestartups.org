import { Link2, MapPin, MessageCircle, Phone } from "lucide-react";
import { OFFICE, OFFICE_ADDRESS_LINE, OFFICE_MAPS_URL } from "@/modules/cores/site/src/config/site";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface ContactLocationProps {
  eyebrow: string;
  title: string;
  description: string;
  addressLabel: string;
  mapNote: string;
  phoneLabel: string;
  whatsappLabel: string;
  socialLabel: string;
  social: { label: string; href: string }[];
}

export function ContactLocation({
  eyebrow,
  title,
  description,
  addressLabel,
  mapNote,
  phoneLabel,
  whatsappLabel,
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
            href={OFFICE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-80 flex-col items-center justify-center gap-4 rounded-md border border-line bg-elevated p-8 text-center transition hover:border-brand hover:shadow-lg"
          >
            <MapPin strokeWidth={1.5} size={48} className="text-brand" aria-hidden="true" />
            <p className="text-body font-medium text-ink">{OFFICE.place}</p>
            <p className="text-small text-ink-secondary">{OFFICE_ADDRESS_LINE}</p>
            <span className="text-small text-link">{mapNote}</span>
          </a>
          <div className="card h-fit p-8">
            <div className="flex items-start gap-3">
              <MapPin strokeWidth={1.5} size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-h4 font-display text-ink">{addressLabel}</h3>
                <a
                  href={OFFICE_MAPS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block text-body text-link hover:underline"
                >
                  {OFFICE.place}
                  <span className="mt-1 block text-ink-secondary">{OFFICE_ADDRESS_LINE}</span>
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <Phone strokeWidth={1.5} size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-h4 font-display text-ink">{phoneLabel}</h3>
                <a
                  href={`tel:${OFFICE.phoneTel}`}
                  aria-label={`${phoneLabel}: ${OFFICE.phoneDisplay}`}
                  className="mt-2 block text-body text-link hover:underline"
                >
                  {OFFICE.phoneDisplay}
                </a>
              </div>
            </div>
            <div className="mt-6 flex items-start gap-3">
              <MessageCircle strokeWidth={1.5} size={24} className="mt-1 shrink-0 text-accent" aria-hidden="true" />
              <div>
                <h3 className="text-h4 font-display text-ink">{whatsappLabel}</h3>
                <a
                  href={OFFICE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${whatsappLabel}: ${OFFICE.phoneDisplay}`}
                  className="mt-2 block text-body text-link hover:underline"
                >
                  {OFFICE.phoneDisplay}
                </a>
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
