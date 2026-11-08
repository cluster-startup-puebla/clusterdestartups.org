import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { COMMITTEE_SLUGS, getCommittee } from "@/data/committees";
import { CommitteeDetail } from "@/modules/features/pages/src/sections/governance/committee-detail";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    COMMITTEE_SLUGS.map((comite) => ({ locale, comite })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; comite: string }>;
}): Promise<Metadata> {
  const { locale, comite } = await params;
  const committee = getCommittee(comite);
  if (!committee) return {};
  const t = await getTranslations({ locale, namespace: "Governance" });
  return buildMetadata({
    locale,
    route: `/gobernanza/${committee.slug}`,
    title: t(committee.metaTitleKey as never),
    description: t(committee.metaDescriptionKey as never),
  });
}

export default async function CommitteePage({
  params,
}: PageProps<"/[locale]/gobernanza/[comite]">) {
  const { locale, comite } = await params;
  setRequestLocale(locale);
  const committee = getCommittee(comite);
  if (!committee) notFound();
  return <CommitteeDetail locale={locale} committee={committee} />;
}
