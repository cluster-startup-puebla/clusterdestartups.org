import { CtaGroup } from "@/modules/shared/ui/src/components";

interface NodesCtaProps {
  title: string;
  description: string;
  cta: { href: string; label: string };
}

export function NodesCta({ title, description, cta }: NodesCtaProps) {
  return (
    <section className="bg-navy py-16 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <h2 className="text-h2 font-display text-on-brand">{title}</h2>
          <p className="mt-4 text-body-lg text-on-brand/80">{description}</p>
          <div className="mt-8">
            <CtaGroup primary={cta} onDark />
          </div>
        </div>
      </div>
    </section>
  );
}
