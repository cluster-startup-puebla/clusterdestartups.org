import type { Metadata } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { SITE_URL, localeUrl } from "@/modules/cores/site/src/config/site";

interface BuildMetadataProps {
  locale: string;
  route: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  images?: { url: string; alt: string; width?: number; height?: number }[];
  keywords?: string[];
}

export function buildMetadata({
  locale,
  route,
  title,
  description,
  type = "website",
  publishedTime,
  images,
  keywords,
}: BuildMetadataProps): Metadata {
  const url = localeUrl(locale, route);
  const languages = Object.fromEntries(
    routing.locales.map((item) => [item, localeUrl(item, route)]),
  );
  const ogLocale = locale === "en" ? "en_US" : "es_MX";
  const shareImage = images?.length
    ? images
    : [
        {
          url: `${SITE_URL}/og.png`,
          width: 1200,
          height: 630,
          alt:
            locale === "en"
              ? "Startup and Innovation Cluster in Puebla"
              : "Clúster de Startups e Innovación en Puebla",
        },
      ];

  return {
    title: route === "/" ? { absolute: title } : title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": localeUrl("es", route) },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "Clúster de Startups e Innovación (CSI)",
      locale: ogLocale,
      alternateLocale: locale === "en" ? ["es_MX"] : ["en_US"],
      ...(publishedTime && { publishedTime }),
      images: shareImage,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: shareImage.map((image) => image.url),
    },
  };
}
