import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { NodesIntro } from "@/modules/features/pages/src/sections/nodes/nodes-intro";
import { NodesMap } from "@/modules/features/pages/src/sections/nodes/nodes-map";
import { NodesCta } from "@/modules/features/pages/src/sections/nodes/nodes-cta";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Nodes" });
  return buildMetadata({ locale, route: "/nodos", title: t("metaTitle"), description: t("metaDescription") });
}

export default async function NodesPage({ params }: PageProps<"/[locale]/nodos">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Nodes" });

  return (
    <main>
      <NodesIntro
        eyebrow={t("introEyebrow")}
        title={t("introTitle")}
        description={t("introDescription")}
        pillars={[
          { title: t("pillarModelTitle"), description: t("pillarModelDesc") },
          { title: t("pillarReciprocityTitle"), description: t("pillarReciprocityDesc") },
        ]}
      />
      <NodesMap
        eyebrow={t("mapEyebrow")}
        title={t("mapTitle")}
        description={t("mapDescription")}
        map={{ src: "/nodos/mapa-nodos-puebla.svg", alt: t("mapImageAlt") }}
        anchors={[
          { name: t("tehuacan"), statusLabel: t("statusActive"), description: t("tehuacanDesc") },
          {
            name: t("huejotzingo"),
            statusLabel: t("statusActive"),
            description: t("huejotzingoDesc"),
          },
        ]}
      />
      <NodesCta
        title={t("ctaTitle")}
        description={t("ctaDescription")}
        cta={{ href: "/contacto", label: t("ctaLabel") }}
      />
    </main>
  );
}
