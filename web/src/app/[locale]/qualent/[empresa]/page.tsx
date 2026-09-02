import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Container } from "@/components/layout";
import {
  getProspect,
  buildTryItLink,
  readableOn,
  isLight,
  QUALENT_PROSPECTS,
  type Prospect,
} from "@/lib/qualent-prospects";
import { DemoThread } from "./demo-thread";

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

/** What changes when the manual work goes away. Every right-hand row is shipped behaviour. */
const AUTOMATION_ROWS: [string, string][] = [
  [
    "Alguien contesta cada mensaje, en horario de oficina.",
    "Responde en segundos, a cualquier hora, todos los días.",
  ],
  [
    "Las mismas preguntas escritas a mano, candidato por candidato.",
    "Califica dentro de la conversación, en español mexicano.",
  ],
  [
    "Los datos quedan sueltos en el hilo del chat.",
    "Perfil estructurado por candidato: nombre, edad, ubicación, puesto y etapa.",
  ],
  [
    "Llegan fotos de INE y CURP que alguien revisa a ojo.",
    "Documentos leídos y validados por OCR, con los datos escritos al perfil.",
  ],
  [
    "Agendar implica llamar, confirmar y volver a llamar.",
    "Agenda contra el calendario real de cada sitio, con recordatorios automáticos.",
  ],
  [
    "Si nadie da seguimiento, el candidato se enfría y se pierde.",
    "Detecta a quien dejó de responder y le da seguimiento según su etapa.",
  ],
];

const NOT_SOLVED = [
  "Estudios socioeconómicos y verificación de antecedentes.",
  "Exámenes médicos de ingreso — obligatorios y presenciales.",
  "Costos de capacitación.",
  "La rotación en sí misma — es compensación y operación, no software.",
];

/** Kicker + lead-in for the automation band, by how far along they already are. */
const AUTOMATION_INTRO: Record<number, { kicker: string; sub: string }> = {
  1: {
    kicker: "Ya usan el canal · falta automatizarlo",
    sub: "No les proponemos cambiar de canal: ya reciben candidatos por ahí. Lo que cambia es cuánto tiempo de su equipo cuesta cada uno.",
  },
  2: {
    kicker: "El canal ya existe · falta del lado de candidatos",
    sub: "WhatsApp ya es como atienden. Extenderlo a reclutamiento no cambia el hábito de nadie — cambia cuánto trabajo manual hay detrás.",
  },
};

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.5 14.4c-.3-.2-1.7-.9-2-1-.3-.1-.5-.2-.7.1-.2.3-.7 1-.9 1.2-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6l.5-.5c.1-.2.2-.3.3-.5 0-.2 0-.4 0-.5 0-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1.1 2.8 1.2 3c.2.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3z" />
      <path d="M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.8 3 1.2 4.7 1.2 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.5 0-3-.4-4.3-1.2l-.3-.2-3.1.8.8-3-.2-.3c-.8-1.3-1.3-2.9-1.3-4.5 0-4.6 3.8-8.4 8.4-8.4s8.3 3.8 8.3 8.4-3.7 8.4-8.3 8.4z" />
    </svg>
  );
}

/** Their logo, or their name set in type when we do not have the asset yet. */
function AddresseeCard({ prospect }: { prospect: Prospect }) {
  // A white-on-transparent mark would disappear on the default white card.
  const onDark = prospect.logo?.onDark ?? false;
  return (
    <div
      className={`flex w-fit items-center gap-3.5 rounded-xl border px-4 py-2.5 ${
        onDark ? "border-white/25 bg-[#111A21]" : "border-black/15 bg-white shadow-sm"
      }`}
    >
      <span
        className={`w-[104px] shrink-0 border-r pr-3 font-mono text-[9.5px] uppercase leading-snug tracking-wider ${
          onDark ? "border-white/20 text-white/65" : "border-black/10 text-neutral-500"
        }`}
      >
        Propuesta preparada para
      </span>
      {prospect.logo ? (
        <Image
          src={prospect.logo.src}
          alt={prospect.name}
          width={prospect.logo.width}
          height={prospect.logo.height}
          className={
            prospect.logo.width / prospect.logo.height < 1.6
              ? "h-11 w-auto"
              : "h-8 w-auto"
          }
        />
      ) : (
        <span
          className={`pr-2 text-[15px] font-bold tracking-tight ${
            onDark ? "text-white" : "text-neutral-900"
          }`}
        >
          {prospect.name}
        </span>
      )}
    </div>
  );
}

export default async function QualentProspectPage({ params }: Props) {
  const { locale, empresa } = await params;
  const prospect = getProspect(empresa);

  if (!prospect) notFound();
  // These pages exist in Spanish only.
  if (locale !== "es") redirect(`/es/qualent/${empresa}`);

  const { brand } = prospect;
  const waLink = buildTryItLink(prospect);
  const autoIntro = AUTOMATION_INTRO[prospect.waTier];
  // Some palettes have a light pop (yellow), others a saturated mid-tone (blue).
  // Derive text colours so neither collapses into its own background.
  const onPop = readableOn(brand.pop, brand.ink);
  const onInk = readableOn(brand.ink);
  const ctaText = readableOn(brand.pop);
  const cardTint = isLight(brand.pop) ? "rgba(255,255,255,.85)" : "rgba(255,255,255,.14)";

  return (
    <div className="flex flex-col">
      {/* ---------- Qualent product bar. PickleLlama is the attribution only. ---------- */}
      <div className="bg-[#709030]">
        <Container>
          <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2 py-3.5">
            <Image
              src="/qualent/qualent-logo-white.png"
              alt="Qualent"
              width={2535}
              height={693}
              className="h-[30px] w-auto"
              priority
            />
            <span className="border-l border-white/40 pl-3.5 text-[13px] leading-tight text-white/95">
              Reclutamiento operativo por WhatsApp
            </span>
            <span className="flex-1" />
            <span className="flex items-center gap-2 whitespace-nowrap text-[11px] text-white/85">
              <Image
                src="/logo-square.png"
                alt=""
                width={64}
                height={64}
                className="size-[17px]"
              />
              un producto de PickleLlama Studio
            </span>
            <span className="whitespace-nowrap border-l border-white/30 pl-3 font-mono text-[10.5px] tracking-wide text-white/75">
              picklellama.studio
            </span>
          </div>
        </Container>
      </div>

      {/* ---------- Hero, on Qualent's deep ground ---------- */}
      <section className="bg-[#2E3D13] py-12 sm:py-14">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
            <div>
              <span className="mb-4 inline-flex max-w-[52ch] items-center gap-2.5 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-[12px] leading-snug text-[#E4EFCF]">
                <WhatsAppIcon className="size-[15px] shrink-0" />
                <span>{prospect.waEvidence}</span>
              </span>
              <p className="mb-4 font-mono text-[10.5px] uppercase tracking-[.16em] text-[#A9C77E]">
                Propuesta · {prospect.sector}
              </p>
              <h1 className="text-4xl font-bold uppercase leading-[.99] tracking-tight text-white sm:text-5xl">
                {prospect.prose.headline}
              </h1>
              <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-[#C6D9A8]">
                {prospect.prose.hook}
              </p>

              <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-5">
                {[
                  { v: "<30s", l: "primera respuesta" },
                  { v: "24/7", l: "sin turno de RH" },
                  { v: "INE + CURP", l: "verificados por OCR" },
                ].map((s) => (
                  <div key={s.l}>
                    <dt className="sr-only">{s.l}</dt>
                    <dd>
                      <span className="block text-2xl font-bold tracking-tight text-white sm:text-3xl">
                        {s.v}
                      </span>
                      <span className="mt-1 block font-mono text-[11px] text-[#A9C77E]">
                        {s.l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="#conversacion"
                className="mt-7 inline-block px-6 py-3.5 text-[15px] font-bold shadow-[5px_5px_0_rgba(0,0,0,.28)]"
                style={{ background: brand.pop, color: ctaText }}
              >
                Agendar 30 minutos →
              </a>
            </div>

            <div>
              <span className="mb-2.5 block font-mono text-[10px] uppercase tracking-[.12em] text-[#A9C77E]">
                Conversación real del sistema · vacante de {prospect.tryIt.positionTitle}
              </span>
              <DemoThread
                thread={prospect.thread}
                position={prospect.tryIt.positionTitle}
              />
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Try it now, with their own vacancies ---------- */}
      <section className="border-t-4 border-[#709030] bg-[#FBFDF3] py-9">
        <Container>
          <div className="grid items-center gap-9 lg:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-3 flex items-center gap-2 font-mono text-[10.5px] uppercase tracking-[.17em] text-[#4A5F1C]">
                <span className="size-2 rounded-full bg-[#709030]" />
                En vivo · sus vacantes reales
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-[#2E3D13] sm:text-[27px]">
                Pruébelo ahora, con sus propias vacantes
              </h2>
              <p className="mt-3 max-w-[50ch] text-[15.5px] leading-relaxed text-[#3F5218]">
                Tomamos las vacantes que ustedes ya publicaron y las cargamos en
                Qualent. Abra la conversación y verá exactamente lo que vería un
                candidato suyo — preguntas, documentos y agenda incluidos.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {prospect.tryIt.jobs.map((j) => (
                  <span
                    key={j}
                    className="rounded-full border border-[#2E3D13]/20 bg-white/70 px-3 py-1.5 font-mono text-[12.5px] text-[#3F5218]"
                  >
                    {j}
                  </span>
                ))}
              </div>
              <a
                href={waLink}
                className="mt-5 inline-flex items-center gap-2.5 rounded-lg bg-[#2E3D13] px-6 py-3.5 text-[15.5px] font-bold text-white"
              >
                <WhatsAppIcon className="size-5" />
                Abrir en WhatsApp
              </a>
              <p className="mt-3 font-mono text-[11.5px] text-[#5A7226]">
                Sin instalar nada. La conversación corre en el WhatsApp que ya usan.
              </p>
            </div>

            <div className="rounded-xl border border-[#2E3D13]/20 bg-white p-3.5 text-center">
              <Image
                src={`/qualent/qr/${prospect.slug}.png`}
                alt="Código QR para abrir la conversación de prueba"
                width={330}
                height={330}
                className="size-[132px]"
              />
              <span className="mt-2.5 block max-w-[132px] font-mono text-[9.5px] uppercase leading-snug tracking-wider text-[#5A7226]">
                Escanee para probar desde su teléfono
              </span>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Sobre ustedes — the one band in their colour ---------- */}
      <section
        className="border-t-4 py-10 sm:py-11"
        style={{ background: brand.pop, borderTopColor: brand.ink }}
      >
        <Container>
          <div className="mb-7 flex flex-wrap items-center gap-x-5 gap-y-4">
            <span
              className="whitespace-nowrap rounded px-3 py-1.5 font-mono text-[10.5px] uppercase tracking-[.17em]"
              style={{ background: brand.ink, color: onInk }}
            >
              Sobre ustedes
            </span>
            <AddresseeCard prospect={prospect} />
          </div>

          <h2
            className="text-2xl font-extrabold tracking-tight sm:text-[25px]"
            style={{ color: onPop }}
          >
            Lo que vimos públicamente
          </h2>
          <p
            className="mb-6 mt-1.5 max-w-[58ch] text-[14.5px] opacity-90"
            style={{ color: onPop }}
          >
            Antes de escribirles revisamos sus vacantes activas y sus canales de
            reclutamiento.
          </p>

          <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3">
            {prospect.signals.map((s, i) => (
              <div
                key={i}
                className="border-l-[5px] bg-white p-4"
                style={{ borderLeftColor: brand.ink }}
              >
                <p className="text-[13.5px] leading-relaxed text-neutral-900">
                  {s.observation}
                </p>
                <span className="mt-2.5 block font-mono text-[10px] uppercase tracking-wide text-neutral-500">
                  {s.source}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {prospect.highTurnoverRoles.map((r) => (
              <span
                key={r}
                className="rounded-full border px-3 py-1.5 text-[12.5px]"
                style={{
                  background: cardTint,
                  borderColor: isLight(brand.pop) ? `${brand.ink}44` : "rgba(255,255,255,.34)",
                  color: isLight(brand.pop) ? brand.ink : "#FFFFFF",
                }}
              >
                {r}
              </span>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- Por qué encaja — the personalised argument ---------- */}
      <section className="bg-white py-10">
        <Container size="small">
          <h2 className="text-2xl font-extrabold tracking-tight text-[#2E3D13] sm:text-[26px]">
            Por qué esto encaja con {prospect.name}
          </h2>
          <div className="mt-5 space-y-4">
            {prospect.prose.fitParagraphs.map((para, i) => (
              <p key={i} className="text-[15.5px] leading-relaxed text-neutral-700">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* ---------- De manual a automático — only where WhatsApp already exists ---------- */}
      {autoIntro && (
        <section className="border-t border-[#2E3D13]/15 bg-white py-10">
          <Container>
            <span className="mb-2.5 block font-mono text-[10.5px] uppercase tracking-[.17em] text-[#709030]">
              {autoIntro.kicker}
            </span>
            <h2 className="text-2xl font-extrabold tracking-tight text-[#2E3D13] sm:text-[26px]">
              De manual a automático
            </h2>
            <p className="mb-6 mt-1.5 max-w-[60ch] text-[14.5px] text-[#5A6B45]">
              {autoIntro.sub}
            </p>

            <div className="grid border-t border-[#2E3D13]/15 sm:grid-cols-2 sm:gap-x-7">
              <div className="border-b border-[#2E3D13]/15 pb-2.5 pt-3 font-mono text-[10px] uppercase tracking-[.15em] text-[#96794A]">
                Hoy
              </div>
              <div className="hidden border-b border-[#2E3D13]/15 pb-2.5 pt-3 font-mono text-[10px] uppercase tracking-[.15em] text-[#709030] sm:block">
                Con Qualent
              </div>
              {AUTOMATION_ROWS.map(([now, next]) => (
                <div key={now} className="contents">
                  <div className="border-b border-[#2E3D13]/10 py-2.5 text-sm leading-relaxed text-[#7A6A52]">
                    {now}
                  </div>
                  <div className="flex gap-2.5 border-b border-[#2E3D13]/10 py-2.5 text-sm font-medium leading-relaxed text-[#2E3D13]">
                    <span className="shrink-0 font-bold text-[#709030]">→</span>
                    {next}
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ---------- Close ---------- */}
      <section id="conversacion" className="scroll-mt-20 bg-[#2E3D13] py-12">
        <Container>
          <div className="grid gap-9 lg:grid-cols-[1fr_.8fr]">
            <div>
              <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-[27px]">
                Una conversación de 30 minutos
              </h2>
              <p className="mt-3.5 max-w-[46ch] text-[15.5px] leading-relaxed text-[#B9D4BD]">
                Sin presentación de ventas. Revisamos su proceso actual de
                contratación operativa, calculamos qué parte del costo es atacable
                y, si tiene sentido, definimos un piloto. Si no lo tiene, se los
                decimos.
              </p>
              <p className="mt-3.5 max-w-[46ch] text-[15.5px] leading-relaxed text-[#B9D4BD]">
                No cobramos por licencia ni por usuario: el precio es una parte del
                ahorro que la plataforma genera. Ustedes se quedan con la mitad del
                valor creado.
              </p>
              <a
                href="mailto:john@picklellama.studio?subject=Qualent%20—%20conversación%20inicial"
                className="mt-6 inline-block rounded-md bg-white px-6 py-3.5 text-[15px] font-bold text-[#2E3D13]"
              >
                Escribir a PickleLlama →
              </a>
            </div>
            <div className="border-l-2 border-white/25 pl-4">
              <h3 className="mb-2.5 text-[13px] font-bold text-white">
                Lo que esto no resuelve
              </h3>
              <ul className="space-y-2">
                {NOT_SOLVED.map((n) => (
                  <li key={n} className="text-[12.5px] leading-relaxed text-[#9CBBA2]">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* ---------- Trust ---------- */}
      <section className="border-t border-black/10 bg-[#F4F5F3] py-7">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[1fr_1.15fr]">
            <div>
              <div className="mb-3 flex items-center gap-2.5">
                <Image src="/logo-square.png" alt="" width={80} height={80} className="size-[34px]" />
                <b className="text-sm font-extrabold text-neutral-900">
                  PickleLlama Studio
                </b>
              </div>
              <h4 className="mb-2 text-[14.5px] font-bold text-neutral-900">
                Quién les escribe
              </h4>
              <p className="text-[13px] leading-relaxed text-neutral-600">
                Somos un estudio de software en Mérida. Desarrollamos Qualent y hoy
                lo operamos para contratación operativa de alto volumen en México.
                Escríbannos a{" "}
                <a href="mailto:john@picklellama.studio" className="font-semibold text-[#1E6B29]">
                  john@picklellama.studio
                </a>{" "}
                o revisen quiénes somos en{" "}
                <a href="https://picklellama.studio" className="font-semibold text-[#1E6B29]">
                  picklellama.studio
                </a>
                .
              </p>
            </div>
            <div>
              <h4 className="mb-2 text-[14.5px] font-bold text-neutral-900">
                Sobre esta página
              </h4>
              <p className="border-l-2 border-neutral-300 pl-3 text-xs leading-relaxed text-neutral-600">
                Esta propuesta la preparó PickleLlama Studio y vive en nuestro
                dominio. No estamos afiliados a {prospect.legalName ?? prospect.name}{" "}
                ni actuamos en su nombre; su logotipo aparece únicamente para
                identificar a quién va dirigida. Nunca les pediremos contraseñas,
                datos bancarios ni pagos por este medio. La información citada
                proviene de fuentes públicas consultadas en agosto de 2026.
              </p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
