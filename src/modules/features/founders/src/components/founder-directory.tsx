"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { FilterSidebar } from "@/modules/features/companies/src/components/filter-sidebar";
import { localize, STARTUP_INDUSTRIES, type StartupIndustry } from "@/data/companies";
import { founderCompany, type Founder } from "@/data/founders";
import { FounderRow } from "./founder-row";

interface FounderDirectoryProps {
  founders: readonly Founder[];
  locale: string;
  labels: {
    search: string;
    industry: string;
    region: string;
    clear: string;
    filters: string;
    noResults: string;
  };
}

export function FounderDirectory({ founders, locale, labels }: FounderDirectoryProps) {
  const t = useTranslations("Founders");
  const searchParams = useSearchParams();
  const industryFilters = searchParams.getAll("industry");
  const regionFilters = searchParams.getAll("region");
  const womanFilters = searchParams.getAll("woman");
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const womanLabel = t("filter.woman");

  const filtered = useMemo(() => {
    return founders.filter((founder) => {
      const company = founderCompany(founder);
      if (industryFilters.length > 0) {
        const matches = company?.industries?.some((id) => industryFilters.includes(id));
        if (!matches) return false;
      }
      if (regionFilters.length > 0) {
        const region = company?.region ? localize(company.region, locale) : "";
        if (!regionFilters.includes(region)) return false;
      }
      if (womanFilters.includes("1") && founder.woman !== true) return false;
      if (searchQuery) {
        const haystack = `${founder.name} ${company?.name ?? ""}`.toLowerCase();
        if (!haystack.includes(searchQuery)) return false;
      }
      return true;
    });
  }, [founders, locale, industryFilters, regionFilters, womanFilters, searchQuery]);

  const filterSections = useMemo(() => {
    const industryCounts = new Map<StartupIndustry, number>();
    const regionCounts = new Map<string, number>();

    for (const founder of founders) {
      const company = founderCompany(founder);
      for (const industry of company?.industries ?? []) {
        industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
      }
      if (company?.region) {
        const region = localize(company.region, locale);
        regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
      }
    }

    const industryOrder = Object.keys(STARTUP_INDUSTRIES) as StartupIndustry[];
    const womanCount = founders.filter((founder) => founder.woman === true).length;

    return [
      {
        key: "industry",
        label: labels.industry,
        options: industryOrder
          .filter((id) => industryCounts.has(id))
          .map((id) => ({
            value: id,
            label: localize(STARTUP_INDUSTRIES[id], locale),
            count: industryCounts.get(id) ?? 0,
          })),
      },
      {
        key: "region",
        label: labels.region,
        options: Array.from(regionCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([value, count]) => ({ value, label: value, count })),
      },
      {
        key: "woman",
        label: womanLabel,
        options:
          womanCount > 0
            ? [{ value: "1", label: womanLabel, count: womanCount }]
            : [],
      },
    ].filter((section) => section.options.length > 0);
  }, [founders, locale, labels, womanLabel]);

  return (
    <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
      <FilterSidebar
        sections={filterSections}
        searchPlaceholder={labels.search}
        labels={{
          clear: labels.clear,
          search: labels.search,
          filters: labels.filters,
          close: t("filter.close"),
          remove: t("filter.remove"),
          active: t("filter.active"),
        }}
      />
      <div className="min-w-0 flex-1">
        <p className="mb-3 text-small text-ink-muted">
          {t("showing", { count: filtered.length })}
        </p>
        {filtered.length === 0 ? (
          <p className="py-16 text-center text-body text-ink-secondary">{labels.noResults}</p>
        ) : (
          <div className="divide-y divide-line">
            {filtered.map((founder) => (
              <FounderRow key={founder.slug} founder={founder} locale={locale} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
