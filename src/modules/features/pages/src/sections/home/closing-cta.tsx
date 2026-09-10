import { CtaGroup } from "@/modules/shared/ui/src/components";

interface ClosingAudience {
  title: string;
  description: string;
  cta: string;
  href: string;
}

interface ClosingCtaProps {
  title: string;
  description: string;
  audiences: ClosingAudience[];
}

export function ClosingCta({ title, description, audiences }: ClosingCtaProps) {
  return (
    <section className="bg-navy">
      <div className="container-site py-16 lg:py-32">
        <div className="max-w-2xl">
          <h2 className="text-h2 text-on-brand font-display">{title}</h2>
          <p className="mt-4 text-body-lg text-on-brand/80">{description}</p>
        </div>
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          {audiences.map((audience) => (
            <div
              key={audience.title}
              className="rounded-lg border border-on-brand/20 p-8"
            >
              <h3 className="text-h3 text-on-brand font-display">{audience.title}</h3>
              <p className="mt-2 text-body text-on-brand/80">{audience.description}</p>
              <div className="mt-6">
                <CtaGroup
                  onDark
                  primary={{ href: audience.href, label: audience.cta }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
