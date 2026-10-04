import { Button, NodeField } from "@/modules/shared/ui/src/components";
import { HeroCarousel } from "./hero-carousel";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
}

export function Hero({ eyebrow, title, description, primaryCta }: HeroProps) {
  return (
    <section className="hero-dark relative isolate overflow-hidden">
      <NodeField variant="hero" />
      <div className="container-site grid items-center gap-12 py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <p className="text-micro uppercase tracking-wider text-on-brand">{eyebrow}</p>
          <h1 className="mt-6 max-w-3xl text-h2 font-display text-white sm:text-h1">
            {title}
          </h1>
          <p className="mt-6 max-w-xl text-body-lg text-on-brand/80">{description}</p>
          <div className="mt-10">
            <Button variant="on-dark" href="/quienes-somos">
              {primaryCta}
            </Button>
          </div>
        </div>

        <HeroCarousel />
      </div>
    </section>
  );
}
