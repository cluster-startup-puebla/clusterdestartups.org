import { companies, getCompany, type LocalizedText } from "@/data/companies";
import { founders, type Founder } from "@/data/founders";

export type University = {
  slug: string;
  name: string;
  shortName: string;
  logo?: string;
  summary: LocalizedText;
};

export const universities: readonly University[] = [
  {
    slug: "tec-de-monterrey",
    name: "Tecnológico de Monterrey",
    shortName: "Tec de Monterrey",
    logo: "/fundadores/tec-de-monterrey.webp",
    summary: {
      es: "Universidad privada fundada en 1943, con campus en Puebla y en otras ciudades del país.",
      en: "Private university founded in 1943, with a campus in Puebla and campuses in other cities in the country.",
    },
  },
  {
    slug: "upaep",
    name: "Universidad Popular Autónoma del Estado de Puebla",
    shortName: "UPAEP",
    logo: "/fundadores/upaep.webp",
    summary: {
      es: "Universidad privada de la ciudad de Puebla, fundada en 1973.",
      en: "Private university in the city of Puebla, founded in 1973.",
    },
  },
  {
    slug: "udlap",
    name: "Universidad de las Américas Puebla",
    shortName: "UDLAP",
    logo: "/fundadores/udlap.webp",
    summary: {
      es: "Universidad privada en San Andrés Cholula, Puebla.",
      en: "Private university in San Andrés Cholula, Puebla.",
    },
  },
  {
    slug: "ipn",
    name: "Instituto Politécnico Nacional",
    shortName: "IPN",
    logo: "/fundadores/ipn.webp",
    summary: {
      es: "Institución pública de educación superior fundada en 1936, con sede en la Ciudad de México.",
      en: "Public higher-education institution founded in 1936, based in Mexico City.",
    },
  },
];

export function getUniversity(slug: string) {
  return universities.find((university) => university.slug === slug);
}

export function getFoundersByUniversity(slug: string) {
  return founders
    .filter((founder) => founder.alumnusOf?.some((place) => place.universitySlug === slug))
    .sort((a, b) => a.name.localeCompare(b.name, "es"));
}

function foundedThere(role: string | undefined) {
  return role !== undefined && /fundador|ceo/i.test(role);
}

function alumniCompanySlugs(founder: Founder) {
  const slugs = new Set<string>([founder.companySlug]);
  for (const place of founder.alsoAt ?? []) {
    if (foundedThere(place.role)) slugs.add(place.companySlug);
  }
  return slugs;
}

function byName<T extends { name: string }>(items: T[]) {
  return items.sort((a, b) => a.name.localeCompare(b.name, "es"));
}

/** Startups que un egresado funda o dirige. No incluye un rol de socio o de apoyo. */
export function getCompaniesByUniversity(slug: string) {
  const slugs = new Set<string>();
  for (const founder of getFoundersByUniversity(slug)) {
    for (const companySlug of alumniCompanySlugs(founder)) slugs.add(companySlug);
  }
  return byName(
    [...slugs]
      .map((companySlug) => getCompany(companySlug))
      .filter((company) => company !== undefined),
  );
}

/** Solo las que traen `incubatedAt`. Estudiar ahí no cuenta como incubación. */
export function getIncubatedCompanies(slug: string) {
  return byName(companies.filter((company) => company.incubatedAt === slug));
}
