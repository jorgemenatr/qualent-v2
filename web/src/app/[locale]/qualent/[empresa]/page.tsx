import { notFound, redirect } from "next/navigation";
import {
  MessageCircle,
  ScanLine,
  CalendarCheck,
  BellRing,
  Users,
  BarChart3,
  Eye,
  ArrowRight,
  Check,
  Minus,
  MapPin,
  Repeat,
} from "lucide-react";
import type { Metadata } from "next";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getProspect, QUALENT_PROSPECTS } from "@/lib/qualent-prospects";

type Props = { params: Promise<{ locale: string; empresa: string }> };

export function generateStaticParams() {
  // Spanish only — these are prospect-facing pages for Yucatán companies.
  return QUALENT_PROSPECTS.map((p) => ({ locale: "es", empresa: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { empresa } = await params;
  const prospect = getProspect(empresa);
  if (!prospect) return {};

  return {
    title: `Qualent para ${prospect.name}`,
    description: `Propuesta de automatización de reclutamiento por WhatsApp para ${prospect.name}.`,
    // Prospect-specific pages: never index, never follow, no snippets or previews.
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
        "max-snippet": -1,
      },
    },
  };
}

/** How the platform works, end to end. Shared across every prospect page. */
const FLOW_STEPS = [
  {
    icon: MessageCircle,
    title: "El candidato escribe por WhatsApp",
    body: "Desde un anuncio de Facebook con clic a WhatsApp, un código QR en sitio o un mensaje directo. Sin portal, sin registro, sin CV.",
  },
  {
    icon: Users,
    title: "La IA lo califica en español",
    body: "Conversación en español mexicano coloquial que extrae nombre, edad, ubicación y disponibilidad, y responde preguntas reales del puesto: sueldo, turnos, prestaciones, requisitos.",
  },
  {
    icon: ScanLine,
    title: "Documentos verificados por OCR",
    body: "El candidato manda foto de INE, CURP y comprobante de domicilio en el mismo chat. Se clasifican, se leen y se validan automáticamente, y los datos se escriben en su perfil.",
  },
  {
    icon: CalendarCheck,
    title: "Se agenda solo, contra el calendario real",
    body: "La IA propone horarios disponibles del sitio más cercano al candidato, confirma con botones y crea el evento en el calendario del reclutador.",
  },
  {
    icon: BellRing,
    title: "Recordatorios automáticos",
    body: "Mensajes de WhatsApp 24 horas y 2 horas antes de la entrevista, con fecha, hora, dirección y liga de mapa.",
  },
  {
    icon: Eye,
    title: "Reclutamiento humano donde importa",
    body: "Su equipo entra a la conversación con un clic cuando quiere, y ve solo candidatos calificados y con documentos completos.",
  },
];

const CAPABILITIES = [
  {
    icon: Users,
    title: "Pipeline completo",
    body: "Diez etapas desde el saludo hasta la contratación, con detección automática de candidatos que dejaron de responder y seguimiento según la etapa.",
  },
  {
    icon: Eye,
    title: "Control humano en cualquier momento",
    body: "El reclutador toma la conversación con un clic, escribe directo desde el tablero y la regresa a la IA cuando termina.",
  },
  {
    icon: CalendarCheck,
    title: "Calendarios y multi-sitio",
    body: "Conexión con Google Calendar y Outlook, disponibilidad real por sitio, husos horarios propios por ubicación y reprogramación desde el chat.",
  },
  {
    icon: MapPin,
    title: "Vacantes con perfil completo",
    body: "Sueldo, turnos, escolaridad, experiencia, prestaciones y condiciones de trabajo — cargados una vez y usados por la IA para responder con datos reales.",
  },
  {
    icon: BarChart3,
    title: "Analítica del embudo",
    body: "Conversión etapa por etapa, tiempo a cada hito, tasa de inasistencia, desempeño por fuente de candidato y avance de llenado por vacante.",
  },
  {
    icon: Repeat,
    title: "Automatización de fondo",
    body: "Revisión horaria de candidatos estancados, procesamiento de documentos por lotes y envío programado de recordatorios.",
  },
];

/** Deliberately included: what the platform does not fix. */
const NOT_SOLVED = [
  "Estudios socioeconómicos y verificación de antecedentes — requieren proveedores externos.",
  "Exámenes médicos de ingreso — son obligatorios por ley y presenciales.",
  "Costos de capacitación — son inherentes al desarrollo de la persona.",
  "La rotación en sí misma — es un tema de compensación y de operación, no de software.",
];

export default async function QualentProspectPage({ params }: Props) {
  const { locale, empresa } = await params;
  const prospect = getProspect(empresa);

  if (!prospect) notFound();
  // These pages exist in Spanish only.
  if (locale !== "es") redirect(`/es/qualent/${empresa}`);

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 py-20 sm:py-28">
        <PageHeroBackground />
        <Container className="relative">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-200">
              Propuesta preparada para {prospect.name}
              <span className="text-emerald-400/60">·</span>
              <span className="text-emerald-300/80">{prospect.sector}</span>
            </p>
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Reclutamiento de alto volumen por WhatsApp
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-emerald-100/90 sm:text-xl">
              {prospect.prose.hook}
            </p>

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-6">
              {prospect.scale.map((s) => (
                <div key={s.label}>
                  <dt className="sr-only">{s.label}</dt>
                  <dd>
                    <span className="block text-3xl font-bold text-white sm:text-4xl">
                      {s.value}
                    </span>
                    <span className="mt-1 block text-sm text-emerald-200/70">
                      {s.label}
                    </span>
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-950 hover:bg-emerald-50"
              >
                <a href="#conversacion">
                  Agendar una conversación
                  <ArrowRight className="ml-1" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-emerald-400/40 bg-transparent text-emerald-100 hover:bg-emerald-500/10 hover:text-white"
              >
                <a href="#como-funciona">Ver cómo funciona</a>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Why we are writing */}
      <section className="border-b border-border bg-background py-16 sm:py-20">
        <Container size="small">
          <p className="text-lg leading-relaxed text-foreground sm:text-xl">
            {prospect.prose.opening}
          </p>
        </Container>
      </section>

      {/* What we observed — the personalisation payload */}
      <section className="border-b border-border bg-muted/40 py-16 sm:py-24">
        <Container size="small">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Lo que vimos públicamente
          </h2>
          <p className="mt-4 text-muted-foreground">
            Antes de escribirles revisamos sus vacantes activas, sus canales de
            reclutamiento y su presencia pública. Esto es lo que encontramos.
          </p>

          <ul className="mt-10 space-y-4">
            {prospect.signals.map((signal, i) => (
              <li
                key={i}
                className="rounded-xl border border-border bg-card p-5 shadow-sm"
              >
                <p className="text-card-foreground">{signal.observation}</p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {signal.source}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground">
                Puestos de mayor rotación
              </h3>
              <ul className="mt-4 space-y-2">
                {prospect.highTurnoverRoles.map((role) => (
                  <li
                    key={role}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <Repeat className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{role}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="font-semibold text-card-foreground">
                Cómo reclutan hoy
              </h3>
              <ul className="mt-4 space-y-2">
                {prospect.currentChannels.map((channel) => (
                  <li
                    key={channel}
                    className="flex gap-2 text-sm text-muted-foreground"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-emerald-600" />
                    <span>{channel}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-6 rounded-xl border border-border bg-card p-6">
            <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
              <MapPin className="size-4 text-emerald-600" />
              Complejidad de sitios y turnos
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {prospect.footprint}
            </p>
          </div>
        </Container>
      </section>

      {/* Why it fits them */}
      <section className="border-b border-border bg-background py-16 sm:py-24">
        <Container size="small">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Por qué esto encaja con {prospect.name}
          </h2>
          <div className="mt-8 space-y-6">
            {prospect.prose.fitParagraphs.map((para, i) => (
              <p key={i} className="text-lg leading-relaxed text-foreground">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section
        id="como-funciona"
        className="scroll-mt-20 border-b border-border bg-muted/40 py-16 sm:py-24"
      >
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Cómo funciona Qualent
            </h2>
            <p className="mt-4 text-muted-foreground">
              Del anuncio a la entrevista agendada, sin que nadie de Recursos
              Humanos conteste el primer mensaje.
            </p>
          </div>

          <ol className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {FLOW_STEPS.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card p-6 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                    <step.icon className="size-5" />
                  </span>
                  <span className="text-sm font-medium text-muted-foreground">
                    Paso {i + 1}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Capabilities */}
      <section className="border-b border-border bg-background py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Qué incluye la plataforma
            </h2>
            <p className="mt-4 text-muted-foreground">
              Qualent es un producto que ya opera en producción para
              contratación operativa de alto volumen en México, no un desarrollo
              que empieza de cero.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((cap) => (
              <div
                key={cap.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <cap.icon className="size-5 text-emerald-600" />
                <h3 className="mt-4 font-semibold text-card-foreground">
                  {cap.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {cap.body}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Commercial model + honesty section */}
      <section className="border-b border-border bg-muted/40 py-16 sm:py-24">
        <Container size="small">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                El modelo comercial
              </h2>
              <p className="mt-6 leading-relaxed text-foreground">
                No cobramos por licencia ni por usuario. El precio se calcula
                como una parte del ahorro que la plataforma genera sobre su
                costo de contratación actual: ustedes se quedan con la mitad del
                valor creado y nosotros con la otra mitad.
              </p>
              <p className="mt-4 leading-relaxed text-foreground">
                Eso significa que el primer paso no es una cotización, sino un
                cálculo conjunto: cuántas contrataciones hacen al año, qué les
                cuesta hoy cada una y cuánto de ese costo es realmente
                atacable. Sobre esa cifra —la suya, no un promedio de la
                industria— se define la inversión.
              </p>
              <p className="mt-4 leading-relaxed text-foreground">
                Recomendamos empezar con un piloto acotado a una división, una
                planta o una región, con métricas acordadas de antemano.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="flex items-center gap-2 font-semibold text-card-foreground">
                <Minus className="size-4 text-muted-foreground" />
                Lo que esto no resuelve
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Para que la conversación empiece bien, conviene ser claros sobre
                los límites:
              </p>
              <ul className="mt-5 space-y-3">
                {NOT_SOLVED.map((item) => (
                  <li
                    key={item}
                    className="flex gap-2 text-sm leading-relaxed text-muted-foreground"
                  >
                    <Minus className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Adjacent opportunity */}
      <section className="border-b border-border bg-background py-16 sm:py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Más allá del reclutamiento
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
            {prospect.adjacentOpportunity}
          </p>
        </Container>
      </section>

      {/* CTA */}
      <section
        id="conversacion"
        className="scroll-mt-20 bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 py-20 sm:py-24"
      >
        <Container size="small">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Una conversación de 30 minutos
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-emerald-100/90">
              Sin presentación de ventas. Revisamos juntos su proceso actual de
              contratación operativa, calculamos qué parte del costo es
              atacable y, si tiene sentido, definimos un piloto. Si no lo tiene,
              se los decimos.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-white text-emerald-950 hover:bg-emerald-50"
              >
                <a href="mailto:john@picklellama.studio?subject=Qualent%20—%20conversación%20inicial">
                  Escribir a PickleLlama
                  <ArrowRight className="ml-1" />
                </a>
              </Button>
            </div>
            <p className="mt-10 border-t border-emerald-400/20 pt-6 text-sm leading-relaxed text-emerald-200/60">
              Esta página fue preparada por PickleLlama Studio para
              {" "}
              {prospect.legalName ?? prospect.name} y no está listada
              públicamente. La información citada proviene de fuentes públicas
              —bolsas de trabajo, páginas de Facebook, sitios corporativos y
              prensa regional— consultadas en agosto de 2026, y puede haber
              cambiado desde entonces.
            </p>
          </div>
        </Container>
      </section>
    </div>
  );
}
