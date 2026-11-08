import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { GovernanceIndex } from "@/modules/features/pages/src/sections/governance/governance-index";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Governance" });
  return buildMetadata({
    locale,
    route: "/gobernanza",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function GovernancePage({ params }: PageProps<"/[locale]/gobernanza">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <GovernanceIndex locale={locale} />;
}
