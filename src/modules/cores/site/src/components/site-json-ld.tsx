import { OFFICE, OFFICE_MAPS_URL, ORGANIZATION_ID, SITE_URL, WEBSITE_ID, localeUrl } from "@/modules/cores/site/src/config/site";

const organization = {
  "@type": "Organization",
  "@id": ORGANIZATION_ID,
  name: "Clúster de Startups e Innovación (CSI) A.C.",
  legalName: "Clúster de Startups e Innovación (CSI) A.C.",
  alternateName: [
    "Clúster de Startups",
    "Cluster Startups",
    "Cluster Startups Puebla",
    "Puebla Startups",
    "CSI Puebla",
    "Clúster de Startups e Innovación",
    "Startup and Innovation Cluster",
  ],
  url: `${SITE_URL}/es/`,
  logo: `${SITE_URL}/logos/logo-csi-fondo-claro.svg`,
  image: `${SITE_URL}/og.png`,
  email: "hola@clusterdestartups.org",
  telephone: OFFICE.phoneTel,
  foundingDate: "2021",
  description:
    "Clúster de startups e innovación en Puebla, México. Asociación civil que articula gobierno, academia y empresa para que emprender una startup tecnológica en Puebla sea más fácil.",
  slogan:
    "Que en 2030 emprender una empresa de base tecnológica sea más fácil que abrir un negocio tradicional.",
  knowsAbout: [
    "Startups en Puebla",
    "Innovación",
    "Emprendimiento de base tecnológica",
    "Triple hélice",
  ],
  areaServed: {
    "@type": "State",
    name: "Puebla",
    containedInPlace: { "@type": "Country", name: "México" },
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: OFFICE.streetAddress,
    postalCode: OFFICE.postalCode,
    addressLocality: OFFICE.locality,
    addressRegion: OFFICE.region,
    addressCountry: OFFICE.countryCode,
  },
  hasMap: OFFICE_MAPS_URL,
  sameAs: [
    "https://www.linkedin.com/company/cluster-startups-puebla/",
    "https://www.instagram.com/cluster_startups/",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: OFFICE.phoneTel,
    email: "hola@clusterdestartups.org",
    contactType: "customer support",
    availableLanguage: ["Spanish", "English"],
    areaServed: "MX",
  },
};

const website = {
  "@type": "WebSite",
  "@id": WEBSITE_ID,
  url: `${SITE_URL}/es/`,
  name: "Clúster de Startups e Innovación",
  alternateName: ["Cluster Startups Puebla", "Startups en Puebla", "Puebla Startups"],
  description: organization.description,
  inLanguage: ["es-MX", "en"],
  publisher: { "@id": ORGANIZATION_ID },
};

export function SiteJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function HomePageJsonLd({
  locale,
  title,
  description,
}: {
  locale: string;
  title: string;
  description: string;
}) {
  const url = localeUrl(locale, "/");
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: title,
    description,
    inLanguage: locale === "en" ? "en" : "es-MX",
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORGANIZATION_ID },
    primaryImageOfPage: `${SITE_URL}/og.png`,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
