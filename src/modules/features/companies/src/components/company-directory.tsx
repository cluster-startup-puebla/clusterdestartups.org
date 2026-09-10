"use client";

import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { FilterSidebar } from "./filter-sidebar";
import { CompanyList } from "./company-list";
import { localize, type Company } from "@/data/companies";

interface CompanyDirectoryProps {
  companies: readonly Company[];
  locale: string;
  labels: {
    search: string;
    batch: string;
    industry: string;
    region: string;
    clear: string;
    viewDetail: string;
    noResults: string;
  };
}

export function CompanyDirectory({ companies, locale, labels }: CompanyDirectoryProps) {
  const searchParams = useSearchParams();

  const batchFilters = searchParams.getAll("batch");
  const industryFilters = searchParams.getAll("industry");
  const regionFilters = searchParams.getAll("region");
  const searchQuery = searchParams.get("q")?.toLowerCase() ?? "";

  const filtered = useMemo(() => {
    let result = [...companies];

    if (batchFilters.length > 0) {
      result = result.filter((c) => c.batch && batchFilters.includes(c.batch));
    }

    if (industryFilters.length > 0) {
      result = result.filter((c) => {
        if (!c.industries) return false;
        const companyIndustries = localize(c.industries, locale);
        return industryFilters.some((f) => companyIndustries.includes(f));
      });
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
    const industryCounts = new Map<string, number>();
    const regionCounts = new Map<string, number>();

    for (const company of companies) {
      if (company.batch) {
        batchCounts.set(company.batch, (batchCounts.get(company.batch) ?? 0) + 1);
      }
      if (company.industries) {
        for (const industry of localize(company.industries, locale)) {
          industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
        }
      }
      if (company.region) {
        const region = localize(company.region, locale);
        regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
      }
    }

    const batchLabels: Record<string, string> = {
      early: "Early",
    };

    return [
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
        key: "industry",
        label: labels.industry,
        options: Array.from(industryCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([value, count]) => ({ value, label: value, count })),
      },
      {
        key: "region",
        label: labels.region,
        options: Array.from(regionCounts.entries())
          .sort((a, b) => b[1] - a[1])
          .map(([value, count]) => ({ value, label: value, count })),
      },
    ];
  }, [companies, locale, labels]);

  return (
    <div className="flex flex-col gap-8 lg:flex-row">
      <FilterSidebar
        sections={filterSections}
        searchPlaceholder={labels.search}
        labels={{ clear: labels.clear, search: labels.search }}
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
