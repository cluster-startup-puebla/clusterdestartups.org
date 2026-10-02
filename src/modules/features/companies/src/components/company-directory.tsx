"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { CompanyList } from "./company-list";
import { localize, STARTUP_INDUSTRIES, type Company, type StartupIndustry } from "@/data/companies";

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
  const searchParams = useSearchParams();

  const batchFilters = searchParams.getAll("batch");
  const industryFilters = searchParams.getAll("industry");
  const regionFilters = searchParams.getAll("region");
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";

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
  }, [companies, locale, batchFilters, industryFilters, regionFilters, searchQuery]);

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
    ];

    return sections.filter((section) => {
      if (section.options.length === 0) return false;
      const coversEveryone =
        section.options.length === 1 && section.options[0].count === companies.length;
      return !coversEveryone;
    });
  }, [companies, locale, labels]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <FilterSidebar
        sections={filterSections}
        searchPlaceholder={labels.search}
        labels={{ clear: labels.clear, search: labels.search, filters: labels.filters }}
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
