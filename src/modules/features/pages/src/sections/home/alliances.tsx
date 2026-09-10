import { LogoItem, LogoRow, SectionHeader } from "@/modules/shared/ui/src/components";

interface AllianceLogo {
  src: string;
  alt: string;
}

interface AlliancesProps {
  eyebrow: string;
  title: string;
  description: string;
  logos: AllianceLogo[];
}

export function Alliances({ eyebrow, title, description, logos }: AlliancesProps) {
  return (
    <section className="bg-surface">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          align="center"
        />
        <LogoRow>
          {logos.map((logo) => (
            <LogoItem key={logo.src} src={logo.src} alt={logo.alt} />
          ))}
        </LogoRow>
      </div>
    </section>
  );
}
