import type { MetadataRoute } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { getPostSlugs } from "@/modules/features/blog/src/services/markdown";
import { SITE_URL } from "@/modules/cores/site/src/config/site";

export const dynamic = "force-static";

const ROUTES = [
  { path: "", priority: 1, frequency: "weekly" as const },
  { path: "/quienes-somos", priority: 0.9, frequency: "monthly" as const },
  { path: "/gobernanza", priority: 0.8, frequency: "monthly" as const },
  { path: "/empresas", priority: 0.8, frequency: "monthly" as const },
  { path: "/hub", priority: 0.9, frequency: "monthly" as const },
  { path: "/nodos", priority: 0.8, frequency: "monthly" as const },
  { path: "/alianzas", priority: 0.8, frequency: "monthly" as const },
  { path: "/membresias", priority: 0.9, frequency: "monthly" as const },
  { path: "/prensa", priority: 0.8, frequency: "weekly" as const },
  { path: "/contacto", priority: 0.7, frequency: "yearly" as const },
  { path: "/blog", priority: 0.9, frequency: "weekly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of routing.locales) {
    for (const route of ROUTES) {
      entries.push({
        url: `${SITE_URL}/${locale}${route.path}`,
        changeFrequency: route.frequency,
        priority: route.priority,
      });
    }
    for (const slug of getPostSlugs(locale)) {
      entries.push({
        url: `${SITE_URL}/${locale}/blog/${slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
      });
    }
  }

  return entries;
}
