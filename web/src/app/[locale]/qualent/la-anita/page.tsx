import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import type { Metadata, Viewport } from "next";
import {
  ArrowRight,
  BadgeCheck,
  CalendarCheck,
  ChevronDown,
  MapPinned,
  MessageCircle,
  MessageSquareOff,
  UserCheck,
} from "lucide-react";
import { Container } from "@/components/layout";
import { getProspect } from "@/lib/qualent-prospects";
import { DemoThread } from "../[empresa]/demo-thread";
import { WhatsAppIcon } from "../_components/whatsapp-icon";
import { StickyCta } from "./sticky-cta";
import styles from "./la-anita.module.css";

/*
 * Standalone landing for La Anita, reached from the QR on the cake we sent.
 * Almost every visit is a phone, from someone who does not know us and will
 * give it a few seconds: one idea per section, one CTA, no site chrome
 * (see STANDALONE_PATHS in components/layout/site-chrome.tsx).
 *
 * This static route takes precedence over ../[empresa] for this slug; the
 * demo conversation still comes from the shared prospect data.
 */

/** Number that answers the CTA, digits only with country code (e.g. 5219991234567). */
const WHATSAPP_NUMBER = "[NÚMERO_WHATSAPP]";
const WHATSAPP_TEXT = "Hola, quiero probar Qualent con las vacantes de La Anita";
const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_TEXT)}`;
const CTA_LABEL = "Probarlo por WhatsApp";

const MAIL_LINK = `mailto:john@picklellama.studio?subject=${encodeURIComponent(
  "Qualent — conversación inicial"
)}`;

/*
 * Proof band (section 5). Hidden until there is a real case or figure to
 * show — never fill it with placeholder numbers.
 */
const SHOW_PROOF = false;
const PROOF: { figure: string; caption: string; source: string } | null = null;

const SLUG = "la-anita";

export function generateStaticParams() {
  return [{ locale: "es" }];
}

export const viewport: Viewport = {
  themeColor: "#2E3D13",
};

export async function generateMetadata(): Promise<Metadata> {
  const prospect = getProspect(SLUG);
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

const STATS = [
  { value: "Menos de 30 s", label: "primera respuesta" },
  { value: "24/7", label: "sin turno de RRHH" },
  { value: "INE, CURP y licencia", label: "validadas automáticamente" },
];

const STEPS = [
  {
    icon: MessageCircle,
    title: "El candidato escribe por WhatsApp.",
    text: "Responde en segundos y en español sobre la vacante que le interesa. Sin apps ni formularios.",
  },
  {
    icon: BadgeCheck,
    title: "Qualent lo califica y valida.",
    text: "Pregunta lo que importa del puesto, pide INE, CURP y licencia, y los lee y verifica automáticamente.",
  },
  {
    icon: CalendarCheck,
    title: "Se agenda la entrevista.",
    text: "En la plaza que le corresponde. RRHH recibe solo candidatos completos.",
  },
];

const BENEFITS = [
  { icon: MessageSquareOff, text: "Menos mensajes repetitivos que atender en Facebook y grupos." },
  { icon: MapPinned, text: "El mismo proceso en todas las plazas." },
  { icon: UserCheck, text: "Candidatos completos, no conversaciones a medias." },
];

const NOT_SOLVED = [
  "Estudios socioeconómicos y verificación de antecedentes.",
  "Exámenes médicos de ingreso (obligatorios y presenciales).",
  "Costos de capacitación.",
  "La rotación en sí: es compensación y operación, no software.",
];

/** The one primary action on the page. Every instance is observed by StickyCta. */
function PrimaryCta({ className = "" }: { className?: string }) {
  return (
    <a
      href={WHATSAPP_LINK}
      target="_blank"
      rel="noopener noreferrer"
      data-primary-cta
      className={`group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-xl bg-[#ECF28F] px-7 text-[17px] font-bold text-[#1F2A0C] shadow-[0_10px_30px_-10px_rgba(236,242,143,.55)] transition-colors hover:bg-white focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-white sm:w-auto ${className}`}
    >
      <WhatsAppIcon className="size-[22px] shrink-0" />
      {CTA_LABEL}
      <ArrowRight
        aria-hidden="true"
        className="size-[18px] shrink-0 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
      />
    </a>
  );
}

function ProofSection({ figure, caption, source }: { figure: string; caption: string; source: string }) {
  return (
    <section aria-label="Resultados" className="bg-white py-16 sm:py-20">
      <Container>
        <figure className={`${styles.reveal} mx-auto max-w-2xl text-center`}>
          <p className="text-[clamp(3rem,2rem+5vw,5.5rem)] font-bold leading-none tracking-tight text-[#2E3D13]">
            {figure}
          </p>
          <figcaption className="mt-4 text-lg text-[#3F5218]">
            {caption}
            <span className="mt-2 block font-mono text-xs uppercase tracking-wider text-[#5A7226]">
              {source}
            </span>
          </figcaption>
        </figure>
      </Container>
    </section>
  );
}

export default async function LaAnitaPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const prospect = getProspect(SLUG);
  if (!prospect) notFound();
  // These pages exist in Spanish only.
  if (locale !== "es") redirect(`/es/qualent/${SLUG}`);

  const position = prospect.tryIt.positionTitle;

  return (
    <div className="flex flex-col bg-[#2E3D13]">
      {/* ================= 1 · Hero ================= */}
      <section className="relative isolate overflow-hidden bg-[#2E3D13] text-white">
        {/* A soft glow in Qualent green for depth */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_85%_10%,rgba(112,144,48,.45),transparent_65%)]"
        />

        <Container>
          <header className="flex items-center justify-between gap-4 py-4 sm:py-6">
            <Image
              src="/qualent/qualent-logo-white.png"
              alt="Qualent"
              width={2535}
              height={693}
              priority
              sizes="120px"
              className="h-7 w-auto sm:h-8"
            />
            <span className="hidden items-center gap-2 text-[13px] text-[#C6D9A8] sm:flex">
              <Image src="/logo-square.png" alt="" width={64} height={64} sizes="20px" className="size-5" />
              un producto de PickleLlama Studio
            </span>
          </header>

          <div className="grid gap-10 pb-14 pt-5 sm:pb-20 sm:pt-12 lg:grid-cols-[1.45fr_1fr] lg:items-end lg:gap-20 lg:pb-28 lg:pt-20">
            <div>
              <p
                className={`${styles.enter} mb-5 text-[12.5px] leading-snug tracking-wide text-[#C6D9A8] sm:text-[13px]`}
              >
                <span className="font-semibold text-[#ECF28F]">Preparado para La Anita</span>
                <span aria-hidden="true"> · </span>
                <span className="whitespace-nowrap">un producto de PickleLlama Studio</span>
              </p>

              <h1 className="text-[2.4rem] font-bold leading-[1.04] tracking-[-0.03em] text-balance sm:text-[3.4rem] lg:text-[4.3rem]">
                Cada candidato llega con toda su información.{" "}
                <span className="block text-[#ECF28F]">RRHH sólo tiene que entrevistar.</span>
              </h1>

              <p
                className={`${styles.enter} mt-5 max-w-[34ch] text-[17px] leading-[1.45] text-[#C6D9A8] sm:mt-6 sm:text-xl`}
                style={{ "--delay": "120ms" } as React.CSSProperties}
              >
                Qualent atiende, califica y agenda por WhatsApp a cada candidato, en cualquier
                plaza y a cualquier hora.
              </p>

              <div
                className={`${styles.enter} mt-7 sm:mt-9`}
                style={{ "--delay": "220ms" } as React.CSSProperties}
              >
                <PrimaryCta />
                <p className="mt-3 max-w-[40ch] text-[13px] leading-snug text-[#A9C77E]">
                  Sí, el QR venía en un pastel. Esto es lo que queríamos que conocieran.
                </p>
              </div>
            </div>

            <ul
              className={`${styles.enter} grid border-t border-white/15 sm:grid-cols-3 lg:grid-cols-1`}
              style={{ "--delay": "340ms" } as React.CSSProperties}
            >
              {STATS.map((s) => (
                <li
                  key={s.label}
                  className="flex items-baseline justify-between gap-4 border-b border-white/15 py-3.5 sm:block sm:border-b-0 sm:py-5 sm:pr-4 lg:border-b lg:py-5"
                >
                  <span className="block text-[19px] font-bold leading-tight tracking-tight text-white sm:text-2xl lg:text-[1.9rem]">
                    {s.value}
                  </span>
                  <span className="block shrink-0 text-right text-[13px] text-[#A9C77E] sm:mt-1 sm:text-left sm:text-sm">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ================= 2 · Cómo funciona ================= */}
      <section aria-labelledby="funciona" className="bg-[#F6F8EA] py-16 text-[#2E3D13] sm:py-24">
        <Container>
          <h2
            id="funciona"
            className={`${styles.reveal} text-[2.1rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl`}
          >
            Así funciona
          </h2>

          <ol className="mt-10 grid gap-10 sm:mt-14 md:grid-cols-3 md:gap-8">
            {STEPS.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className={`${styles.reveal} relative`}>
                <div className="flex items-center gap-4">
                  <span className="grid size-14 shrink-0 place-items-center rounded-2xl bg-[#2E3D13] text-[#ECF28F]">
                    <Icon aria-hidden="true" className="size-7" strokeWidth={1.9} />
                  </span>
                  <span
                    aria-hidden="true"
                    className="font-[family-name:var(--font-oswald)] text-[2.6rem] font-semibold leading-none text-[#709030]/45"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* connector to the next step, desktop only */}
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="hidden h-px flex-1 border-t-[1.5px] border-dashed border-[#709030]/40 md:block"
                    />
                  )}
                </div>
                <h3 className="mt-5 text-[21px] font-bold leading-snug tracking-tight">
                  <span className="sr-only">Paso {i + 1}: </span>
                  {title}
                </h3>
                <p className="mt-2 max-w-[38ch] text-[16px] leading-[1.5] text-[#3F5218]">{text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* ================= 3 · Demo ================= */}
      <section aria-labelledby="demo" className="bg-[#2E3D13] py-16 text-white sm:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:gap-x-20 lg:gap-y-8">
            <div className={`${styles.reveal} lg:self-end`}>
              <h2
                id="demo"
                className="text-[2.1rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl"
              >
                Así lo vería un candidato
              </h2>
              <p className="mt-4 font-mono text-[12px] uppercase leading-relaxed tracking-[.12em] text-[#A9C77E]">
                Conversación real del sistema · vacante de {position}
              </p>
            </div>

            {/* The phone */}
            <div className="mx-auto w-full max-w-[380px] lg:col-start-2 lg:row-span-2 lg:row-start-1">
              <div className="h-[560px] overflow-hidden rounded-[34px] border-[7px] border-[#10160A] bg-[#10160A] shadow-[0_30px_80px_-30px_rgba(0,0,0,.7)] ring-1 ring-white/10 sm:h-[620px]">
                <div className="h-full overflow-hidden rounded-[27px]">
                  <DemoThread thread={prospect.thread} position={position} variant="whatsapp" />
                </div>
              </div>
            </div>

            <div className={`${styles.reveal} lg:self-start`}>
              <p className="max-w-[30ch] text-[21px] font-semibold leading-snug sm:text-2xl">
                ¿Quieren verlo con sus propias vacantes?
              </p>
              <p className="mt-3 max-w-[40ch] text-[17px] leading-normal text-[#C6D9A8]">
                Las cargamos y les abrimos una conversación de prueba.
              </p>
              <p className="mt-3 flex max-w-[44ch] gap-2.5 text-[15px] leading-snug text-[#A9C77E]">
                <BadgeCheck aria-hidden="true" className="mt-px size-[18px] shrink-0" />
                Sin instalar nada: corre en el WhatsApp que ya usan.
              </p>
              <PrimaryCta className="mt-8" />
            </div>
          </div>
        </Container>
      </section>

      {/* ================= 4 · Por qué conviene ================= */}
      <section aria-labelledby="precio" className="bg-[#F6F8EA] py-16 text-[#2E3D13] sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
            <div className={styles.reveal}>
              <h2
                id="precio"
                className="max-w-[16ch] text-[2.1rem] font-bold leading-[1.05] tracking-[-0.02em] text-balance sm:text-5xl"
              >
                El precio sale del ahorro, no de una licencia
              </h2>
              <p className="mt-6 max-w-[46ch] text-[17px] leading-[1.55] text-[#3F5218] sm:text-lg">
                Sin cobro por licencia ni por usuario. Nuestro precio es una parte del ahorro que
                Qualent genere, y{" "}
                <span className={`${styles.mark} font-semibold text-[#2E3D13]`}>
                  ustedes se quedan con la mitad del valor creado.
                </span>
              </p>
            </div>

            <ul className="grid content-start gap-3 lg:pt-2">
              {BENEFITS.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className={`${styles.reveal} flex items-center gap-4 rounded-2xl bg-white p-4 shadow-[0_1px_0_rgba(46,61,19,.08),0_8px_24px_-16px_rgba(46,61,19,.35)] sm:p-5`}
                >
                  <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-[#E8EDCF] text-[#4A6218]">
                    <Icon aria-hidden="true" className="size-[22px]" strokeWidth={1.9} />
                  </span>
                  <span className="text-[16px] font-semibold leading-snug">{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* ================= 5 · Prueba (hidden until there is a real case) ================= */}
      {SHOW_PROOF && PROOF && <ProofSection {...PROOF} />}

      {/* ================= 6 · Cierre ================= */}
      <section aria-labelledby="cierre" className="bg-[#2E3D13] py-16 text-white sm:py-24">
        <Container>
          <div className={`${styles.reveal} mx-auto max-w-2xl sm:text-center`}>
            <h2
              id="cierre"
              className="text-[2.1rem] font-bold leading-[1.05] tracking-[-0.02em] sm:text-5xl"
            >
              Una conversación de 30 minutos
            </h2>
            <p className="mt-5 text-[17px] leading-[1.55] text-[#C6D9A8] sm:mx-auto sm:max-w-[52ch] sm:text-lg">
              Sin presentación de ventas. Revisamos cómo contratan hoy, calculamos cuánto se puede
              ahorrar y, si tiene sentido, definimos un piloto. Si no lo tiene, se los decimos.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:items-center">
              <PrimaryCta />
              <a
                href={MAIL_LINK}
                className="inline-flex min-h-11 items-center justify-center text-[15px] text-[#C6D9A8] underline decoration-white/30 underline-offset-4 hover:text-white hover:decoration-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                O agenden 30 minutos por correo
              </a>
            </div>

            <details className="group mt-12 rounded-2xl border border-white/15 text-left open:bg-white/[.04]">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-5 text-[16px] font-semibold marker:hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white [&::-webkit-details-marker]:hidden">
                Lo que Qualent no resuelve
                <ChevronDown
                  aria-hidden="true"
                  className="size-5 shrink-0 text-[#A9C77E] transition-transform group-open:rotate-180 motion-reduce:transition-none"
                />
              </summary>
              <ul className="space-y-2.5 px-5 pb-5">
                {NOT_SOLVED.map((n) => (
                  <li key={n} className="flex gap-3 text-[15px] leading-snug text-[#C6D9A8]">
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-[#A9C77E]" />
                    {n}
                  </li>
                ))}
              </ul>
            </details>
          </div>
        </Container>
      </section>

      {/* ================= 7 · Footer mínimo ================= */}
      <footer className="bg-[#F4F5EE] pb-28 pt-12 text-[#3A3A38] md:pb-12">
        <Container>
          <div className="grid gap-8 md:grid-cols-[1fr_1.1fr] md:gap-16">
            <div>
              <p className="flex items-center gap-2.5 text-[15px] font-bold text-[#231F20]">
                <Image src="/logo-square.png" alt="" width={80} height={80} sizes="32px" className="size-8" />
                PickleLlama Studio
              </p>
              <p className="mt-3 max-w-[44ch] text-[15px] leading-relaxed text-[#5E5F5A]">
                Somos un estudio de software en Mérida. Desarrollamos y operamos Qualent.
              </p>
              <a
                href="mailto:john@picklellama.studio"
                className="mt-2 inline-flex min-h-11 items-center text-[15px] font-semibold text-[#4B5E33] underline decoration-[#4B5E33]/30 underline-offset-4 hover:decoration-[#4B5E33] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4B5E33]"
              >
                john@picklellama.studio
              </a>
            </div>
            <p className="self-end text-[12.5px] leading-relaxed text-[#5E5F5A] md:border-l md:border-[#D3D6D2] md:pl-6">
              Nunca les pediremos contraseñas, datos bancarios ni pagos por este medio. No estamos
              afiliados a La Anita Condimentos y Salsas; su nombre aparece solo para indicar a quién
              va dirigida esta propuesta.
            </p>
          </div>
        </Container>
      </footer>

      <StickyCta href={WHATSAPP_LINK} label={CTA_LABEL} />
    </div>
  );
}
