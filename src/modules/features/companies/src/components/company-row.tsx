"use client";

import { Link } from "@/modules/cores/i18n/src/config/routing";
import { useTranslations } from "next-intl";
import { Badge, CompanyLogo } from "@/modules/shared/ui/src/components";
import { localize, STARTUP_INDUSTRIES, type Company } from "@/data/companies";

interface CompanyRowProps {
  company: Company;
  locale: string;
  labels: {
    viewDetail: string;
  };
}

export function CompanyRow({ company, locale, labels }: CompanyRowProps) {
  const t = useTranslations("Companies");
  const industries = (company.industries ?? []).map((id) =>
    localize(STARTUP_INDUSTRIES[id], locale),
  );
  const shown = industries.slice(0, 2);
  const overflow = industries.length - shown.length;
  const batchLabel = company.batch === "early" ? "Early" : company.batch;
  const description = company.shortDescription
    ? localize(company.shortDescription, locale)
    : undefined;
  const region = company.region
    ? localize(company.region, locale)
    : undefined;

  return (
    <Link
      href={`/empresas/${company.slug}`}
      className="group flex items-center gap-4 rounded-md px-4 py-3 transition-colors hover:bg-surface-subtle"
    >
      <CompanyLogo
        name={company.name}
        logo={company.logo}
        className="h-[46px] w-[91px] shrink-0 sm:h-[53px] sm:w-[122px]"
        dark={company.logoDark}
        ink={company.logoInk}
      />
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <h2 className="max-w-full text-body-lg font-display text-ink group-hover:text-brand">
            {company.name}
          </h2>
          {region && (
            <span className="text-micro text-ink-muted">{region}</span>
          )}
        </div>
        {description && (
          <p className="mt-0.5 text-small text-ink-secondary line-clamp-1">{description}</p>
        )}
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Tags">
          {batchLabel && (
            <li>
              <Badge>{batchLabel}</Badge>
            </li>
          )}
          {shown.map((industry) => (
            <li key={industry}>
              <Badge>{industry}</Badge>
            </li>
          ))}
          {overflow > 0 && (
            <li>
              <Badge className="bg-surface text-ink-muted">{t("list.more", { count: overflow })}</Badge>
            </li>
          )}
        </ul>
      </div>
      <span className="hidden text-small text-link shrink-0 opacity-0 transition-opacity group-hover:opacity-100 sm:inline">
        {labels.viewDetail} →
      </span>
    </Link>
  );
}
