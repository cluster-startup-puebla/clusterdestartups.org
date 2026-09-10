import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { About } from "@/modules/features/pages/src/sections/home/about";
import { ClosingCta } from "@/modules/features/pages/src/sections/home/closing-cta";
import { Hero } from "@/modules/features/pages/src/sections/home/hero";
import { ImpactStats } from "@/modules/features/pages/src/sections/home/impact-stats";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Home" });
  return buildMetadata({
    locale,
    route: "/",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const stats = (["companies", "hubSpace", "nodes", "industries"] as const).map((key) => ({
    value: t(`stats.items.${key}.value`),
    label: t(`stats.items.${key}.label`),
    note: t(`stats.items.${key}.note`),
  }));

  return (
    <>
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryCta={t("hero.primaryCta")}
        imageSrc="/hub/hero-hub-general.jpg"
        imageAlt={t("hero.imageAlt")}
      />
      <ImpactStats
        eyebrow={t("stats.eyebrow")}
        title={t("stats.title")}
        description={t("stats.description")}
        footnote={t("stats.footnote")}
        stats={stats}
      />
      <About
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.description")}
        imageSrc="/quienes-somos/diagrama-triple-helice.svg"
        imageAlt={t("about.imageAlt")}
        linkLabel={t("about.linkLabel")}
      />
      <ClosingCta
        title={t("closing.title")}
        description={t("closing.description")}
        audiences={[
          {
            title: t("closing.institutions.title"),
            description: t("closing.institutions.description"),
            cta: t("closing.institutions.cta"),
            href: "/contacto",
          },
        ]}
      />
    </>
  );
}
