import { getCompany, type LocalizedText } from "@/data/companies";

export type FounderPlace = {
  name: string;
  logo?: string;
};

const TEC_PUEBLA: FounderPlace = {
  name: "Tec de Monterrey, campus Puebla",
  logo: "/fundadores/tec-de-monterrey.webp",
};

export type Founder = {
  slug: string;
  name: string;
  role?: string;
  companySlug: string;
  photo?: string;
  bio?: LocalizedText;
  linkedin?: string;
  previouslyAt?: readonly FounderPlace[];
  alumnusOf?: readonly FounderPlace[];
};

export const founders: readonly Founder[] = [
  {
    slug: "fatima-gaytan",
    name: "Fátima Gaytán",
    role: "CEO",
    companySlug: "concora",
    photo: "/fundadores/fatima-gaytan.webp",
    linkedin: "https://www.linkedin.com/in/fátima-gaytán-578a301a9/",
    bio: {
      es: "Chief Executive Officer de Concora. En 2025 recibió el Premio Kybernus al Liderazgo Social.",
      en: "Chief Executive Officer of Concora. In 2025 she received the Kybernus Award for Social Leadership.",
    },
    alumnusOf: [TEC_PUEBLA],
  },
  {
    slug: "mauro-daniel-munguia",
    name: "Mauro Daniel Munguia Manzanarez",
    role: "CEO",
    companySlug: "the-x-chair",
    photo: "/fundadores/mauro-daniel-munguia.webp",
    linkedin: "https://www.linkedin.com/in/mauro-munguia/",
    bio: {
      es: "Ingeniero mecatrónico y CEO de The X-Chair.",
      en: "Mechatronic engineer and CEO of The X-Chair.",
    },
    alumnusOf: [TEC_PUEBLA],
  },
  {
    slug: "eduardo-zarate-lara",
    name: "Eduardo Zárate Lara",
    role: "CTO",
    companySlug: "the-x-chair",
    photo: "/fundadores/eduardo-zarate-lara.webp",
    linkedin: "https://www.linkedin.com/in/eduardozaratelara/",
    alumnusOf: [TEC_PUEBLA],
  },
];

export function getFounder(slug: string) {
  return founders.find((founder) => founder.slug === slug);
}

export function getFoundersByCompany(companySlug: string) {
  return founders.filter((founder) => founder.companySlug === companySlug);
}

export function founderCompany(founder: Founder) {
  return getCompany(founder.companySlug);
}
