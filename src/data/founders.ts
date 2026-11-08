import { getCompany, type LocalizedText } from "@/data/companies";

export type FounderPlace = {
  name: string;
  logo?: string;
};

export type FounderCompanyRef = {
  companySlug: string;
  role?: string;
};

const TEC_LOGO = "/fundadores/tec-de-monterrey.webp";

const TEC_PUEBLA: FounderPlace = {
  name: "Tec de Monterrey, campus Puebla",
  logo: TEC_LOGO,
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
  /** Other startups in the directory, besides `companySlug`. */
  alsoAt?: readonly FounderCompanyRef[];
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
  {
    slug: "ximena-ortiz-gomez",
    name: "Ximena Ortiz Gómez",
    role: "CEO",
    companySlug: "empowershe",
    photo: "/fundadores/ximena-ortiz-gomez.webp",
    linkedin: "https://www.linkedin.com/in/ximena-ortiz-g%C3%B3mez/",
    bio: {
      es: "Estudiante de Ingeniería en Robótica y Sistemas Digitales en el Tec de Monterrey, campus Puebla. Fundó EmpowerShe para llevar educación STEAM a niñas.",
      en: "Robotics and Digital Systems Engineering student at Tecnológico de Monterrey, Puebla campus. She founded EmpowerShe to bring STEAM education to girls.",
    },
    alumnusOf: [TEC_PUEBLA],
  },
  {
    slug: "isaac-de-la-rosa",
    name: "Isaac de la Rosa",
    role: "Director General",
    companySlug: "hexa-group",
    photo: "/fundadores/isaac-de-la-rosa.webp",
    linkedin: "https://www.linkedin.com/in/isaac-de-la-rosa-garcia-015924197",
    bio: {
      es: "Biólogo y director general de Hexa. La empresa convierte residuos de unicel en proteína de insecto para alimento animal. En 2026 apareció en Forbes 30 Under 30 México.",
      en: "Biologist and general manager of Hexa. The company turns styrofoam waste into insect protein for animal feed. In 2026 he was named to the Forbes México 30 Under 30 list.",
    },
  },
  {
    slug: "daniela-cabral-porras",
    name: "Daniela Cabral Porras",
    role: "CEO",
    companySlug: "xiah",
    photo: "/fundadores/daniela-cabral-porras.webp",
    bio: {
      es: "Cofundadora y CEO de XiA'H, que obtiene compuestos bioactivos de plantas para la industria del bienestar. Estudia medicina en el Tec de Monterrey, campus Monterrey.",
      en: "Co-founder and CEO of XiA'H, which draws bioactive compounds from plants for the wellness industry. She studies medicine at Tecnológico de Monterrey, Monterrey campus.",
    },
    alumnusOf: [{ name: "Tecnológico de Monterrey, campus Monterrey", logo: TEC_LOGO }],
  },
  {
    slug: "carlos-anaya",
    name: "Carlos Anaya Rodríguez",
    role: "CEO",
    companySlug: "kigo",
    photo: "/fundadores/carlos-anaya.webp",
    linkedin: "https://www.linkedin.com/in/carlosanayardz",
    bio: {
      es: "Fundador, CEO y presidente del consejo de Kigo, antes Parkimovil. La primera operación fue en 2011, en un parquímetro de Zacatlán, Puebla.",
      en: "Founder, CEO and chairman of Kigo, formerly Parkimovil. The first transaction was in 2011, at a parking meter in Zacatlán, Puebla.",
    },
    alumnusOf: [{ name: "UPAEP", logo: "/fundadores/upaep.webp" }],
  },
  {
    slug: "jazmin-salazar",
    name: "Jazmín Salazar",
    role: "CEO",
    companySlug: "oxtron",
    photo: "/fundadores/jazmin-salazar.webp",
    bio: {
      es: "Fundadora y directora general de Oxtron, que mide, captura y reutiliza emisiones de CO₂. Egresada de Creación y Desarrollo de Empresas del Tecnológico de Monterrey.",
      en: "Founder and CEO of Oxtron, which measures, captures and reuses CO₂ emissions. She graduated in Business Creation and Development from Tecnológico de Monterrey.",
    },
    alumnusOf: [{ name: "Tecnológico de Monterrey", logo: TEC_LOGO }],
  },
  {
    slug: "sergio-juarez",
    name: "Sergio Juárez",
    role: "CEO",
    companySlug: "safe-mobility",
    linkedin: "https://www.linkedin.com/in/sergio-ignacio-juarez-martinez-91b62a",
    bio: {
      es: "Cofundador y CEO de SAFE Mobility, transporte especializado para personas con movilidad limitada. Egresado de la UDLAP.",
      en: "Co-founder and CEO of SAFE Mobility, specialized transport for people with limited mobility. He graduated from UDLAP.",
    },
    alumnusOf: [{ name: "Universidad de las Américas Puebla" }],
  },
  {
    slug: "francisco-vara",
    name: "Francisco Vara",
    role: "CEO",
    companySlug: "netv",
    photo: "/fundadores/francisco-vara.webp",
    linkedin: "https://www.linkedin.com/in/francisco-vara",
    bio: {
      es: "Fundador y CEO de NETV, una comunidad empresarial que deja el evento convertido en una red permanente de negocios.",
      en: "Founder and CEO of NETV, a business community that turns an event into a lasting network of deals.",
    },
  },
  {
    slug: "rodrigo-ruiz",
    name: "Rodrigo Ruiz",
    role: "CEO",
    companySlug: "kotemah",
    photo: "/fundadores/rodrigo-ruiz.webp",
    bio: {
      es: "Ingeniero en robótica industrial y fundador de Koteos. Kotemah diseña exoesqueletos y equipos de asistencia de carga para la industria.",
      en: "Industrial robotics engineer and founder of Koteos. Kotemah designs exoskeletons and load-assistance equipment for industry.",
    },
    previouslyAt: [{ name: "Volkswagen de México" }],
    alumnusOf: [{ name: "Instituto Politécnico Nacional" }],
  },
  {
    slug: "yamil-alvarez",
    name: "Yamil Álvarez",
    role: "CEO",
    companySlug: "radek",
    photo: "/fundadores/yamil-alvarez.webp",
    linkedin: "https://www.linkedin.com/in/yamilalvarez1",
    bio: {
      es: "Cofundador y CEO de Radek.",
      en: "Co-founder and CEO of Radek.",
    },
    alsoAt: [{ companySlug: "karggu", role: "Cofundador" }],
    alumnusOf: [{ name: "Tecnológico de Monterrey", logo: TEC_LOGO }],
  },
  {
    slug: "daniel-martinez",
    name: "Daniel Martínez",
    role: "CEO",
    companySlug: "mileva-dynamics",
    photo: "/fundadores/daniel-martinez.webp",
    alumnusOf: [{ name: "UPAEP", logo: "/fundadores/upaep.webp" }],
  },
  {
    slug: "lenin-perez",
    name: "Lenin Pérez",
    role: "Fundador",
    companySlug: "gogotrack",
    photo: "/fundadores/lenin-perez.webp",
  },
  {
    slug: "israel-reyes",
    name: "Israel Reyes",
    companySlug: "rocka",
    photo: "/fundadores/israel-reyes.webp",
  },
  {
    slug: "alvaro-castillo",
    name: "Álvaro Castillo",
    role: "CEO",
    companySlug: "sabia",
    photo: "/fundadores/alvaro-castillo.webp",
    linkedin: "https://www.linkedin.com/in/alvaro-castillo-c",
    bio: {
      es: "Dirige Sabia, una software factory en Puebla que convierte hojas de cálculo en sistemas web.",
      en: "He leads Sabia, a software factory in Puebla that turns spreadsheets into web systems.",
    },
  },
  {
    slug: "manuel-ariel-ocampo",
    name: "Manuel Ariel Ocampo",
    role: "CEO",
    companySlug: "traixo",
    photo: "/fundadores/manuel-ariel-ocampo.webp",
    bio: {
      es: "Creador y fundador de Traixo, plataforma de envíos colaborativos.",
      en: "Creator and founder of Traixo, a collaborative shipping platform.",
    },
  },
];

export function getFounder(slug: string) {
  return founders.find((founder) => founder.slug === slug);
}

export function founderRoleAt(founder: Founder, companySlug: string) {
  if (founder.companySlug === companySlug) return founder.role;
  return founder.alsoAt?.find((place) => place.companySlug === companySlug)?.role;
}

export function getFoundersByCompany(companySlug: string) {
  return founders
    .filter(
      (founder) =>
        founder.companySlug === companySlug ||
        founder.alsoAt?.some((place) => place.companySlug === companySlug),
    )
    .sort((a, b) => Number(a.companySlug !== companySlug) - Number(b.companySlug !== companySlug));
}

export function founderCompany(founder: Founder) {
  return getCompany(founder.companySlug);
}
