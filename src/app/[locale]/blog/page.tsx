import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { listPosts } from "@/modules/features/blog/src/services/markdown";
import { SITE_URL } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { BlogList } from "@/modules/features/blog/src/components/blog-list";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });

  return {
    ...buildMetadata({
      locale,
      route: "/blog",
      title: t("metaTitle"),
      description: t("description"),
    }),
    alternates: {
      canonical: `${SITE_URL}/${locale}/blog/`,
      languages: {
        es: `${SITE_URL}/es/blog/`,
        en: `${SITE_URL}/en/blog/`,
        "x-default": `${SITE_URL}/es/blog/`,
      },
      types: {
        "application/rss+xml": `${SITE_URL}/${locale}/blog/feed.xml`,
      },
    },
  };
}

export default async function BlogPage({ params }: PageProps<"/[locale]/blog">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale).map((post) => {
    const { contentHtml, ...meta } = post;
    void contentHtml;
    return meta;
  });

  return (
    <main className="container-site py-16 lg:py-24">
      <header className="mb-12">
        <h1 className="text-h1 font-display">{t("title")}</h1>
        <p className="mt-4 text-body-lg text-ink-secondary">{t("description")}</p>
      </header>

      <BlogList
          posts={posts}
          locale={locale}
          labels={{
            all: t("allPosts"),
            press: t("categoryPress"),
            community: t("categoryCommunity"),
            readMore: t("readMore"),
          }}
        />
    </main>
  );
}
