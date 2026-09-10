import { Button, NodeField } from "@/modules/shared/ui/src/components";

interface HeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: string;
  imageSrc: string;
  imageAlt: string;
}

export function Hero({ eyebrow, title, description, primaryCta, imageSrc, imageAlt }: HeroProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Clúster de Startups e Innovación CSI A.C.",
    url: "https://clusterdestartups.org",
    areaServed: "Puebla, México",
    nonprofitStatus: "NonprofitType",
  };

  return (
    <section className="hero-dark relative isolate overflow-hidden">
      <NodeField variant="hero" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-site grid items-center gap-12 py-24 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:py-32">
        <div>
          <p className="text-micro uppercase tracking-wider text-on-brand/70">{eyebrow}</p>
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

        <div className="relative overflow-hidden rounded-lg border border-white/10" style={{ aspectRatio: "16 / 10" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={imageAlt}
            loading="eager"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-navy/45" aria-hidden="true" />
          <div className="absolute inset-0 bg-brand-gradient opacity-30" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
