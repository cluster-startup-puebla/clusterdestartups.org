import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { SectionHeader } from "@/modules/shared/ui/src/components";
import { OriginTimelineSection } from "@/modules/features/pages/src/sections/about/origin-timeline-section";
import { MissionVisionSection } from "@/modules/features/pages/src/sections/about/mission-vision-section";
import { TripleHelixSection } from "@/modules/features/pages/src/sections/about/triple-helix-section";
import { EcosystemStructureSection } from "@/modules/features/pages/src/sections/about/ecosystem-structure-section";
import { LegalDataSection } from "@/modules/features/pages/src/sections/about/legal-data-section";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return buildMetadata({
    locale,
    route: "/quienes-somos",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AboutPage({ params }: PageProps<"/[locale]/quienes-somos">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "About" });

  return (
    <>
      <section className="bg-surface py-16 lg:py-24">
        <div className="container-site">
          <SectionHeader
            as="h1"
            eyebrow={t("heroEyebrow")}
            title={t("heroTitle")}
            description={t("heroDescription")}
          />
        </div>
      </section>
      <OriginTimelineSection
        eyebrow={t("originEyebrow")}
        title={t("originTitle")}
        description={t("originDescription")}
        image={{ src: "/assets/img/gala-lanzamiento-jul2026.jpg", alt: t("originImageAlt"), ratio: "4 / 3" }}
        items={[
          {
            date: t("originItem1Date"),
            title: t("originItem1Title"),
            description: t("originItem1Description"),
          },
          {
            date: t("originItem2Date"),
            title: t("originItem2Title"),
            description: t("originItem2Description"),
          },
          {
            date: t("originItem3Date"),
            title: t("originItem3Title"),
            description: t("originItem3Description"),
          },
          // TODO: Gala de lanzamiento (jul 2026) — pendiente de publicar
          // {
          //   date: t("originItem4Date"),
          //   title: t("originItem4Title"),
          //   description: t("originItem4Description"),
          // },
        ]}
      />
      <MissionVisionSection
        eyebrow={t("missionEyebrow")}
        title={t("missionTitle")}
        description={t("missionDescription")}
        mission={{ title: t("missionCardTitle"), text: t("missionCardText") }}
        vision={{ title: t("visionCardTitle"), text: t("visionCardText") }}
      />
      <TripleHelixSection
        eyebrow={t("helixEyebrow")}
        title={t("helixTitle")}
        description={t("helixDescription")}
        image={{
          src: "/assets/img/diagrama-triple-helice-detalle.svg",
          alt: t("helixImageAlt"),
        }}
        actors={[
          { title: t("helixGovTitle"), text: t("helixGovText") },
          { title: t("helixAcademyTitle"), text: t("helixAcademyText") },
          { title: t("helixIndustryTitle"), text: t("helixIndustryText") },
        ]}
      />
      <EcosystemStructureSection
        eyebrow={t("ecosystemEyebrow")}
        title={t("ecosystemTitle")}
        description={t("ecosystemDescription")}
        image={{
          src: "/assets/img/diagrama-ecosistema-publico.svg",
          alt: t("ecosystemImageAlt"),
        }}
        levels={[
          {
            badge: t("level1Badge"),
            title: t("level1Title"),
            description: t("level1Description"),
          },
          {
            badge: t("level2Badge"),
            title: t("level2Title"),
            description: t("level2Description"),
          },
          {
            badge: t("level3Badge"),
            title: t("level3Title"),
            description: t("level3Description"),
          },
          {
            badge: t("level4Badge"),
            title: t("level4Title"),
            description: t("level4Description"),
          },
          {
            badge: t("level5Badge"),
            title: t("level5Title"),
            description: t("level5Description"),
          },
          {
            badge: t("level6Badge"),
            title: t("level6Title"),
            description: t("level6Description"),
          },
          {
            badge: t("level7Badge"),
            title: t("level7Title"),
            description: t("level7Description"),
          },
        ]}
      />
      <LegalDataSection
        eyebrow={t("legalEyebrow")}
        title={t("legalTitle")}
        description={t("legalDescription")}
        ctaLabel={t("legalCtaLabel")}
        facts={[
          { label: t("legalFactNameLabel"), value: t("legalFactNameValue") },
          { label: t("legalFactRfcLabel"), value: t("legalFactRfcValue") },
          { label: t("legalFactDateLabel"), value: t("legalFactDateValue") },
        ]}
      />
    </>
  );
}
