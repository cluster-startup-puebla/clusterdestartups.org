import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { getPost, getPostSlugs, CATEGORIES } from "@/modules/features/blog/src/services/markdown";
import { SITE_URL } from "@/modules/cores/site/src/config/site";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getPostSlugs(locale).map((slug) => ({ locale, slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getPost(slug, locale);
  if (!post) return {};

  const url = `${SITE_URL}/${locale}/blog/${slug}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}/blog/${slug}`]),
  );

  return {
    title: post.title,
    description: post.description,
    authors: [{ name: post.author }],
    keywords: post.tags,
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.description,
      publishedTime: post.date,
      authors: post.author,
      tags: post.tags,
      images: post.image ? [{ url: post.image.src, alt: post.image.alt }] : undefined,
      siteName: "Clúster de Startups",
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${SITE_URL}/es/blog/${slug}` },
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/[locale]/blog/[slug]">) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const post = getPost(slug, locale);
  if (!post) notFound();
  const t = await getTranslations({ locale, namespace: "Blog" });

  const isPress = post.category === CATEGORIES.press;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": isPress ? "NewsArticle" : "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author },
    image: post.image ? [`${SITE_URL}${post.image.src}`] : undefined,
    articleSection: post.category,
    url: `${SITE_URL}/${locale}/blog/${slug}`,
    keywords: post.tags.join(", "),
    inLanguage: locale,
  };

  return (
    <main className="container-site py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl">
        <nav>
          <a href={`/${locale}/blog`} className="text-small text-link">
            {t("backToBlog")}
          </a>
        </nav>

        <header className="mt-8">
          <div className="flex items-center gap-3">
            <time dateTime={post.date} className="text-micro text-ink-muted">
              {new Date(post.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
                day: "numeric",
                timeZone: "UTC",
              })}
            </time>
            {isPress && <span className="badge-brand">{t("categoryPress")}</span>}
          </div>
          <h1 className="text-h1 mt-2 font-display">{post.title}</h1>
          <p className="text-body-lg mt-4 text-ink-secondary">{post.excerpt}</p>
          <p className="mt-6 flex items-center gap-3 text-small text-ink-muted">
            <span>{post.author}</span>
            <span aria-hidden="true">·</span>
            <span>
              {t("readingTime", { minutes: post.readingMinutes })}
            </span>
          </p>
        </header>

        {post.image && (
          <div className="bg-elevated mt-10 overflow-hidden rounded-lg">
            <Image
              src={post.image.src}
              alt={post.image.alt}
              width={1600}
              height={900}
              className="h-auto w-full"
              style={{ aspectRatio: "auto" }}
              priority
            />
          </div>
        )}

        <div
          className="article-body mt-12"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />
      </article>
    </main>
  );
}
