import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { NodeField } from "@/modules/shared/ui/src/components";
import { FounderDirectory } from "@/modules/features/founders/src";
import { founders } from "@/data/founders";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Founders" });
  return buildMetadata({
    locale,
    route: "/fundadores",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function FoundersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Founders" });

  const labels = {
    search: t("filter.search"),
    industry: t("filter.industry"),
    region: t("filter.region"),
    clear: t("filter.clear"),
    filters: t("filter.filters"),
    noResults: t("filter.noResults"),
  };

  return (
    <section className="relative isolate overflow-hidden pt-16 lg:pt-24">
      <NodeField variant="sparse" />
      <div className="container-site pb-16 lg:pb-24">
        <header className="max-w-2xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1 className="text-h1 font-display text-ink">{t("title")}</h1>
            <p className="text-small text-ink-muted">{t("count", { count: founders.length })}</p>
          </div>
          <p className="text-body-lg mt-4 text-ink-secondary">{t("subtitle")}</p>
        </header>

        <div className="mt-12">
          <Suspense>
            <FounderDirectory founders={founders} locale={locale} labels={labels} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
