import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link, routing } from "@/modules/cores/i18n/src/config/routing";
import { withOfficeAddress } from "@/modules/cores/site/src/config/site";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";

const COOKIES_SECTION_INDEX = 4;
const LINK_TOKEN = /(https?:\/\/[^\s)]+|[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/g;
const TRAILING_PUNCTUATION = /[.,;)]+$/;

interface PrivacySection {
  heading: string;
  paragraphs: string[];
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Privacy" });
  return buildMetadata({
    locale,
    route: "/aviso-de-privacidad",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

function splitTrailingPunctuation(token: string) {
  const trailing = token.match(TRAILING_PUNCTUATION)?.[0] ?? "";
  return { value: token.slice(0, token.length - trailing.length), trailing };
}

function NoticeParagraph({ text }: { text: string }) {
  const parts = text.split(LINK_TOKEN);

  return (
    <p className="text-body text-ink-secondary">
      {parts.map((part, index) => {
        const isUrl = part.startsWith("https://") || part.startsWith("http://");
        const isEmail = part.includes("@");
        if (!isUrl && !isEmail) return part;

        const { value, trailing } = splitTrailingPunctuation(part);
        const link = isUrl ? (
          <a
            key={`${value}-${index}`}
            href={value}
            className="text-link underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            {value}
          </a>
        ) : (
          <a key={`${value}-${index}`} href={`mailto:${value}`} className="text-link underline">
            {value}
          </a>
        );

        return (
          <span key={`${value}-${index}`}>
            {link}
            {trailing}
          </span>
        );
      })}
    </p>
  );
}

export default async function PrivacyNoticePage({
  params,
}: PageProps<"/[locale]/aviso-de-privacidad">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Privacy" });
  const sections = t.raw("sections") as PrivacySection[];

  return (
    <main className="container-site py-16 lg:py-24">
      <header className="max-w-3xl">
        <p className="text-small text-ink-muted">{t("eyebrow")}</p>
        <h1 className="mt-4 font-display text-h1 text-ink">{t("title")}</h1>
        <p className="mt-4 text-small text-ink-muted">{t("updated")}</p>
      </header>

      <div className="mt-12 max-w-3xl space-y-12">
        {sections.map((section, index) => (
          <section key={section.heading}>
            <h2 className="font-display text-h3 text-ink">{section.heading}</h2>
            <div className="mt-4 space-y-4">
              {section.paragraphs.map((paragraph) => (
                <NoticeParagraph key={paragraph} text={withOfficeAddress(paragraph)} />
              ))}
            </div>
            {index === COOKIES_SECTION_INDEX ? (
              <p className="mt-4 text-body">
                <Link href="/aviso-de-cookies" className="text-link underline">
                  {t("cookiesLinkLabel")}
                </Link>
              </p>
            ) : null}
          </section>
        ))}
      </div>
    </main>
  );
}
