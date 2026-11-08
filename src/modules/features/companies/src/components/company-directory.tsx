"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { useTranslations } from "next-intl";
import { FilterSidebar } from "./filter-sidebar";
import { CompanyList } from "./company-list";
import { localize, STARTUP_INDUSTRIES, type Company, type StartupIndustry } from "@/data/companies";
import { getFoundersByCompany } from "@/data/founders";

interface CompanyDirectoryProps {
  companies: readonly Company[];
  locale: string;
  labels: {
    search: string;
    batch: string;
    industry: string;
    region: string;
    clear: string;
    filters: string;
    viewDetail: string;
    noResults: string;
  };
}

export function CompanyDirectory({ companies, locale, labels }: CompanyDirectoryProps) {
  const t = useTranslations("Companies");
  const searchParams = useSearchParams();

  const batchFilters = searchParams.getAll("batch");
  const industryFilters = searchParams.getAll("industry");
  const regionFilters = searchParams.getAll("region");
  const womanFilters = searchParams.getAll("woman");
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const womanLabel = t("filter.woman");

  const filtered = useMemo(() => {
    let result = [...companies];

    if (batchFilters.length > 0) {
      result = result.filter((c) => c.batch && batchFilters.includes(c.batch));
    }

    if (industryFilters.length > 0) {
      result = result.filter((c) =>
        c.industries?.some((id) => industryFilters.includes(id)),
      );
    }

    if (regionFilters.length > 0) {
      result = result.filter((c) => {
        if (!c.region) return false;
        const companyRegion = localize(c.region, locale);
        return regionFilters.includes(companyRegion);
      });
    }

    if (womanFilters.includes("1")) {
      result = result.filter((company) =>
        getFoundersByCompany(company.slug).some((founder) => founder.woman === true),
      );
    }

    if (searchQuery) {
      result = result.filter((c) => {
        const nameMatch = c.name.toLowerCase().includes(searchQuery);
        const descMatch = c.shortDescription
          ? localize(c.shortDescription, locale).toLowerCase().includes(searchQuery)
          : false;
        return nameMatch || descMatch;
      });
    }

    return result;
  }, [companies, locale, batchFilters, industryFilters, regionFilters, womanFilters, searchQuery]);

  const filterSections = useMemo(() => {
    const batchCounts = new Map<string, number>();
    const industryCounts = new Map<StartupIndustry, number>();
    const regionCounts = new Map<string, number>();

    for (const company of companies) {
      if (company.batch) {
        batchCounts.set(company.batch, (batchCounts.get(company.batch) ?? 0) + 1);
      }
      for (const industry of company.industries ?? []) {
        industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
      }
      if (company.region) {
        const region = localize(company.region, locale);
        regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
      }
    }

    const batchLabels: Record<string, string> = {
      early: "Early",
    };

    const industryOrder = Object.keys(STARTUP_INDUSTRIES) as StartupIndustry[];
    const womanCount = companies.filter((company) =>
      getFoundersByCompany(company.slug).some((founder) => founder.woman === true),
    ).length;

    const sections = [
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
        key: "batch",
        label: labels.batch,
        options: Array.from(batchCounts.entries()).map(([value, count]) => ({
          value,
          label: batchLabels[value] ?? value,
          count,
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
    ];

    return sections.filter((section) => {
      if (section.options.length === 0) return false;
      const coversEveryone =
        section.options.length === 1 && section.options[0].count === companies.length;
      return !coversEveryone;
    });
  }, [companies, locale, labels, womanLabel]);

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
        <CompanyList
          companies={filtered}
          locale={locale}
          labels={{
            viewDetail: labels.viewDetail,
            noResults: labels.noResults,
          }}
        />
      </div>
    </div>
  );
}
