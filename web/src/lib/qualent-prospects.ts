/**
 * Prospect data for the Qualent proposal landing pages (/es/qualent/[empresa]).
 *
 * These pages are unlisted and noindex — each one is written for a single
 * company and cites their own publicly visible hiring activity.
 *
 * Research source: Yucatán prospect dashboard, gathered Aug 2026 from public
 * job boards (Computrabajo, Indeed, OCC, Glassdoor, Jooble), corporate sites,
 * Facebook recruitment pages and regional press. Hiring-signal counts are a
 * snapshot of that date — re-verify before outreach.
 */

export interface ProspectSignal {
  /** What we observed publicly */
  observation: string;
  /** Where it was visible */
  source: string;
}

export interface ProspectProse {
  /** Sub-headline under the company name in the hero */
  hook: string;
  /** Opening paragraph — why we are writing to them specifically */
  opening: string;
  /** How Qualent maps onto their particular operation */
  fitParagraphs: string[];
}

export interface Prospect {
  slug: string;
  name: string;
  /** Legal / operating name shown in the footnote, when it differs */
  legalName?: string;
  sector: string;
  /** Short scale descriptor for the hero stat row */
  scale: { value: string; label: string }[];
  prose: ProspectProse;
  /** Publicly observed hiring signals — the personalisation payload */
  signals: ProspectSignal[];
  /** Roles with the highest churn, in their words */
  highTurnoverRoles: string[];
  /** Where they recruit today */
  currentChannels: string[];
  /** Site/shift complexity that makes scheduling hard */
  footprint: string;
  /** A second, non-Qualent opportunity worth mentioning */
  adjacentOpportunity: string;
}

export const QUALENT_PROSPECTS: Prospect[] = [
  {
    slug: "crio",
    name: "Crío",
    legalName: "Productora Nacional de Huevo Crío",
    sector: "Agroindustria avícola",
    scale: [
      { value: "13", label: "mega-granjas" },
      { value: "14", label: "CEDIS y sucursales" },
      { value: "4", label: "estados de operación" },
    ],
    prose: {
      hook: "Contratación operativa continua en granjas, plantas y CEDIS — hoy resuelta a base de CV en PDF.",
      opening:
        "Crío mantiene decenas de vacantes abiertas al mismo tiempo: supervisores de captura de aves en turno rotativo, electromecánicos para la planta de alimentos, ayudantes generales de mantenimiento. Y con la nueva planta de alimento avícola en Mérida en construcción, esa demanda no va a bajar — va a multiplicarse. Esta página explica cómo Qualent absorbe ese volumen sin que el equipo de Recursos Humanos crezca al mismo ritmo.",
      fitParagraphs: [
        "Hoy el candidato que ve una vacante de Crío tiene que llegar a un portal, armar un CV y subirlo como PDF de máximo 1 MB. Para un ayudante general o un operario de granja, esa es la barrera que lo pierde: no tiene CV, no tiene computadora, y la postulación muere ahí. Qualent quita ese paso por completo — el candidato manda un mensaje de WhatsApp y la conversación hace el resto.",
        "Crío ya opera WhatsApp como canal principal con sus clientes. El hábito existe dentro de la empresa; lo que proponemos es extenderlo al lado de reclutamiento, donde el volumen y la rotación lo justifican todavía más.",
        "Con 13 granjas, una planta procesadora, una planta de alimentos y 14 CEDIS repartidos entre Yucatán, Quintana Roo, Campeche y Tabasco, cada entrevista tiene que agendarse en el sitio correcto, con la persona correcta, en el turno correcto. Qualent conoce la ubicación del candidato y agenda contra el calendario real de cada centro, con recordatorios automáticos antes de la cita.",
      ],
    },
    signals: [
      {
        observation:
          "Entre 11 y 35 ofertas activas de forma sostenida, con publicaciones de 2 a 11 días de antigüedad",
        source: "Bolsa de trabajo oficial en Computrabajo / Pandapé",
      },
      {
        observation:
          "Roles de turno rotativo publicados: supervisor de captura de aves, electromecánico industrial de planta de alimentos, técnico electromecánico, ayudante general de mantenimiento",
        source: "Computrabajo y agregadores",
      },
      {
        observation:
          "Vacante activa de HR Generalista — el propio equipo de Recursos Humanos está creciendo para sostener el volumen",
        source: "Bolsa de trabajo Computrabajo",
      },
      {
        observation:
          "Postulación alterna por formulario web que exige CV en PDF de máximo 1 MB",
        source: "Sitio corporativo",
      },
    ],
    highTurnoverRoles: [
      "Operarios de granja y captura de aves (turnos rotativos)",
      "Operadores de planta procesadora y planta de alimentos",
      "Ayudantes generales de mantenimiento",
      "Choferes y personal de CEDIS y expendios",
      "Vendedores de mostrador en expendios y macrobodegas",
    ],
    currentChannels: [
      "Computrabajo / Pandapé",
      "Formulario de CV en sitio web",
      "Agregadores de empleo",
      "Facebook e Instagram corporativos",
    ],
    footprint:
      "13 mega-granjas, planta procesadora, planta de alimentos, macrobodega y 14 CEDIS en Yucatán, Quintana Roo, Campeche y Tabasco, con turnos rotativos documentados en las propias vacantes.",
    adjacentOpportunity:
      "Con 13 granjas, 14 CEDIS y una planta de alimentos de gran escala en camino, un desarrollo a medida de trazabilidad y logística — pedidos de expendios, rutas de reparto, inventario en frío por sucursal — integrado a sus sistemas actuales es un proyecto natural para el mismo equipo.",
  },

  {
    slug: "galletas-donde",
    name: "Galletas Dondé",
    legalName: "Productos de Harina, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "~1,500", label: "colaboradores" },
      { value: "2", label: "plantas (Mérida y Umán)" },
      { value: "24", label: "estados de distribución" },
    ],
    prose: {
      hook: "17+ vacantes operativas abiertas a la vez, desde almacén en Umán hasta supervisión de ruta en Coatzacoalcos.",
      opening:
        "Dondé ya decidió que la gestión de talento se digitaliza — la adopción de una plataforma de capital humano lo demuestra. Lo que esa plataforma no resuelve es la parte de arriba del embudo: conseguir, filtrar y agendar a los candidatos operativos que sostienen dos plantas y una red de venta en ruta en 24 estados. Esta página trata exactamente de ese tramo.",
      fitParagraphs: [
        "Contamos más de 17 vacantes activas repartidas entre Computrabajo y Glassdoor, varias publicadas en las últimas 24 a 48 horas: supervisor de almacén en Umán, almacenista de materias primas, auxiliares de almacén en Mérida y Benito Juárez, supervisor de venta en ruta en Coatzacoalcos. Ese ritmo de publicación no es un pico estacional; es la línea base de una operación de este tamaño.",
        "Qualent se coloca antes de su plataforma de talento, no encima de ella. Recibe al candidato por WhatsApp, lo califica en español mexicano contra los requisitos reales del puesto, recolecta y verifica INE y CURP por OCR, y agenda la entrevista contra el calendario de la planta o la plaza que corresponda. Al equipo de Administración de Personal le llegan candidatos ya filtrados y con documentos completos.",
        "La distancia importa: una vacante de supervisor de ruta en Coatzacoalcos se gestiona hoy desde Yucatán. Un filtrado que corre solo, en el horario del candidato y sin depender de que alguien conteste el teléfono, es lo que hace viable reclutar a esa distancia sin abrir oficina.",
      ],
    },
    signals: [
      {
        observation: "17 ofertas activas en la página de empresa",
        source: "Computrabajo (razón social Productos de Harina, S.A. de C.V.)",
      },
      {
        observation:
          "18 vacantes listadas: supervisor de almacén en Umán, almacenista de materias primas, auxiliar de almacén en Mérida y Benito Juárez, supervisor de venta en ruta en Coatzacoalcos, supervisor de ventas canal detalle — varias publicadas en las últimas 24-48 horas",
        source: "Glassdoor",
      },
      {
        observation: "Vacantes recurrentes para la plaza de Mérida",
        source: "Indeed México",
      },
      {
        observation:
          "Transformación digital del área de Capital Humano ya en curso con una plataforma de gestión de talento",
        source: "Caso de éxito publicado por el proveedor",
      },
    ],
    highTurnoverRoles: [
      "Almacenistas y auxiliares de almacén (Mérida, Umán, Benito Juárez)",
      "Operadores de producción galletera",
      "Vendedores y supervisores de venta en ruta",
    ],
    currentChannels: [
      "Computrabajo (página de empresa activa)",
      "Glassdoor e Indeed (perfiles de empleador)",
      "Plataforma de gestión de capital humano",
    ],
    footprint:
      "Dos plantas en Mérida y Umán más una red de distribución y venta en ruta en 24 estados, con vacantes activas en plazas tan lejanas como Coatzacoalcos y producción industrial multi-turno.",
    adjacentOpportunity:
      "Con venta en ruta en 24 estados, una aplicación a medida de liquidación de rutas y devoluciones —integrada a su ERP y a su plataforma de capital humano— eliminaría las capturas dobles entre distribución y nómina.",
  },

  {
    slug: "keken",
    name: "Kekén",
    sector: "Agroindustria porcícola",
    scale: [
      { value: "~9,000", label: "colaboradores" },
      { value: "~7,000", label: "en Yucatán" },
      { value: "~300", label: "tiendas Maxicarne" },
    ],
    prose: {
      hook: "Reclutadores de campo, ferias itinerantes y ~26 vacantes activas — todo el embudo operado a mano.",
      opening:
        "Kekén contrata en tres formatos distintos al mismo tiempo: granjas repartidas por el interior del estado, plantas multi-turno en Umán, Sahé y Tizimín, y una red de ~300 tiendas Maxicarne en tres estados. Cada formato tiene su propio perfil de candidato y su propia geografía. Esta página propone un piloto acotado, no un reemplazo de todo lo que ya funciona.",
      fitParagraphs: [
        "La señal más clara no son las vacantes: es que Kekén publica el puesto de «Reclutador de campo» y lleva la Ruta del Empleo a municipios como Ticul, Muna y Kinchil. Eso significa que el trabajo de captar candidatos en comunidad ya se reconoce como una función dedicada, con presupuesto y con personas. Qualent no sustituye a esos reclutadores; les quita el filtrado y la persecución de documentos para que dediquen su tiempo a la parte que sí requiere presencia.",
        "El perfil de candidato de Kekén —población rural y maya-hablante, en 80 de los 106 municipios del estado— es precisamente donde WhatsApp gana. No hay portal que competir, no hay CV que armar: un código QR pegado en la tienda Maxicarne o en la entrada de la granja abre una conversación en el teléfono que el candidato ya trae en la mano.",
        "Con cientos de sitios y verificación de INE y CURP a escala, el cuello de botella no es encontrar gente: es procesarla. El OCR de Qualent lee y valida los documentos en la misma conversación, y la agenda se arma contra el calendario real de cada centro con recordatorios automáticos.",
      ],
    },
    signals: [
      {
        observation: "~26 ofertas activas en el perfil de empresa",
        source: "Computrabajo México",
      },
      {
        observation:
          "Cientos de vacantes agregadas en múltiples estados: supervisor de granja, electromecánico, vendedor de mostrador, cajero, tablajero, chofer repartidor, almacenista",
        source: "Agregadores de empleo",
      },
      {
        observation:
          "Puesto de «Reclutador de campo» publicado en Mérida — hay personal dedicado a captar candidatos en comunidad",
        source: "Bolsa de trabajo",
      },
      {
        observation:
          "«Ruta del Empleo»: feria de empleo itinerante con el gobierno estatal ofreciendo 300+ posiciones en Mérida, Ticul, Muna y Kinchil",
        source: "Comunicados corporativos y prensa regional",
      },
      {
        observation:
          "Múltiples sitios de terceros replicando sus convocatorias — señal de demanda sostenida de candidatos",
        source: "Portales de empleo de terceros",
      },
    ],
    highTurnoverRoles: [
      "Operarios de granja",
      "Tablajeros y carniceros",
      "Vendedores de mostrador y cajeros de tienda",
      "Choferes repartidores",
      "Almacenistas",
      "Electromecánicos y supervisores de producción y granja",
    ],
    currentChannels: [
      "Computrabajo e Indeed (perfiles de empresa)",
      "Agregadores y sitios de convocatorias",
      "Ferias de empleo presenciales itinerantes con gobierno estatal",
      "Reclutadores de campo propios",
      "Sitio corporativo",
    ],
    footprint:
      "Cientos de granjas distribuidas en el interior de Yucatán, 2 plantas procesadoras, 2 plantas de alimento, ~300 tiendas en tres estados del sureste y operaciones comerciales en más de 10 estados.",
    adjacentOpportunity:
      "Si el equipo de Atracción de Talento necesita integraciones a la medida —conexión con sus sistemas corporativos, reportes por división— el mismo equipo desarrolla módulos sobre Qualent sin arrancar un proyecto de software desde cero.",
  },

  {
    slug: "tere-cazola",
    name: "Tere Cazola",
    legalName: "SEPROINT, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "~70", label: "sucursales" },
      { value: "5", label: "estados" },
      { value: "2", label: "plantas en Mérida" },
    ],
    prose: {
      hook: "Ya tienen una página de Facebook dedicada a Recursos Humanos. Falta el paso que la convierte en un embudo.",
      opening:
        "Tere Cazola ya hace la parte difícil: publicar, tener presencia y atraer candidatos desde Facebook con una página propia de Recursos Humanos en Mérida. Lo que ocurre después —contestar, filtrar, pedir documentos, cuadrar horarios con cada coordinadora de sucursal— sigue siendo manual. Esta página trata de ese tramo, que es donde se pierde la mayoría de los candidatos.",
      fitParagraphs: [
        "Sus anuncios en Facebook pueden conectarse directo a WhatsApp con un clic. El candidato que ve la publicación no sale de la app: entra a una conversación que lo califica en español, le pide INE y CURP, los verifica por OCR y le ofrece horarios reales de entrevista. Con ~70 anuncios activos en Meta detectados en agosto, el inventario de tráfico ya existe — se trata de apuntarlo también al reclutamiento.",
        "Con ~70 sucursales en cinco estados, el filtrado se centraliza sin perder velocidad local: la conversación corre igual para todas las tiendas, pero cada entrevista se agenda contra el calendario de la sucursal y la coordinadora que corresponda. Es la única forma de que una sola persona en Mérida sostenga la contratación de toda la red.",
        "La expansión a Ciudad de México vuelve esto urgente: hoy se recluta a distancia para sucursales en Roma e Insurgentes desde Yucatán. Un proceso que depende de llamadas en horario de oficina no escala a esa distancia; uno que corre por WhatsApp a cualquier hora, sí.",
      ],
    },
    signals: [
      {
        observation:
          "Página de Facebook dedicada «Recursos Humanos Tere Cazola Mérida» publicando vacantes",
        source: "Facebook",
      },
      {
        observation:
          "7 ofertas activas: vendedor de sucursal en Insurgentes y Benito Juárez (CDMX), técnico de mantenimiento y coordinador ambiental en Mérida",
        source: "Computrabajo (razón social SEPROINT, S.A. de C.V.)",
      },
      {
        observation: "~20 ofertas agregadas para Mérida, CDMX y Coyoacán",
        source: "Agregadores de empleo",
      },
      {
        observation:
          "~70 anuncios activos en Facebook, Instagram, Messenger y Threads con llamado a la acción de WhatsApp — la infraestructura de Click-to-WhatsApp ya está montada del lado comercial",
        source: "Biblioteca de anuncios de Meta (ago 2026)",
      },
    ],
    highTurnoverRoles: [
      "Vendedoras de sucursal (retail de mostrador, ~70 tiendas)",
      "Reposteros y auxiliares de producción en planta",
      "Personal de empaque y almacén",
      "Técnicos de mantenimiento",
    ],
    currentChannels: [
      "Facebook (página propia de Recursos Humanos)",
      "Computrabajo",
      "Indeed México",
      "Agregadores de empleo",
    ],
    footprint:
      "~70 sucursales en Yucatán, Quintana Roo, Campeche, Tabasco y Ciudad de México, más dos plantas en Mérida con turnos de madrugada propios de panadería.",
    adjacentOpportunity:
      "Con 70 sucursales y tienda en línea con envíos nacionales, un tablero a medida de pedidos y mermas por sucursal —integrado a su punto de venta— daría visibilidad diaria de algo que hoy se arma a mano.",
  },

  {
    slug: "grupo-aduanero-peninsular",
    name: "Grupo Aduanero Peninsular",
    sector: "Logística y aduanas",
    scale: [
      { value: "~10", label: "plazas de operación" },
      { value: "~100", label: "empleados en corporativo" },
      { value: "6", label: "empresas del grupo" },
    ],
    prose: {
      hook: "Publican vacantes de chofer con «llama al…». Ese teléfono es el cuello de botella.",
      opening:
        "Grupo Aduanero Peninsular ya reconoce el problema: además de las vacantes de ayudante de almacén y tramitador, publicaron una vacante de Reclutador en Mérida. Cuando una empresa contrata a alguien para resolver el reclutamiento, es porque el proceso actual ya no da. Esta página propone atacar el mismo problema desde el proceso, no solo desde la plantilla.",
      fitParagraphs: [
        "Su página «ReclutamientoGAP» en Facebook publica vacantes de chofer de reparto para Transportes Villenca pidiendo al candidato que llame a un número. En la práctica eso es reclutamiento por WhatsApp manual: alguien tiene que contestar, repetir las mismas preguntas, anotar los datos y volver a marcar para agendar. Qualent toma exactamente ese flujo y lo automatiza, conservando el mismo canal al que el candidato ya está acostumbrado.",
        "Para choferes el filtrado tiene requisitos duros y verificables —licencia vigente del tipo correcto, INE, comprobante de domicilio— y son justo los que hoy se persiguen a mano. El OCR los lee y valida dentro de la conversación, antes de que nadie invierta tiempo en una entrevista.",
        "Con operación en Mérida, Progreso, Cancún, Puerto Morelos, Ciudad de México, Dos Bocas, Toluca, Manzanillo, Nuevo Laredo y Ciudad Hidalgo, cada candidato tiene que terminar agendado en la plaza correcta. Qualent identifica la ubicación y agenda contra el calendario de ese sitio, sin que alguien en corporativo haga de operador.",
      ],
    },
    signals: [
      {
        observation:
          "Página de Facebook dedicada «ReclutamientoGAP» publicando vacantes, por ejemplo «Transportes Villenca contrata: Chofer de reparto»",
        source: "Facebook",
      },
      {
        observation:
          "Anuncios en grupos de empleo locales pidiendo al candidato «llama al…» — captación telefónica manual",
        source: "Grupos de empleo de Facebook",
      },
      {
        observation:
          "3 ofertas activas, entre ellas ayudante de almacén / tramitador y auxiliar contable corporativo en Mérida",
        source: "Computrabajo (Grupo Aduanero Peninsular S.C.P.)",
      },
      {
        observation:
          "Vacante de «Reclutador» publicada en Mérida — el dolor de reclutamiento ya se está resolviendo contratando gente",
        source: "Portal de empleo regional",
      },
    ],
    highTurnoverRoles: [
      "Choferes de reparto (Transportes Villenca)",
      "Ayudantes de almacén y tramitadores aduanales",
      "Mensajeros",
      "Personal operativo de patio y previo en Progreso",
    ],
    currentChannels: [
      "Facebook: página dedicada de reclutamiento y grupos de empleo locales",
      "Computrabajo e Indeed (páginas de empresa)",
      "Contacto telefónico directo en los anuncios",
    ],
    footprint:
      "Mérida (corporativo), Progreso, Cancún, Puerto Morelos, Ciudad de México, Dos Bocas, Toluca, Manzanillo, Nuevo Laredo y Ciudad Hidalgo, con brazos de transporte, mensajería y logística que contratan de forma independiente.",
    adjacentOpportunity:
      "Ya operan un portal en la nube para clientes; puede extenderse con seguimiento de embarques en tiempo real, alertas por WhatsApp a clientes e integración con la central de monitoreo de flota.",
  },

  {
    slug: "la-anita",
    name: "La Anita",
    legalName: "La Anita Condimentos y Salsas",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "3", label: "plantas" },
      { value: "5+", label: "estados contratando" },
      { value: "100+", label: "años de operación" },
    ],
    prose: {
      hook: "Reclutamiento nativo de Facebook, operado mensaje por mensaje.",
      opening:
        "La Anita ya entendió dónde están sus candidatos: tienen una página propia de bolsa de trabajo en Facebook y publican en grupos de empleo de Mérida. El canal es el correcto. Lo que falta es que ese canal deje de consumir el día de alguien en Recursos Humanos, contestando los mismos mensajes uno por uno. Esta página trata de ese salto.",
      fitParagraphs: [
        "Sus vacantes visibles dibujan una operación que contrata en cinco estados a la vez: choferes de reparto en Mérida, Tapachula y Villahermosa, promotores de autoservicio y mayoreo en Ciudad Juárez, personal de Recursos Humanos en San Nicolás de los Garza. Coordinar eso desde Yucatán, por mensajes de Facebook, es un trabajo de tiempo completo que no escala.",
        "Qualent convierte esas publicaciones en un flujo automático: el candidato entra por WhatsApp, se le califica en español contra los requisitos del puesto, se le piden y verifican INE, CURP y licencia por OCR, y se le agenda entrevista en la plaza que le corresponde. Recursos Humanos ve solo a los candidatos que llegaron completos.",
        "Tras la integración de Zaaschila, estandarizar el reclutamiento de todo el grupo bajo un mismo proceso —en lugar de que cada marca y cada plaza improvise el suyo— es una ventana que conviene aprovechar mientras la estructura todavía se está definiendo.",
      ],
    },
    signals: [
      {
        observation:
          "Página de Facebook dedicada «Bolsa de Trabajo La Anita | Mérida» operada por Recursos Humanos",
        source: "Facebook",
      },
      {
        observation:
          "Publicaciones «LA ANITA CONDIMENTOS Y SALSAS SOLICITA…» en grupos de empleo locales",
        source: "Grupos de empleo de Facebook",
      },
      {
        observation:
          "Ofertas activas de chofer personal en Mérida, choferes de reparto en Tapachula y Villahermosa, promotor de autoservicio en Ciudad Juárez y becario de RH en San Nicolás de los Garza",
        source: "Agregadores de empleo",
      },
      {
        observation: "Página de empresa activa en bolsa de trabajo nacional",
        source: "OCC Mundial",
      },
    ],
    highTurnoverRoles: [
      "Choferes de reparto (Mérida, Tapachula, Villahermosa)",
      "Promotores de autoservicio y mayoreo",
      "Operadores de producción en tres plantas",
    ],
    currentChannels: [
      "Facebook (página propia de bolsa de trabajo y grupos de empleo)",
      "OCC Mundial (página de empresa)",
      "Indeed México y Computrabajo",
      "Agregadores de empleo",
    ],
    footprint:
      "Tres plantas más distribución nacional, con contrataciones simultáneas en Yucatán, Chiapas, Tabasco, Chihuahua y Nuevo León.",
    adjacentOpportunity:
      "Tras la adquisición de Zaaschila, un desarrollo a medida que unifique pedidos y facturación multimarca sobre su ERP evitaría mantener procesos paralelos por marca.",
  },
];

export function getProspect(slug: string): Prospect | undefined {
  return QUALENT_PROSPECTS.find((p) => p.slug === slug);
}

export function getProspectSlugs(): string[] {
  return QUALENT_PROSPECTS.map((p) => p.slug);
}
