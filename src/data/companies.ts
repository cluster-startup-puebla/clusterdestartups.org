import { routing } from "@/modules/cores/i18n/src/config/routing";
import type { Locale } from "@/modules/cores/i18n/src/interfaces/i18n.interface";

/**
 * Padrón de empresas del clúster.
 *
 * ÚNICA fuente de verdad del directorio: las páginas leen de aquí y no
 * conocen ninguna empresa por su nombre.
 *
 * Los campos de ficha son afirmaciones sobre empresas reales: se llenan
 * con lo que la empresa confirma y nunca se inventan. Mientras un campo
 * esté vacío la ficha muestra "Pendiente de confirmar"; en cuanto se
 * rellena aquí aparece en el listado y en la ficha sin tocar ninguna
 * página.
 *
 * Verificar también la grafía exacta de cada nombre (mayúsculas,
 * acentos, sufijos legales) antes de publicar.
 */

/**
 * Texto de ficha en los dos idiomas del sitio.
 *
 * El sitio se sirve en `es` y `en`, así que el contenido de empresa
 * viaja en ambos: dejar solo español haría que /companies mezclara
 * encabezados en inglés con párrafos en español. Al ser `Record<Locale,
 * string>`, añadir un idioma en `routing` rompe la compilación hasta
 * traducir todas las fichas — que es justo lo que queremos.
 */
export type LocalizedText = Record<Locale, string>;

/**
 * Verticales de startup. El id es estable y viaja en la URL del filtro;
 * la etiqueta se traduce al pintar.
 *
 * Catálogo cerrado a propósito: cada empresa elige de aquí, en vez de
 * inventar una etiqueta nueva que parta el directorio en filtros de un
 * solo uso.
 */
export const STARTUP_INDUSTRIES = {
  agtech: { es: "Agtech", en: "Agtech" },
  climatech: { es: "Climatech", en: "Climatech" },
  edtech: { es: "Edtech", en: "Edtech" },
  gametech: { es: "Gametech", en: "Gametech" },
  healthtech: { es: "Healthtech", en: "Healthtech" },
  hrtech: { es: "HR Tech", en: "HR Tech" },
  industry40: { es: "Industria 4.0", en: "Industry 4.0" },
  logistics: { es: "Logística", en: "Logistics" },
  mobility: { es: "Movilidad", en: "Mobility" },
  proptech: { es: "Proptech", en: "Proptech" },
  software: { es: "Software", en: "Software" },
  sportstech: { es: "Sportstech", en: "Sportstech" },
  taxtech: { es: "Taxtech", en: "Taxtech" },
} as const satisfies Record<string, LocalizedText>;

export type StartupIndustry = keyof typeof STARTUP_INDUSTRIES;

export type CatalogItem = {
  name: LocalizedText;
  description?: LocalizedText;
  image?: string;
};

export type Company = {
  /** Segmento de URL. En inglés la ruta es /companies/<slug>. */
  slug: string;
  /**
   * La empresa confirmó la ficha. `true` muestra el sello.
   * Una ficha de captación entra en `false` hasta que acepten la revisión.
   */
  verified: boolean;
  name: string;
  /**
   * Ruta del logo dentro de `public/`, p. ej. `/empresas/radek.webp`.
   * Sin logo, la ficha cae en un recurso tipográfico con el nombre.
   * Conviene subirlos monocromos o con fondo transparente: el mundo es
   * oscuro y un PNG con fondo blanco se ve como recuadro pegado.
   */
  logo?: string;
  /**
   * Símbolo sin la placa de color, para el banner del fundador.
   * Hace falta cuando `logo` es un ícono relleno: la silueta si no pinta el recuadro entero.
   */
  logoMark?: string;
  /** Si el logo es claro/transparente, aplicar filter en modo claro para que sea visible. */
  logoDark?: boolean;
  /**
   * Wordmark en tinta oscura sobre transparente. En modo oscuro se invierte
   * conservando el color de marca, para que la palabra no desaparezca.
   */
  logoInk?: boolean;
  /** Lote de ingreso al clúster. "early" = fundacionales. */
  batch?: string;
  /** Ubicación de la empresa (localized). */
  region?: LocalizedText;
  /**
   * Punto del mapa del directorio. Calle publicada o lugar asignado.
   * Sin este campo la empresa no se pinta.
   */
  location?: {
    address: string;
    lat: number;
    lng: number;
  };
  /** Slug anterior. Sigue abriendo esta ficha y muestra el aviso hacia `slug`. */
  previousSlug?: string;
  /** Descripción corta de una línea para el listado. */
  shortDescription?: LocalizedText;
  /** Verticales de `STARTUP_INDUSTRIES`. Una o dos, nunca una frase. */
  industries?: readonly StartupIndustry[];
  /** Problema que resuelve. */
  problem?: LocalizedText;
  /** Solución o servicio que provee. */
  solution?: LocalizedText;
  /** Productos o servicios concretos que ofrece la empresa. */
  catalog?: readonly CatalogItem[];
  contact?: {
    /** Persona con la que se habla, no un buzón genérico. */
    person?: string;
    /**
     * Cargo. Va sin traducir porque hasta ahora todos son siglas que no
     * se traducen (CEO, CTO); el día que una empresa dé un cargo en
     * español, este campo pasa a `LocalizedText`.
     */
    role?: string;
    /** Página de la empresa. */
    website?: string;
    /**
     * Producto corriendo: tablero en vivo, sandbox, recorrido grabado.
     * Va aparte del sitio porque para este público pesa más ver la
     * herramienta funcionando que leer la página institucional.
     */
    demo?: string;
    email?: string;
    phone?: string;
  };
};

/** Variante del idioma activo, con el idioma por defecto como respaldo. */
export function localize<T>(value: Record<Locale, T>, locale: string): T {
  return value[locale as Locale] ?? value[routing.defaultLocale];
}

/** Orden alfabético por nombre. */
const TEC_PUEBLA = {
  address: "Tecnológico de Monterrey Campus Puebla, Blvd. Vía Atlixcáyotl 5718, Puebla",
  lat: 19.020559,
  lng: -98.244652,
};

export const companies: readonly Company[] = [
  {
    slug: 'celunova',
    verified: false,
    name: 'CeluNova',
    logo: '/empresas/celunova.webp',
    logoDark: true,
    region: {
      es: 'México',
      en: 'Mexico'
    },
    shortDescription: {
      es: 'Startup de tecnología climática de México que transforma residuos de piña en celulosa y almidón.',
      en: 'Climate-tech startup from Mexico that turns pineapple waste into cellulose and starch.'
    },
    industries: ['climatech'],
    problem: {
      es: 'Cada año se desperdician 88 millones de toneladas de residuos de piña y la mayoría se quema, liberando CO₂. La celulosa tradicional tala hasta 17 árboles por tonelada, y el almidón de maíz compite con la producción de alimentos.',
      en: 'Every year, 88 million tons of pineapple waste are wasted and most of it is burned, releasing CO₂. Traditional cellulose production cuts down 17 trees per ton, and corn starch competes with food production.'
    },
    solution: {
      es: 'Con química verde y procesos biotecnológicos extrae celulosa de la hoja de la piña y almidón del tallo y la cáscara, y los convierte en materias primas de alto valor. Por cada tonelada de producto evita la tala de 17 árboles, reduce cerca de 66% el uso de agua y químicos, valoriza 7 toneladas de residuos de piña y recorta 5.5 toneladas de CO₂.',
      en: 'With green chemistry and biotechnological processes, it extracts cellulose from pineapple leaves and starch from the stem and skin, and turns them into high-value raw materials. Per ton of product, it saves 17 trees from deforestation, cuts water and chemical use by about 66%, valorizes 7 tons of pineapple waste and cuts 5.5 tons of CO₂.'
    },
    catalog: [
      {
        name: {
          es: 'Celulosa',
          en: 'Cellulose'
        },
        description: {
          es: 'Fibra suave, parecida al algodón, obtenida de la hoja de la piña. Sirve para papel, pañales, aislamiento y textiles.',
          en: 'Soft, cotton-like fiber from pineapple leaves. Used for paper, diapers, insulation and textiles.'
        }
      },
      {
        name: {
          es: 'Almidón',
          en: 'Starch'
        },
        description: {
          es: 'Base biodegradable extraída del tallo y la cáscara de la piña, para bioplásticos, cerámica y más.',
          en: 'Biodegradable base extracted from the pineapple stem and skin, for bioplastics, ceramics and more.'
        }
      }
    ],
    contact: {
      website: 'https://celunova.com.mx',
      email: 'contacto@celunova.com.mx',
      phone: '+52 993 2024 320'
    }
  },
  {
    slug: 'concora',
    verified: true,
    name: 'Concora',
    logo: '/empresas/concora.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Plataforma que conecta juventudes con oportunidades y empresas con talento junior mediante retos.',
      en: 'Platform connecting young people with opportunities and companies with junior talent through challenges.'
    },
    industries: ['edtech', 'hrtech'],
    problem: {
      es: 'Contratar talento junior con un currículum no dice si la persona puede hacer el trabajo. Del otro lado, becas, empleos y convocatorias están regados: hay que enterarse de cada una por separado y postularse sin saber si el perfil encaja.',
      en: 'Hiring junior talent from a résumé does not show whether the person can do the work. On the other side, scholarships, jobs and open calls are scattered: each one has to be found separately, with no way to tell whether the profile fits.'
    },
    solution: {
      es: 'Una plataforma que junta educación, tecnología y experiencia laboral. La Ruta Brújula evalúa competencias e intereses, detecta brechas de empleabilidad y forma en las habilidades que pide el mercado. Los retos de reclutamiento ponen a resolver un problema real de la empresa y dejan experiencia validada, con acceso a becas, trabajo o capital semilla. Las becas, empleos y convocatorias llegan con recomendación personalizada.',
      en: 'A platform that brings education, technology and work experience together. The Brújula path assesses skills and interests, finds employability gaps and trains the skills the market asks for. Recruitment challenges have people solve a real company problem and leave validated experience, with access to scholarships, jobs or seed capital. Scholarships, jobs and open calls arrive with a personalized recommendation.'
    },
    catalog: [
      {
        name: {
          es: 'Ruta Brújula',
          en: 'Brújula path'
        },
        description: {
          es: 'Evalúa competencias e intereses, detecta brechas de empleabilidad y forma en las habilidades que más pide el mercado.',
          en: 'Assesses skills and interests, finds employability gaps and trains the skills the market asks for most.'
        }
      },
      {
        name: {
          es: 'Retos de reclutamiento',
          en: 'Recruitment challenges'
        },
        description: {
          es: 'La persona resuelve un problema real de la empresa, deja experiencia profesional validada y puede acceder a becas, trabajo o capital semilla.',
          en: 'The person solves a real company problem, leaves validated professional experience and can access scholarships, a job or seed capital.'
        }
      },
      {
        name: {
          es: 'Oportunidades',
          en: 'Opportunities'
        },
        description: {
          es: 'Becas, empleos y convocatorias de emprendimiento, con recomendaciones personalizadas.',
          en: 'Scholarships, jobs and entrepreneurship calls, with personalized recommendations.'
        }
      }
    ],
    contact: {
      person: 'Fátima Gaytán',
      role: 'CEO',
      website: 'https://www.concora.mx/',
      email: 'hola@concora.mx'
    }
  },
  {
    slug: 'cravely',
    verified: false,
    name: 'Cravely',
    logo: '/empresas/cravely.webp',
    logoInk: true,
    location: {
      address: 'Jacarandas 3922, Ánimas, 72400 Puebla, Pue.',
      lat: 19.042271,
      lng: -98.234675,
    },
    shortDescription: {
      es: 'Marketplace donde las marcas publican campañas y los creadores aplican, y centraliza las reseñas de restaurantes.',
      en: 'Marketplace where brands publish campaigns and creators apply, and it centralizes restaurant reviews.'
    },
    problem: {
      es: 'Las marcas pierden horas en cada campaña de creadores: revisan perfiles de Instagram uno por uno, cierran por DM o WhatsApp sin contrato y después no siguen entregables ni fechas. En restaurantes, las opiniones llegan a la vez por Google, TripAdvisor, Uber Eats, Instagram y delivery, y el equipo de operación no alcanza a leerlas.',
      en: 'Brands lose hours on every creator campaign: they review Instagram profiles one by one, close deals over DM or WhatsApp with no contract, and then do not track deliverables or dates. At restaurants, opinions arrive at once from Google, TripAdvisor, Uber Eats, Instagram and delivery, and the operations team cannot get through them.'
    },
    solution: {
      es: 'El Marketplace publica la campaña de la marca y recibe postulaciones de creadores. La negociación, el contrato, las entregas, las aprobaciones y el pago quedan en la plataforma. La cuenta no tiene mensualidad: el cobro es al aceptar la colaboración. Las agencias asignan campañas y revisan los entregables de su roster. Para restaurantes, Cravely centraliza reseñas de Google, TripAdvisor, Yelp y más, detecta patrones con IA y alerta cuando llega algo grave. En el inicio, esa escucha social figura como próximamente.',
      en: 'The Marketplace publishes the brand campaign and takes applications from creators. Negotiation, the contract, deliverables, approvals and payment stay on the platform. The account has no monthly fee: the charge comes when the collaboration is accepted. Agencies assign campaigns and review deliverables for their roster. For restaurants, Cravely centralizes reviews from Google, TripAdvisor, Yelp and more, finds patterns with AI and alerts when something serious arrives. On the homepage, that social listening is listed as coming soon.'
    },
    catalog: [
      {
        name: { es: 'Marketplace', en: 'Marketplace' },
        description: {
          es: 'Campañas ilimitadas, postulaciones de creadores, contratos, entregas y pagos en la misma plataforma. Sin suscripción mensual: se cobra al aceptar la colaboración. Las agencias asignan campañas y dan seguimiento a los entregables de su roster.',
          en: 'Unlimited campaigns, creator applications, contracts, deliverables and payments on the same platform. No monthly subscription: the charge comes when the collaboration is accepted. Agencies assign campaigns and track deliverables for their roster.'
        }
      },
      {
        name: { es: 'Social Listening', en: 'Social Listening' },
        description: {
          es: 'Centraliza reseñas de Google, TripAdvisor y apps de delivery, con análisis de reputación por IA, alertas de reseñas negativas y comparativa de sucursales. En los precios del inicio aparece como próximamente. La propuesta cobra $29 USD al mes a restaurantes individuales y $79 USD al mes a grupos; el plan de grupos incluye el Marketplace. El plan de agencias de marketing está como próximamente.',
          en: 'Centralizes reviews from Google, TripAdvisor and delivery apps, with AI reputation analysis, negative-review alerts and branch comparison. On the homepage pricing it is listed as coming soon. The proposal charges $29 USD per month for individual restaurants and $79 USD per month for groups; the group plan includes the Marketplace. The marketing-agency plan is listed as coming soon.'
        }
      },
      {
        name: { es: 'Programa Restaurantes Fundadores', en: 'Founding Restaurants program' },
        description: {
          es: 'Acceso anticipado antes del lanzamiento público, precio preferencial de por vida y participación en el desarrollo con el equipo fundador. Pago único de $100 USD y 20 cupos.',
          en: 'Early access before the public launch, a preferential price for life and a part in development with the founding team. One-time payment of $100 USD and 20 spots.'
        }
      }
    ],
    contact: {
      website: 'https://cravely.io',
      email: 'privacidad@cravely.io'
    }
  },
  {
    slug: 'cuponerapp',
    verified: false,
    name: 'Cuponerapp',
    logo: '/empresas/cuponerapp.webp',
    logoDark: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Calzada Zavaleta 1108 Int. 1104, Santa Cruz Buenavista, 72150 Puebla',
      lat: 19.067006,
      lng: -98.249838,
    },
    shortDescription: {
      es: 'Plataforma digital de cupones, promociones y beneficios publicados por comercios y anunciantes.',
      en: 'Digital platform for coupons, promotions and benefits published by merchants and advertisers.'
    },
    solution: {
      es: 'Cuponerapp reúne cupones, promociones y beneficios de comercios y anunciantes en una app para iOS y Android y en el sitio web. En Shop el cupón se compra en línea, con tarjeta o efectivo, y se canjea en tienda dictando el folio. En la modalidad presencial se muestra el folio al pedir la cuenta. La app cubre las dos modalidades y avisa de ofertas exclusivas cerca de la ubicación; el sitio web solo permite Shop. Cuponerapp PRO es la suscripción con cupones exclusivos y acceso anticipado a ofertas. Integra lleva ese catálogo a empresas, para colaboradores o clientes. Viajes Cuponerapp vende paquetes todo incluido a 12 meses sin intereses.',
      en: 'Cuponerapp brings together coupons, promotions and benefits from merchants and advertisers in an iOS and Android app and on the website. In Shop the coupon is bought online, with a card or cash, and redeemed in store by giving the code. In person, the code is shown when asking for the check. The app covers both modes and sends alerts for exclusive offers nearby; the website only supports Shop. Cuponerapp PRO is the subscription with exclusive coupons and early access to offers. Integra takes that catalog to companies, for employees or customers. Viajes Cuponerapp sells all-inclusive packages at 12 months with no interest.'
    },
    catalog: [
      {
        name: { es: 'Shop', en: 'Shop' },
        description: {
          es: 'Compra el cupón en línea con tarjeta de crédito, débito o efectivo y canjéalo en el establecimiento dictando el folio.',
          en: 'Buy the coupon online with a credit card, debit card or cash and redeem it at the venue by giving the code.'
        }
      },
      {
        name: { es: 'Cupón presencial', en: 'In-person coupon' },
        description: {
          es: 'En el local se ordena y, al pedir la cuenta, se muestra el folio al cajero o al encargado.',
          en: 'At the venue you order and, when asking for the check, show the code to the cashier or the person in charge.'
        }
      },
      {
        name: { es: 'Cuponerapp PRO', en: 'Cuponerapp PRO' },
        description: {
          es: 'Suscripción con cupones exclusivos y acceso anticipado a ofertas. El plan mensual cuesta $99 y se puede cancelar cuando se quiera; el anual cuesta $949, incluye dos meses y tiene garantía de devolución de 30 días.',
          en: 'A subscription with exclusive coupons and early access to offers. The monthly plan costs $99 and can be canceled at any time; the annual plan costs $949, includes two months and has a 30-day refund guarantee.'
        }
      },
      {
        name: { es: 'Integra', en: 'Integra' },
        description: {
          es: 'Beneficios digitales para colaboradores o clientes: cupones, promociones, tarjetas de regalo, experiencias y rewards, por la app, en marca blanca o por API. Cubre México y da servicio en Perú.',
          en: 'Digital benefits for employees or customers: coupons, promotions, gift cards, experiences and rewards, through the app, white label or an API. It covers Mexico and also serves Peru.'
        }
      },
      {
        name: { es: 'Viajes Cuponerapp', en: 'Viajes Cuponerapp' },
        description: {
          es: 'Paquetes de viaje todo incluido a 12 meses sin intereses.',
          en: 'All-inclusive travel packages at 12 months with no interest.'
        }
      },
      {
        name: { es: 'Reservas', en: 'Reservations' },
        description: {
          es: 'Reservaciones de restaurante en tiempo real desde la app, sin llamadas y sin comisión por cubierto.',
          en: 'Real-time restaurant reservations from the app, with no phone calls and no per-cover fee.'
        }
      },
      {
        name: { es: 'Para tu marca', en: 'For your brand' },
        description: {
          es: 'El comercio publica promociones en la red. No hay inversión inicial ni pagos recurrentes: se paga por resultados, y el panel administra, activa y mide los cupones.',
          en: 'The business publishes promotions on the network. There is no setup fee and no recurring payments: it pays for results, and the dashboard manages, activates and measures the coupons.'
        }
      }
    ],
    contact: {
      website: 'https://www.cuponerapp.com',
      email: 'cuponerapp.media@gmail.com',
      phone: '+52 222 277 0955'
    }
  },
  {
    slug: 'empowershe',
    verified: true,
    name: 'EmpowerShe',
    logo: '/empresas/empowershe.webp',
    region: {
      es: 'México',
      en: 'Mexico'
    },
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Educación STEAM para niñas y jóvenes, con una app que funciona sin internet y talleres presenciales.',
      en: 'STEAM education for girls and young women, with an app that works offline and in-person workshops.'
    },
    industries: ['edtech'],
    problem: {
      es: 'En México, solo el 36% de quienes estudian ingeniería son mujeres. El 65% de las escuelas públicas no tiene computadoras ni internet, así que muchas niñas no llegan a la ciencia desde la primaria.',
      en: 'In Mexico, only 36% of engineering students are women. 65% of public schools have neither computers nor internet, so many girls never reach science in primary school.'
    },
    solution: {
      es: 'EmpowerShe es una asociación civil que diseña educación STEAM para niñas y jóvenes, sobre todo en comunidades en situación de vulnerabilidad. La app funciona sin conexión. Los talleres los imparten embajadoras y hay mentoría. EmpowerShe Raíces lleva el programa, gratuito y adaptado al idioma local, a comunidades rurales e indígenas.',
      en: 'EmpowerShe is a civil association that designs STEAM education for girls and young women, especially in vulnerable communities. The app works offline. Ambassadors teach the workshops and there is mentoring. EmpowerShe Raíces takes the program, free and adapted to the local language, to rural and indigenous communities.'
    },
    catalog: [
      {
        name: {
          es: 'EmpowerHer',
          en: 'EmpowerHer'
        },
        description: {
          es: 'App STEAM que funciona sin internet, con cursos, experimentos, videos e historias de mujeres en ciencia, más mentorías virtuales.',
          en: 'An offline STEAM app with courses, experiments, videos and stories of women in science, plus virtual mentoring.'
        }
      },
      {
        name: {
          es: 'EmpowerLab',
          en: 'EmpowerLab'
        },
        description: {
          es: 'La app más talleres presenciales de STEAM y habilidades blandas, impartidos por embajadoras.',
          en: 'The app plus in-person STEAM and soft-skills workshops, taught by ambassadors.'
        }
      },
      {
        name: {
          es: 'EmpowerShe Raíces',
          en: 'EmpowerShe Raíces'
        },
        description: {
          es: 'Programa gratuito para comunidades rurales e indígenas, con contenidos adaptados al idioma y al contexto local.',
          en: 'A free program for rural and indigenous communities, with content adapted to the local language and context.'
        }
      },
      {
        name: {
          es: 'Empowering Futures',
          en: 'Empowering Futures'
        },
        description: {
          es: 'Donación de dispositivos para llevar la app a comunidades sin acceso a internet.',
          en: 'Device donations so the app can reach communities without internet access.'
        }
      }
    ],
    contact: {
      person: 'Ximena Ortiz Gómez',
      role: 'CEO',
      website: 'https://empowershe.org/',
      email: 'empower.shee@gmail.com'
    }
  },
  {
    slug: 'fifty-fifty-card',
    verified: false,
    name: 'Fifty Fifty Card',
    logo: '/empresas/fifty-fifty-card.webp',
    logoInk: true,
    location: {
      address: 'Av. Teziutlán Sur 71, La Paz, 72160 Puebla',
      lat: 19.053511,
      lng: -98.228862,
    },
    shortDescription: {
      es: 'Membresía para reservar en restaurantes de Puebla y la Ciudad de México con 50% de descuento en alimentos.',
      en: 'Membership to book restaurants in Puebla and Mexico City with 50% off food.'
    },
    problem: {
      es: 'En horarios de menor demanda las mesas se quedan vacías y el restaurante sigue cargando sus gastos fijos. Prefiere una mesa ocupada que una vacía.',
      en: 'In lower-demand hours tables stay empty while the restaurant still carries its fixed costs. It would rather have an occupied table than an empty one.'
    },
    solution: {
      es: 'Quien reserva desde la app obtiene 50% de descuento en alimentos en más de 200 restaurantes de Puebla y la Ciudad de México. El restaurante no paga comisión ni mensualidad: elige días, horarios y mesas, y el descuento no incluye bebidas ni propina.',
      en: 'Booking in the app gets 50% off food at more than 200 restaurants in Puebla and Mexico City. The restaurant pays no commission and no monthly fee: it chooses the days, hours and tables, and the discount does not include drinks or tip.'
    },
    catalog: [
      {
        name: { es: 'Membresía', en: 'Membership' },
        description: {
          es: 'La primera reservación es gratis, sin membresía, y la página también anuncia el primer mes gratis. Después, el plan mensual cuesta $150 MXN al mes, IVA incluido, y se puede cancelar antes de que termine el periodo. Los términos contemplan además un plan anual y reservaciones ilimitadas.',
          en: 'The first reservation is free, without a membership, and the page also advertises the first month free. After that, the monthly plan is $150 MXN a month, tax included, and it can be cancelled before the period ends. The terms also include an annual plan and unlimited reservations.'
        }
      },
      {
        name: { es: 'Reserva con 50% en alimentos', en: 'Reservation with 50% off food' },
        description: {
          es: 'El 50% aplica solo a alimentos, en los días y horarios que publica el restaurante, y cubre a 2 personas. Hay que pedir al menos una bebida por persona, consumir en el lugar y no juntarlo con otra promoción. Bebidas y propina van aparte.',
          en: 'The 50% applies only to food, on the days and hours the restaurant publishes, and covers 2 people. Each person must order at least one drink, the meal is dine-in, and it cannot be combined with another promotion. Drinks and tip are separate.'
        }
      },
      {
        name: { es: 'Alta de restaurante', en: 'Restaurant listing' },
        description: {
          es: 'El restaurante se afilia gratis y recibe reservas confirmadas en su app, sin comisión por venta. Decide cuántas mesas ofrece y cuándo cierra la disponibilidad. El descuento no cubre bebidas ni propina, y el costo del alimento queda por debajo del 50% del precio de venta.',
          en: 'The restaurant joins for free and receives confirmed reservations in its app, with no commission on the sale. It decides how many tables to offer and when to close availability. The discount does not cover drinks or tip, and the food cost stays under 50% of the sale price.'
        }
      }
    ],
    contact: {
      website: 'https://www.fiftyfiftycard.mx',
      email: 'info@fiftyfiftycard.mx',
      phone: '+52 221 256 6699'
    }
  },
  {
    slug: 'figgo',
    verified: false,
    name: 'Figgo',
    logo: '/empresas/figgo.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Venustiano Carranza 205, San Baltazar Campeche, 72550 Puebla',
      lat: 19.023535,
      lng: -98.204740,
    },
    shortDescription: {
      es: 'Virtech ofrece Figgo Enterprise, plataforma de logística para empresas de mensajería y paquetería.',
      en: 'Virtech offers Figgo Enterprise, a logistics platform for courier and parcel companies.'
    },
    industries: ['logistics'],
    problem: {
      es: 'Cuesta coordinar con repartidores y equipos, planear las rutas a mano consume horas y el cliente no ve el estado de su envío. Los procesos manuales dejan guías incorrectas y paquetes perdidos.',
      en: 'It is hard to coordinate with couriers and teams, planning routes by hand takes hours, and the customer cannot see the status of the shipment. Manual processes leave incorrect guides and lost packages.'
    },
    solution: {
      es: 'Figgo Enterprise, de Virtech SA de CV, genera guías masivas desde Excel, el panel o la API, y guías impresas con la marca del cliente. Rastrea el paquete en tiempo real, calcula la ruta con la distancia, el tráfico y las ventanas horarias, y guarda la evidencia con código QR, fotografía y geolocalización. Incluye una app para repartidores y avisos automáticos al cliente. Virtech fue fundada hace 8 años y tiene presencia en 8 países.',
      en: 'Figgo Enterprise, from Virtech SA de CV, creates waybills in bulk from Excel, the admin panel or the API, and printed waybills with the customer brand. It tracks the parcel in real time, calculates the route from distance, traffic and delivery time windows, and stores proof with a QR code, a photo and geolocation. It includes a courier app and automatic updates for the customer. Virtech was founded 8 years ago and has a presence in 8 countries.'
    },
    catalog: [
      {
        name: { es: 'Integración con los sistemas de tus clientes', en: 'Integration with customer systems' },
        description: {
          es: 'Conecta la plataforma con los sistemas que el cliente ya usa, como su tienda en línea o su sistema de almacén.',
          en: 'Connects the platform to the systems the customer already uses, such as their online store or warehouse system.'
        }
      },
      {
        name: { es: 'Subusuarios para tus clientes', en: 'Sub-users for your customers' },
        description: {
          es: 'Cuentas secundarias para que cada cliente gestione solo sus entregas.',
          en: 'Secondary accounts so each customer manages only their own deliveries.'
        }
      },
      {
        name: { es: 'Creación masiva de guías', en: 'Bulk waybill creation' },
        description: {
          es: 'Genera guías desde Excel, el panel administrativo o la API.',
          en: 'Creates waybills from Excel, the admin panel or the API.'
        }
      },
      {
        name: { es: 'Guías impresas personalizadas', en: 'Custom printed waybills' },
        description: {
          es: 'La guía lleva el logo, los datos y las instrucciones de la empresa, y puede incluir un campo para que el cliente firme al recibir.',
          en: 'The waybill carries the company logo, details and instructions, and can include a field for the customer to sign on delivery.'
        }
      },
      {
        name: { es: 'Rastreo de paquetes', en: 'Parcel tracking' },
        description: {
          es: 'Seguimiento en tiempo real para que el cliente sepa dónde va su envío.',
          en: 'Real-time tracking so the customer knows where the shipment is.'
        }
      },
      {
        name: { es: 'Optimización de rutas dinámicas', en: 'Dynamic route optimization' },
        description: {
          es: 'Calcula la ruta con la distancia, el tráfico y las ventanas horarias de entrega.',
          en: 'Calculates the route from distance, traffic and the delivery time windows.'
        }
      },
      {
        name: { es: 'Evidencias de recolección y entrega', en: 'Pickup and delivery proof' },
        description: {
          es: 'Registra cada recolección o entrega con código QR, fotografía y geolocalización.',
          en: 'Records each pickup or delivery with a QR code, a photo and geolocation.'
        }
      },
      {
        name: { es: 'Generación de reportes', en: 'Reports' },
        description: {
          es: 'Reportes personalizados y exportables de la operación.',
          en: 'Custom operational reports that can be exported.'
        }
      },
      {
        name: { es: 'Notificaciones al cliente final', en: 'End-customer notifications' },
        description: {
          es: 'Avisos automáticos del estado del envío.',
          en: 'Automatic updates on the shipment status.'
        }
      }
    ],
    contact: {
      website: 'https://virtech.mx'
    }
  },
  {
    slug: 'gogotrack',
    verified: true,
    name: 'GoGoTrack',
    logo: '/empresas/gogotrack.webp',
    logoInk: true,
    location: {
      address: 'Calle 3 Sur, Centro Histórico de Puebla, 72530',
      lat: 19.041271,
      lng: -98.202416,
    },
    shortDescription: {
      es: 'GPS, checadores y conteo de pasajeros para flotillas de transporte público.',
      en: 'GPS, checkers and passenger counts for public transport fleets.'
    },
    industries: ['mobility'],
    problem: {
      es: 'El concesionario no ve en un solo lugar dónde va cada unidad, si cumplió los tiempos de la ruta ni cuántos pasajeros subieron de verdad. El recaudo queda en lo que reporte el chofer o el checador.',
      en: 'The concession holder cannot see, in one place, where each vehicle is, whether it kept the route times, or how many passengers actually boarded. Fare collection depends on what the driver or the checker reports.'
    },
    solution: {
      es: 'GoGoTrack conecta el GPS, los sensores y el video de la unidad con una plataforma para transporte público, privado o de carga. El concesionario rastrea la flotilla, registra entradas y salidas en puntos de checado, cuenta subidas y bajadas, y compara ese conteo con el recaudo. GoGoPay cobra a bordo con tarjeta, Google Pay y Apple Pay.',
      en: 'GoGoTrack connects the vehicle GPS, sensors and video to one platform for public, private or freight transport. The concession holder tracks the fleet, records arrivals and departures at check points, counts boardings and alightings, and compares that count with fare collection. GoGoPay takes cards, Google Pay and Apple Pay on board.'
    },
    catalog: [
      {
        name: {
          es: 'GPS',
          en: 'GPS'
        },
        description: {
          es: 'Ubicación de la flotilla en tiempo real, con rutas, paradas, geocercas, alertas y reportes, en web y en app.',
          en: 'Real-time fleet location, with routes, stops, geofences, alerts and reports, on the web and in the app.'
        }
      },
      {
        name: {
          es: 'Checadores virtuales',
          en: 'Virtual checkers'
        },
        description: {
          es: 'Puntos de checado por ruta, con registro de entradas, salidas y tiempos de recorrido.',
          en: 'Check points along the route, with a record of arrivals, departures and trip times.'
        }
      },
      {
        name: {
          es: 'Contador de pasajeros',
          en: 'Passenger counter'
        },
        description: {
          es: 'Subidas y bajadas por unidad, con sensor, barras o cámara, para comparar el conteo con el recaudo.',
          en: 'Boardings and alightings per vehicle, by sensor, bars or camera, so the count can be compared with fare collection.'
        }
      },
      {
        name: {
          es: 'GoGoPay',
          en: 'GoGoPay'
        },
        description: {
          es: 'Terminal a bordo para cobrar con tarjeta de crédito o débito, Google Pay y Apple Pay.',
          en: 'An onboard terminal for credit and debit cards, Google Pay and Apple Pay.'
        }
      }
    ],
    contact: {
      person: 'Lenin Pérez',
      role: 'Fundador',
      website: 'https://gogotrack.mx/',
      email: 'gogotrackmx@gmail.com',
      phone: '+52 222 177 0159'
    }
  },
  {
    slug: 'hexa-group',
    verified: true,
    name: 'Hexa Group',
    logo: '/empresas/hexa-group.webp',
    logoDark: true,
    region: {
      es: 'Playa del Carmen, Quintana Roo, México',
      en: 'Playa del Carmen, Quintana Roo, Mexico'
    },
    location: {
      address: 'Playa del Carmen, Quintana Roo',
      lat: 20.646285,
      lng: -87.080787,
    },
    shortDescription: {
      es: 'Biotecnología que convierte plásticos en proteína para alimento de animales acuáticos.',
      en: 'Biotechnology that turns plastics into protein for aquatic animal feed.'
    },
    industries: ['agtech'],
    problem: {
      es: 'El plástico sigue acumulándose y, al mismo tiempo, la piscicultura y los animales acuáticos exóticos necesitan proteína de alto rendimiento a un costo que puedan pagar.',
      en: 'Plastic keeps piling up and, at the same time, fish farming and exotic aquatic animals need high-performance protein at a cost they can pay.'
    },
    solution: {
      es: 'Hexa Group usa insectos para digerir plásticos y convertirlos en bio-proteínas. Con eso produce alimento de alta proteína, de costo competitivo y alto rendimiento, para animales acuáticos exóticos y piscicultura.',
      en: 'Hexa Group uses insects to digest plastics and turn them into bio-proteins. From that it produces high-protein feed, at a competitive cost and with high performance, for exotic aquatic animals and fish farming.'
    },
    catalog: [
      {
        name: {
          es: 'Bio-procesamiento ecológico',
          en: 'Ecological bioprocessing'
        },
        description: {
          es: 'Insectos digieren plásticos y los convierten en proteína de alta calidad para la industria animal.',
          en: 'Insects digest plastics and turn them into high-quality protein for the animal industry.'
        }
      },
      {
        name: {
          es: 'Alimento de alta proteína',
          en: 'High-protein feed'
        },
        description: {
          es: 'Alimento para animales acuáticos exóticos y piscicultura, de costo competitivo y alto rendimiento.',
          en: 'Feed for exotic aquatic animals and fish farming, at a competitive cost and with high performance.'
        }
      },
      {
        name: {
          es: 'Consultoría en biotecnología',
          en: 'Biotechnology consulting'
        },
        description: {
          es: 'Asesoría para empresas que quieren implementar tecnologías sostenibles de bio-procesamiento.',
          en: 'Advice for companies that want to implement sustainable bioprocessing technologies.'
        }
      }
    ],
    contact: {
      person: 'Isaac de la Rosa',
      role: 'Director General',
      website: 'https://hexagroup.lat/',
      email: 'direccion@hexagroup.lat'
    }
  },
  {
    slug: 'karggu',
    verified: true,
    name: 'Karggu',
    logo: '/empresas/karggu.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Puebla, Puebla',
      lat: 19.043798,
      lng: -98.198151,
    },
    shortDescription: {
      es: 'Plataforma que conecta paquetería, cliente y destinatario con tracking, Carta Porte y control de saldos.',
      en: 'Platform connecting carriers, customers and recipients with tracking, Carta Porte and balance control.'
    },
    industries: ['logistics'],
    problem: {
      es: 'La paquetería genera las guías a mano, una por una, y la información de facturación vive repartida entre archivos y personas. El cliente no tiene visibilidad del status de sus entregas, así que llama para preguntar; los sobrecargos se documentan tarde y buena parte nunca se cobra. Y sin un lugar donde vivan los precios y acuerdos de cada cliente, cada cotización se negocia de nuevo.',
      en: 'The carrier issues waybills by hand, one at a time, and billing information sits scattered across files and people. The customer has no visibility into delivery status, so they call to ask; surcharges get documented late and a good share is never billed. And with no single place holding each customer’s prices and agreements, every quote is renegotiated from scratch.'
    },
    solution: {
      es: 'Una plataforma que conecta a los tres actores del envío. La paquetería vincula ventas y operación en un solo lugar; el cliente genera, visualiza y sigue sus envíos y controla su gasto logístico en autoservicio; el destinatario rastrea su paquete, recibe la notificación de entrega y reporta incidencias por daño. Trae tracking, Carta Porte, control de saldos por cliente y báscula inteligente, con usuarios, almacenes, vehículos, rutas y operadores ilimitados. Se cobra por guía generada.',
      en: 'A platform that connects the three parties in a shipment. The carrier links sales and operations in one place; the customer creates, views and tracks shipments and controls logistics spend through self-service; the recipient tracks the parcel, gets the delivery notification and reports damage incidents. It includes tracking, Carta Porte, per-customer balance control and a smart scale, with unlimited users, warehouses, vehicles, routes and operators. Billing is per waybill generated.'
    },
    contact: {
      website: 'https://karggu.com/',
      email: 'admin@karggu.com'
    }
  },
  {
    slug: 'kigo',
    verified: true,
    name: 'Kigo',
    logo: '/empresas/kigo.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Calle Villa Juárez 6, La Paz, 72160 Puebla',
      lat: 19.051956,
      lng: -98.226905,
    },
    shortDescription: {
      es: 'Plataforma de accesos, identidad y pagos para estacionamientos, residencias, escuelas y corporativos.',
      en: 'Platform for access, identity and payments across parking, residential, school and corporate sites.'
    },
    industries: ['mobility'],
    problem: {
      es: 'Entrar, pagar y salir de un estacionamiento, un fraccionamiento o un colegio sigue dependiendo de filas, efectivo y registros que no se hablan. La operación no puede mostrar con evidencia quién entró, cuándo y bajo qué regla, y cada sede resuelve el acceso con un sistema distinto.',
      en: 'Getting in, paying and leaving a parking lot, a gated community or a school still depends on queues, cash and records that do not talk to each other. Operations cannot show, with evidence, who entered, when and under which rule, and each site solves access with a different system.'
    },
    solution: {
      es: 'Una sola plataforma para el control de accesos, la identidad y los pagos, conectada a la infraestructura que ya existe: barreras, puertas, torniquetes, elevadores y parquímetros. Identifica a la persona, valida las reglas y abre el acceso, y deja registro de quién, cuándo, dónde y bajo qué regla. Funciona con app, QR, placa, NFC/RFID o biometría. Nació en 2010 como parquímetro virtual y hoy opera en más de 75 ciudades.',
      en: 'One platform for access control, identity and payments, plugged into infrastructure that is already there: barriers, doors, turnstiles, elevators and parking meters. It identifies the person, checks the rules and opens the access, and records who, when, where and under which rule. It works with the app, QR, a license plate, NFC/RFID or biometrics. It started in 2010 as a virtual parking meter and now operates in more than 75 cities.'
    },
    catalog: [
      {
        name: {
          es: 'Parquímetro virtual Parkimovil',
          en: 'Parkimovil virtual parking meter'
        },
        description: {
          es: 'Cobro de estacionamiento en vía pública desde el celular, sin monedas.',
          en: 'On-street parking payment from the phone, with no coins.'
        }
      },
      {
        name: {
          es: 'Estacionamiento digital',
          en: 'Digital parking'
        },
        description: {
          es: 'Pago de estacionamiento desde la app, sin fila ni efectivo.',
          en: 'Parking payment from the app, with no queue and no cash.'
        }
      },
      {
        name: {
          es: 'Kigo Residencial',
          en: 'Kigo Residential'
        },
        description: {
          es: 'Accesos de fraccionamientos y edificios con app, QR o placa.',
          en: 'Access for gated communities and buildings with the app, QR or a license plate.'
        }
      },
      {
        name: {
          es: 'Kigo Corporativo',
          en: 'Kigo Corporate'
        },
        description: {
          es: 'Accesos, visitas y permisos de oficinas en una sola consola.',
          en: 'Office access, visitors and permissions in a single console.'
        }
      },
      {
        name: {
          es: 'Kigo Universidades',
          en: 'Kigo Universities'
        },
        description: {
          es: 'Accesos de campus con la misma identidad y trazabilidad.',
          en: 'Campus access under the same identity and traceability.'
        }
      },
      {
        name: {
          es: 'Kigo Colegios',
          en: 'Kigo Schools'
        },
        description: {
          es: 'Entradas y salidas escolares, con aviso cuando el estudiante entra o sale.',
          en: 'School entry and exit, with a notice when the student comes in or leaves.'
        }
      }
    ],
    contact: {
      website: 'https://kigo.pro/',
      email: 'ventas@kigo.pro',
      phone: '+52 222 790 0170'
    }
  },
  {
    slug: 'kotemah',
    verified: true,
    name: 'Kotemah',
    logo: '/empresas/kotemah.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Priv. 25 Poniente 4306, Belisario Domínguez, 72180 Puebla',
      lat: 19.049929,
      lng: -98.234400,
    },
    shortDescription: {
      es: 'Equipos de manipulación de carga en gravedad cero y exoesqueletos para la industria.',
      en: 'Zero-gravity load handling equipment and exoskeletons for industry.'
    },
    industries: ['industry40'],
    problem: {
      es: 'Levantar, empujar y transportar carga desgasta al operador, y a la planta le cuesta en incapacidades, rotación y ritmo perdido. Además es obligación normativa: la NOM-036-1-STPS-2018 exige identificar, analizar, prevenir y controlar el riesgo ergonómico en toda tarea que maneje cargas desde 3 kg, y sostenerlo con evidencia documentada. La mayoría de las plantas no tiene con qué demostrarlo.',
      en: 'Lifting, pushing and carrying loads wears the operator down, and it costs the plant in sick leave, turnover and lost pace. It is also a legal obligation: Mexico’s NOM-036-1-STPS-2018 requires identifying, analyzing, preventing and controlling ergonomic risk in every task handling loads of 3 kg or more, backed by documented evidence. Most plants have no way to prove it.'
    },
    solution: {
      es: 'Un ecosistema que cuida el cuerpo del operador y sostiene el expediente. Equipos de manipulación de carga en gravedad cero y exoesqueletos que quitan el esfuerzo de la tarea sin rediseñar la línea, más ErgoSoft para levantar la evaluación ergonómica, documentar los controles y llevar el seguimiento que pide la norma.',
      en: 'An ecosystem that protects the operator’s body and keeps the records straight. Zero-gravity load handling equipment and exoskeletons take the strain out of the task without redesigning the line, plus ErgoSoft to run the ergonomic assessment, document controls and keep the follow-up the standard requires.'
    },
    catalog: [
      {
        name: {
          es: 'Dronebox',
          en: 'Dronebox'
        },
        description: {
          es: 'Asistente robótico de transporte de carga que identifica escalones, escaleras rectas y caracol para asistir en el traslado. Capacidad de hasta 500 kg.',
          en: 'Robotic load transport assistant that identifies steps, straight and spiral staircases to assist in load carrying. Capacity up to 500 kg.'
        },
        image: '/empresas/kotemah/dronebox.webp'
      },
      {
        name: {
          es: 'LEXA WS UBF',
          en: 'LEXA WS UBF'
        },
        description: {
          es: 'Esqueleto artificial portátil que asiste al operador en tareas repetitivas de carga. Asistencia de 1.5 a 16 kg.',
          en: 'Wearable artificial skeleton that assists the operator in repetitive load-bearing tasks. Load assistance of 1.5 to 16 kg.'
        },
        image: '/empresas/kotemah/lexa-ws-ubf.webp'
      },
      {
        name: {
          es: 'COBHAN',
          en: 'COBHAN'
        },
        description: {
          es: 'Equipo neumático o eléctrico que asiste en la carga de materiales pesados, eliminando el riesgo de lesiones lumbares. Capacidad de 20 a 250 kg.',
          en: 'Pneumatic or electric equipment that assists in loading heavy materials, eliminating the risk of lower back injuries. Capacity from 20 to 250 kg.'
        },
        image: '/empresas/kotemah/cobhan.webp'
      },
      {
        name: {
          es: 'CORI',
          en: 'CORI'
        },
        description: {
          es: 'Equipo de asistencia de carga para tareas de transferencia en líneas de producción. Capacidad de 20 a 50 kg.',
          en: 'Load assistance equipment for transfer tasks on production lines. Capacity from 20 to 50 kg.'
        },
        image: '/empresas/kotemah/cori.webp'
      }
    ],
    contact: {
      person: 'Rodrigo Ruiz',
      email: 'ventas.koteos@gmail.com',
      phone: '+52 222 190 1740'
    }
  },
  {
    slug: 'mileva-dynamics',
    verified: true,
    name: 'Mileva Dynamics',
    logo: '/empresas/mileva-dynamics.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Av. Roble, Sanctorum, Cuautlancingo, 72710',
      lat: 19.113969,
      lng: -98.246631,
    },
    shortDescription: {
      es: 'Sistema Andon de control de presencia y productividad por reconocimiento facial en planta.',
      en: 'Andon system for presence and productivity control via facial recognition on the shop floor.'
    },
    industries: ['industry40'],
    problem: {
      es: 'Saber quién está trabajando, en qué estación y por cuánto tiempo resulta caro y poco confiable. El registro manual o por credencial se presta a errores y a que alguien marque por otro, así que no hay certeza del tiempo real en estación; sin ese dato no se ven los cuellos de botella, las ausencias ni los desbalances de línea. La visión industrial tradicional lo resuelve, pero pide servidores, GPU dedicada y cableado que muchas plantas no pueden pagar.',
      en: 'Knowing who is working, at which station and for how long turns out to be expensive and unreliable. Manual or badge check-in invites errors and buddy punching, so there is no certainty about real time at the station; without that figure, bottlenecks, absences and line imbalances stay invisible. Traditional machine vision solves it, but it demands servers, a dedicated GPU and cabling many plants cannot afford.'
    },
    solution: {
      es: 'Sistema Andon de control de presencia y productividad por reconocimiento facial. Corre en el borde, en el nodo de la propia estación: sin nube, sin infraestructura pesada y con los datos biométricos dentro del sitio. Mide intervalos verificables de inicio y fin —no acumulados estimados— y estructura la operación en una plataforma central: gerencia da de alta líneas y supervisores, y cada supervisor arma su equipo, asigna operadores a estaciones y sigue rendimientos, ausencias y desbalances.',
      en: 'An Andon system for presence and productivity control through facial recognition. It runs at the edge, on the station’s own node: no cloud, no heavy infrastructure, and biometric data never leaves the site. It measures verifiable start and end intervals — not estimated totals — and structures the operation in a central platform: management registers lines and supervisors, and each supervisor builds their team, assigns operators to stations and tracks output, absences and imbalances.'
    },
    contact: {
      person: 'Daniel Martínez',
      role: 'CEO',
      website: 'https://www.milevadynamics.com',
      demo: 'https://andon.milevadynamics.com/tablero',
      email: 'Josedaniel.martinez@milevadynamics.com',
      phone: '222 954 3666'
    }
  },
  {
    slug: 'nemiki',
    verified: true,
    name: 'Nemiki',
    logo: '/empresas/nemiki.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    shortDescription: {
      es: 'Juego indie mexicano de pixel art donde jugar regenera el hábitat del axolote.',
      en: 'Mexican indie pixel-art game where playing regenerates the axolotl habitat.'
    },
    industries: ['gametech'],
    problem: {
      es: 'La basura y la contaminación dañaron el hábitat del axolote y de muchas más especies. Acercar a más jóvenes a la naturaleza y financiar la conservación de ese bosque siguen siendo dos tareas distintas.',
      en: 'Trash and pollution have damaged the habitat of the axolotl and of many other species. Bringing more young people closer to nature and funding the conservation of that forest are still two separate tasks.'
    },
    solution: {
      es: 'Nemiki es un juego indie mexicano de pixel art, todavía en desarrollo, donde jugar es regenerar. Exploras un mundo herido, devuelves la vida al agua y al bosque, y acompañas a los axolotes de vuelta a su hábitat. El bosque del juego es real: está en Puebla, y parte de los ingresos financia su restauración. Lo co-crean con Villa Atl, que gestiona ese bosque con jóvenes, y con Xolokali, el refugio donde los axolotes se reproducen y se estudian. La mayor parte de los ingresos va a ese trabajo.',
      en: 'Nemiki is a Mexican indie pixel-art game, still in development, where playing is regenerating. You explore a wounded world, bring life back to the water and the forest, and accompany the axolotls back to their habitat. The forest in the game is real: it is in Puebla, and part of the revenue funds its restoration. They co-create it with Villa Atl, which manages that forest with young people, and with Xolokali, the refuge where axolotls reproduce and are studied. Most of the revenue goes to that work.'
    },
    catalog: [
      {
        name: {
          es: 'Restaura hábitats reales',
          en: 'Restore real habitats'
        },
        description: {
          es: 'Limpias ecosistemas, recuperas suelo y plantas donde ya no había nada. Cada misión nace de una acción de restauración en el mundo real.',
          en: 'You clean ecosystems, recover soil and plant where there was nothing. Each mission comes from a restoration action in the real world.'
        }
      },
      {
        name: {
          es: 'Axolote del altiplano',
          en: 'Plateau axolotl'
        },
        description: {
          es: 'La especie que resiste en el altiplano mexicano: cómo vive, qué la amenaza y qué necesita para volver.',
          en: 'The species that holds on in the Mexican plateau: how it lives, what threatens it and what it needs to return.'
        }
      },
      {
        name: {
          es: 'Co-creación scout',
          en: 'Scout co-creation'
        },
        description: {
          es: 'Los retos ambientales y las enseñanzas scout inspiran el juego. Los jugadores comparten sus experiencias.',
          en: 'Environmental challenges and scout teachings inspire the game. Players share their experiences.'
        }
      }
    ],
    contact: {
      website: 'https://www.nemiki.com.mx/',
      email: 'nemiki.game@gmail.com'
    }
  },
  {
    slug: 'netv',
    verified: true,
    name: 'NETV',
    logo: '/empresas/netv.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Puebla',
      lat: 19.043798,
      lng: -98.198151,
    },
    shortDescription: {
      es: 'Ecosistema phygital donde las empresas se conectan, venden, compran y aprenden después del evento.',
      en: 'Phygital ecosystem where companies connect, sell, buy and learn after the event ends.'
    },
    industries: ['software'],
    problem: {
      es: 'El siguiente cliente, proveedor o socio ya está en el mercado, pero el contacto vive en tarjetas, grupos de WhatsApp y cafés pendientes. Un congreso dura unos días y lo que se habló ahí se pierde cuando termina.',
      en: 'The next customer, supplier or partner is already in the market, but the contact lives on business cards, WhatsApp groups and coffees that never happen. A congress lasts a few days, and what was discussed there is lost when it ends.'
    },
    solution: {
      es: 'NETV Business Global Community, comunidad empresarial nacida en Puebla, junta eso en un solo ecosistema. La inteligencia artificial detecta quién le sirve a quién, y los eventos y las herramientas comerciales convierten esa conexión en contrato. El Recinto Digital mantiene lobby, auditorios, expo y sala de negocios junto a lo presencial, y lo que pasa en el evento queda registrado para seguir vendiendo después.',
      en: 'NETV Business Global Community, a business community born in Puebla, brings that into one ecosystem. Artificial intelligence finds who is useful to whom, and events plus commercial tools turn that connection into a contract. The Digital Venue keeps the lobby, auditoriums, expo and deal room alongside the in-person event, and what happens there stays on record so selling can continue afterward.'
    },
    catalog: [
      {
        name: {
          es: 'Eventos y Recinto Digital',
          en: 'Events and Digital Venue'
        },
        description: {
          es: 'Congresos, ferias y ruedas de negocio con lobby, auditorios, expo y sala de negocios. Lo presencial y lo digital viven en el mismo lugar.',
          en: 'Congresses, fairs and business matchmaking with a lobby, auditoriums, an expo and a deal room. In-person and digital live in the same place.'
        }
      },
      {
        name: {
          es: 'Hub Comercial',
          en: 'Commercial Hub'
        },
        description: {
          es: 'Marketplace, promociones con cupón, cotizaciones, pool de compras, trueque y foro empresarial.',
          en: 'Marketplace, coupon promotions, quotes, a buying pool, barter and a business forum.'
        }
      },
      {
        name: {
          es: 'Conexión',
          en: 'Connection'
        },
        description: {
          es: 'Redes de aliados, clientes y proveedores, con match por objetivo, giro y ciudad, más oportunidades, mesas de negociación y círculos.',
          en: 'Networks of allies, customers and suppliers, with matching by goal, industry and city, plus opportunities, negotiation tables and circles.'
        }
      },
      {
        name: {
          es: 'Academia',
          en: 'Academy'
        },
        description: {
          es: 'Cursos en vivo o grabados, evaluaciones, constancias verificables, mentoría y las memorias de cada congreso.',
          en: 'Live or recorded courses, assessments, verifiable certificates, mentoring and the recordings of each congress.'
        }
      }
    ],
    contact: {
      person: 'Francisco Vara',
      role: 'CEO',
      website: 'https://netv.app/'
    }
  },
  {
    slug: 'nubix',
    verified: false,
    name: 'Nubix',
    logo: '/empresas/nubix.webp',
    region: {
      es: 'San Andrés Cholula, Puebla, México',
      en: 'San Andrés Cholula, Puebla, Mexico'
    },
    location: {
      address: 'Torre Inxignia, Blvd. Vía Atlixcáyotl 2210, 72197 San Andrés Cholula',
      lat: 19.022389,
      lng: -98.244806,
    },
    shortDescription: {
      es: 'Procesamiento, diagnóstico y entrega de resultados en la nube para laboratorios, hospitales y consultorios.',
      en: 'Cloud processing, diagnosis and delivery of results for labs, hospitals and medical offices.'
    },
    industries: ['healthtech'],
    problem: {
      es: 'El diagnóstico tardaba días: faltaban radiólogos accesibles y el resultado quedaba lejos del paciente por la distancia, los servidores locales y el papel. En laboratorio e imagen, el expediente se imprimía, se transcribía a mano y había que recogerlo en sucursal.',
      en: 'Diagnosis took days: radiologists were hard to reach, and the result stayed far from the patient because of distance, local servers and paper. In the lab and in imaging, the record was printed, transcribed by hand and had to be picked up at the branch.'
    },
    solution: {
      es: 'Nubix digitaliza el laboratorio, el hospital y el consultorio con procesamiento, diagnóstico y entrega de resultados en la nube. La plataforma guarda el estudio, lo muestra en el navegador y lo envía al paciente; la interpretación remota cubre imagenología, radiología y cardiología, y el tiempo de respuesta pasa de días a horas.',
      en: 'Nubix digitizes the lab, the hospital and the medical office with cloud processing, diagnosis and delivery of results. The platform stores the study, shows it in the browser and sends it to the patient; remote interpretation covers imaging, radiology and cardiology, and turnaround goes from days to hours.'
    },
    catalog: [
      {
        name: { es: 'NUBIX RIS/PACS', en: 'NUBIX RIS/PACS' },
        description: {
          es: 'PACS y RIS en la nube para agendar, ver y compartir estudios desde el navegador. Las imágenes se guardan 10 años y el paciente y el médico referente entran por un portal.',
          en: 'Cloud PACS and RIS to schedule, view and share studies from the browser. Images are stored for 10 years, and the patient and the referring physician open them through a portal.'
        }
      },
      {
        name: { es: 'NUBIX Lab', en: 'NUBIX Lab' },
        description: {
          es: 'Une recepción, análisis y validación bioquímica en una pantalla, desde la orden hasta el diagnóstico. El reporte sale por enlace cifrado en WhatsApp o correo, y la muestra se rastrea con etiqueta.',
          en: 'Joins reception, analysis and biochemical validation on one screen, from the order to the diagnosis. The report goes out by encrypted link on WhatsApp or email, and the sample is tracked with a label.'
        }
      },
      {
        name: { es: 'scanx', en: 'scanx' },
        description: {
          es: 'Interpretación remota de imagenología, radiología y cardiología por especialistas certificados, integrada a la plataforma. El estudio se asigna a distancia y el reporte queda en la nube.',
          en: 'Remote interpretation of imaging, radiology and cardiology by certified specialists, built into the platform. The study is assigned at a distance and the report stays in the cloud.'
        }
      },
      {
        name: { es: 'proxa', en: 'proxa' },
        description: {
          es: 'Lleva radiología portátil y toma de muestras a donde está el paciente, y conecta la unidad móvil con el flujo en la nube. El reporte sale por WhatsApp, SMS o correo cuando la matriz lo valida.',
          en: 'Takes portable radiology and sample collection to where the patient is, and connects the mobile unit to the cloud workflow. The report goes out by WhatsApp, SMS or email once the central site validates it.'
        }
      }
    ],
    contact: {
      website: 'https://nubix.cloud',
      email: 'soluciones@theia.com.mx'
    }
  },
  {
    slug: 'nutriiapp',
    verified: false,
    name: 'NutriiApp',
    logo: '/empresas/nutriiapp.webp',
    logoMark: '/empresas/nutriiapp-mark.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'C. Tecamachalco 94, La Paz, 72160 Puebla',
      lat: 19.055490,
      lng: -98.230007,
    },
    shortDescription: {
      es: 'Nutrición personalizada para empresas, con báscula en sede, planes a la medida y seguimiento continuo.',
      en: 'Personalized nutrition for companies, with an on-site scale, tailored plans and ongoing follow-up.'
    },
    industries: ['healthtech'],
    problem: {
      es: 'La evidencia de NOM-030 y NOM-035 vive en carpetas sueltas y correos. El expediente de salud no es de la empresa: no ve el historial clínico, las notas ni las respuestas individuales a los cuestionarios.',
      en: 'NOM-030 and NOM-035 evidence lives in loose folders and email. The health record does not belong to the company: it does not see the clinical history, the notes or the individual questionnaire answers.'
    },
    solution: {
      es: 'NutriiApp instala en la sede la estación NutriiPoint, una báscula de bioimpedancia en comodato, sin costo de compra del equipo. La persona se mide desde su app: mientras la sesión está activa otro teléfono no puede tomarla, y caduca sola. Con esa medición arma un plan quincenal, ajustado al presupuesto de alimentación, y lo sigue en iOS o Android con recetas, rutinas y acceso privado a nutrición y salud mental. La empresa solo ve indicadores agregados y anónimos: adopción, promedios de bienestar y un expediente de NOM-030 y NOM-035 listo para exportar. El expediente individual se queda con la persona, también cuando deja la empresa. El programa está en validación privada. El reporte no sustituye la responsabilidad de la empresa ante la STPS.',
      en: 'NutriiApp installs the NutriiPoint station on site, a bioimpedance scale on loan, with no equipment purchase. The person weighs in from their app: while the session is active no other phone can take it, and it expires on its own. From that reading it builds a plan every two weeks, adjusted to the food budget, and the person follows it on iOS or Android with recipes, routines and private access to nutrition and mental health. The company only sees anonymous aggregate indicators: adoption, well-being averages and a NOM-030 and NOM-035 file ready to export. The individual record stays with the person, including after they leave the company. The program is in private validation. The report does not replace the responsibility the company keeps before the STPS.'
    },
    catalog: [
      {
        name: { es: 'NutriiPoint', en: 'NutriiPoint' },
        description: {
          es: 'Báscula de bioimpedancia NutriiScale, entregada como estación NutriiPoint en comodato y sin costo de compra. La instalan en la sede con espacio estable, electricidad y conectividad. La sesión se abre en la app de la persona, otro teléfono no puede tomarla y caduca sola.',
          en: 'NutriiScale bioimpedance scale, delivered as a NutriiPoint station on loan and with no purchase cost. They install it on site with a stable space, power and connectivity. The session opens in the person\'s app, no other phone can take it and it expires on its own.'
        }
      },
      {
        name: { es: 'App NutriiApp', en: 'NutriiApp app' },
        description: {
          es: 'App para iOS y Android, en validación privada. Plan quincenal según la bioimpedancia y el presupuesto de alimentación, con recetas, seguimiento, rutinas de entrenamiento y acceso privado a nutrición y salud mental. Si hay conductas alimentarias de riesgo, el plan automático se suspende y la atención se canaliza con un especialista. Ante embarazo, lactancia, una condición crónica o si la persona es menor de 18 años, el plan automático no se genera.',
          en: 'iOS and Android app, in private validation. A plan every two weeks from the bioimpedance reading and the food budget, with recipes, follow-up, training routines and private access to nutrition and mental health. If there are risky eating behaviors, the automatic plan stops and care is referred to a specialist. In pregnancy, breastfeeding, a chronic condition or if the person is under 18, the automatic plan is not generated.'
        }
      },
      {
        name: { es: 'Panel corporativo', en: 'Corporate panel' },
        description: {
          es: 'Adopción, niveles de actividad, avance general, promedios de bienestar y control operativo de plantilla, en indicadores agregados y anónimos. No muestra el expediente individual, el historial clínico ni las respuestas a la NOM-035.',
          en: 'Adoption, activity levels, overall progress, well-being averages and operational headcount control, as anonymous aggregate indicators. It does not show the individual record, the clinical history or the NOM-035 answers.'
        }
      },
      {
        name: { es: 'Evidencia NOM-030 y NOM-035', en: 'NOM-030 and NOM-035 evidence' },
        description: {
          es: 'Expediente exportable con fecha de corte, alcance, población cubierta, instrumentos aplicados y resultados agregados, con sello de tiempo. Los cuestionarios de factores de riesgo psicosocial se contestan en la app y las respuestas individuales quedan protegidas. La empresa sigue siendo el sujeto obligado ante la NOM.',
          en: 'Exportable file with cutoff date, scope, covered population, instruments used and aggregate results, with a timestamp. Psychosocial risk questionnaires are answered in the app and the individual responses stay protected. The company remains the party obligated under the NOM.'
        }
      }
    ],
    contact: {
      website: 'https://nutriiapp.com.mx',
      email: 'hola@nutriiapp.com.mx'
    }
  },
  {
    slug: 'oxtron',
    verified: true,
    name: 'Oxtron',
    logo: '/empresas/oxtron.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Plataforma de huella de carbono alimentaria e inventario de emisiones con captura de CO₂.',
      en: 'Food carbon footprint platform and emissions inventory with CO₂ capture.'
    },
    industries: ['climatech'],
    problem: {
      es: 'Los compradores europeos y estadounidenses ya exigen trazabilidad ambiental para dejar entrar un producto, y el exportador mexicano no tiene con qué responder: medir la huella de cada producto pide análisis de ciclo de vida, y el reporte de emisiones se rearma a mano cada año. En polímeros y petroquímica hay además un desperdicio doble: el CO₂ de proceso se ventea como residuo mientras la planta sigue comprando insumos convencionales.',
      en: 'European and US buyers already demand environmental traceability before letting a product in, and Mexican exporters have no way to answer: measuring each product’s footprint requires life-cycle assessment, and the emissions report is rebuilt by hand every year. In polymers and petrochemicals the waste is twofold: process CO₂ is vented while the plant keeps buying conventional feedstock.'
    },
    solution: {
      es: 'Dos frentes sobre el mismo dato. La plataforma de huella de carbono alimentaria calcula automáticamente las emisiones de productos e ingredientes contra una base de análisis de ciclo de vida con metodología IPCC y GHG Protocol, y emite etiquetas climáticas verificables; la de inventario de emisiones automatiza el reporte de Alcances 1, 2 y 3 conforme al GHG Protocol y al RETC. Para fuentes fijas, un sistema modular captura el CO₂ con pureza de hasta 90% y lo devuelve como materia prima de policarbonato, metanol y resinas: el residuo de proceso se vuelve flujo de valor.',
      en: 'Two fronts on the same data. The food carbon footprint platform automatically calculates emissions for products and ingredients against a life-cycle assessment database built on IPCC methodology and the GHG Protocol, and issues verifiable climate labels; the emissions inventory platform automates Scope 1, 2 and 3 reporting under the GHG Protocol and Mexico’s RETC. For fixed sources, a modular system captures CO₂ at up to 90% purity and returns it as feedstock for polycarbonate, methanol and resins: a process waste becomes a value stream.'
    },
    contact: {
      person: 'Jazmín Salazar',
      role: 'CEO',
      website: 'https://www.oxtron.mx/es/',
      email: 'info@oxtron.mx'
    }
  },
  {
    slug: 'padel-360',
    verified: true,
    name: 'Padel 360',
    logo: '/empresas/padel-360.webp',
    logoInk: true,
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Liga amateur de pádel por equipos en México, con tres formatos y categoría asignada por evaluación.',
      en: 'Amateur team padel league in Mexico, with three formats and a category assigned by evaluation.'
    },
    industries: ['sportstech'],
    problem: {
      es: 'Las ligas amateur se rompen cuando la categoría la declara el jugador, entran incorporaciones para una serie decisiva y las alineaciones se ajustan al ver las parejas rivales. Una serie la puede cargar una sola pareja: no hacen falta jugadores de todas las categorías.',
      en: 'Amateur leagues break when the player declares the category, signings arrive for a decisive series and lineups are adjusted after the rival pairs are known. One pair can carry a series: players from every category are not required.'
    },
    solution: {
      es: 'Padel 360 organiza una liga por equipos en México. Cada serie enfrenta a dos equipos en cuatro canchas y reparte cuatro puntos, uno por cancha, sin bonos: ganar en Elite vale lo mismo que ganar en Rising. Los formatos 100% varonil, 100% femenil y 360 son competencias aparte, cada una con su cuadro, su calendario y su tabla. La categoría la asigna un panel de tres coaches, cada movimiento de roster conserva fecha, responsable y motivo, y las alineaciones se revelan al mismo tiempo. Lo oficial se registra en WePadel.app.',
      en: 'Padel 360 organizes a team league in Mexico. Each series pits two teams across four courts and splits four points, one per court, with no bonuses: a win on Elite is worth the same as a win on Rising. The 100% men, 100% women and 360 formats are separate competitions, each with its own draw, calendar and table. A panel of three coaches assigns the category, every roster move keeps the date, the person responsible and the reason, and lineups are revealed at the same time. What counts as official is recorded on WePadel.app.'
    },
    catalog: [
      {
        name: {
          es: '100% Varonil',
          en: '100% men'
        },
        description: {
          es: 'Cuatro canchas por serie, equipo íntegramente varonil, con cuadro, calendario y tabla propios. Primera jornada el 10 de octubre de 2026.',
          en: 'Four courts per series, an all-men team, with its own draw, calendar and table. First matchday on 10 October 2026.'
        }
      },
      {
        name: {
          es: '100% Femenil',
          en: '100% women'
        },
        description: {
          es: 'Mismo esquema que el varonil: cuatro canchas por serie y tabla propia. No es una categoría dentro de otro formato.',
          en: 'The same setup as the all-men format: four courts per series and its own table. It is not a category inside another format.'
        }
      },
      {
        name: {
          es: 'Formato 360',
          en: '360 format'
        },
        description: {
          es: 'Las cuatro canchas las juegan parejas de un hombre y una mujer del mismo equipo. Misma serie y mismos puntos; cambia cómo se forma la pareja. Arranque previsto en 2027.',
          en: 'All four courts are played by pairs of one man and one woman from the same team. Same series and same points; what changes is how the pair is formed. Start planned for 2027.'
        }
      },
      {
        name: {
          es: 'Evaluación',
          en: 'Evaluation'
        },
        description: {
          es: 'Un panel de tres coaches clasifica al jugador en 360 Elite, Master, Advanced o Rising, por consenso o mayoría. Sin evaluación no hay categoría.',
          en: 'A panel of three coaches places the player in 360 Elite, Master, Advanced or Rising, by consensus or majority. Without an evaluation there is no category.'
        }
      }
    ],
    contact: {
      person: 'Daniel Campos',
      role: 'Fundador',
      website: 'https://padel360league.com',
      phone: '+52 221 198 8001'
    }
  },
  {
    slug: 'plataforma-luca',
    verified: true,
    name: 'Plataforma Luca',
    logo: '/empresas/plataforma-luca.webp',
    logoInk: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'A Poniente de la 16 de Septiembre 4114, El Carmen Huexotitla, 72534 Puebla',
      lat: 19.029386,
      lng: -98.208181,
    },
    shortDescription: {
      es: 'Facturas, XML del SAT e ingresos y gastos para negocios y despachos contables.',
      en: 'Invoices, SAT XML and income and expenses for businesses and accounting firms.'
    },
    industries: ['taxtech'],
    problem: {
      es: 'El negocio lleva ingresos, gastos y facturas repartidos entre Excel, el portal del SAT y carpetas. El despacho sigue a cada cliente con archivos sueltos, correos y reportes armados a mano.',
      en: 'A business keeps income, expenses and invoices split across Excel, the SAT portal and folders. An accounting firm tracks each client through loose files, email and reports built by hand.'
    },
    solution: {
      es: 'LUCA es la plataforma de Paytax Accounting S.C. para organizar esa información fiscal. LUCA Lite descarga los XML del SAT, muestra ingresos, egresos y flujo de efectivo, emite facturas y deja a la mano la constancia de situación fiscal, la opinión de cumplimiento y el buzón tributario. LUCA Pro junta varios RFC en un panel: tareas por contador, entregables por periodo, validador de CFDI y reportes. No presenta declaraciones ni calcula impuestos.',
      en: 'LUCA is the platform of Paytax Accounting S.C. for organizing that fiscal information. LUCA Lite downloads XML from the SAT, shows income, expenses and cash flow, issues invoices and keeps the tax status certificate, the compliance opinion and the tax mailbox at hand. LUCA Pro brings several RFCs into one panel: tasks per accountant, deliverables by period, a CFDI validator and reports. It does not file returns or calculate taxes.'
    },
    catalog: [
      {
        name: {
          es: 'LUCA Lite',
          en: 'LUCA Lite'
        },
        description: {
          es: 'Para empresas, profesionistas y freelancers. Descarga XML y PDF del SAT, emite facturas y muestra ingresos, egresos y flujo de efectivo. El plan cuesta $249 MXN al mes e incluye 15 timbres.',
          en: 'For businesses, professionals and freelancers. Downloads XML and PDF from the SAT, issues invoices and shows income, expenses and cash flow. The plan is $249 MXN a month and includes 15 stamps.'
        }
      },
      {
        name: {
          es: 'LUCA Pro',
          en: 'LUCA Pro'
        },
        description: {
          es: 'Para contadores independientes y despachos. RFC sin límite, tareas por contador, descarga masiva de XML, constancias y opinión de cumplimiento. No incluye timbres.',
          en: 'For independent accountants and firms. Unlimited RFCs, tasks per accountant, bulk XML download, tax status certificates and compliance opinions. Stamps are not included.'
        }
      }
    ],
    contact: {
      website: 'https://plataformaluca.com/',
      email: 'contacto@plataformaluca.com',
      phone: '+52 221 416 9232'
    }
  },
  {
    slug: 'radek',
    verified: true,
    name: 'Radek',
    logo: '/empresas/radek.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Av. Roble, Sanctorum, Cuautlancingo, 72710',
      lat: 19.113969,
      lng: -98.246631,
    },
    shortDescription: {
      es: 'Convierte el desarrollo interno de empresas consolidadas en un negocio digital aparte.',
      en: 'Turns in-house development at established companies into a separate digital business.'
    },
    industries: ['software'],
    problem: {
      es: 'La inversión en tecnología es necesaria, pero el ROI se justifica solo desde el ahorro interno y ese ahorro casi nunca alcanza para pagar el proyecto. El software que la empresa manda a construir queda encerrado en su propia operación: cuesta, se amortiza lento y nunca genera un peso de ingreso.',
      en: 'Investing in technology is necessary, but the ROI case rests on internal savings alone, and those savings rarely cover the project. The software a company commissions stays locked inside its own operation: it costs money, pays back slowly and never earns a peso.'
    },
    solution: {
      es: 'Convierte el desarrollo interno en un negocio aparte, para que la misma inversión se pague dos veces: primero al digitalizar los procesos de la empresa, después al lanzar esa solución al mercado y generar ingresos nuevos. Construye el side business digital de la empresa consolidada levantando la startup de su propio sector.',
      en: 'Turns in-house development into a business of its own, so the same investment pays for itself twice: first by digitizing the company’s processes, then by taking that solution to market as a new revenue line. It builds an established company’s digital side business by launching the startup of its own sector.'
    },
    contact: {
      person: 'Yamil Álvarez',
      role: 'CEO',
      email: 'yamil@radek.mx'
    }
  },
  {
    slug: 'rocka',
    verified: true,
    name: 'Rocka',
    logo: '/empresas/rocka.webp',
    logoInk: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Av. Roble, Sanctorum, Cuautlancingo, 72710',
      lat: 19.113969,
      lng: -98.246631,
    },
    shortDescription: {
      es: 'Gestión comercial del asesor inmobiliario certificado: expediente, cita, contrato y firma.',
      en: 'Commercial operations for certified real estate advisors: file, appointment, contract and signature.'
    },
    industries: ['proptech'],
    problem: {
      es: 'Certificarse dejó de ser opcional en estados clave, pero el asesor certificado sigue cerrando la operación en WhatsApp y Excel. El expediente, la cita, la negociación y el contrato no viven en un solo lugar, y el certificado no cambia la herramienta con la que trabaja. Las plataformas inmobiliarias, además, aceptan a cualquiera: la certificación no es requisito para entrar.',
      en: 'Certification stopped being optional in key states, but the certified advisor still closes the deal in WhatsApp and Excel. The file, the appointment, the negotiation and the contract do not live in one place, and the certificate does not change the tool they work with. Real estate platforms also let anyone in: certification is not required to join.'
    },
    solution: {
      es: 'Plataforma de gestión comercial solo para asesores certificados. Cubre el ciclo de la transacción en México: registro y verificación de quienes participan, expediente, citas, negociación, contrato digital y firma electrónica. El expediente usa los documentos con los que de verdad se compra y se vende aquí: escrituras, avalúo, predial, INE, CURP, constancia fiscal, Infonavit y Fovissste. La certificación es la puerta de entrada.',
      en: 'A commercial-management platform only for certified advisors. It covers the transaction cycle in Mexico: registering and verifying the people involved, the file, appointments, negotiation, a digital contract and electronic signature. The file uses the documents a purchase and sale actually requires here: deeds, appraisal, property tax, INE, CURP, tax ID certificate, Infonavit and Fovissste. Certification is the way in.'
    },
    catalog: [
      {
        name: {
          es: 'Expediente',
          en: 'Transaction file'
        },
        description: {
          es: 'Escrituras, avalúo, predial, INE, CURP, constancia fiscal, Infonavit y Fovissste, en el formato con el que se cierra una operación en México.',
          en: 'Deeds, appraisal, property tax, INE, CURP, tax ID certificate, Infonavit and Fovissste, in the form a transaction actually closes with in Mexico.'
        }
      },
      {
        name: {
          es: 'Citas y negociación',
          en: 'Appointments and negotiation'
        },
        description: {
          es: 'La cita y la negociación del asesor quedan registradas en la misma plataforma.',
          en: 'The advisor’s appointments and negotiation stay on the same platform.'
        }
      },
      {
        name: {
          es: 'Contrato y firma',
          en: 'Contract and signature'
        },
        description: {
          es: 'Contrato digital y firma electrónica al cierre de la negociación.',
          en: 'A digital contract and electronic signature when the negotiation closes.'
        }
      },
      {
        name: {
          es: 'Verificación',
          en: 'Verification'
        },
        description: {
          es: 'Cada actor y cada documento pasa por verificación. Solo entran asesores certificados.',
          en: 'Every party and every document goes through verification. Only certified advisors get in.'
        }
      }
    ],
    contact: {
      person: 'Israel Reyes',
      website: 'https://rocka.mx/',
      email: 'contacto@rocka.mx'
    }
  },
  {
    slug: 'sabia',
    verified: true,
    name: 'Sabia',
    logo: '/empresas/sabia.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Puebla',
      lat: 19.043798,
      lng: -98.198151,
    },
    shortDescription: {
      es: 'Integración de sistemas e implementación de IA que estandarizan y automatizan procesos.',
      en: 'Systems integration and AI implementation that standardizes and automates processes.'
    },
    industries: ['software'],
    problem: {
      es: 'La operación vive en hojas de cálculo y en sistemas que no se hablan entre sí. Cada área captura lo mismo con otro nombre, la versión buena del archivo la tiene una persona y nadie puede decir cuánto tarda de verdad un proceso. Sin dato estandarizado y medido no hay nada que automatizar: primero hay que poner orden, y ese es el trabajo que siempre se pospone.',
      en: 'The operation lives in spreadsheets and in systems that do not talk to each other. Each area records the same thing under a different name, the good version of the file sits with one person, and nobody can say how long a process actually takes. Without standardized, measured data there is nothing to automate: the ordering has to come first, and that is the work that always gets postponed.'
    },
    solution: {
      es: 'Hace que los sistemas se hablen entre sí e implementa soluciones de IA que estandarizan, ordenan y miden el proceso antes de automatizarlo. El compromiso es concreto: cualquier Excel que hoy sostenga la operación se convierte en plataforma en ocho semanas, con el dato en un solo lugar y el proceso medido de punta a punta.',
      en: 'Gets systems talking to each other and deploys AI that standardizes, orders and measures a process before automating it. The commitment is concrete: any spreadsheet currently holding the operation together becomes a platform in eight weeks, with the data in one place and the process measured end to end.'
    },
    catalog: [
      {
        name: {
          es: 'Estrategia de transformación digital',
          en: 'Digital transformation strategy'
        },
        description: {
          es: 'Definimos la hoja de ruta tecnológica de tu empresa: qué automatizar primero, con qué datos trabajar y cómo escalar sin romper lo que ya funciona.',
          en: 'We define your company\'s technology roadmap: what to automate first, what data to work with, and how to scale without breaking what already works.'
        }
      },
      {
        name: {
          es: 'Integración de sistemas',
          en: 'Systems integration'
        },
        description: {
          es: 'Conectamos tus sistemas existentes (ERP, CRM, hojas de cálculo, bases de datos) en una sola plataforma con datos unificados y procesos medidos.',
          en: 'We connect your existing systems (ERP, CRM, spreadsheets, databases) into a single platform with unified data and measured processes.'
        }
      },
      {
        name: {
          es: 'Automatización con IA',
          en: 'AI-powered automation'
        },
        description: {
          es: 'Implementamos soluciones de IA que estandarizan y ordenan el proceso antes de automatizarlo, con compromiso de resultado concreto.',
          en: 'We deploy AI solutions that standardize and order the process before automating it, with a concrete commitment to results.'
        }
      },
      {
        name: {
          es: 'Sistemas agenticos y capa de datos',
          en: 'Agentic systems and data layer'
        },
        description: {
          es: 'Construimos agentes de IA que operan sobre tus datos reales: asistentes que consultan, procesan y toman decisiones dentro de tus sistemas, no fuera de ellos.',
          en: 'We build AI agents that operate on your real data: assistants that query, process and make decisions within your systems, not outside them.'
        }
      }
    ],
    contact: {
      person: 'Álvaro Castillo',
      email: 'hola@alvarocastillo.dev',
      phone: '221 240 1587'
    }
  },
  {
    slug: 'safe-mobility',
    verified: true,
    name: 'SAFE Mobility',
    logo: '/empresas/safe-mobility.webp',
    logoInk: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'Calle Guadalupe Victoria 619, San Baltazar Campeche, 72550 Puebla',
      lat: 19.014730,
      lng: -98.202484,
    },
    shortDescription: {
      es: 'Transporte especializado para personas con movilidad limitada, en vehículos adaptados y con app propia.',
      en: 'Specialized transport for people with limited mobility, in adapted vehicles and with its own app.'
    },
    industries: ['mobility'],
    problem: {
      es: 'Quien usa silla de ruedas, muletas o andadera, o quien ya necesita ayuda para subir y bajar, depende de otra persona para salir. El transporte común no sube una silla ni acompaña el traslado. La cita, el trabajo y la vida social se quedan en casa.',
      en: 'Someone who uses a wheelchair, crutches or a walker, or who already needs help getting in and out, depends on another person to leave the house. Ordinary transport does not load a wheelchair or accompany the trip. The appointment, the job and social life stay at home.'
    },
    solution: {
      es: 'Transporte puerta a puerta para personas con movilidad limitada. La empresa lo presenta como el primer servicio privado de este tipo en México. Los vehículos se adaptan en una planta propia, con ingeniería de SAFE Mobility y transformación certificada por Stellantis y Renault. La app deja pedir el viaje al momento o programarlo, ver el costo antes de confirmar y compartir el recorrido en vivo: cada unidad lleva tres cámaras. Cubre traslados médicos, laborales, de placer y cotidianos, de un solo viaje o recurrentes, cortos o de larga distancia. La atención incluye personal con licenciatura en fisioterapia y conductores capacitados para este servicio.',
      en: 'Door-to-door transport for people with limited mobility. The company presents it as the first private service of its kind in Mexico. Vehicles are adapted in its own plant, with SAFE Mobility engineering and a conversion certified by Stellantis and Renault. The app lets someone request a ride on the spot or schedule it, see the fare before confirming and share the trip live: each vehicle carries three cameras. It covers medical, work, leisure and everyday trips, one-off or recurring, short or long distance. The service includes staff with a physiotherapy degree and drivers trained for this work.'
    },
    catalog: [
      {
        name: {
          es: 'Viajes adaptados',
          en: 'Adapted trips'
        },
        description: {
          es: 'Unidades para silla de ruedas, muletas, andadera u otro apoyo. Viajes únicos o recurrentes, cortos o de larga distancia.',
          en: 'Vehicles for a wheelchair, crutches, a walker or another aid. One-off or recurring trips, short or long distance.'
        }
      },
      {
        name: {
          es: 'App SAFE',
          en: 'SAFE app'
        },
        description: {
          es: 'El viaje se pide al momento o se programa, el costo se ve antes de confirmar y el recorrido se comparte en tiempo real.',
          en: 'The trip is requested on the spot or scheduled, the fare is shown before confirming and the ride is shared in real time.'
        }
      },
      {
        name: {
          es: 'Transformación de vehículos',
          en: 'Vehicle conversion'
        },
        description: {
          es: 'Planta propia que convierte un auto de serie en una unidad accesible, con certificación de Stellantis y Renault.',
          en: 'An in-house plant that turns a production car into an accessible vehicle, with Stellantis and Renault certification.'
        }
      }
    ],
    contact: {
      person: 'Sergio Juárez',
      role: 'CEO',
      website: 'https://www.safemobility.com.mx/',
      email: 'contacto@safemobility.mx',
      phone: '221 101 0178'
    }
  },
  {
    slug: 'taxbox',
    verified: true,
    name: 'Taxbox',
    logo: '/empresas/taxbox.webp',
    logoInk: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: {
      address: 'A Poniente de la 16 de Septiembre 4114, El Carmen Huexotitla, 72534 Puebla',
      lat: 19.029386,
      lng: -98.208181,
    },
    shortDescription: {
      es: 'Diagnóstico fiscal y declaración anual para personas que cobran por nómina.',
      en: 'Tax diagnosis and annual return for people paid by payroll.'
    },
    industries: ['taxtech'],
    problem: {
      es: 'Quien cobra por nómina no siempre sabe si su declaración anual saldrá con saldo a favor o por pagar, ni si el SAT le debe una devolución o hay un asunto fiscal que atender.',
      en: 'Someone paid by payroll does not always know whether the annual return will come out with a balance in their favor or an amount due, or whether the SAT owes a refund or there is a tax matter to address.'
    },
    solution: {
      es: 'Taxbox revisa la información fiscal de personas con ingresos por nómina, entrega un resultado preliminar y lo explica. Si hay devolución, acompaña el proceso; si hay algo que atender, orienta con especialistas. El servicio prepara y presenta la declaración anual, revisa deducciones y se conecta al SAT.',
      en: 'Taxbox reviews the tax information of people with payroll income, returns a preliminary result and explains it. If there is a refund, it stays with them through the process; if something needs attention, specialists guide them. The service prepares and files the annual return, reviews deductions and connects to the SAT.'
    },
    catalog: [
      {
        name: {
          es: 'Taxbox LITE',
          en: 'Taxbox LITE'
        },
        description: {
          es: 'Presentación automática de la declaración anual, revisión de deducciones y conexión al SAT. El cobro es un porcentaje de la devolución, solo si el SAT devuelve.',
          en: 'Automatic filing of the annual return, a deduction review and a connection to the SAT. The fee is a percentage of the refund, and only if the SAT pays it back.'
        }
      },
      {
        name: {
          es: 'Taxbox PAY',
          en: 'Taxbox PAY'
        },
        description: {
          es: 'Análisis y presentación de la declaración cuando sale impuesto a pagar, con acuse y línea de captura.',
          en: 'Analysis and filing of the return when tax is due, with the acknowledgment and the payment slip.'
        }
      },
      {
        name: {
          es: 'Taxbox PREMIUM',
          en: 'Taxbox PREMIUM'
        },
        description: {
          es: 'Revisión por contador certificado, corrección de errores del SAT, asesoría fiscal y presentación del formato electrónico de devolución.',
          en: 'Review by a certified accountant, correction of SAT errors, tax advice and filing of the electronic refund form.'
        }
      }
    ],
    contact: {
      website: 'https://taxbox.mx/',
      email: 'hola@taxbox.com.mx'
    }
  },
  {
    slug: 'the-x-company',
    previousSlug: 'the-x-chair',
    verified: true,
    name: 'The X-Company',
    logo: '/empresas/the-x-chair.webp',
    logoInk: true,
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Silla de ruedas controlada por la mente, con interfaz cerebro-computadora.',
      en: 'Mind-controlled wheelchair with a brain-computer interface.'
    },
    industries: ['healthtech', 'mobility'],
    problem: {
      es: 'Una silla de ruedas convencional se opera con un control físico. Para quien no puede usarlo, el límite no es la silla: es no tener una forma propia de decirle hacia dónde ir.',
      en: 'A conventional wheelchair is operated with a physical control. For someone who cannot use it, the limit is not the chair: it is having no way of their own to tell it where to go.'
    },
    solution: {
      es: 'Silla de ruedas controlada por la mente, con neurotecnología e interfaz cerebro-computadora. La desarrolla The X-Company, con talento mexicano, para la salud y el bienestar de quien la necesita. El desarrollo obtuvo el primer lugar en el hackathon del Harvard Health Systems Innovation Lab.',
      en: 'A mind-controlled wheelchair built with neurotechnology and a brain-computer interface. The X-Company develops it, with Mexican talent, for the health and wellbeing of the people who need it. The work won first place at the Harvard Health Systems Innovation Lab hackathon.'
    },
    contact: {
      person: 'Eduardo Zárate Lara',
      website: 'https://thexcompany.netlify.app'
    }
  },
  {
    slug: 'traixo',
    verified: true,
    name: 'Traixo',
    logo: '/empresas/traixo.webp',
    logoInk: true,
    region: {
      es: 'México',
      en: 'Mexico'
    },
    location: {
      address: 'Puebla',
      lat: 19.043798,
      lng: -98.198151,
    },
    shortDescription: {
      es: 'Marketplace de envíos colaborativos: conecta paquetes con viajeros verificados que ya van de camino.',
      en: 'Collaborative shipping marketplace: it matches packages with verified travelers who are already on the way.'
    },
    industries: ['logistics'],
    problem: {
      es: 'La paquetería tradicional no usa el espacio que ya va vacío en un viaje. Quien necesita enviar un paquete y quien ya va a esa ruta no tienen dónde coincidir, coordinar la entrega y pagar con el dinero retenido hasta que el envío avanza.',
      en: 'Traditional parcel service does not use the space that already travels empty on a trip. Someone who needs to send a package and someone already heading that way have no place to match, arrange the handoff and pay with the money held until the shipment moves forward.'
    },
    solution: {
      es: 'Traixo conecta al remitente con un viajero verificado. El remitente publica origen, destino, tamaño y precio; el viajero publica su ruta y sus fechas. La plataforma hace el match, el chat para acordar la entrega y el cobro por Stripe, con el pago retenido hasta que el envío avanza. Al completar el trayecto, el viajero cobra sus ganancias menos la comisión de la app.',
      en: 'Traixo connects the sender with a verified traveler. The sender posts origin, destination, size and price; the traveler posts the route and the dates. The platform handles the match, the chat to agree on the handoff and the Stripe charge, with the payment held until the shipment moves forward. When the trip is done, the traveler is paid their earnings minus the app commission.'
    },
    catalog: [
      {
        name: {
          es: 'Enviar paquete',
          en: 'Send a package'
        },
        description: {
          es: 'El remitente publica el envío, elige un viaje compatible, paga y sigue el estado hasta la entrega.',
          en: 'The sender posts the shipment, picks a compatible trip, pays and follows the status through delivery.'
        }
      },
      {
        name: {
          es: 'Viajar y colaborar',
          en: 'Travel and collaborate'
        },
        description: {
          es: 'El viajero publica su ruta y sus fechas, acepta envíos compatibles y cobra al completar el trayecto, menos la comisión.',
          en: 'The traveler posts the route and the dates, accepts compatible shipments and gets paid when the trip is done, minus the commission.'
        }
      }
    ],
    contact: {
      person: 'Manuel Ariel Ocampo',
      role: 'CEO',
      website: 'https://traixo.com/',
      email: 'soporte@traixo.com'
    }
  },
  {
    slug: 'wepadel',
    verified: true,
    name: 'WePadel',
    logo: '/empresas/wepadel.webp',
    logoInk: true,
    location: TEC_PUEBLA,
    shortDescription: {
      es: 'Plataforma para jugar, organizar y hacer crecer una comunidad de pádel.',
      en: 'Platform to play, organize and grow a padel community.'
    },
    industries: ['sportstech'],
    problem: {
      es: 'El pádel de una comunidad vive repartido en varias apps y un grupo de WhatsApp. El historial se queda en el club donde se jugó, y la categoría la declara el jugador, no quien organiza.',
      en: 'A community’s padel lives across several apps and a WhatsApp group. The record stays at the club where it was played, and the player declares the category, not the organizer.'
    },
    solution: {
      es: 'WePadel junta jugadores, clubes, coaches y comunidades en una sola plataforma. El perfil, el historial y el ranking viajan con el jugador aunque cambie de club. Torneos, ligas, retas, canchas, clases y clínicas quedan registrados, y el ranking se recalcula con cada resultado. Con una membresía se reservan canchas con créditos en cualquier club afiliado.',
      en: 'WePadel brings players, clubs, coaches and communities into one platform. The profile, the record and the ranking travel with the player even if they change clubs. Tournaments, leagues, matches, courts, classes and clinics stay on record, and the ranking recalculates with every result. One membership books courts with credits at any affiliated club.'
    },
    catalog: [
      {
        name: {
          es: 'Retas',
          en: 'Matches'
        },
        description: {
          es: 'Partidos recurrentes entre amigos, con parejas, rondas y ranking en vivo.',
          en: 'Recurring matches among friends, with pairs, rounds and a live ranking.'
        }
      },
      {
        name: {
          es: 'Ligas',
          en: 'Leagues'
        },
        description: {
          es: 'Jornadas, tabla, ascensos y resultados, con el ranking recalculado a partir de cada resultado.',
          en: 'Matchdays, the table, promotions and results, with the ranking recalculated from every result.'
        }
      },
      {
        name: {
          es: 'Torneos',
          en: 'Tournaments'
        },
        description: {
          es: 'Inscripciones, grupos, cuadros y resultados en un solo lugar. La categoría la valida quien organiza.',
          en: 'Entries, groups, draws and results in one place. The organizer validates the category.'
        }
      },
      {
        name: {
          es: 'WePadel Pass',
          en: 'WePadel Pass'
        },
        description: {
          es: 'Una membresía para reservar con créditos en cualquier club afiliado, sin pagar en mostrador ni abrir una cuenta por club.',
          en: 'One membership to book with credits at any affiliated club, without paying at the desk or opening an account per club.'
        }
      }
    ],
    contact: {
      person: 'Daniel Campos',
      role: 'Fundador',
      website: 'https://www.wepadel.app/',
      demo: 'https://www.wepadel.app/ranking',
      email: 'hola@wepadel.app',
      phone: '+52 55 1798 4284'
    }
  },
  {
    slug: 'xiah',
    verified: true,
    name: 'XiA\'H',
    logo: '/empresas/xiah.webp',
    region: {
      es: 'México',
      en: 'Mexico'
    },
    location: {
      address: 'Monterrey, Nuevo León',
      lat: 25.680202,
      lng: -100.315258,
    },
    shortDescription: {
      es: 'Ingredientes bioactivos de plantas medicinales para la industria del bienestar.',
      en: 'Bioactive ingredients from medicinal plants for the wellness industry.'
    },
    industries: ['healthtech'],
    problem: {
      es: 'Las plantas medicinales se han usado por siglos contra el estrés, la inflamación y el bienestar, pero esa tradición no llega lista para una formulación industrial: hay que elegir la combinación, extraerla y dejarla estable y absorbible.',
      en: 'Medicinal plants have been used for centuries for stress, inflammation and wellbeing, but that tradition does not arrive ready for an industrial formulation: the combination has to be chosen, extracted and made stable and absorbable.'
    },
    solution: {
      es: 'XiA\'H parte de plantas medicinales mexicanas y de su uso tradicional. Selecciona el perfil herbal, extrae y purifica, hace una bioconversión con bacterias y encapsula el resultado en un polvo listo para formular. Lo ofrece a la industria del bienestar y la salud.',
      en: 'XiA\'H starts from Mexican medicinal plants and their traditional use. It selects the herbal profile, extracts and purifies, runs a bioconversion with bacteria and encapsulates the result as a powder ready to formulate. It offers that to the wellness and health industry.'
    },
    catalog: [
      {
        name: {
          es: 'Abastecimiento',
          en: 'Sourcing'
        },
        description: {
          es: 'Plantas medicinales mexicanas de uso tradicional, integradas a formulaciones con criterio científico.',
          en: 'Mexican medicinal plants from traditional use, built into formulations with a scientific criterion.'
        }
      },
      {
        name: {
          es: 'Formulaciones poliherbales',
          en: 'Polyherbal formulations'
        },
        description: {
          es: 'Combinan varias plantas para que actúen juntas, en vez de aislar un solo compuesto.',
          en: 'They combine several plants so they work together, instead of isolating a single compound.'
        }
      },
      {
        name: {
          es: 'Estabilización',
          en: 'Stabilization'
        },
        description: {
          es: 'Procesos de extracción que dejan el ingrediente estable y listo para integrarse a un producto.',
          en: 'Extraction processes that leave the ingredient stable and ready to go into a product.'
        }
      }
    ],
    contact: {
      person: 'Daniela Cabral Porras',
      role: 'CEO',
      website: 'https://www.xiah.com.mx/',
      email: 'info@xiah.com.mx',
      phone: '+52 81 2608 5317'
    }
  }
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug || company.previousSlug === slug);
}
