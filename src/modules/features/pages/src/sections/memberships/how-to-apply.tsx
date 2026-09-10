import { SectionHeader, CtaGroup, Steps } from "@/modules/shared/ui/src/components";

interface HowToApplyProps {
  eyebrow: string;
  title: string;
  description: string;
  steps: { title: string; description?: string }[];
  cta: { label: string; href: string };
}

export function HowToApply({ eyebrow, title, description, steps, cta }: HowToApplyProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="mb-12">
          <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        </div>
        <Steps steps={steps} />
        <div className="mt-12">
          <CtaGroup primary={{ label: cta.label, href: cta.href }} />
        </div>
      </div>
    </section>
  );
}
