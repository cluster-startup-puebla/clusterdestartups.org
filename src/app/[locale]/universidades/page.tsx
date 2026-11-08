import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { NodeField } from "@/modules/shared/ui/src/components";
import { localize } from "@/data/companies";
import {
  getCompaniesByUniversity,
  getFoundersByUniversity,
  universities,
} from "@/data/universities";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Universities" });
  return buildMetadata({
    locale,
    route: "/universidades",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function UniversitiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Universities" });
  const list = [...universities].sort((a, b) => a.name.localeCompare(b.name, "es"));

  return (
    <section className="relative isolate overflow-hidden pt-16 lg:pt-24">
      <NodeField variant="sparse" />
      <div className="container-site pb-16 lg:pb-24">
        <header className="max-w-2xl">
          <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <h1 className="text-h1 font-display text-ink">{t("title")}</h1>
            <p className="text-small text-ink-muted">{t("count", { count: list.length })}</p>
          </div>
          <p className="text-body-lg mt-4 text-ink-secondary">{t("subtitle")}</p>
        </header>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {list.map((university) => {
            const people = getFoundersByUniversity(university.slug).length;
            const startups = getCompaniesByUniversity(university.slug).length;
            return (
              <li key={university.slug} className="min-w-0">
                <Link href={`/universidades/${university.slug}`} className="card group flex h-full items-start gap-5 p-6">
                  <span className="flex size-16 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-line bg-elevated">
                    {university.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={university.logo} alt="" className="size-full object-contain" />
                    ) : (
                      <span className="font-display text-h3 text-ink">{university.shortName.slice(0, 1)}</span>
                    )}
                  </span>
                  <span className="min-w-0">
                    <span className="block font-display text-h4 text-ink group-hover:text-brand">{university.name}</span>
                    <span className="mt-2 block text-small text-ink-secondary">{localize(university.summary, locale)}</span>
                    <span className="mt-3 block text-micro text-ink-muted">
                      {t("foundersCount", { count: people })}
                      {" · "}
                      {t("startupsCount", { count: startups })}
                    </span>
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
