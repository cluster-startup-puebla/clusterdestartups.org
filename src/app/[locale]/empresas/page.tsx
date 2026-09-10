import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/modules/cores/i18n/src/config/routing";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { Badge, CompanyLogo, NodeField } from "@/modules/shared/ui/src/components";
import { companies, localize } from "@/data/companies";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Companies" });
  return buildMetadata({
    locale,
    route: "/empresas",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CompaniesPage({ params }: PageProps<"/[locale]/empresas">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Companies" });

  return (
    <section className="relative isolate overflow-hidden py-16 lg:py-24">
      <NodeField variant="sparse" />
      <div className="container-site">
        <header className="max-w-2xl">
          <h1 className="text-h1 font-display text-ink">{t("title")}</h1>
          <p className="text-body-lg mt-4 text-ink-secondary">{t("subtitle")}</p>
        </header>

        <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {companies.map((company) => {
            const industries = company.industries
              ? localize(company.industries, locale)
              : [t("pending")];

            return (
              <li key={company.slug}>
                <Link
                  href={`/empresas/${company.slug}`}
                  className="card group flex h-full flex-col gap-4 p-6 transition hover:shadow-lg"
                >
                  <CompanyLogo name={company.name} logo={company.logo} />
                  <h2 className="text-h4 font-display text-ink group-hover:text-brand">
                    {company.name}
                  </h2>
                  <ul aria-label={t("detail.industry")} className="mt-auto flex flex-wrap gap-1.5">
                    {industries.slice(0, 4).map((industry) => (
                      <li key={industry}>
                        <Badge>{industry}</Badge>
                      </li>
                    ))}
                  </ul>
                  <span className="text-small text-link">
                    {t("viewDetail")} →
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
