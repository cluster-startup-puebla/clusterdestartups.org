import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { PressReleases } from "@/modules/features/pages/src/sections/press/press-releases";
import { PressKit } from "@/modules/features/pages/src/sections/press/press-kit";
import { listPosts, CATEGORIES } from "@/modules/features/blog/src/services/markdown";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Press" });
  return buildMetadata({
    locale,
    route: "/prensa",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function PressPage({ params }: PageProps<"/[locale]/prensa">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Press" });

  return (
    <main>
      <PressReleases
        eyebrow={t("releases.eyebrow")}
        title={t("releases.title")}
        description={t("releases.description")}
        badgeLabel={t("releases.badge")}
        entries={listPosts(locale, CATEGORIES.press)}
      />
      <PressKit
        eyebrow={t("kit.eyebrow")}
        title={t("kit.title")}
        description={t("kit.description")}
        dataLabel={t("kit.dataLabel")}
        data={t.raw("kit.data")}
        contactLabel={t("kit.contactLabel")}
        contactValue={t("kit.contactValue")}
        downloadsLabel={t("kit.downloadsLabel")}
        downloads={t.raw("kit.downloads")}
      />
    </main>
  );
}
