import { ImageFrame, SectionHeader, CtaGroup } from "@/modules/shared/ui/src/components";

interface MembershipsHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  imageSrc: string;
  imageAlt: string;
}

export function MembershipsHero({
  eyebrow,
  title,
  description,
  primaryCta,
  secondaryCta,
  imageSrc,
  imageAlt,
}: MembershipsHeroProps) {
  return (
    <section className="bg-surface py-16 lg:py-24">
      <div className="container-site grid items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow={eyebrow} title={title} description={description} as="h1" />
          <div className="mt-8">
            <CtaGroup primary={primaryCta} secondary={secondaryCta} />
          </div>
        </div>
        <ImageFrame src={imageSrc} alt={imageAlt} priority />
      </div>
    </section>
  );
}
