import { Link } from "@/modules/cores/i18n/src/config/routing";
import { SectionHeader } from "@/modules/shared/ui/src/components";

interface PressKitProps {
  eyebrow: string;
  title: string;
  description: string;
  dataLabel: string;
  data: { label: string; value: string }[];
  contactLabel: string;
  contactValue: string;
  mediaLabel: string;
  mediaDescription: string;
  mediaCta: string;
}

export function PressKit({
  eyebrow,
  title,
  description,
  dataLabel,
  data,
  contactLabel,
  contactValue,
  mediaLabel,
  mediaDescription,
  mediaCta,
}: PressKitProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="card h-fit p-8">
            <h3 className="text-h3 font-display text-ink">{dataLabel}</h3>
            <dl className="mt-6 space-y-4">
              {data.map((item) => (
                <div key={item.label} className="border-b border-line pb-4 last:border-b-0 last:pb-0">
                  <dt className="text-micro uppercase tracking-wider text-ink-muted">{item.label}</dt>
                  <dd className="mt-1 text-body text-ink">{item.value}</dd>
                </div>
              ))}
              <div>
                <dt className="text-micro uppercase tracking-wider text-ink-muted">{contactLabel}</dt>
                <dd className="mt-1">
                  <a href={`mailto:${contactValue}`} className="text-link">
                    {contactValue}
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <div className="card h-fit p-8">
            <h3 className="text-h3 font-display text-ink">{mediaLabel}</h3>
            <p className="mt-4 text-body text-ink-secondary">{mediaDescription}</p>
            <Link href="/medios" className="btn btn-secondary mt-6">
              {mediaCta}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
