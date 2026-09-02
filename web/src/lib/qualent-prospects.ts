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
];

/**
 * PLACEHOLDER Qualent demo line. No demo number is provisioned yet, so every
 * link and QR below points at a number that does not answer. Swap this, then
 * re-run the QR generation, BEFORE any link goes to a prospect.
 */
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
