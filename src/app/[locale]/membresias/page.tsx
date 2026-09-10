import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { MembershipsHero } from "@/modules/features/pages/src/sections/memberships/memberships-hero";
import { WhyJoin } from "@/modules/features/pages/src/sections/memberships/why-join";
import { Levels } from "@/modules/features/pages/src/sections/memberships/levels";
import { HowToApply } from "@/modules/features/pages/src/sections/memberships/how-to-apply";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Memberships" });
  return buildMetadata({
    locale,
    route: "/membresias",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function MembershipsPage({ params }: PageProps<"/[locale]/membresias">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Memberships" });

  return (
    <main>
      <MembershipsHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryCta={{ label: t("hero.primaryCta"), href: "/contacto" }}
        secondaryCta={{ label: t("hero.secondaryCta"), href: "/" }}
        imageSrc="/membresias/membresias-makers-trabajando.jpg"
        imageAlt={t("hero.imageAlt")}
      />
      <WhyJoin
        eyebrow={t("why.eyebrow")}
        title={t("why.title")}
        description={t("why.description")}
        items={t.raw("why.items")}
      />
      <Levels
        eyebrow={t("levels.eyebrow")}
        title={t("levels.title")}
        description={t("levels.description")}
        groups={[
          {
            label: t("levels.makersLabel"),
            note: t("levels.makersNote"),
            items: t.raw("levels.makers"),
          },
          {
            label: t("levels.companiesLabel"),
            note: t("levels.companiesNote"),
            items: t.raw("levels.companies"),
          },
        ]}
      />
      <HowToApply
        eyebrow={t("apply.eyebrow")}
        title={t("apply.title")}
        description={t("apply.description")}
        steps={t.raw("apply.steps")}
        cta={{ label: t("apply.cta.label"), href: "/contacto" }}
      />
    </main>
  );
}
