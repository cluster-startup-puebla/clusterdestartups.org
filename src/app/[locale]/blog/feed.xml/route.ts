import { getTranslations } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { listPosts } from "@/modules/features/blog/src/services/markdown";
import { SITE_URL } from "@/modules/cores/site/src/config/site";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ locale: string }> },
) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Blog" });
  const posts = listPosts(locale);
  const blogUrl = `${SITE_URL}/${locale}/blog`;

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${post.title}</title>
      <link>${blogUrl}/${post.slug}</link>
      <guid isPermaLink="true">${blogUrl}/${post.slug}</guid>
      <description>${post.description}</description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <author>${post.author}</author>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("")}
    </item>`,
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Clúster de Startups — ${t("title")}</title>
    <link>${blogUrl}</link>
    <description>${t("description")}</description>
    <language>${locale}</language>
    <atom:link href="${blogUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
