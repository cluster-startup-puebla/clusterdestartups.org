import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/modules/cores/i18n/src/config/routing";
import { buildMetadata } from "@/modules/cores/site/src/services/page-metadata";
import { ContactForm } from "@/modules/features/pages/src/sections/contact/contact-form";
import { ContactLocation } from "@/modules/features/pages/src/sections/contact/contact-location";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact" });
  return buildMetadata({
    locale,
    route: "/contacto",
    title: t("metaTitle"),
    description: t("metaDescription"),
  });
}

export default async function ContactPage({ params }: PageProps<"/[locale]/contacto">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "Contact" });

  return (
    <main>
      <ContactForm
        eyebrow={t("form.eyebrow")}
        title={t("form.title")}
        description={t("form.description")}
        fields={{
          name: { label: t("form.nameLabel"), placeholder: t("form.namePlaceholder") },
          email: { label: t("form.emailLabel"), placeholder: t("form.emailPlaceholder") },
          organization: {
            label: t("form.organizationLabel"),
            placeholder: t("form.organizationPlaceholder"),
          },
          message: { label: t("form.messageLabel"), placeholder: t("form.messagePlaceholder") },
        }}
        profile={{ label: t("form.profileLabel"), options: t.raw("form.profiles") }}
        submitLabel={t("form.submitLabel")}
        successMessage={t("form.successMessage")}
        errors={{
          nameRequired: t("form.errors.nameRequired"),
          emailRequired: t("form.errors.emailRequired"),
          emailInvalid: t("form.errors.emailInvalid"),
          messageRequired: t("form.errors.messageRequired"),
        }}
      />
      <ContactLocation
        eyebrow={t("location.eyebrow")}
        title={t("location.title")}
        description={t("location.description")}
        addressLabel={t("location.addressLabel")}
        address={t("location.address")}
        mapTitle={t("location.mapTitle")}
        mapNote={t("location.mapNote")}
        socialLabel={t("location.socialLabel")}
        social={[
          { label: t("location.linkedinLabel"), href: t("location.linkedinHref") },
        ]}
      />
    </main>
  );
}
