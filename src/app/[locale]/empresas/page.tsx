import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { NodeField } from "@/modules/shared/ui/src/components";
import { CompanyDirectory } from "@/modules/features/companies/src";
import { companies } from "@/data/companies";

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

  const labels = {
    search: t("filter.search"),
    batch: t("filter.batch"),
    industry: t("filter.industry"),
    region: t("filter.region"),
    clear: t("filter.clear"),
    viewDetail: t("viewDetail"),
    more: t("list.more"),
    noResults: t("filter.noResults"),
  };

  return (
    <section className="relative isolate overflow-hidden py-16 lg:py-24">
      <NodeField variant="sparse" />
      <div className="container-site">
        <header className="max-w-2xl">
          <h1 className="text-h1 font-display text-ink">{t("title")}</h1>
          <p className="text-body-lg mt-4 text-ink-secondary">{t("subtitle")}</p>
        </header>

        <div className="mt-12">
          <Suspense>
            <CompanyDirectory companies={companies} locale={locale} labels={labels} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
