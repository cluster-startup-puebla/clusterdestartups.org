import type { Metadata } from "next";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { SITE_URL } from "@/modules/cores/site/src/config/site";

interface BuildMetadataProps {
  locale: string;
  route: string;
  title: string;
  description: string;
  type?: "website" | "article";
  publishedTime?: string;
  images?: { url: string; alt: string }[];
}

export function buildMetadata({
  locale,
  route,
  title,
  description,
  type = "website",
  publishedTime,
  images,
}: BuildMetadataProps): Metadata {
  const url = `${SITE_URL}${route === "/" ? `/${locale}` : `/${locale}${route}`}`;
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, `${SITE_URL}/${l}${route === "/" ? "" : route}`]),
  );

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: { ...languages, "x-default": `${SITE_URL}/es${route === "/" ? "" : route}` },
    },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: "Clúster de Startups e Innovación (CSI)",
      locale,
      ...(publishedTime && { publishedTime }),
      ...(images?.length && { images }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
