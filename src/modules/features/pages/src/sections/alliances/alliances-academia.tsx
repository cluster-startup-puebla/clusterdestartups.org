import { LogoItem } from "@/modules/shared/ui/src/components";

interface AlliancesAcademiaProps {
  eyebrow: string;
  title: string;
  description: string;
  partners: {
    name: string;
    agreement: string;
    relation: string;
    logo: { src: string; alt: string };
  }[];
}

export function AlliancesAcademia({ eyebrow, title, description, partners }: AlliancesAcademiaProps) {
  return (
    <section className="bg-surface-subtle py-16 lg:py-24">
      <div className="container-site">
        <div className="max-w-2xl">
          <p className="text-micro uppercase tracking-wider text-accent">{eyebrow}</p>
          <h2 className="text-h2 mt-3 font-display text-ink">{title}</h2>
          <p className="mt-4 text-body-lg text-ink-secondary">{description}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {partners.map((partner) => (
            <div key={partner.name} className="card flex flex-col gap-5 p-8">
              <LogoItem src={partner.logo.src} alt={partner.logo.alt} />
              <span className="badge-brand self-start">{partner.agreement}</span>
              <h3 className="text-h4 font-display text-ink">{partner.name}</h3>
              <p className="text-body text-ink-secondary">{partner.relation}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
