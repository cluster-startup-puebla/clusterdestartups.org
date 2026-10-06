import type { MetadataRoute } from "next";
import fs from "node:fs";
import path from "node:path";
import { companies } from "@/data/companies";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { getPost, listPosts } from "@/modules/features/blog/src/services/markdown";
import { localeUrl } from "@/modules/cores/site/src/config/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "/", file: "src/app/[locale]/page.tsx", priority: 1, frequency: "weekly" as const },
  { path: "/quienes-somos", file: "src/app/[locale]/quienes-somos/page.tsx", priority: 0.9, frequency: "monthly" as const },
  { path: "/gobernanza", file: "src/app/[locale]/gobernanza/page.tsx", priority: 0.8, frequency: "monthly" as const },
  { path: "/empresas", file: "src/app/[locale]/empresas/page.tsx", priority: 0.9, frequency: "weekly" as const },
  { path: "/hub", file: "src/app/[locale]/hub/page.tsx", priority: 0.8, frequency: "monthly" as const },
  { path: "/nodos", file: "src/app/[locale]/nodos/page.tsx", priority: 0.8, frequency: "monthly" as const },
  { path: "/alianzas", file: "src/app/[locale]/alianzas/page.tsx", priority: 0.7, frequency: "monthly" as const },
  { path: "/membresias", file: "src/app/[locale]/membresias/page.tsx", priority: 0.8, frequency: "monthly" as const },
  { path: "/prensa", file: "src/app/[locale]/prensa/page.tsx", priority: 0.7, frequency: "weekly" as const },
  { path: "/contacto", file: "src/app/[locale]/contacto/page.tsx", priority: 0.7, frequency: "yearly" as const },
  { path: "/blog", file: "src/app/[locale]/blog/page.tsx", priority: 0.9, frequency: "weekly" as const },
  { path: "/aviso-de-privacidad", file: "src/app/[locale]/aviso-de-privacidad/page.tsx", priority: 0.2, frequency: "yearly" as const },
  { path: "/aviso-de-cookies", file: "src/app/[locale]/aviso-de-cookies/page.tsx", priority: 0.2, frequency: "yearly" as const },
];

function mtime(rel: string) {
  return fs.statSync(path.join(process.cwd(), rel)).mtime;
}

const COMPANIES_MODIFIED = mtime("src/data/companies.ts");

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
        lastModified: mtime(route.file),
        changeFrequency: route.frequency,
        priority: route.priority,
        alternates: languageAlternates(route.path),
      });
    }

    for (const company of companies) {
      const pathName = `/empresas/${company.slug}`;
      entries.push({
        url: localeUrl(locale, pathName),
        lastModified: COMPANIES_MODIFIED,
        changeFrequency: "monthly",
        priority: 0.7,
        alternates: languageAlternates(pathName),
      });
    }

    for (const post of listPosts(locale)) {
      const pathName = `/blog/${post.slug}`;
      const localesWithPost = routing.locales.filter((item) => getPost(post.slug, item));
      entries.push({
        url: localeUrl(locale, pathName),
        lastModified: post.date,
        changeFrequency: "monthly",
        priority: 0.8,
        alternates: languageAlternates(pathName, localesWithPost),
      });
    }
  }

  return entries;
}
