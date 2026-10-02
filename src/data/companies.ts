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
  healthtech: { es: "Healthtech", en: "Healthtech" },
  hrtech: { es: "HR Tech", en: "HR Tech" },
  industry40: { es: "Industria 4.0", en: "Industry 4.0" },
  logistics: { es: "Logística", en: "Logistics" },
  mobility: { es: "Movilidad", en: "Mobility" },
  software: { es: "Software", en: "Software" },
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
  name: string;
  /**
   * Ruta del logo dentro de `public/`, p. ej. `/empresas/radek.webp`.
   * Sin logo, la ficha cae en un recurso tipográfico con el nombre.
   * Conviene subirlos monocromos o con fondo transparente: el mundo es
   * oscuro y un PNG con fondo blanco se ve como recuadro pegado.
   */
  logo?: string;
  /** Si el logo es claro/transparente, aplicar filter en modo claro para que sea visible. */
  logoDark?: boolean;
  /** Lote de ingreso al clúster. "early" = fundacionales. */
  batch?: string;
  /** Ubicación de la empresa (localized). */
  region?: LocalizedText;
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
export const companies: readonly Company[] = [
  {
    slug: 'concora',
    name: 'Concora',
    logo: '/empresas/concora.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
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
    slug: 'karggu',
    name: 'Karggu',
    logo: '/empresas/karggu.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    name: 'Kigo',
    logo: '/empresas/kigo.webp',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    name: 'Kotemah',
    logo: '/empresas/kotemah.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    name: 'Mileva Dynamics',
    logo: '/empresas/mileva-dynamics.webp',
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    slug: 'oxtron',
    name: 'Oxtron',
    logo: '/empresas/oxtron.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
    },
    shortDescription: {
      es: 'Plataforma de huella de carbono alimentaria e inventario de emisiones con captura de CO₂.',
      en: 'Food carbon footprint platform and emissions inventory with CO₂ capture.'
    },
    industries: ['climatech', 'agtech'],
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
    slug: 'radek',
    name: 'Radek',
    logo: '/empresas/radek.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    slug: 'sabia',
    name: 'Sabia',
    logo: '/empresas/sabia.webp',
    logoDark: true,
    batch: 'early',
    region: {
      es: 'Puebla, México',
      en: 'Puebla, Mexico'
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
    slug: 'the-x-chair',
    name: 'The X-Chair',
    logo: '/empresas/the-x-chair.webp',
    region: {
      es: 'México',
      en: 'Mexico'
    },
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
      website: 'https://www.instagram.com/the_xchair/'
    }
  }
];

export function getCompany(slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug);
}
