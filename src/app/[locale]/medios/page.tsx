import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { OFFICE_ADDRESS_WITH_PLACE, withOfficeAddress } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { MediaKit, type MediaKitProps } from "@/modules/features/pages/src/sections/media/media-kit";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Media" });
  return buildMetadata({
    locale,
    route: "/medios",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MediaPage({ params }: PageProps<"/[locale]/medios">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Media" });

  const facts = t.raw("facts") as MediaKitProps["facts"];

  return (
    <main>
      <MediaKit
        heroEyebrow={t("heroEyebrow")}
        heroTitle={t("heroTitle")}
        heroDescription={t("heroDescription")}
        downloadLabel={t("downloadLabel")}
        downloadHref={t("downloadHref")}
        contactLabel={t("contactLabel")}
        contactEmail={t("contactEmail")}
        copyLabel={t("copyLabel")}
        copiedLabel={t("copiedLabel")}
        naming={t.raw("naming")}
        facts={{
          ...facts,
          items: facts.items.map((item) => ({
            ...item,
            value: withOfficeAddress(item.value, OFFICE_ADDRESS_WITH_PLACE),
          })),
        }}
        logos={t.raw("logos")}
        rules={t.raw("rules")}
        brand={t.raw("brand")}
        people={t.raw("people")}
        links={t.raw("links")}
        license={t.raw("license")}
      />
    </main>
  );
}
