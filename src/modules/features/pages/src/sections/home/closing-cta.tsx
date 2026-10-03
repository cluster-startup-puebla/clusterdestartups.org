import { CtaGroup } from "@/modules/shared/ui/src/components";

interface ClosingCtaProps {
  title: string;
  description: string;
  cta: string;
  href: string;
}

export function ClosingCta({ title, description, cta, href }: ClosingCtaProps) {
  return (
    <section className="bg-navy">
      <div className="container-site flex flex-col gap-8 py-16 lg:flex-row lg:items-end lg:justify-between lg:py-32">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-display text-on-brand">{title}</h2>
          <p className="mt-4 text-body-lg text-on-brand/80">{description}</p>
        </div>
        <CtaGroup onDark primary={{ href, label: cta }} />
      </div>
    </section>
  );
}
