"use client";

import { Link } from "@/modules/cores/i18n/src/config/routing";
import { useTranslations } from "next-intl";
import { Badge, CompanyLogo } from "@/modules/shared/ui/src/components";
import type { Company } from "@/data/companies";
import { localize } from "@/data/companies";

interface CompanyRowProps {
  company: Company;
  locale: string;
  labels: {
    viewDetail: string;
  };
}

export function CompanyRow({ company, locale, labels }: CompanyRowProps) {
  const t = useTranslations("Companies");
  const industries = company.industries
    ? localize(company.industries, locale)
    : [];
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
      className="group flex items-start gap-4 rounded-md p-4 transition-colors hover:bg-surface-subtle"
    >
      <CompanyLogo name={company.name} logo={company.logo} className="size-10 shrink-0" dark={company.logoDark} />
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h2 className="text-body-lg font-display text-ink group-hover:text-brand truncate">
            {company.name}
          </h2>
          {region && (
            <span className="text-micro text-ink-muted shrink-0">{region}</span>
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
      <span className="text-small text-link shrink-0 opacity-0 transition-opacity group-hover:opacity-100">
        {labels.viewDetail} →
      </span>
    </Link>
  );
}
