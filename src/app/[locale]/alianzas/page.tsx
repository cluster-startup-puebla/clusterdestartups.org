import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { AlliancesGovernment } from "@/modules/features/pages/src/sections/alliances/alliances-government";
import { AlliancesAcademia } from "@/modules/features/pages/src/sections/alliances/alliances-academia";
import { AlliancesPrivateSector } from "@/modules/features/pages/src/sections/alliances/alliances-private-sector";
import { AlliancesCouncil } from "@/modules/features/pages/src/sections/alliances/alliances-council";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Alliances" });
  return buildMetadata({
    locale,
    route: "/alianzas",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function AlliancesPage({ params }: PageProps<"/[locale]/alianzas">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Alliances" });

  return (
    <main>
      <AlliancesGovernment
        eyebrow={t("govEyebrow")}
        title={t("govTitle")}
        description={t("govDescription")}
        partners={[
          {
            name: `${t("sedetra")} · ${t("sedetraFull")}`,
            relation: t("sedetraRelation"),
            logo: { src: "/assets/img/logo-sedetra.svg", alt: t("logoSedetraAlt") },
          },
          {
            name: `${t("secihti")} · ${t("secihtiFull")}`,
            relation: t("secihtiRelation"),
            logo: { src: "/assets/img/logo-secihti.svg", alt: t("logoSecihtiAlt") },
          },
        ]}
      />
      <AlliancesAcademia
        eyebrow={t("academiaEyebrow")}
        title={t("academiaTitle")}
        description={t("academiaDescription")}
        partners={[
          {
            name: t("ieu"),
            agreement: t("ieuAgreement"),
            relation: t("ieuRelation"),
            logo: { src: "/assets/img/logo-ieu.svg", alt: t("logoIeuAlt") },
          },
          {
            name: t("inaoe"),
            agreement: t("inaoeAgreement"),
            relation: t("inaoeRelation"),
            logo: { src: "/assets/img/logo-inaoe.svg", alt: t("logoInaoeAlt") },
          },
          {
            name: t("laInter"),
            agreement: t("laInterAgreement"),
            relation: t("laInterRelation"),
            logo: { src: "/assets/img/logo-la-inter.svg", alt: t("logoLaInterAlt") },
          },
        ]}
      />
      <AlliancesPrivateSector
        eyebrow={t("privateEyebrow")}
        title={t("privateTitle")}
        description={t("privateDescription")}
        partner={{
          name: t("plasticos"),
          relation: t("plasticosRelation"),
          logo: { src: "/assets/img/logo-cluster-plasticos.svg", alt: t("logoPlasticosAlt") },
        }}
      />
      <AlliancesCouncil
        eyebrow={t("councilEyebrow")}
        title={t("councilTitle")}
        description={t("councilDescription")}
        role={t("councilRole")}
        image={{ src: "/assets/img/evento-sinergia-clusteres.jpg", alt: t("councilImageAlt") }}
      />
    </main>
  );
}
