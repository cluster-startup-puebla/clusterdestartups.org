import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { HomePageJsonLd } from "@/modules/cores/site/src/components/site-json-ld";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { getPost } from "@/modules/features/blog/src/services/markdown";
import { About } from "@/modules/features/pages/src/sections/home/about";
import { Activity, type ActivityPlace, type ActivityTotal } from "@/modules/features/pages/src/sections/home/activity";
import { AlliesMarquee } from "@/modules/features/pages/src/sections/home/allies-marquee";
import { ClosingCta } from "@/modules/features/pages/src/sections/home/closing-cta";
import { CompaniesStrip } from "@/modules/features/pages/src/sections/home/companies-strip";
import { Hero } from "@/modules/features/pages/src/sections/home/hero";
import { Stories } from "@/modules/features/pages/src/sections/home/stories";

const STORY_SLUGS = [
  "cafe-cursor-puebla-2026",
  "unlock-summit-zacatlan-2026",
  "pabellon-puebla-innovafest-queretaro-2026",
] as const;

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
    keywords:
      locale === "en"
        ? [
            "startups in Puebla",
            "Puebla startups",
            "startup cluster",
            "innovation cluster Puebla",
            "Cluster Startups",
          ]
        : [
            "startups en Puebla",
            "Puebla startups",
            "clúster de startups",
            "cluster startups",
            "innovación en Puebla",
            "clúster de innovación",
          ],
  });
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Home" });

  const posts = STORY_SLUGS.flatMap((slug) => {
    const post = getPost(slug, locale);
    if (!post) return [];
    const { contentHtml: _contentHtml, ...meta } = post;
    return [meta];
  });

  return (
    <>
      <HomePageJsonLd locale={locale} title={t("metaTitle")} description={t("metaDescription")} />
      <link
        rel="preload"
        as="image"
        href="/blog/blog-cafe-cursor-800.webp"
        imageSrcSet="/blog/blog-cafe-cursor-800.webp 800w, /blog/blog-cafe-cursor.webp 1600w"
        imageSizes="(min-width: 1024px) 560px, 100vw"
        fetchPriority="high"
      />
      <Hero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        description={t("hero.description")}
        primaryCta={t("hero.primaryCta")}
      />
      <AlliesMarquee
        label={t("allies.label")}
        logos={[
          {
            logos: [
              { src: "/aliados/logo-estado.svg", alt: t("allies.estado"), frame: "h-12 w-auto sm:h-14" },
              { src: "/aliados/logo-sedetra.png", alt: t("allies.sedetra"), frame: "h-10 w-auto sm:h-11" },
              { src: "/aliados/logo-cinco-de-mayo.png", alt: t("allies.cincoDeMayo"), frame: "h-12 w-auto sm:h-14" },
              { src: "/aliados/logo-secihti.png", alt: t("allies.secihti"), frame: "h-14 w-auto sm:h-16" },
            ],
          },
          { src: "/aliados/logo-cluster-agro.png", alt: t("allies.agro"), frame: "h-24 w-auto sm:h-28" },
          { src: "/aliados/logo-ammje.png", alt: t("allies.ammje"), frame: "h-12 w-auto sm:h-14" },
        ]}
      />
      <Activity
        eyebrow={t("activity.eyebrow")}
        title={t("activity.title")}
        description={t("activity.description")}
        mapLabel={t("activity.mapLabel")}
        hint={t("activity.hint")}
        totals={t.raw("activity.totals") as ActivityTotal[]}
        places={t.raw("activity.places") as ActivityPlace[]}
      />
      <Stories
        eyebrow={t("stories.eyebrow")}
        title={t("stories.title")}
        readLabel={t("stories.readLabel")}
        locale={locale}
        posts={posts}
      />
      <CompaniesStrip
        eyebrow={t("companies.eyebrow")}
        title={t("companies.title")}
        description={t("companies.description")}
        linkLabel={t("companies.linkLabel")}
      />
      <About
        eyebrow={t("about.eyebrow")}
        title={t("about.title")}
        description={t("about.description")}
        diagramLabel={t("about.imageAlt")}
        government={t("about.government")}
        academia={t("about.academia")}
        industry={t("about.industry")}
        linkLabel={t("about.linkLabel")}
      />
      <ClosingCta
        title={t("closing.title")}
        description={t("closing.description")}
        cta={t("closing.cta")}
        href="/contacto"
      />
    </>
  );
}
