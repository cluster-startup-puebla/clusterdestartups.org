const UTM_SOURCE = "clusterdestartups";
const UTM_MEDIUM = "referral";

/** Marca un sitio externo abierto desde el directorio de empresas. */
export function withClusterUtm(rawUrl: string, content: string) {
  const url = new URL(rawUrl);
  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", "empresas");
  url.searchParams.set("utm_content", content);
  return url.toString();
}

/** Marca un enlace de una nota. Las rutas internas se quedan relativas. */
export function withNoteUtm(rawUrl: string, slug: string): string | null {
  const trimmed = rawUrl.trim();
  if (trimmed.startsWith("#")) return trimmed;
  if (/^(javascript|data|vbscript):/i.test(trimmed)) return null;
  if (/^(mailto:|tel:)/i.test(trimmed)) return trimmed;

  const relative = trimmed.startsWith("/") && !trimmed.startsWith("//");
  let url: URL;
  try {
    url = new URL(trimmed, "https://clusterdestartups.org");
  } catch {
    return null;
  }
  if (url.protocol !== "http:" && url.protocol !== "https:") return null;

  url.searchParams.set("utm_source", UTM_SOURCE);
  url.searchParams.set("utm_medium", UTM_MEDIUM);
  url.searchParams.set("utm_campaign", "blog");
  url.searchParams.set("utm_content", slug);

  if (relative) return `${url.pathname}${url.search}${url.hash}`;
  return url.toString();
}
