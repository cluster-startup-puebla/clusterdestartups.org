import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { HubOverview } from "@/modules/features/pages/src/sections/hub/hub-overview";
import { HubSpaces } from "@/modules/features/pages/src/sections/hub/hub-spaces";
import { HubVisitCta } from "@/modules/features/pages/src/sections/hub/hub-visit-cta";
import {
  Cpu,
  Presentation,
  Cog,
  Coffee,
  Scissors,
  Sprout,
  Droplets,
  Microscope,
} from "lucide-react";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Hub" });
  return buildMetadata({ locale, route: "/hub", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function HubPage({ params }: PageProps<"/[locale]/hub">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Hub" });

  return (
    <main>
      <HubOverview
        eyebrow={t("overviewEyebrow")}
        title={t("overviewTitle")}
        description={t("overviewDescription")}
        address={t("overviewAddress")}
        navItems={[
          { name: t("navB"), statusLabel: t("statusActive"), statusTone: "active" },
          { name: t("navC"), statusLabel: t("statusActive"), statusTone: "active" },
          { name: t("navA"), statusLabel: t("statusPending"), statusTone: "pending" },
        ]}
        image={{
          src: "/assets/img/hub-fachada-exterior.jpg",
          alt: t("imageFachadaAlt"),
        }}
        stats={[
          { value: t("statAreaValue"), label: t("statAreaLabel"), note: t("statAreaNote") },
          { value: t("statNavsValue"), label: t("statNavsLabel"), note: t("statNavsNote") },
          { value: t("statSpacesValue"), label: t("statSpacesLabel"), note: t("statSpacesNote") },
        ]}
      />
      <HubSpaces
        eyebrow={t("spacesEyebrow")}
        title={t("spacesTitle")}
        description={t("spacesDescription")}
        spaces={[
          {
            title: t("spaceFablab"),
            description: t("spaceFablabDesc"),
            image: { src: "/assets/img/hub-fablab-02.jpg", alt: t("imageFablabAlt") },
            icon: <Cog strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceAiLab"),
            description: t("spaceAiLabDesc"),
            image: { src: "/assets/img/hub-lab-ia-gpu.jpg", alt: t("imageAiLabAlt") },
            icon: <Cpu strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceAuditorio"),
            description: t("spaceAuditorioDesc"),
            image: { src: "/assets/img/hub-auditorio.jpg", alt: t("imageAuditorioAlt") },
            icon: <Presentation strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceChill"),
            description: t("spaceChillDesc"),
            image: { src: "/assets/img/hub-chill-zone.jpg", alt: t("imageChillAlt") },
            icon: <Coffee strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceTextil"),
            description: t("spaceTextilDesc"),
            image: { src: "/assets/img/hub-lab-textil.jpg", alt: t("imageTextilAlt") },
            icon: <Scissors strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceCompostaje"),
            description: t("spaceCompostajeDesc"),
            image: { src: "/assets/img/hub-lab-compostaje.jpg", alt: t("imageCompostajeAlt") },
            icon: <Sprout strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceAgua"),
            description: t("spaceAguaDesc"),
            image: { src: "/assets/img/hub-lab-agua.jpg", alt: t("imageAguaAlt") },
            icon: <Droplets strokeWidth={1.5} className="h-6 w-6" />,
          },
          {
            title: t("spaceMateriales"),
            description: t("spaceMaterialesDesc"),
            image: { src: "/assets/img/hub-lab-materiales.jpg", alt: t("imageMaterialesAlt") },
            icon: <Microscope strokeWidth={1.5} className="h-6 w-6" />,
          },
        ]}
      />
      <HubVisitCta
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        cta={{ href: "/contacto", label: t("ctaLabel") }}
      />
    </main>
  );
}
