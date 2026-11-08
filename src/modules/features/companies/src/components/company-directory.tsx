"use client";

import { useSearchParams } from "next/navigation";
import { useMemo, useState, type ReactNode } from "react";
import { List, Map as MapIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { FilterSidebar } from "./filter-sidebar";
import { CompanyList } from "./company-list";
import { CompanyMapView } from "./company-map-view";
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
  const verifiedFilters = searchParams.getAll("verified");
  const searchQuery = searchParams.get("q")?.trim().toLowerCase() ?? "";
  const womanLabel = t("filter.woman");
  const statusLabel = t("filter.status");
  const verifiedLabel = t("filter.verified");
  const unverifiedLabel = t("filter.unverified");
  const allLabel = t("filter.all");
  const status =
    verifiedFilters.includes("all") ||
    (verifiedFilters.includes("1") && verifiedFilters.includes("0"))
      ? "all"
      : verifiedFilters.includes("0")
        ? "unverified"
        : "verified";

  const matches = useMemo(() => {
    return (company: Company, skip?: "status" | "industry" | "batch" | "region" | "woman" | "search") => {
      if (skip !== "batch" && batchFilters.length > 0) {
        if (!company.batch || !batchFilters.includes(company.batch)) return false;
      }
      if (skip !== "industry" && industryFilters.length > 0) {
        if (!company.industries?.some((id) => industryFilters.includes(id))) return false;
      }
      if (skip !== "region" && regionFilters.length > 0) {
        const region = company.region ? localize(company.region, locale) : "";
        if (!regionFilters.includes(region)) return false;
      }
      if (skip !== "woman" && womanFilters.includes("1")) {
        const hasWoman = getFoundersByCompany(company.slug).some((founder) => founder.woman === true);
        if (!hasWoman) return false;
      }
      if (skip !== "search" && searchQuery) {
        const nameMatch = company.name.toLowerCase().includes(searchQuery);
        const descMatch = company.shortDescription
          ? localize(company.shortDescription, locale).toLowerCase().includes(searchQuery)
          : false;
        if (!nameMatch && !descMatch) return false;
      }
      if (skip !== "status") {
        if (status === "verified" && !company.verified) return false;
        if (status === "unverified" && company.verified) return false;
      }
      return true;
    };
  }, [batchFilters, industryFilters, regionFilters, womanFilters, searchQuery, locale, status]);

  const filtered = useMemo(() => {
    const result = companies.filter((company) => matches(company));
    result.sort((a, b) => {
      if (status === "all" && a.verified !== b.verified) return a.verified ? -1 : 1;
      return a.name.localeCompare(b.name, locale, { sensitivity: "base" });
    });
    return result;
  }, [companies, locale, matches, status]);

  const filterSections = useMemo(() => {
    const pool = (skip: "status" | "industry" | "batch" | "region" | "woman") =>
      companies.filter((company) => matches(company, skip));

    const batchCounts = new Map<string, number>();
    const industryCounts = new Map<StartupIndustry, number>();
    const regionCounts = new Map<string, number>();

    for (const company of pool("batch")) {
      if (company.batch) batchCounts.set(company.batch, (batchCounts.get(company.batch) ?? 0) + 1);
    }
    for (const company of pool("industry")) {
      for (const industry of company.industries ?? []) {
        industryCounts.set(industry, (industryCounts.get(industry) ?? 0) + 1);
      }
    }
    for (const company of pool("region")) {
      if (!company.region) continue;
      const region = localize(company.region, locale);
      regionCounts.set(region, (regionCounts.get(region) ?? 0) + 1);
    }

    const batchLabels: Record<string, string> = {
      early: "Early",
    };

    const industryOrder = Object.keys(STARTUP_INDUSTRIES) as StartupIndustry[];
    const statusPool = pool("status");
    const womanCount = pool("woman").filter((company) =>
      getFoundersByCompany(company.slug).some((founder) => founder.woman === true),
    ).length;
    const verifiedCount = statusPool.filter((company) => company.verified).length;
    const unverifiedCount = statusPool.length - verifiedCount;

    const sections = [
      {
        key: "verified",
        label: statusLabel,
        selection: "single" as const,
        defaultValues: ["1"],
        options: [
          { value: "1", label: verifiedLabel, count: verifiedCount },
          { value: "0", label: unverifiedLabel, count: unverifiedCount },
          { value: "all", label: allLabel, count: statusPool.length },
        ],
      },
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
      if (section.key === "verified") return true;
      const universe =
        section.key === "industry"
          ? pool("industry").length
          : section.key === "batch"
            ? pool("batch").length
            : section.key === "region"
              ? pool("region").length
              : pool("woman").length;
      const coversEveryone = section.options.length === 1 && section.options[0].count === universe;
      return !coversEveryone;
    });
  }, [companies, locale, labels, matches, womanLabel, statusLabel, verifiedLabel, unverifiedLabel, allLabel]);

  const mapped = companies.filter((company) => company.location);
  const [view, setView] = useState<"map" | "list">(mapped.length > 0 ? "map" : "list");
  const viewButton = (id: "map" | "list", label: string, icon: ReactNode) => (
    <button
      type="button"
      aria-pressed={view === id}
      onClick={() => setView(id)}
      className={`inline-flex min-h-11 items-center gap-2 rounded-full px-4 text-small ${
        view === id ? "bg-brand text-on-brand" : "text-ink-secondary"
      }`}
    >
      {icon}
      {label}
    </button>
  );

  return (
    <div className="flex flex-col gap-6">
      {mapped.length > 0 ? (
        <div className="flex justify-end">
          <div
            role="group"
            aria-label={t("viewLabel")}
            className="inline-flex rounded-full border border-line bg-surface p-1"
          >
            {viewButton("map", t("viewMap"), <MapIcon size={18} strokeWidth={1.75} aria-hidden />)}
            {viewButton("list", t("viewList"), <List size={18} strokeWidth={1.75} aria-hidden />)}
          </div>
        </div>
      ) : null}
      {view === "map" && mapped.length > 0 ? (
        <section aria-label={t("mapTitle")}>
          <CompanyMapView companies={mapped} />
        </section>
      ) : (
        <div className="flex flex-col gap-6 [overflow-anchor:none] lg:flex-row lg:gap-8">
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
      )}
    </div>
  );
}
