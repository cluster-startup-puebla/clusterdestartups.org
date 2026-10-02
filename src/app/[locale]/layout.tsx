import type { Metadata } from "next";
import { Archivo, Raleway } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { SITE_URL } from "@/modules/cores/site/src/config/site";
import { SiteJsonLd } from "@/modules/cores/site/src/components/site-json-ld";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";
import { Header } from "@/modules/features/site/src/components/organisms/header";
import { Footer } from "@/modules/features/site/src/components/organisms/footer";
import { CookieBanner } from "@/modules/features/site/src/components/cookie-banner";
import { DocumentScripts } from "./document-scripts";
import "../globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { getTranslations } = await import("next-intl/server");
  const t = await getTranslations({ locale, namespace: "Home" });

  const ogLocale = locale === "en" ? "en_US" : "es_MX";

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("metaTitle"),
      template: "%s · Clúster de Startups",
    },
    description: t("metaDescription"),
    applicationName: "Clúster de Startups e Innovación",
    publisher: "Clúster de Startups e Innovación (CSI) A.C.",
    category: "organization",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      type: "website",
      siteName: "Clúster de Startups e Innovación (CSI)",
      locale: ogLocale,
    },
    twitter: { card: "summary_large_image" },
  };
}

const GA_ID = "G-84QLB6EYLV";

const gaConfigScript = `window.dataLayer=window.dataLayer||[];window.gtag=window.gtag||function(){window.dataLayer.push(arguments);};window.gtag('js',new Date());window.gtag('config','${GA_ID}');`;

const gtmScript = `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-P4W4WZCS');`;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="light"
      className={`${archivo.variable} ${raleway.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col bg-surface font-body text-ink">
        <DocumentScripts />
        <Script
          id="gtag-src"
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {gaConfigScript}
        </Script>
        <Script id="gtm" strategy="afterInteractive">
          {gtmScript}
        </Script>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-P4W4WZCS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <SiteJsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
