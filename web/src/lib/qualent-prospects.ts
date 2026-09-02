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
  /** Hero headline. Set uppercase, so keep it short and hard-hitting. */
  headline: string;
  /** One-line deck under the headline */
  hook: string;
  /** Opening paragraph — why we are writing to them specifically */
  opening: string;
  /** How Qualent maps onto their particular operation */
  fitParagraphs: string[];
}

export interface ProspectLogo {
  /** Path under /public — served locally, never hotlinked from the company's site */
  src: string;
  /** Intrinsic dimensions of the asset, for correct aspect ratio */
  width: number;
  height: number;
  /**
   * True when the asset is a light/white mark made for dark backgrounds — it is
   * placed straight onto the hero instead of inside the white chip, which would
   * render it invisible.
   */
  onDark?: boolean;
}

/**
 * How far along this company already is with WhatsApp. It decides the whole
 * argument of the page, so it is data, not copy.
 *   1 — already receives candidates on WhatsApp, handled manually
 *   2 — WhatsApp is already their channel, but commercially, not for hiring
 *   3 — no WhatsApp signal found
 */
export type WhatsAppTier = 1 | 2 | 3;

export interface ProspectBrand {
  /** Dark brand colour — bands, rules, headings in the "about you" section */
  ink: string;
  /** Bright brand colour — the band ground */
  pop: string;
  /** Optional third accent */
  hot?: string;
  /** True when ink/pop are our best guess rather than sampled from their mark */
  provisional?: boolean;
}

/**
 * Slots for the demo conversation. The script itself is shared — only these
 * change per company, so a new page is data, not new copy.
 */
export interface ProspectThread {
  candidateName: string;
  /** Salary / shift line the assistant quotes back */
  detail: string;
  /** The one hard requirement the assistant screens for */
  qualifier: string;
  qualifierAnswer: string;
  /** Documents requested, e.g. "su INE por los dos lados y la licencia" */
  docs: string;
  /** Short label for the verified-document bubble */
  docLabel: string;
  /** Where the interview lands */
  location: string;
  when: string;
}

export interface ProspectTryIt {
  /** Position the prefilled WhatsApp message names */
  positionTitle: string;
  /** Campaign ref code — matches buildWhatsAppLink() in the Qualent codebase */
  refCode: string;
  /** Their real harvested postings, shown as chips */
  jobs: string[];
}

export interface Prospect {
  slug: string;
  name: string;
  /** Company wordmark shown in the hero. Omitted until the asset is in place. */
  logo?: ProspectLogo;
  /** Palette sampled from their own mark, used only in the "Sobre ustedes" band */
  brand: ProspectBrand;
  waTier: WhatsAppTier;
  /** One sentence of evidence for the tier, shown in the hero chip */
  waEvidence: string;
  tryIt: ProspectTryIt;
  thread: ProspectThread;
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
    brand: { ink: "#003090", pop: "#F0C018", hot: "#C03030" },
    waTier: 2,
    waEvidence:
      "WhatsApp corporativo publicado en su sitio (999-942-1340) — hoy atiende clientes, no candidatos.",
    tryIt: {
      positionTitle: "Supervisor de Captura de Aves",
      refCode: "crio-captura-aves",
      jobs: [
        "Supervisor de captura de aves · turno rotativo",
        "Electromecánico industrial · planta de alimentos",
        "Ayudante general de mantenimiento",
      ],
    },
    thread: {
      candidateName: "Miguel Ángel Chan Pech",
      detail: "turno rotativo en granja, base Tekax",
      qualifier: "¿Puede trabajar en turno rotativo, incluyendo fines de semana?",
      qualifierAnswer: "Sí, sin problema",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la granja de Tekax",
      when: "el martes 2 de septiembre a las 9:00",
    },
    logo: { src: "/qualent-logos/crio.png", width: 406, height: 480 },
    legalName: "Productora Nacional de Huevo Crío",
    sector: "Agroindustria avícola",
    scale: [
      { value: "13", label: "mega-granjas" },
      { value: "14", label: "CEDIS y sucursales" },
      { value: "4", label: "estados de operación" },
    ],
    prose: {
      headline: "Decenas de vacantes abiertas. Cero conversaciones automáticas.",
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
    brand: { ink: "#A81E22", pop: "#F2D680", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin señal de WhatsApp en reclutamiento — hoy es Computrabajo, Glassdoor e Indeed.",
    tryIt: {
      positionTitle: "Auxiliar de Almacén",
      refCode: "donde-auxiliar-almacen",
      jobs: [
        "Auxiliar de almacén · Umán",
        "Almacenista de materias primas · Mérida",
        "Supervisor de venta en ruta · Coatzacoalcos",
      ],
    },
    thread: {
      candidateName: "Rosa Elena Poot Chi",
      detail: "planta de Umán, turno matutino",
      qualifier: "¿Ha trabajado antes en almacén o control de inventario?",
      qualifierAnswer: "Sí, dos años en almacén",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Umán",
      when: "el jueves 4 de septiembre a las 8:30",
    },
    legalName: "Productos de Harina, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "~1,500", label: "colaboradores" },
      { value: "2", label: "plantas (Mérida y Umán)" },
      { value: "24", label: "estados de distribución" },
    ],
    prose: {
      headline: "17 vacantes abiertas hoy. Una sola forma de contestarlas: a mano.",
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
    brand: { ink: "#601830", pop: "#F03030" },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy es Computrabajo, ferias itinerantes y reclutadores de campo.",
    tryIt: {
      positionTitle: "Tablajero",
      refCode: "keken-tablajero",
      jobs: [
        "Tablajero · Ticul",
        "Operario de granja",
        "Cajero Maxicarne",
      ],
    },
    thread: {
      candidateName: "Rosa María Uc Canul",
      detail: "tienda Maxicarne de Ticul",
      qualifier: "¿Ha trabajado antes cortando carne o en mostrador?",
      qualifierAnswer: "Sí, dos años en una carnicería",
      docs: "su INE y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la tienda de Ticul",
      when: "el jueves 4 de septiembre a las 9:00",
    },
    logo: { src: "/qualent-logos/keken.png", width: 240, height: 106 },
    sector: "Agroindustria porcícola",
    scale: [
      { value: "~9,000", label: "colaboradores" },
      { value: "~7,000", label: "en Yucatán" },
      { value: "~300", label: "tiendas Maxicarne" },
    ],
    prose: {
      headline: "La Ruta del Empleo llega a Ticul. El filtrado se queda en Mérida.",
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
    brand: { ink: "#510C76", pop: "#FFC600" },
    waTier: 2,
    waEvidence:
      "~70 anuncios activos en Meta con llamado a WhatsApp — el canal ya opera del lado comercial.",
    tryIt: {
      positionTitle: "Vendedora de Sucursal",
      refCode: "cazola-vendedora-sucursal",
      jobs: [
        "Vendedora de sucursal · CDMX",
        "Técnico de mantenimiento · Mérida",
        "Auxiliar de producción · planta",
      ],
    },
    thread: {
      candidateName: "Ana Lucía Balam Cauich",
      detail: "sucursal Insurgentes, turno de tarde",
      qualifier: "¿Tiene experiencia atendiendo mostrador o caja?",
      qualifierAnswer: "Sí, un año en cafetería",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la sucursal de Insurgentes",
      when: "el miércoles 3 de septiembre a las 11:00",
    },
    logo: { src: "/qualent-logos/tere-cazola.svg", width: 976, height: 769 },
    legalName: "SEPROINT, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "~70", label: "sucursales" },
      { value: "5", label: "estados" },
      { value: "2", label: "plantas en Mérida" },
    ],
    prose: {
      headline: "Su Facebook ya atrae candidatos. Después de eso, todo es manual.",
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
    brand: { ink: "#0043A8", pop: "#0060F0" },
    waTier: 1,
    waEvidence:
      "Ya reclutan por WhatsApp, a mano: sus anuncios de chofer piden marcar un número directo.",
    tryIt: {
      positionTitle: "Chofer de Reparto",
      refCode: "gap-chofer-reparto",
      jobs: [
        "Chofer de reparto · Mérida",
        "Ayudante de almacén · Progreso",
        "Tramitador aduanal",
      ],
    },
    thread: {
      candidateName: "Jorge Alberto Poot Ek",
      detail: "base Mérida con ruta a Progreso",
      qualifier: "¿Qué tipo de licencia tiene y cuánta experiencia en reparto?",
      qualifierAnswer: "Licencia C, tres años en reparto",
      docs: "su INE y su licencia",
      docLabel: "INE.jpg · licencia_C.jpg",
      location: "el corporativo de Mérida",
      when: "el miércoles 3 de septiembre a las 8:30",
    },
    logo: {
      src: "/qualent-logos/grupo-aduanero-peninsular.png",
      width: 556,
      height: 157,
      onDark: true,
    },
    sector: "Logística y aduanas",
    scale: [
      { value: "~10", label: "plazas de operación" },
      { value: "~100", label: "empleados en corporativo" },
      { value: "6", label: "empresas del grupo" },
    ],
    prose: {
      headline: "Publican «llama al…». Ese teléfono es el cuello de botella.",
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
    brand: { ink: "#C2371F", pop: "#F0B429", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy es su página de Facebook y grupos de empleo.",
    tryIt: {
      positionTitle: "Chofer de Reparto",
      refCode: "anita-chofer-reparto",
      jobs: [
        "Chofer de reparto · Mérida",
        "Promotor de autoservicio · Cd. Juárez",
        "Operador de producción",
      ],
    },
    thread: {
      candidateName: "Luis Fernando Canché May",
      detail: "reparto en Mérida y zona conurbada",
      qualifier: "¿Tiene licencia vigente y experiencia en reparto?",
      qualifierAnswer: "Sí, licencia B y dos años",
      docs: "su INE y su licencia",
      docLabel: "INE.jpg · licencia_B.jpg",
      location: "la planta de Ciudad Industrial",
      when: "el martes 2 de septiembre a las 10:00",
    },
    legalName: "La Anita Condimentos y Salsas",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "3", label: "plantas" },
      { value: "5+", label: "estados contratando" },
      { value: "100+", label: "años de operación" },
    ],
    prose: {
      headline: "Reclutan en cinco estados desde una página de Facebook.",
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
  {
    slug: "botanas-la-lupita",
    name: "Botanas La Lupita",
    brand: { ink: "#183078", pop: "#F0D800", hot: "#D81818" },
    waTier: 2,
    waEvidence:
      "WhatsApp publicado en su sitio (999-301-3111) — hoy atiende clientes, no candidatos.",
    tryIt: {
      positionTitle: "Vendedor de Ruta",
      refCode: "lupita-vendedor-ruta",
      jobs: [
        "Vendedor de ruta · Mérida",
        "Supervisor canal detalle · Tizimín",
      ],
    },
    thread: {
      candidateName: "Miguel Ángel Chan Pech",
      detail: "canal detalle, base Mérida, $12,500 más comisiones",
      qualifier: "¿Tiene licencia de conducir vigente?",
      qualifierAnswer: "Sí, tipo B",
      docs: "su INE por los dos lados y su licencia",
      docLabel: "INE_frente.jpg · licencia_B.jpg",
      location: "la planta de Caucel",
      when: "el martes 2 de septiembre a las 10:00",
    },
    logo: { src: "/qualent-logos/botanas-la-lupita.png", width: 480, height: 209 },
    legalName: "Botanas y Frituras del Sureste La Lupita, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "4", label: "estados de distribución" },
      { value: "~95%", label: "de capacidad instalada" },
      { value: "7", label: "marcas propias" },
    ],
    prose: {
      headline: "Sus vacantes ya viven en WhatsApp. Su reclutamiento todavía no.",
      hook: "Rutas de venta en cuatro estados, supervisores por plaza y un WhatsApp corporativo que todavía no recluta.",
      opening:
        "La Lupita ya atiende por WhatsApp: el número está publicado en su propio sitio. El canal está montado y el hábito existe dentro de la empresa — solo que hoy sirve para clientes, no para candidatos. Esta página propone extenderlo al lado donde la rotación duele: los vendedores y repartidores de ruta que sostienen la distribución en Yucatán, Campeche, Quintana Roo y Tabasco.",
      fitParagraphs: [
        "Sus vacantes recientes dibujan el patrón con claridad: supervisor de ventas a detalle en Mérida, supervisor de canal detalle y autoservicio en Tizimín, líder de canal detalle otra vez en Mérida — publicadas con días de diferencia. Cuando las mismas figuras de ruta se vuelven a abrir plaza tras plaza, el problema no es atraer candidatos: es el tiempo que consume filtrarlos y agendarlos uno por uno.",
        "Para vendedores y repartidores de ruta el filtrado tiene requisitos verificables —licencia, INE, CURP, comprobante de domicilio, disponibilidad para viajar en la zona— y son justo los que hoy se persiguen por teléfono. Qualent los pide y los valida por OCR dentro de la misma conversación de WhatsApp, antes de que nadie invierta tiempo en una entrevista.",
        "Con una sola planta pero rutas en cuatro estados, cada candidato tiene que terminar frente al supervisor de su plaza. Qualent identifica la ubicación y agenda contra el calendario real de esa plaza, con recordatorios automáticos — de modo que el supervisor de Tizimín no dependa de que alguien en Mérida haga de intermediario.",
        "La planta opera cerca del 95% de su capacidad instalada. Cuando la producción está en ese punto, el crecimiento pasa por la red comercial, y la velocidad para cubrir una ruta vacante se vuelve un límite operativo, no un trámite de Recursos Humanos.",
      ],
    },
    signals: [
      {
        observation:
          "3 ofertas activas bajo la razón social Botanas y Frituras del Sureste La Lupita, S.A. de C.V.",
        source: "Computrabajo (página de empresa)",
      },
      {
        observation:
          "Vacantes recientes de supervisor de ventas a detalle en Mérida, supervisor de canal detalle y autoservicio en Tizimín, y líder de canal detalle en Mérida — publicadas con pocos días de diferencia",
        source: "Agregadores de empleo",
      },
      {
        observation: "Perfiles de empleador activos",
        source: "Indeed México",
      },
      {
        observation:
          "WhatsApp corporativo publicado en su sitio para atención general — el canal ya opera, pero no recibe solicitudes de empleo",
        source: "Sitio corporativo",
      },
      {
        observation: "Página corporativa activa en Mérida",
        source: "Facebook",
      },
    ],
    highTurnoverRoles: [
      "Vendedores y repartidores de ruta (canal detalle y autoservicio)",
      "Supervisores de ventas por plaza",
      "Operadores de producción y empaque",
    ],
    currentChannels: [
      "Computrabajo (página de empresa)",
      "Indeed México",
      "Agregadores de empleo",
      "Facebook (página corporativa)",
    ],
    footprint:
      "Una planta automatizada en Mérida operando a ~95% de capacidad, con red de rutas de venta en Yucatán, Campeche, Quintana Roo y Tabasco, supervisores por plaza y un portafolio multimarca.",
    adjacentOpportunity:
      "Para una operación de rutas en cuatro estados con la planta cerca de su techo de capacidad, una aplicación a medida de preventa y liquidación de ruta conectada a producción ayudaría a priorizar qué marcas y presentaciones surtir en cada plaza.",
  },

  {
    slug: "casa-fernandez-del-sureste",
    name: "Casa Fernández del Sureste",
    logo: {
      src: "/qualent-logos/casa-fernandez-del-sureste.svg",
      width: 277,
      height: 92,
    },
    brand: { ink: "#111111", pop: "#F2C300" },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy es un formulario web con carga de CV y un correo de RH.",
    tryIt: {
      positionTitle: "Almacenista",
      refCode: "fernandez-almacenista",
      jobs: [
        "Almacenista · Mérida",
        "Auxiliar de logística",
        "Chofer de reparto mayorista",
      ],
    },
    thread: {
      candidateName: "Luis Alberto Canul Dzib",
      detail: "almacén de Mérida, turno matutino",
      qualifier: "¿Ha trabajado antes en almacén o manejo de inventario?",
      qualifierAnswer: "Sí, tres años en almacén",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "el almacén de Mérida",
      when: "el martes 2 de septiembre a las 9:00",
    },
    legalName: "Compañía Fernández, S.A. de C.V.",
    sector: "Distribución industrial",
    scale: [
      { value: "7", label: "estados de distribución" },
      { value: "15,000+", label: "SKUs en catálogo" },
      { value: "30+", label: "años operando" },
    ],
    prose: {
      headline: "Su bolsa de trabajo pide un CV en Word. Sus almacenistas no tienen uno.",
      hook: "Mayorista ferretero del sureste, siete estados de distribución y una postulación que empieza por adjuntar un archivo.",
      opening:
        "Casa Fernández recibe candidatos por formulario y por correo, en horario de 8:30 a 18:30. Para un almacenista o un chofer de reparto, ese es el punto donde la postulación se cae.",
      fitParagraphs: [
        "Su portal de bolsa de trabajo pide subir un CV en Word o PDF. El perfil que más rotan —almacenistas, auxiliares de logística, choferes de reparto— rara vez tiene uno a la mano, y casi nunca desde el teléfono. Qualent quita ese paso: el candidato manda un mensaje y la conversación arma el perfil por él.",
        "El correo de recursos.humanos@fernandez.com.mx atiende de 8:30 a 18:30. Un candidato que busca trabajo a las nueve de la noche no recibe respuesta hasta el día siguiente, cuando ya escribió a otros tres empleadores.",
        "Con cobertura de distribución en siete estados y varios puntos de venta y almacén, cada entrevista tiene que agendarse en la plaza correcta. Qualent identifica la ubicación del candidato y agenda contra el calendario de ese sitio.",
      ],
    },
    signals: [
      {
        observation:
          "Página de empresa con 3 a 5 ofertas activas según el corte, la mayoría en Mérida",
        source: "Computrabajo (Compañía Fernández de Mérida)",
      },
      {
        observation:
          "Ofertas de almacén y logística de tiempo completo en Yucatán",
        source: "Computrabajo",
      },
      {
        observation:
          "Bolsa de trabajo propia con formulario de carga de CV en Word o PDF",
        source: "fernandez.com.mx/bolsa-trabajo",
      },
      {
        observation:
          "Correo de Recursos Humanos con horario publicado, 8:30 a 18:30",
        source: "Sitio corporativo",
      },
    ],
    highTurnoverRoles: [
      "Almacenistas y auxiliares de logística",
      "Choferes de reparto mayorista",
      "Vendedores de mostrador y telemarketing",
      "Personal de sucursal en 7 estados",
    ],
    currentChannels: [
      "Bolsa de trabajo propia con carga de CV",
      "Correo directo de Recursos Humanos",
      "Computrabajo (página de empresa)",
      "Indeed México",
    ],
    footprint:
      "Matriz en Mérida con distribución en siete estados del sureste y múltiples puntos de venta y almacén.",
    adjacentOpportunity:
      "Con más de 15,000 SKUs y venta mayorista multi-estado, un portal B2B de pedidos y resurtido con avisos de existencias por WhatsApp elevaría la recompra de sus clientes ferreteros.",
  },

  {
    slug: "el-yucateco",
    name: "El Yucateco",
    logo: {
      src: "/qualent-logos/el-yucateco.png",
      width: 480,
      height: 266,
    },
    brand: { ink: "#8C1017", pop: "#DC283C" },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy es Computrabajo, Indeed y LinkedIn.",
    tryIt: {
      positionTitle: "Operador de Producción",
      refCode: "yucateco-operador-produccion",
      jobs: [
        "Operador de producción · Noc-Ac",
        "Trabajador agrícola eventual · campo",
        "Auxiliar de almacén · Mérida",
      ],
    },
    thread: {
      candidateName: "María Fernanda Pech Uc",
      detail: "planta de Noc-Ac, turno matutino",
      qualifier: "¿Tiene disponibilidad para temporada completa de cosecha?",
      qualifierAnswer: "Sí, toda la temporada",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Noc-Ac",
      when: "el lunes 1 de septiembre a las 8:00",
    },
    legalName: "El Yucateco Salsas y Condimentos, S.A. de C.V.",
    sector: "Alimentos y bebidas",
    scale: [
      { value: "~300", label: "empleados de planta" },
      { value: "~500", label: "eventuales por temporada" },
      { value: "3", label: "sitios en Yucatán" },
    ],
    prose: {
      headline: "500 eventuales por temporada. Un solo embudo para contratarlos.",
      hook: "Planta, campo de habanero y una contratación estacional que se dispara cada cosecha.",
      opening:
        "El Yucateco suma alrededor de 500 eventuales en temporada sobre una plantilla de unos 300. Ese pico no se resuelve publicando más vacantes: se resuelve procesando más candidatos con la misma gente.",
      fitParagraphs: [
        "La contratación estacional es el caso más duro de todos: cientos de personas en pocas semanas, con documentos que hay que recolectar y verificar uno por uno. Qualent absorbe ese volumen sin que el equipo de Recursos Humanos crezca al mismo ritmo que la cosecha.",
        "El perfil que contratan en campo —trabajadores agrícolas eventuales— es exactamente el que no llega por un portal de empleo. Llega por recomendación, por anuncio local y por teléfono. Un código QR en la entrada de la planta o del campo abre la conversación en el teléfono que ya traen.",
        "Con planta en Mérida y Noc-Ac, sitio en Teya y operación agrícola propia, cada entrevista tiene que caer en el lugar correcto. Qualent agenda contra el calendario real de cada sitio y manda recordatorios antes de la cita.",
      ],
    },
    signals: [
      {
        observation:
          "7 ofertas activas en su página de empresa",
        source: "Computrabajo",
      },
      {
        observation:
          "Perfil de empleador activo con vacantes en Noc-Ac y Mérida — auxiliares de RH y supervisores de producción",
        source: "Indeed México",
      },
      {
        observation:
          "Contratación estacional recurrente de alrededor de 500 eventuales por temporada de habanero",
        source: "Perfiles de empleador y reseñas",
      },
      {
        observation:
          "Página de compañía activa",
        source: "LinkedIn",
      },
    ],
    highTurnoverRoles: [
      "Operadores de producción y envasado",
      "Trabajadores agrícolas eventuales",
      "Auxiliares de almacén",
    ],
    currentChannels: [
      "Computrabajo (página de empresa)",
      "Indeed México",
      "LinkedIn",
    ],
    footprint:
      "Planta principal en Mérida y Noc-Ac, sitio en Teya y operación agrícola propia, con producción en horas extras reportada por su propio personal.",
    adjacentOpportunity:
      "Como exportador a decenas de países, un portal a medida de trazabilidad de lotes y pedidos para clientes internacionales reduciría llamadas y correos de seguimiento.",
  },

  {
    slug: "marbol",
    name: "Marbol Industria Mueblera",
    brand: { ink: "#5A3A22", pop: "#C9A227", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — y sin vacantes publicadas: contratan directo en planta.",
    tryIt: {
      positionTitle: "Carpintero de Planta",
      refCode: "marbol-carpintero",
      jobs: [
        "Carpintero de planta · Umán",
        "Tapicero",
        "Ayudante general",
      ],
    },
    thread: {
      candidateName: "José Manuel Chan Ek",
      detail: "planta de Umán, turno matutino",
      qualifier: "¿Tiene experiencia en carpintería o tapicería de muebles?",
      qualifierAnswer: "Sí, cuatro años de carpintero",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Umán",
      when: "el miércoles 3 de septiembre a las 8:00",
    },
    legalName: "Marbol Industria Mueblera, S.A. de C.V.",
    sector: "Muebles",
    scale: [
      { value: "600+", label: "empleados" },
      { value: "22,000 m²", label: "planta en Umán" },
      { value: "1,000+", label: "muebles por semana" },
    ],
    prose: {
      headline: "600 personas en planta. Cero vacantes publicadas.",
      hook: "Una fábrica que produce mil muebles por semana y recluta sin dejar rastro en los portales.",
      opening:
        "Marbol tiene perfil de empresa en Computrabajo e Indeed, pero cero ofertas publicadas. Con más de 600 empleados en una planta de 22,000 m², eso no significa que no contraten: significa que la contratación pasa por la puerta.",
      fitParagraphs: [
        "Reclutar en la puerta funciona hasta que necesita a veinte personas la misma semana. No deja registro, no se puede medir y depende de quién esté disponible ese día. Qualent le da la misma cercanía —una conversación, no un portal— con historial, etapas y documentos verificados.",
        "Los perfiles que más rotan en su planta —carpinteros, tapiceros, acabadores, ayudantes generales— no buscan trabajo en bolsas de empleo. Un código QR en la barda de la planta de Umán o en el anuncio local abre la conversación en su propio teléfono.",
        "Sus cuadrillas de instalación viajan a hoteles de toda la península. Contratar y agendar para equipos móviles, desde Umán, es precisamente donde un proceso que corre solo hace la diferencia.",
      ],
    },
    signals: [
      {
        observation:
          "Perfil de empresa activo con página de evaluaciones de empleados",
        source: "Computrabajo",
      },
      {
        observation:
          "Perfil de empleador con reseñas",
        source: "Indeed México",
      },
      {
        observation:
          "Cero ofertas publicadas al momento de la búsqueda, agosto 2026 — la contratación no pasa por portales",
        source: "Computrabajo (Umán)",
      },
      {
        observation:
          "Página corporativa activa",
        source: "Facebook (Marbol Casa)",
      },
    ],
    highTurnoverRoles: [
      "Operadores de producción y carpinteros de planta",
      "Tapiceros y acabadores",
      "Ayudantes generales",
      "Choferes e instaladores en sitio",
    ],
    currentChannels: [
      "Reclutamiento directo y presencial en planta",
      "Computrabajo (perfil, sin ofertas activas)",
      "Indeed (perfil de empleador)",
      "Facebook corporativo",
    ],
    footprint:
      "Planta única de 22,000 m² en Umán más showroom y oficinas en Mérida, con cuadrillas de instalación en hoteles de la Riviera Maya y otros destinos.",
    adjacentOpportunity:
      "Para una fábrica que instala mobiliario en hoteles de toda la península, un sistema a medida de seguimiento de proyectos —avance por obra, cuadrillas, evidencia fotográfica— daría visibilidad de algo que hoy viaja en fotos sueltas.",
  },

  {
    slug: "grupo-avicola-quinones",
    name: "Grupo Avícola Quiñones",
    brand: { ink: "#4A3626", pop: "#C08A3E", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy es Computrabajo, OCC e Indeed.",
    tryIt: {
      positionTitle: "Operario de Granja",
      refCode: "quinones-operario-granja",
      jobs: [
        "Operario de granja",
        "Operador de planta de alimentos",
        "Chofer de flotilla",
      ],
    },
    thread: {
      candidateName: "Ricardo Balam Cauich",
      detail: "turno rotativo en granja",
      qualifier: "¿Puede trabajar en turno rotativo, incluyendo fines de semana?",
      qualifierAnswer: "Sí, sin problema",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la granja",
      when: "el martes 2 de septiembre a las 8:00",
    },
    sector: "Agroindustria avícola",
    scale: [
      { value: "4", label: "ofertas activas" },
      { value: "Multi-zona", label: "granjas y plantas" },
      { value: "Flotilla", label: "propia" },
    ],
    prose: {
      headline: "Granjas, planta de alimentos y flotilla propia. Todo con turnos que rotar.",
      hook: "Operación avícola y porcícola integrada, con contratación continua en varias zonas.",
      opening:
        "Cuatro ofertas activas en su bolsa de Computrabajo y vacantes recurrentes en OCC. Para operarios de granja y choferes de flotilla especializada, el filtrado manual es el cuello de botella.",
      fitParagraphs: [
        "Los perfiles que más rotan —operarios de granja, operadores de planta de alimentos, choferes de transporte de animal vivo— rara vez llegan con CV. Qualent los recibe por WhatsApp, los califica en la conversación y verifica INE, CURP y licencia por OCR.",
        "Una operación multi-zona con granjas, planta de alimentos, reproductora e incubadora significa que cada candidato debe terminar agendado en el sitio correcto. Qualent agenda contra el calendario real de cada zona.",
        "El transporte de pollo vivo y cerdo en pie exige licencia vigente del tipo correcto. Ese requisito se valida dentro de la conversación, antes de que alguien invierta tiempo en una entrevista.",
      ],
    },
    signals: [
      {
        observation:
          "4 ofertas de trabajo en su perfil de bolsa de empresa",
        source: "Computrabajo",
      },
      {
        observation:
          "Vacantes recurrentes listadas",
        source: "OCC Mundial",
      },
      {
        observation:
          "Perfiles de empleador con información laboral activa",
        source: "Indeed y Computrabajo",
      },
    ],
    highTurnoverRoles: [
      "Operarios de granja (pollo y cerdo)",
      "Operadores de planta de alimentos",
      "Choferes de flotilla de animal vivo",
      "Personal de incubadora y reproductora",
    ],
    currentChannels: [
      "Computrabajo (bolsa de empresa)",
      "OCC Mundial",
      "Indeed (perfil de empleador)",
    ],
    footprint:
      "Operación multi-zona con granjas, planta de alimentos, reproductora, incubadora y flotilla propia.",
    adjacentOpportunity:
      "Para una operación B2B de pollo vivo y cerdo en pie con flotilla propia, un sistema a medida de pedidos y logística de entrega —peso, mermas, rutas, liquidación por cliente— digitalizaría un proceso que hoy vive en papel.",
  },

  {
    slug: "isc-constructora",
    name: "ISC Constructora",
    logo: {
      src: "/qualent-logos/isc-constructora.png",
      width: 480,
      height: 480,
    },
    brand: { ink: "#0F2050", pop: "#2E5CB8" },
    waTier: 2,
    waEvidence:
      "WhatsApp comercial ya publicado en su sitio (wa.link) — el canal existe, pero no del lado de las cuadrillas.",
    tryIt: {
      positionTitle: "Oficial de Obra",
      refCode: "isc-oficial-obra",
      jobs: [
        "Oficial de obra · Mérida",
        "Ayudante general",
        "Cantero / especialista en restauración",
      ],
    },
    thread: {
      candidateName: "Pedro Antonio Uc May",
      detail: "frente de obra en Mérida, pago semanal",
      qualifier: "¿Qué oficio maneja y cuántos años de experiencia tiene?",
      qualifierAnswer: "Albañil, ocho años",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la oficina de Mérida",
      when: "el lunes 1 de septiembre a las 7:30",
    },
    legalName: "ISC Constructora, S.A. de C.V.",
    sector: "Construcción",
    scale: [
      { value: "~800", label: "obras ejecutadas" },
      { value: "100+", label: "localidades" },
      { value: "3", label: "estados" },
    ],
    prose: {
      headline: "800 obras en 100 localidades. Las cuadrillas se arman por teléfono.",
      hook: "Obra civil y restauración patrimonial en tres estados, con contratación informal por proyecto.",
      opening:
        "ISC ya atiende por WhatsApp del lado comercial. Lo que sigue pasando por llamadas y contactos del gremio es armar cuadrilla cada vez que abre un frente de obra.",
      fitParagraphs: [
        "Contratar por obra significa volver a empezar en cada proyecto: los mismos oficios, las mismas preguntas, la misma prisa. Qualent guarda a cada candidato con su oficio, su experiencia y sus documentos, de modo que la siguiente cuadrilla se arma desde una base y no desde cero.",
        "Su especialidad de restauración necesita oficios que no abundan —canteros, yeseros, especialistas de patrimonio. Poder buscar entre candidatos anteriores por oficio vale más aquí que en obra convencional.",
        "Con obras simultáneas en Yucatán, Campeche y Quintana Roo, cada candidato tiene que quedar agendado en el frente correcto. La conversación identifica la ubicación y agenda ahí.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes visibles en portales de empleo bajo su nombre, agosto 2026 — la contratación es informal por obra",
        source: "Computrabajo, Indeed y OCC",
      },
      {
        observation:
          "Página de empresa que ha publicado empleos en algún momento",
        source: "LinkedIn",
      },
      {
        observation:
          "WhatsApp comercial publicado en su sitio — el canal ya opera hacia clientes",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Sin sección de bolsa de trabajo en su sitio web",
        source: "Sitio corporativo",
      },
    ],
    highTurnoverRoles: [
      "Albañiles y oficiales de obra",
      "Especialistas en restauración (canteros, yeseros)",
      "Ayudantes generales de construcción",
      "Residentes y supervisores por proyecto",
    ],
    currentChannels: [
      "Contratación informal de cuadrillas por obra",
      "LinkedIn (uso esporádico)",
      "Sin bolsa de trabajo en su sitio",
    ],
    footprint:
      "Obras simultáneas en Yucatán, Campeche y Quintana Roo, en más de cien localidades, con oficina central en Mérida.",
    adjacentOpportunity:
      "Un sistema a medida de expedientes digitales de cuadrilla —altas al IMSS, contratos por obra, DC-3— conectado al mismo WhatsApp reduciría el papeleo que hoy viaja de la obra a la oficina.",
  },

  {
    slug: "maxisa",
    name: "Maxisa",
    logo: {
      src: "/qualent-logos/maxisa.png",
      width: 480,
      height: 160,
    },
    brand: { ink: "#1A1A1A", pop: "#D8A11E", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin señal de WhatsApp ni de portales — contratan obra por obra, por la red del gremio.",
    tryIt: {
      positionTitle: "Operador de Maquinaria",
      refCode: "maxisa-operador-maquinaria",
      jobs: [
        "Operador de maquinaria pesada",
        "Chofer de volteo",
        "Ayudante general de obra",
      ],
    },
    thread: {
      candidateName: "Gabriel Poot Canché",
      detail: "frente de obra vial, pago semanal",
      qualifier: "¿Qué máquinas opera y tiene licencia vigente?",
      qualifierAnswer: "Motoconformadora y retro, licencia E",
      docs: "su INE y su licencia",
      docLabel: "INE.jpg · licencia_E.jpg",
      location: "la oficina de Itzimná",
      when: "el miércoles 3 de septiembre a las 7:30",
    },
    legalName: "Maxi Constructora Hidráulica y Mantenimiento Integral, S.A. de C.V.",
    sector: "Construcción",
    scale: [
      { value: "Obra vial", label: "e hidráulica" },
      { value: "Urbanic", label: "desarrollo propio" },
      { value: "Mérida", label: "base de operación" },
    ],
    prose: {
      headline: "Maquinaria pesada parada es dinero. También lo es un operador que no llega.",
      hook: "Obra vial e hidráulica más desarrollo inmobiliario propio, con frentes que abren y cierran.",
      opening:
        "No encontramos vacantes de Maxisa en ningún portal. En obra vial eso es normal: se contrata por frente, por recomendación y con prisa. El costo no se ve en un presupuesto, se ve en una máquina esperando operador.",
      fitParagraphs: [
        "Un operador de motoconformadora o pavimentadora no se consigue publicando en una bolsa de trabajo: se consigue por contactos, y cuando urge. Qualent mantiene ese grupo localizable —con su especialidad de máquina y su licencia verificada— para el siguiente frente.",
        "Las licencias y certificaciones de maquinaria pesada son requisitos duros y verificables. El OCR los lee y valida dentro de la conversación, antes de que alguien suba a una máquina.",
        "Con frentes de obra vial e hidráulica en paralelo a sus desarrollos inmobiliarios, saber a quién puede llamar mañana vale más que un anuncio publicado hoy.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes encontradas en portales bajo su nombre, agosto 2026",
        source: "Computrabajo, Indeed y OCC",
      },
      {
        observation:
          "Sin bolsa de trabajo en su sitio — el sitio bloquea el acceso automatizado",
        source: "maxisa.com",
      },
      {
        observation:
          "Contratación implícita obra por obra: pavimentación y obra hidráulica en frentes simultáneos",
        source: "Perfil de actividad",
      },
      {
        observation:
          "Instagram y YouTube activos, de uso comercial",
        source: "Redes corporativas",
      },
    ],
    highTurnoverRoles: [
      "Operadores de maquinaria pesada",
      "Choferes de volteo",
      "Cuadrillas de obra civil y pavimentación",
      "Ayudantes generales por frente",
    ],
    currentChannels: [
      "Contratación directa por obra y redes del gremio",
      "Instagram y YouTube (uso comercial)",
      "Sin presencia en portales de empleo",
    ],
    footprint:
      "Frentes de obra vial e hidráulica en Yucatán más desarrollos inmobiliarios propios, con base en Itzimná, Mérida.",
    adjacentOpportunity:
      "Una bitácora digital de maquinaria —horas-máquina, diésel, mantenimientos por unidad, reportada por los operadores vía WhatsApp— atacaría el costo oculto de su flota pesada.",
  },

  {
    slug: "pimsa",
    name: "PIMSA",
    logo: {
      src: "/qualent-logos/pimsa.webp",
      width: 282,
      height: 138,
    },
    brand: { ink: "#0B3C7A", pop: "#1B72C4" },
    waTier: 1,
    waEvidence:
      "Su bolsa de trabajo oficial ES un WhatsApp (81-2320-7196), con un reclutador contestando a mano.",
    tryIt: {
      positionTitle: "Chofer Repartidor",
      refCode: "pimsa-chofer-repartidor",
      jobs: [
        "Chofer repartidor",
        "Almacenista de CEDIS",
        "Agente de telemarketing",
      ],
    },
    thread: {
      candidateName: "Óscar Iván Ramírez Treviño",
      detail: "reparto local, base CEDIS",
      qualifier: "¿Qué tipo de licencia tiene y cuánta experiencia en reparto?",
      qualifierAnswer: "Licencia C, cinco años",
      docs: "su INE y su licencia",
      docLabel: "INE.jpg · licencia_C.jpg",
      location: "el CEDIS",
      when: "el martes 2 de septiembre a las 9:00",
    },
    legalName: "Proveedora Industrial Monterrey, S.A. de C.V.",
    sector: "Distribución industrial",
    scale: [
      { value: "~490", label: "empleados" },
      { value: "80+", label: "camiones de reparto" },
      { value: "4+", label: "CEDIS" },
    ],
    prose: {
      headline: "Su bolsa de trabajo ya es un WhatsApp. Lo atiende una persona.",
      hook: "490 empleados, más de 80 camiones de reparto y un número de reclutamiento que alguien contesta uno por uno.",
      opening:
        "De toda la lista, PIMSA es el caso más claro: no hay que convencerlos del canal, ya lo eligieron. Publican un WhatsApp de reclutamiento en su propio sitio. Lo que proponemos es que deje de consumir el día de una persona.",
      fitParagraphs: [
        "Un número de reclutamiento atendido a mano hace exactamente lo que Qualent automatiza: contestar, repetir las mismas preguntas, anotar los datos, pedir documentos y volver a escribir para agendar. El canal ya es el correcto; lo que falta es que corra solo.",
        "Con más de 80 camiones de reparto, los choferes son su rotación permanente, y el filtrado tiene requisitos duros y verificables: licencia del tipo correcto, vigencia, INE. El OCR los valida dentro de la misma conversación.",
        "Su CEDIS principal y los de Tampico, San Luis Potosí y Pachuca contratan en paralelo. Un solo número atendido por una persona no escala a cuatro plazas; una conversación automática sí, y agenda en la plaza correcta.",
      ],
    },
    signals: [
      {
        observation:
          "Sección de Bolsa de Trabajo permanente con un WhatsApp dedicado a reclutamiento — atendido manualmente",
        source: "pimsaferreteros.com.mx",
      },
      {
        observation:
          "6 ofertas activas en su perfil de empresa",
        source: "Computrabajo",
      },
      {
        observation:
          "2 ofertas activas: supervisor y agente de telemarketing",
        source: "Indeed México",
      },
      {
        observation:
          "Cada CEDIS opera además su propia línea de WhatsApp comercial",
        source: "Sitio corporativo",
      },
    ],
    highTurnoverRoles: [
      "Choferes repartidores (flota de 80+ unidades)",
      "Almacenistas de CEDIS",
      "Vendedores y ejecutivos de ventas",
      "Agentes de telemarketing",
    ],
    currentChannels: [
      "WhatsApp de reclutamiento propio, atendido a mano",
      "Bolsa de trabajo en su sitio",
      "Computrabajo (perfil de empresa)",
      "Indeed México",
    ],
    footprint:
      "Centro de distribución principal más CEDIS en Tampico, San Luis Potosí y Pachuca, con contratación simultánea en varias plazas.",
    adjacentOpportunity:
      "Con más de 80 unidades de reparto, un tablero a medida de rutas y liquidación por chofer, alimentado desde el mismo WhatsApp, cerraría el ciclo entre entrega y cobranza.",
  },

  {
    slug: "red-aduanera-peninsular",
    name: "Red Aduanera Peninsular",
    brand: { ink: "#0A3A5C", pop: "#1E7BB8", provisional: true },
    waTier: 2,
    waEvidence:
      "WhatsApp corporativo publicado en su sitio — cultura del canal ya instalada, pero no del lado de candidatos.",
    tryIt: {
      positionTitle: "Auxiliar de Certificación",
      refCode: "redaduanera-auxiliar-certificacion",
      jobs: [
        "Auxiliar de certificación · Progreso",
        "Clasificador · Quintana Roo",
        "Analista de pedimentos · Manzanillo",
      ],
    },
    thread: {
      candidateName: "Diana Laura Cen Novelo",
      detail: "oficina de Progreso, tiempo completo",
      qualifier: "¿Tiene experiencia en despacho aduanal o comercio exterior?",
      qualifierAnswer: "Sí, dos años en confronta",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la oficina de Progreso",
      when: "el jueves 4 de septiembre a las 9:00",
    },
    sector: "Logística y aduanas",
    scale: [
      { value: "30+", label: "años operando" },
      { value: "4", label: "plazas contratando" },
      { value: "5", label: "vacantes activas" },
    ],
    prose: {
      headline: "Cinco vacantes abiertas en cuatro plazas. Ninguna conversación automática.",
      hook: "Despacho aduanal en Progreso, Cancún, Ciudad de México y Manzanillo, contratando en paralelo.",
      opening:
        "Red Aduanera ya publica un WhatsApp corporativo para clientes. Del lado de reclutamiento sigue todo en Indeed y en llamadas, con cinco vacantes abiertas repartidas en cuatro plazas al mismo tiempo.",
      fitParagraphs: [
        "Contratar en Progreso, Cancún, Ciudad de México y Manzanillo a la vez, desde una sola coordinación, es donde el filtrado manual se rompe. Qualent recibe a todos por el mismo canal y agenda cada uno en su plaza.",
        "Sus perfiles operativos —tramitadores de patio, auxiliares de confronta y certificación, personal de almacén fiscal— rotan y se contratan con urgencia. Una de sus vacantes está marcada como contratación urgente.",
        "El canal ya les resulta natural: atienden clientes por WhatsApp. Extenderlo a candidatos no cambia el hábito de nadie dentro de la empresa.",
      ],
    },
    signals: [
      {
        observation:
          "5 vacantes activas: auxiliar de certificación en Progreso, auxiliar de confronta en CDMX, clasificador en Quintana Roo, ejecutivo de ventas con contratación urgente y analista de pedimentos en Manzanillo",
        source: "Indeed, agosto 2026",
      },
      {
        observation:
          "WhatsApp corporativo publicado como canal de contacto",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Página corporativa activa",
        source: "Facebook (AduaneraRed)",
      },
      {
        observation:
          "Perfiles en agregadores de empleo",
        source: "Glassdoor y BeBee",
      },
    ],
    highTurnoverRoles: [
      "Tramitadores aduanales de patio en Progreso",
      "Auxiliares de confronta y certificación",
      "Clasificadores",
      "Personal de almacén fiscal y distribución",
    ],
    currentChannels: [
      "Indeed (ofertas activas multi-plaza)",
      "Agregadores de empleo",
      "Facebook corporativo",
      "Contacto directo a oficinas",
    ],
    footprint:
      "Oficinas en Progreso, Cancún, Ciudad de México y Manzanillo, con aliados en Houston y Miami y contratación simultánea en cuatro plazas.",
    adjacentOpportunity:
      "Un portal de seguimiento de despachos con avisos por WhatsApp a sus clientes reduciría las llamadas de estatus que hoy absorben a su personal de operación.",
  },

  {
    slug: "constructora-corporativa",
    name: "Constructora Corporativa",
    logo: {
      src: "/qualent-logos/constructora-corporativa.png",
      width: 480,
      height: 144,
    },
    brand: { ink: "#1C1C1C", pop: "#9AA3AB", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin señal de WhatsApp ni vacantes públicas — contratación directa por obra.",
    tryIt: {
      positionTitle: "Electricista Industrial",
      refCode: "ccorp-electricista-industrial",
      jobs: [
        "Electricista industrial",
        "Soldador",
        "Ayudante general de obra",
      ],
    },
    thread: {
      candidateName: "Iván de Jesús Koh Pat",
      detail: "frente de obra industrial, pago semanal",
      qualifier: "¿Es electricista industrial certificado y cuántos años tiene de experiencia?",
      qualifierAnswer: "Sí, seis años",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la oficina de Mérida",
      when: "el lunes 1 de septiembre a las 8:00",
    },
    sector: "Construcción",
    scale: [
      { value: "1983", label: "año de fundación" },
      { value: "2", label: "oficinas" },
      { value: "3", label: "disciplinas de obra" },
    ],
    prose: {
      headline: "Obra electromecánica en sitios de clientes. Personal distinto en cada frente.",
      hook: "Civil, electromecánica e hidráulica, con frentes abiertos en instalaciones de terceros.",
      opening:
        "No encontramos vacantes publicadas ni bolsa de trabajo. Para obra electromecánica en sitios de clientes, la contratación pasa por contactos del gremio y se rehace en cada proyecto.",
      fitParagraphs: [
        "Los oficios que necesitan —electricistas industriales, soldadores, tuberos— son escasos y se contratan por proyecto. Qualent conserva a cada candidato con su especialidad y sus documentos, de modo que el siguiente frente no empiece de cero.",
        "Trabajar dentro de instalaciones de clientes exige documentación en regla antes de pisar el sitio. Recolectar y verificar INE y CURP dentro de la conversación adelanta ese trámite.",
        "Con oficinas en Mérida y Cancún y frentes en toda la península, agendar a cada candidato en el sitio correcto deja de depender de quién conteste el teléfono.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes encontradas en portales bajo su nombre, agosto 2026",
        source: "Computrabajo, Indeed y OCC",
      },
      {
        observation:
          "Sin sección de carreras o bolsa de trabajo en su sitio web",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Volumen implícito de obra electromecánica en frentes de clientes industriales",
        source: "Perfil de actividad",
      },
      {
        observation:
          "Facebook e Instagram corporativos, de uso comercial",
        source: "Redes corporativas",
      },
    ],
    highTurnoverRoles: [
      "Electricistas y soldadores industriales",
      "Fontaneros y tuberos de obra hidráulica",
      "Albañiles y ayudantes generales",
      "Operadores y personal de obra por proyecto",
    ],
    currentChannels: [
      "Contratación directa e informal por obra",
      "Redes corporativas de uso comercial",
      "Sin presencia en portales de empleo",
    ],
    footprint:
      "Oficinas en Mérida y Cancún, con frentes de obra en instalaciones de clientes industriales de toda la península.",
    adjacentOpportunity:
      "Un expediente digital por cuadrilla —altas, contratos por obra y constancias— conectado al mismo WhatsApp quitaría papeleo entre el frente y la oficina.",
  },

  {
    slug: "turitransmerida",
    name: "Turitransmerida",
    logo: {
      src: "/qualent-logos/turitransmerida.png",
      width: 480,
      height: 273,
    },
    brand: { ink: "#0E4C7A", pop: "#1E88C7" },
    waTier: 2,
    waEvidence:
      "WhatsApp comercial ya central en su operación (999 947 9384) — pero no para contratar.",
    tryIt: {
      positionTitle: "Chofer-Operador Turístico",
      refCode: "turitrans-chofer-operador",
      jobs: [
        "Chofer-operador de unidad turística",
        "Guía de turistas certificado",
        "Staff de eventos por congreso",
      ],
    },
    thread: {
      candidateName: "Manuel Alejandro Sosa Interián",
      detail: "servicios en la península, por temporada",
      qualifier: "¿Tiene licencia vigente y experiencia en transporte turístico?",
      qualifierAnswer: "Sí, licencia C y cuatro años",
      docs: "su INE y su licencia",
      docLabel: "INE.jpg · licencia_C.jpg",
      location: "la base de Mérida",
      when: "el martes 2 de septiembre a las 10:00",
    },
    legalName: "Turitransmerida Tour Operator & DMC",
    sector: "Turismo B2B",
    scale: [
      { value: "30+", label: "años en receptivo" },
      { value: "24", label: "años en congresos" },
      { value: "Flota", label: "propia" },
    ],
    prose: {
      headline: "Temporada alta significa choferes y guías. Conseguirlos sigue siendo a mano.",
      hook: "Flota propia y operación de congresos, con refuerzos estacionales que aparecen y desaparecen.",
      opening:
        "Turitransmerida ya opera por WhatsApp con sus clientes. El personal eventual —choferes, guías, staff de evento— se sigue consiguiendo por la red del gremio, justo cuando más prisa hay.",
      fitParagraphs: [
        "Su contratación es por picos: un congreso, una temporada, un grupo grande. Qualent mantiene un grupo de choferes y guías ya calificados y con documentos verificados, listos para convocar cuando entra el evento.",
        "Guías certificados por SECTUR y choferes con licencia vigente son requisitos verificables. El OCR los valida en la conversación, no el día del servicio.",
        "El canal ya les es natural: atienden clientes por WhatsApp. Extenderlo al personal eventual no cambia hábitos internos, solo quita llamadas.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes encontradas en portales de empleo, agosto 2026",
        source: "Computrabajo, Indeed, OCC y agregadores",
      },
      {
        observation:
          "Sin sección de bolsa de trabajo en su sitio",
        source: "Sitio corporativo",
      },
      {
        observation:
          "WhatsApp comercial publicado como canal central de operación",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Página activa de uso comercial",
        source: "Facebook",
      },
    ],
    highTurnoverRoles: [
      "Choferes-operadores de unidades turísticas",
      "Guías de turistas certificados",
      "Coordinadores y staff de eventos por congreso",
      "Personal de logística en piso",
    ],
    currentChannels: [
      "Red del gremio turístico",
      "Facebook (uso comercial)",
      "Sin presencia en portales de empleo",
    ],
    footprint:
      "Operación desde Mérida con servicios en toda la península — zonas arqueológicas, cenotes y puertos — y flota propia.",
    adjacentOpportunity:
      "Un tablero de asignación de unidades y choferes por servicio, confirmado desde el mismo WhatsApp, quitaría la coordinación por llamada en día de operación.",
  },

  {
    slug: "grupo-ferretero-surte",
    name: "Grupo Ferretero Surte",
    logo: {
      src: "/qualent-logos/grupo-ferretero-surte.png",
      width: 480,
      height: 173,
    },
    brand: { ink: "#1E2A5E", pop: "#B01F2E" },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — hoy reciben CV espontáneos por un correo genérico.",
    tryIt: {
      positionTitle: "Almacenista de Sucursal",
      refCode: "surte-almacenista",
      jobs: [
        "Almacenista de sucursal",
        "Vendedor de mostrador",
        "Chofer de reparto",
      ],
    },
    thread: {
      candidateName: "Jorge Luis Medina Salas",
      detail: "sucursal con almacén, turno completo",
      qualifier: "¿Ha trabajado en almacén o mostrador de ferretería?",
      qualifierAnswer: "Sí, dos años en mostrador",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la sucursal",
      when: "el miércoles 3 de septiembre a las 9:00",
    },
    legalName: "Grupo Ferretero Surte, S.A. de C.V.",
    sector: "Distribución industrial",
    scale: [
      { value: "5", label: "sucursales" },
      { value: "15,000+", label: "productos" },
      { value: "35+", label: "años operando" },
    ],
    prose: {
      headline: "Cinco sucursales contratando. Un correo genérico recibiéndolo todo.",
      hook: "Mayorista ferretero con almacén propio en cada plaza y reclutamiento pasivo.",
      opening:
        "Su reclutamiento es de recepción: un correo genérico donde llegan CV espontáneos. Con cinco sucursales operativas, eso significa que cuando falta un almacenista se empieza a buscar desde cero.",
      fitParagraphs: [
        "Recibir CV en un correo genérico funciona mientras nadie renuncie. Qualent convierte esa recepción pasiva en un grupo de candidatos ya calificados por plaza, disponible el día que se abre la vacante.",
        "Los perfiles que rotan —almacenistas, vendedores de mostrador y ruta, choferes de reparto— son de decisión rápida: el candidato acepta con quien le conteste primero. Responder en segundos en lugar de días cambia el resultado.",
        "Cinco sucursales con almacén propio significan cinco calendarios distintos. Qualent identifica la plaza del candidato y agenda ahí, sin intermediarios.",
      ],
    },
    signals: [
      {
        observation:
          "Página de empresa con solo 3 reseñas y sin listado claro de vacantes vigentes",
        source: "Indeed",
      },
      {
        observation:
          "Reseña de empleado que describe la operación como totalmente operativa, de ritmo alto en venta y almacén",
        source: "Indeed",
      },
      {
        observation:
          "Reclutamiento pasivo por correo genérico para CV espontáneos",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Facebook corporativo sin evidencia de uso para reclutamiento",
        source: "Facebook",
      },
    ],
    highTurnoverRoles: [
      "Almacenistas de sucursal",
      "Vendedores de mostrador y ruta",
      "Choferes de reparto",
    ],
    currentChannels: [
      "Correo genérico para CV espontáneos",
      "Indeed (página de empresa, actividad baja)",
      "Facebook corporativo",
    ],
    footprint:
      "Cinco sucursales con almacén propio de unos 400 m² cada una, en Monterrey, Querétaro, Cancún, Chetumal y San Luis Potosí.",
    adjacentOpportunity:
      "Un portal de pedidos y resurtido para sus clientes ferreteros, con avisos de existencias por WhatsApp, elevaría la recompra frente a mayoristas más grandes.",
  },

  {
    slug: "imprex",
    name: "Imprex",
    brand: { ink: "#16325C", pop: "#2F7FBF", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp en reclutamiento — publican de forma esporádica en Computrabajo.",
    tryIt: {
      positionTitle: "Operador de Prensa",
      refCode: "imprex-operador-prensa",
      jobs: [
        "Operador de prensa offset",
        "Auxiliar de acabado",
        "Personal de reparto",
      ],
    },
    thread: {
      candidateName: "Carlos Eduardo Herrera Pool",
      detail: "planta de Mérida, turno matutino",
      qualifier: "¿Tiene experiencia operando prensa offset o digital?",
      qualifierAnswer: "Sí, tres años en offset",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Mérida",
      when: "el jueves 4 de septiembre a las 8:30",
    },
    legalName: "Imprex, S.A. de C.V.",
    sector: "Imprenta",
    scale: [
      { value: "1974", label: "año de fundación" },
      { value: "500+", label: "toneladas de papel al año" },
      { value: "Mérida", label: "planta principal" },
    ],
    prose: {
      headline: "Cincuenta años de estabilidad. Y un relevo que nadie está preparando.",
      hook: "Imprenta líder del sureste, con plantilla estable y contratación esporádica.",
      opening:
        "Imprex tiene fama de estabilidad —sus propias reseñas de exempleados lo dicen— y una sola oferta registrada en dos años. Eso es una ventaja hasta que se jubila un prensista.",
      fitParagraphs: [
        "Cuando se contrata poco, cada contratación importa más y el proceso está más oxidado. Qualent deja montado un canal que no cuesta nada mantener abierto y que responde el día que sí hace falta.",
        "Los oficios de imprenta —prensistas offset y digital, auxiliares de acabado— son específicos y escasos. Conservar a los candidatos que ya se acercaron, con su experiencia registrada, vale más aquí que en perfiles genéricos.",
        "El canal es el que su gente ya usa. No hay portal que aprender ni CV que armar: un mensaje y la conversación hace el resto.",
      ],
    },
    signals: [
      {
        observation:
          "1 oferta registrada en su perfil de empresa en dos años",
        source: "Computrabajo",
      },
      {
        observation:
          "Perfil de empleador con reseñas de exempleados",
        source: "Indeed México",
      },
      {
        observation:
          "Reseñas que destacan muy buena estabilidad laboral",
        source: "Indeed",
      },
      {
        observation:
          "Página corporativa activa",
        source: "Facebook (contactoimprex)",
      },
    ],
    highTurnoverRoles: [
      "Operadores de prensa offset y digital",
      "Auxiliares de acabado y colectora",
      "Personal de cobranza y reparto",
    ],
    currentChannels: [
      "Computrabajo (actividad esporádica)",
      "Indeed (perfil)",
      "Facebook corporativo",
    ],
    footprint:
      "Planta principal en Mérida, sin evidencia de multi-sede.",
    adjacentOpportunity:
      "Un portal de cotización y seguimiento de tiraje para sus clientes corporativos reduciría el ida y vuelta por correo en cada trabajo.",
  },

  {
    slug: "industrias-gori",
    name: "Industrias Gori",
    logo: {
      src: "/qualent-logos/industrias-gori.png",
      width: 480,
      height: 207,
    },
    brand: { ink: "#0F2B8C", pop: "#E8B71D" },
    waTier: 3,
    waEvidence:
      "Sin WhatsApp ni bolsa de trabajo — el contacto es solo por teléfono y correo.",
    tryIt: {
      positionTitle: "Impresor Flexográfico",
      refCode: "gori-impresor-flexografico",
      jobs: [
        "Impresor flexográfico",
        "Ayudante de máquina",
        "Operador de rebobinado",
      ],
    },
    thread: {
      candidateName: "Fernando Javier Ake Chi",
      detail: "planta de Mérida, turno matutino",
      qualifier: "¿Ha operado prensa flexográfica antes?",
      qualifierAnswer: "Sí, dos años como ayudante",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Mérida",
      when: "el martes 2 de septiembre a las 8:30",
    },
    legalName: "Industrias Gori, S.A. de C.V.",
    sector: "Imprenta y flexografía",
    scale: [
      { value: "1989", label: "año de fundación" },
      { value: "Mérida", label: "planta única" },
      { value: "Etiquetas", label: "y empaque flexible" },
    ],
    prose: {
      headline: "Contacto solo por teléfono y correo. Los impresores no escriben correos.",
      hook: "Flexográfica de etiquetas y empaque, con reclutamiento directo y sin rastro público.",
      opening:
        "Su sitio no tiene bolsa de trabajo y su perfil de Computrabajo no muestra ofertas. El contacto publicado es un teléfono y un correo administrativo — dos canales que un impresor flexográfico no usa para buscar trabajo.",
      fitParagraphs: [
        "Pedir a un operador de máquina que escriba a un correo administrativo es pedirle el paso que no va a dar. Qualent recibe por el canal que sí usa y arma el perfil dentro de la conversación.",
        "Los oficios de flexografía son específicos —impresores, ayudantes de máquina, operadores de rebobinado— y escasos en Mérida. Conservar a cada candidato que se acerca, con su experiencia registrada, importa más cuando el mercado es chico.",
        "No hace falta montar un portal ni cambiar procesos: un número, un código QR en la planta, y la conversación corre sola.",
      ],
    },
    signals: [
      {
        observation:
          "Perfil de empresa sin ofertas activas visibles",
        source: "Computrabajo",
      },
      {
        observation:
          "Sitio web sin sección de bolsa de trabajo; contacto solo por teléfono y correo administrativo",
        source: "industriasgori.com.mx",
      },
      {
        observation:
          "Giro de etiquetas autoadheribles, mangas termoencogibles y empaque flexible",
        source: "Perfil de actividad",
      },
    ],
    highTurnoverRoles: [
      "Impresores flexográficos y ayudantes de máquina",
      "Operadores de acabado y rebobinado",
    ],
    currentChannels: [
      "Computrabajo (perfil, sin ofertas visibles)",
      "Reclutamiento directo por teléfono y correo",
    ],
    footprint:
      "Sede única en el centro de Mérida, sin evidencia de multi-planta.",
    adjacentOpportunity:
      "Un portal de aprobación de artes y seguimiento de tiraje para sus clientes de etiqueta quitaría ciclos de correo en cada pedido.",
  },

  {
    slug: "casa-daristi",
    name: "Casa D'Aristi",
    logo: {
      src: "/qualent-logos/casa-daristi.png",
      width: 480,
      height: 160,
    },
    brand: { ink: "#1A1A1A", pop: "#C9A227", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin señal de reclutamiento en ningún portal — plantilla pequeña y estable.",
    tryIt: {
      positionTitle: "Operador de Envasado",
      refCode: "daristi-operador-envasado",
      jobs: [
        "Operador de envasado",
        "Personal de almacén",
      ],
    },
    thread: {
      candidateName: "Ana Karina Chim Balam",
      detail: "planta de Mérida, turno matutino",
      qualifier: "¿Tiene experiencia en producción o envasado de alimentos o bebidas?",
      qualifierAnswer: "Sí, dos años en envasado",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Mérida",
      when: "el miércoles 3 de septiembre a las 9:00",
    },
    legalName: "Casa D'Aristi",
    sector: "Licores",
    scale: [
      { value: "1935", label: "año de fundación" },
      { value: "10-50", label: "empleados" },
      { value: "Exportación", label: "premium" },
    ],
    prose: {
      headline: "Una destilería pequeña no contrata seguido. Cuando lo hace, no puede fallar.",
      hook: "Microdestilería de Xtabentún y Kalani, con exportación premium y equipo reducido.",
      opening:
        "No encontramos vacantes activas de Casa D'Aristi en ningún portal. Con entre 10 y 50 personas, cada contratación pesa mucho más que en una operación de cientos — y el proceso rara vez está listo cuando hace falta.",
      fitParagraphs: [
        "A este tamaño no se justifica un equipo de reclutamiento ni una suscripción a portales. Qualent deja abierto un canal que no cuesta atención mientras no se usa y que responde bien el día que sí.",
        "Una producción artesanal orientada a exportación depende de gente con oficio y permanencia. Poder conservar y volver a contactar a buenos candidatos anteriores vale más aquí que el volumen.",
        "Es el caso donde la honestidad importa: si el volumen de contratación no lo justifica, se los decimos en la primera conversación.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes activas encontradas en portales de empleo",
        source: "Computrabajo, Indeed y OCC",
      },
      {
        observation:
          "Marca presente en importadores de Estados Unidos, sin señales de contratación operativa en México",
        source: "Directorios de importadores",
      },
      {
        observation:
          "Página de compañía sin bolsa de trabajo pública",
        source: "LinkedIn",
      },
    ],
    highTurnoverRoles: [
      "Personal de producción y envasado",
      "Personal de almacén y expedición",
    ],
    currentChannels: [
      "LinkedIn (página de compañía)",
      "Sin bolsa de trabajo pública visible",
    ],
    footprint:
      "Microdestilería en Mérida con producción de escala pequeña y enfoque en exportación.",
    adjacentOpportunity:
      "Un portal de pedidos y trazabilidad de lote para sus importadores reduciría el seguimiento por correo en cada embarque.",
  },

  {
    slug: "gora",
    name: "GORA",
    logo: {
      src: "/qualent-logos/gora.png",
      width: 480,
      height: 82,
    },
    brand: { ink: "#0B4A63", pop: "#12A0C8" },
    waTier: 3,
    waEvidence:
      "Sin señal de reclutamiento — su presencia digital está orientada a ventas, no a contratar.",
    tryIt: {
      positionTitle: "Operario de Producción",
      refCode: "gora-operario-produccion",
      jobs: [
        "Operario de fabricación metálica",
        "Carpintero de planta",
        "Chofer de reparto",
      ],
    },
    thread: {
      candidateName: "Miguel Ángel Tuz Canché",
      detail: "planta de Mérida, turno matutino",
      qualifier: "¿Tiene experiencia en carpintería o fabricación metálica?",
      qualifierAnswer: "Sí, tres años en carpintería",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la planta de Mérida",
      when: "el jueves 4 de septiembre a las 8:00",
    },
    legalName: "Muebles GORA",
    sector: "Muebles",
    scale: [
      { value: "35+", label: "años operando" },
      { value: "Planta", label: "propia en Mérida" },
      { value: "100%", label: "yucateca" },
    ],
    prose: {
      headline: "Su presencia digital vende muebles. Ninguna parte de ella contrata.",
      hook: "Planta propia de mobiliario de oficina y escuela, con reclutamiento local y directo.",
      opening:
        "Blog, Instagram y Facebook activos, todos de venta. Cero ofertas en portales. Para una planta propia con 35 años de operación, eso quiere decir que el personal se consigue de boca en boca.",
      fitParagraphs: [
        "Boca a boca funciona, pero no se puede convocar cuando hace falta. Qualent convierte esa red informal en algo localizable: candidatos con su oficio, su experiencia y sus documentos ya registrados.",
        "Los perfiles de planta —fabricación metálica, carpintería, acabado— son de oficio y locales. Un código QR en la planta o en el punto de venta abre la conversación sin pedirle a nadie que arme un CV.",
        "Ya publican en redes para vender. El mismo tipo de anuncio, apuntado a reclutamiento y conectado a WhatsApp, aprovecha algo que ya saben hacer.",
      ],
    },
    signals: [
      {
        observation:
          "Sin ofertas activas encontradas a nombre de Muebles GORA o Grupo Gora",
        source: "Computrabajo, OCC e Indeed",
      },
      {
        observation:
          "Presencia digital orientada a ventas — blog, Instagram y Facebook — no a reclutamiento",
        source: "Redes corporativas",
      },
      {
        observation:
          "Planta propia de muebles de oficina, escolares y de comercio",
        source: "Sitio corporativo",
      },
    ],
    highTurnoverRoles: [
      "Operarios de fabricación metálica y carpintería",
      "Vendedores de piso",
      "Choferes de reparto",
    ],
    currentChannels: [
      "Reclutamiento directo y local",
      "Redes corporativas de uso comercial",
      "Sin presencia en portales de empleo",
    ],
    footprint:
      "Planta propia y punto de venta en Mérida, sin evidencia de multi-sede.",
    adjacentOpportunity:
      "Un configurador de mobiliario por proyecto para escuelas y oficinas, con cotización automática, acortaría su ciclo de venta institucional.",
  },

  {
    slug: "grupo-tony",
    name: "Grupo Tony",
    logo: {
      src: "/qualent-logos/grupo-tony.png",
      width: 480,
      height: 312,
      onDark: true,
    },
    brand: { ink: "#0E3B2E", pop: "#C8A24A", provisional: true },
    waTier: 2,
    waEvidence:
      "WhatsApp comercial ya publicado (999 572 0142) — el canal opera para ventas, no para contratar.",
    tryIt: {
      positionTitle: "Costurera de Taller",
      refCode: "tony-costurera-taller",
      jobs: [
        "Costurera de taller · Mérida",
        "Vendedor de mostrador · Centro",
      ],
    },
    thread: {
      candidateName: "Lucía Margarita Canul Poot",
      detail: "taller de Mérida, turno matutino",
      qualifier: "¿Tiene experiencia en máquina de coser industrial?",
      qualifierAnswer: "Sí, cinco años",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "el taller del Centro",
      when: "el lunes 1 de septiembre a las 9:00",
    },
    legalName: "Novedades Tony, S.A. de C.V.",
    sector: "Manufactura textil",
    scale: [
      { value: "67", label: "años de historia" },
      { value: "3", label: "sucursales en Mérida" },
      { value: "Taller", label: "de confección propio" },
    ],
    prose: {
      headline: "Sesenta y siete años cosiendo guayaberas. Las costureras llegan por recomendación.",
      hook: "Taller de confección propio y tres sucursales, con contratación de boca en boca.",
      opening:
        "Novedades Tony ya atiende por WhatsApp del lado comercial. El taller de confección se abastece por recomendación — un canal que funciona hasta que se necesitan cinco costureras a la vez.",
      fitParagraphs: [
        "El oficio de confección se transmite por red personal, y esa red es difícil de convocar en un pico de producción. Qualent conserva a cada candidata que se acercó, con su experiencia registrada, para el momento en que sí hace falta.",
        "El canal ya es el correcto dentro de la empresa: usan WhatsApp para vender. Extenderlo al taller no obliga a nadie a aprender un sistema nuevo.",
        "Con tres sucursales más el taller, cada candidata debe quedar agendada donde corresponde. La conversación identifica el punto y agenda ahí.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes propias encontradas en portales bajo Novedades Tony",
        source: "Computrabajo, Indeed y OCC",
      },
      {
        observation:
          "WhatsApp comercial publicado en su sitio, ya operativo para ventas",
        source: "Sitio corporativo",
      },
      {
        observation:
          "Contratación directa en sucursal y taller, de boca en boca",
        source: "Perfil de actividad",
      },
      {
        observation:
          "Ojo: las ofertas de «Grupo Tony» en portales corresponden a TONY Superpapelerías, otra empresa",
        source: "Verificación de identidad",
      },
    ],
    highTurnoverRoles: [
      "Costureras y personal de taller de confección",
      "Vendedores de mostrador en 3 sucursales",
    ],
    currentChannels: [
      "Contratación directa en sucursal y taller",
      "Boca a boca",
      "WhatsApp comercial (ventas)",
    ],
    footprint:
      "Tres sucursales en Mérida — Centro, Itzaes y Macro — más taller de manufactura propio.",
    adjacentOpportunity:
      "Una tienda en línea con inventario unificado entre taller y sucursales abriría venta nacional de guayabera sin abrir otro punto físico.",
  },

  {
    slug: "agencia-maritima-maya",
    name: "Agencia Marítima Maya",
    brand: { ink: "#0B3550", pop: "#2E7FA8", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin presencia digital de reclutamiento — ni portales, ni redes, ni bolsa de trabajo.",
    tryIt: {
      positionTitle: "Auxiliar Operativo",
      refCode: "maritima-maya-auxiliar",
      jobs: [
        "Auxiliar operativo · Progreso",
        "Apoyo documental",
      ],
    },
    thread: {
      candidateName: "Rodrigo Alberto Cauich Ek",
      detail: "oficina de Progreso, tiempo completo",
      qualifier: "¿Tiene experiencia en operación portuaria o comercio exterior?",
      qualifierAnswer: "Sí, un año en patio",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la oficina de Progreso",
      when: "el martes 2 de septiembre a las 10:00",
    },
    sector: "Logística portuaria",
    scale: [
      { value: "Progreso", label: "única oficina" },
      { value: "Consignataria", label: "de buques" },
      { value: "Por escala", label: "operación" },
    ],
    prose: {
      headline: "Una oficina en Progreso y ningún rastro público de contratación.",
      hook: "Agencia consignataria de buques, con operación por escala y personal difícil de rastrear.",
      opening:
        "No encontramos vacantes, página de Facebook ni perfil de empresa. Para una consignataria de buques en Progreso, el personal se consigue dentro del gremio portuario — un círculo cerrado y pequeño.",
      fitParagraphs: [
        "El agenciamiento marítimo trabaja por escala: llega un buque y hace falta gente esa misma semana. Un canal abierto que ya tenga candidatos calificados evita empezar cada llamada desde cero.",
        "Es la operación más pequeña de la lista y la que menos señal pública tiene. Si el volumen de contratación no lo justifica, conviene decirlo en la primera conversación en vez de montar un proceso que nadie va a usar.",
        "Lo que sí aplica en cualquier caso: documentos verificados y un registro de a quién se contactó, en una operación donde hoy todo vive en llamadas.",
      ],
    },
    signals: [
      {
        observation:
          "Sin vacantes encontradas en portales de empleo ni en LinkedIn",
        source: "Computrabajo, Indeed, OCC y LinkedIn Jobs",
      },
      {
        observation:
          "Sin página de Facebook ni publicaciones de bolsa de trabajo localizadas",
        source: "Búsqueda en redes",
      },
      {
        observation:
          "Única presencia web es un micrositio de directorio",
        source: "Directorio empresarial",
      },
    ],
    highTurnoverRoles: [
      "Personal operativo de agenciamiento por escala",
      "Apoyo administrativo y documental",
    ],
    currentChannels: [
      "Red del gremio portuario",
      "Sin presencia digital de reclutamiento",
    ],
    footprint:
      "Una sola oficina identificada, en el centro de Progreso.",
    adjacentOpportunity:
      "Un tablero de escalas y documentación por buque, con avisos por WhatsApp a sus clientes, ordenaría un flujo que hoy vive en correo y llamadas.",
  },

  {
    slug: "business-travel-and-events",
    name: "Business Travel & Events",
    brand: { ink: "#123A5C", pop: "#3E8FBF", provisional: true },
    waTier: 3,
    waEvidence:
      "Sin señal de reclutamiento — el staff de evento se subcontrata, no se contrata.",
    tryIt: {
      positionTitle: "Staff de Evento",
      refCode: "bte-staff-evento",
      jobs: [
        "Staff de evento · Mérida",
        "Coordinación de piso",
      ],
    },
    thread: {
      candidateName: "Paulina Estrella Novelo Chan",
      detail: "staff por congreso, pago por evento",
      qualifier: "¿Tiene experiencia en atención a congresos o eventos?",
      qualifierAnswer: "Sí, en varios congresos",
      docs: "su INE por los dos lados y su CURP",
      docLabel: "INE_frente.jpg · CURP.pdf",
      location: "la oficina de Mérida",
      when: "el jueves 4 de septiembre a las 11:00",
    },
    sector: "Turismo B2B",
    scale: [
      { value: "2010", label: "inicio de operaciones" },
      { value: "30+", label: "años de experiencia de sus fundadores" },
      { value: "Por evento", label: "modelo de staff" },
    ],
    prose: {
      headline: "El staff llega por evento. Subcontratado, y distinto cada vez.",
      hook: "Agencia familiar de congresos y viajes corporativos, sin plantilla operativa propia.",
      opening:
        "Cero vacantes en portales y sin empleados visibles en LinkedIn. Su modelo no es de plantilla: el personal de piso entra por evento y se subcontrata.",
      fitParagraphs: [
        "Cuando el staff se subcontrata por evento, el problema no es contratar sino volver a encontrar a los mismos que funcionaron. Qualent guarda ese grupo con su rol, su experiencia y sus documentos, listo para convocar en el siguiente congreso.",
        "Convocar a veinte personas para un evento con dos semanas de aviso es exactamente el pico que un canal automático absorbe sin ocupar a nadie.",
        "Es el caso más pequeño de la lista. Si el volumen no lo justifica, se los decimos en la primera conversación — es más útil que venderles una plataforma que no van a usar.",
      ],
    },
    signals: [
      {
        observation:
          "Cero vacantes encontradas en portales de empleo o LinkedIn, agosto 2026",
        source: "Búsqueda en portales",
      },
      {
        observation:
          "Sin página de empresa con empleados visibles",
        source: "LinkedIn",
      },
      {
        observation:
          "Perfil en el directorio oficial de turismo de la ciudad",
        source: "visitmerida.mx",
      },
    ],
    highTurnoverRoles: [
      "Staff eventual por congreso o evento",
      "Coordinación de piso por evento",
    ],
    currentChannels: [
      "Red del gremio turístico",
      "Sin presencia en portales de empleo",
    ],
    footprint:
      "Agencia familiar con base en Mérida y operación de congresos, viajes corporativos y boletaje.",
    adjacentOpportunity:
      "Un portal de registro e inscripción para los congresos que operan quitaría trabajo manual de listas y acreditaciones en cada evento.",
  },
];

/**
 * PLACEHOLDER Qualent demo line. No demo number is provisioned yet, so every
 * link and QR below points at a number that does not answer. Swap this, then
 * re-run the QR generation, BEFORE any link goes to a prospect.
 */
/* ------------------------------------------------------------------
   Contrast helpers.

   The band treatment assumes nothing about a company's palette: some
   have a light "pop" (La Lupita's yellow), others a saturated mid-tone
   (GAP's blue) where dark-on-brand text collapses. Rather than hand-pick
   per company across 25 pages, derive the readable colour.
   ------------------------------------------------------------------ */

function luminance(hex: string): number {
  const h = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number) => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

export function isLight(hex: string): boolean {
  return luminance(hex) > 0.42;
}

/** Text colour that stays readable on the given background. */
export function readableOn(bg: string, preferred?: string): string {
  if (preferred && Math.abs(luminance(bg) - luminance(preferred)) > 0.28) return preferred;
  return isLight(bg) ? "#12160C" : "#FFFFFF";
}

export const DEMO_PHONE = "529990000000";

/** Mirrors buildWhatsAppLink() in the Qualent codebase so ref attribution works. */
export function buildTryItLink(p: Prospect): string {
  const msg = `Hola, vi su anuncio para ${p.tryIt.positionTitle} y me interesa saber más.`;
  return `https://wa.me/${DEMO_PHONE}?text=${encodeURIComponent(msg)}&ref=${encodeURIComponent(p.tryIt.refCode)}`;
}

export function getProspect(slug: string): Prospect | undefined {
  return QUALENT_PROSPECTS.find((p) => p.slug === slug);
}

export function getProspectSlugs(): string[] {
  return QUALENT_PROSPECTS.map((p) => p.slug);
}
