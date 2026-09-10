import { CompanyRow } from "./company-row";
import type { Company } from "@/data/companies";

interface CompanyListProps {
  companies: Company[];
  locale: string;
  labels: {
    viewDetail: string;
    noResults: string;
  };
}

export function CompanyList({ companies, locale, labels }: CompanyListProps) {
  if (companies.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <p className="text-body text-ink-secondary">{labels.noResults}</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-line">
      {companies.map((company) => (
        <CompanyRow
          key={company.slug}
          company={company}
          locale={locale}
          labels={{ viewDetail: labels.viewDetail }}
        />
      ))}
    </div>
  );
}
