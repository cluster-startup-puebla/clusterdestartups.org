import { ImageFrame, SectionHeader } from "@/modules/shared/ui/src/components";

interface PressKitProps {
  eyebrow: string;
  title: string;
  description: string;
  dataLabel: string;
  data: { label: string; value: string }[];
  contactLabel: string;
  contactValue: string;
  downloadsLabel: string;
  downloads: { label: string; href: string }[];
}

export function PressKit({
  eyebrow,
  title,
  description,
  dataLabel,
  data,
  contactLabel,
  contactValue,
  downloadsLabel,
  downloads,
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
          <div>
            <h3 className="text-h3 font-display text-ink">{downloadsLabel}</h3>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {downloads.map((item) => (
                <div key={item.href} className="flex flex-col gap-4">
                  <ImageFrame
                    src={item.href}
                    alt={item.label}
                    ratio="3 / 2"
                  />
                  <a
                    href={item.href}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary self-start"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
