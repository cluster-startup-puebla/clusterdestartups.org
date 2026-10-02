import { CompanyLogo } from "@/modules/shared/ui/src/components";
import { Link } from "@/modules/cores/i18n/src/config/routing";

export interface LinkedCompany {
  slug: string;
  name: string;
  description?: string;
  logo?: string;
  logoDark?: boolean;
  logoInk?: boolean;
}

interface LinkedCompaniesProps {
  companies: LinkedCompany[];
  label: string;
  viewLabel: string;
}

export function LinkedCompanies({ companies, label, viewLabel }: LinkedCompaniesProps) {
  if (companies.length === 0) return null;

  return (
    <aside className="mt-12">
      <h2 className="text-micro uppercase tracking-wider text-ink-muted">{label}</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {companies.map((company) => (
          <li key={company.slug}>
            <Link
              href={`/empresas/${company.slug}`}
              className="card group flex items-center gap-4 p-4 transition hover:border-accent"
            >
              <CompanyLogo
                name={company.name}
                logo={company.logo}
                dark={company.logoDark}
                ink={company.logoInk}
                className="size-14 shrink-0 bg-elevated"
              />
              <span className="min-w-0 flex-1">
                <span className="block text-body font-display text-ink group-hover:text-brand">
                  {company.name}
                </span>
                {company.description && (
                  <span className="mt-1 block text-small text-ink-secondary">
                    {company.description}
                  </span>
                )}
              </span>
              <span className="hidden shrink-0 text-small text-link sm:inline">
                {viewLabel} →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
