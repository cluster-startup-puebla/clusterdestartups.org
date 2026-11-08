"use client";

import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { Badge, VerifiedMark } from "@/modules/shared/ui/src/components";
import { localize, STARTUP_INDUSTRIES } from "@/data/companies";
import { founderCompany, type Founder } from "@/data/founders";
import { FounderAvatar } from "./founder-avatar";

interface FounderRowProps {
  founder: Founder;
  locale: string;
}

export function FounderRow({ founder, locale }: FounderRowProps) {
  const t = useTranslations("Founders");
  const company = founderCompany(founder);
  const industries = (company?.industries ?? [])
    .slice(0, 2)
    .map((id) => localize(STARTUP_INDUSTRIES[id], locale));

  return (
    <Link
      href={`/fundadores/${founder.slug}`}
      className="group flex items-center gap-4 rounded-md px-4 py-4 transition-colors hover:bg-surface-subtle"
    >
      <FounderAvatar name={founder.name} photo={founder.photo} className="size-12 text-small" />
      <div className="min-w-0 flex-1">
        <h2 className="text-body-lg font-display text-ink">
          <span className="group-hover:text-brand">{founder.name}</span>{" "}
          <VerifiedMark verified={founder.verified} className="inline-block size-4 align-[-0.15em]" />
        </h2>
        {company && founder.role && (
          <p className="mt-0.5 text-small text-ink-secondary">
            {t("roleAt", { role: founder.role, company: company.name })}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          {industries.map((industry) => (
            <Badge key={industry}>{industry}</Badge>
          ))}
          {company && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface px-2 py-0.5 text-micro text-ink-secondary">
              {company.logo && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={company.logo} alt="" className="size-4 object-contain" />
              )}
              {company.name}{" "}
              <VerifiedMark verified={company.verified} className="inline-block size-3 align-[-0.15em]" />
            </span>
          )}
        </div>
      </div>
      <ChevronRight
        size={16}
        strokeWidth={2}
        aria-hidden="true"
        className="shrink-0 text-ink-muted transition group-hover:text-brand"
      />
    </Link>
  );
}
