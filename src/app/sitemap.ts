import type { MetadataRoute } from "next";
import { companies } from "@/data/companies";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { getPost, listPosts } from "@/modules/features/blog/src/services/markdown";
import { localeUrl } from "@/modules/cores/site/src/config/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "/", priority: 1, frequency: "weekly" as const },
  { path: "/quienes-somos", priority: 0.9, frequency: "monthly" as const },
  { path: "/gobernanza", priority: 0.8, frequency: "monthly" as const },
  { path: "/empresas", priority: 0.9, frequency: "weekly" as const },
  { path: "/hub", priority: 0.8, frequency: "monthly" as const },
  { path: "/nodos", priority: 0.8, frequency: "monthly" as const },
  { path: "/alianzas", priority: 0.7, frequency: "monthly" as const },
  { path: "/membresias", priority: 0.8, frequency: "monthly" as const },
  { path: "/prensa", priority: 0.7, frequency: "weekly" as const },
  { path: "/contacto", priority: 0.7, frequency: "yearly" as const },
  { path: "/blog", priority: 0.9, frequency: "weekly" as const },
  { path: "/aviso-de-privacidad", priority: 0.2, frequency: "yearly" as const },
  { path: "/aviso-de-cookies", priority: 0.2, frequency: "yearly" as const },
];

function languageAlternates(route: string, locales: readonly string[] = routing.locales) {
  const languages: Record<string, string> = {};
  for (const locale of locales) languages[locale] = localeUrl(locale, route);
  if (languages.es) languages["x-default"] = languages.es;
  else if (languages.en) languages["x-default"] = languages.en;
  return { languages };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      entries.push({
        url: localeUrl(locale, route.path),
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates: languageAlternates(route.path),
      });
    }

    for (const company of companies) {
      const path = `/empresas/${company.slug}`;
      entries.push({
        url: localeUrl(locale, path),
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(path),
      });
    }

    for (const post of listPosts(locale)) {
      const path = `/blog/${post.slug}`;
      const localesWithPost = routing.locales.filter((item) => getPost(post.slug, item));
      entries.push({
        url: localeUrl(locale, path),
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(path, localesWithPost),
      });
    }
  }

  return entries;
}
