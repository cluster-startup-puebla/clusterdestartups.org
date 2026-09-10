import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { ProfileCard, SectionHeader } from "@/modules/shared/ui/src/components";
// import { TransparencyNotice } from "@/modules/features/pages/src/sections/governance/transparency-notice";

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
  const t = await getTranslations({ locale, namespace: "Governance" });

  return (
    <section className="py-16 lg:py-24">
      <div className="container-site">
        <SectionHeader
          as="h1"
          eyebrow={t("heroEyebrow")}
          title={t("heroTitle")}
          description={t("heroDescription")}
        />

        <div className="mt-16 flex flex-col items-center gap-12">
          <div className="w-full max-w-sm">
            <ProfileCard
              name="Yamil Álvarez"
              role={t("boardYamilRole")}
              description={t("boardYamilDescription")}
              image={{ src: "/assets/img/yamil.jpg", alt: t("boardYamilRole") }}
              badge={t("founderBadge")}
            />
          </div>

          <div className="grid w-full gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileCard
              name="Daniel Martínez"
              role={t("boardDanielRole")}
              description={t("boardDanielDescription")}
              image={{ src: "/assets/img/daniel.jpg", alt: t("boardDanielRole") }}
              badge={t("founderBadge")}
            />
            <ProfileCard
              name="Álvaro Castillo"
              role={t("boardAlvaroRole")}
              description={t("boardAlvaroDescription")}
              image={{ src: "/assets/img/alvaro-castillo.png", alt: t("boardAlvaroRole") }}
              badge={t("founderBadge")}
            />
            <ProfileCard
              name="Rodrigo Ruiz"
              role={t("boardRodrigoRole")}
              description={t("boardRodrigoDescription")}
              image={{ src: "/assets/img/rodrigo-ruiz.png", alt: t("boardRodrigoRole") }}
              badge={t("founderBadge")}
            />
          </div>
        </div>

        <div className="mt-24">
          <SectionHeader
            eyebrow={t("vigilanciaEyebrow")}
            title={t("vigilanciaTitle")}
            description={t("vigilanciaDescription")}
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-2">
            <ProfileCard
              name="Oliver Salman"
              role="Miembro del comité de vigilancia"
              image={{ src: "/assets/img/oliver-sahlmann.png", alt: "Oliver Salman" }}
            />
            <ProfileCard
              name="Héctor Gama"
              role="Miembro del comité de vigilancia"
              image={{ src: "/assets/img/ey-hector-armando-gama-site.jpg", alt: "Héctor Gama" }}
            />
          </div>
        </div>

        <div className="mt-24">
          <SectionHeader
            eyebrow={t("honoraryEyebrow")}
            title={t("honoraryTitle")}
            description={t("honoraryDescription")}
          />
          <div className="mt-12">
            <div className="w-full max-w-sm">
              <ProfileCard
                name="Pablo Nuño"
                role={t("honoraryPabloRole")}
                image={{ src: "/assets/img/pablo.jpeg", alt: t("honoraryPabloRole") }}
              />
            </div>
          </div>
        </div>

        {/* <div className="mt-24">
          <TransparencyNotice title={t("transparencyTitle")} text={t("transparencyText")} />
        </div> */}
      </div>
    </section>
  );
}
