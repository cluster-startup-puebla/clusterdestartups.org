import { ArrowRight } from "lucide-react";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { companies } from "@/data/companies";
import { CompanyLogo, SectionHeader } from "@/modules/shared/ui/src/components";

interface CompaniesStripProps {
  eyebrow: string;
  title: string;
  description: string;
  linkLabel: string;
}

export function CompaniesStrip({ eyebrow, title, description, linkLabel }: CompaniesStripProps) {
  const listed = companies.filter((company) => company.logo);
  if (listed.length === 0) return null;

  return (
    <section className="bg-surface-subtle">
      <div className="container-site py-16 lg:py-32">
        <SectionHeader eyebrow={eyebrow} title={title} description={description} />
        <ul className="mt-12 flex flex-wrap items-center justify-center gap-4">
          {listed.map((company) => (
            <li key={company.slug}>
              <Link
                href={`/empresas/${company.slug}`}
                className="bg-elevated flex h-20 w-40 items-center justify-center rounded-md border border-line px-4"
              >
                <CompanyLogo
                  name={company.name}
                  logo={company.logo}
                  dark={company.logoDark}
                  ink={company.logoInk}
                  className="h-12 w-full"
                />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/empresas"
          className="mt-8 inline-flex items-center gap-2 text-body font-medium text-link"
        >
          {linkLabel}
          <ArrowRight strokeWidth={1.5} className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </section>
  );
}
