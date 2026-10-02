import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";

type CookieSection = {
  heading: string;
  paragraphs: string[];
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Cookies" });
  return buildMetadata({
    locale,
    route: "/aviso-de-cookies",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function CookieNoticePage({
  params,
}: PageProps<"/[locale]/aviso-de-cookies">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Cookies" });
  const sections = t.raw("sections") as CookieSection[];

  return (
    <section className="container-site py-16 lg:py-24">
      <p className="text-small text-ink-secondary">{t("eyebrow")}</p>
      <h1 className="mt-3 font-display text-h1 text-ink">{t("title")}</h1>
      <p className="mt-4 text-small text-ink-secondary">{t("updated")}</p>
      <div className="mt-12 flex max-w-3xl flex-col gap-10">
        {sections.map((section) => (
          <section key={section.heading}>
            <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
            <div className="mt-4 flex flex-col gap-4">
              {section.paragraphs.map((paragraph) => (
                <p key={paragraph} className="text-body text-ink-secondary">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        ))}
        <p>
          <Link href="/aviso-de-privacidad" className="text-body text-link">
            {t("privacyLinkLabel")}
          </Link>
        </p>
      </div>
    </section>
  );
}
