import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/layout";
import { getAllContent } from "@/lib/content";
import { PreviewToggle } from "./preview-toggle";
import type { ContentItem } from "@/lib/content";
import type { Metadata } from "next";

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Proof" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

/** Maps `band_color` frontmatter values to Tailwind classes. */
const BAND_COLORS: Record<string, string> = {
  green: "bg-emerald-600",
  acid: "bg-lime-400",
  warm: "bg-amber-300",
  dark: "bg-slate-900",
};

/** Maps `card_size` to grid span classes — simplified to 2-col + full-width. */
const CARD_SPANS: Record<string, string> = {
  featured: "col-span-12",
  wide: "col-span-12",
  side: "col-span-12 md:col-span-6",
  mid: "col-span-12 md:col-span-6",
};

const DEFAULT_CARD_SPAN = "col-span-12 md:col-span-6";

// ---------------------------------------------------------------------------
// Card component (server, inline)
// ---------------------------------------------------------------------------

interface CardProps {
  study: ContentItem;
  readLabel: string;
  previewOpenLabel: string;
  previewCloseLabel: string;
}

/** A single portfolio card rendered inside the 12-column grid. */
/** Renders the accent band at the top of each card. */
function AccentBand({ color }: { color?: string }) {
  if (color === "stripe") {
    return (
      <div
        className="h-[7px] w-full"
        style={{
          background:
            "repeating-linear-gradient(90deg, #059669 0px, #059669 12px, #a3e635 12px, #a3e635 24px)",
        }}
      />
    );
  }
  return (
    <div
      className={`h-[7px] w-full ${BAND_COLORS[color ?? ""] ?? "bg-emerald-600"}`}
    />
  );
}

/** Renders metrics, tags, and footer — shared between card layouts. */
function CardContent({
  meta,
  slug,
  readLabel,
  previewOpenLabel,
  previewCloseLabel,
}: {
  meta: ContentItem["meta"];
  slug: string;
  readLabel: string;
  previewOpenLabel: string;
  previewCloseLabel: string;
}) {
  return (
    <>
      {/* Metrics row */}
      {meta.metrics && meta.metrics.length > 0 && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 border-t border-stone-100 pt-4">
          {meta.metrics.map((m) => (
            <div key={m.label} className="flex flex-col">
              <span className="text-xl font-bold tracking-tight text-slate-900">
                {m.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-stone-400">
                {m.label}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Tech tags */}
      {meta.tags && meta.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {meta.tags.map((tag) => {
            const isHighlighted = meta.tags_highlight?.includes(tag);
            return (
              <span
                key={tag}
                className={`inline-block rounded-full px-2.5 py-0.5 font-mono text-[11px] font-medium ${
                  isHighlighted
                    ? "bg-lime-300 text-slate-900"
                    : "bg-stone-100 text-stone-500"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>
      )}

      {/* Footer */}
      <div className="mt-auto flex items-center justify-between border-t border-stone-100 pt-4">
        <span className="font-mono text-xs tracking-wide text-stone-400">
          {meta.client ?? ""}
        </span>
        <Link
          href={`/proof/${slug}`}
          className="inline-flex items-center gap-1 text-sm font-semibold text-slate-900 transition-colors hover:text-emerald-600"
        >
          {readLabel}
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Preview toggle (client component) */}
      {meta.preview_url && (
        <PreviewToggle
          url={meta.preview_url}
          openLabel={previewOpenLabel}
          closeLabel={previewCloseLabel}
        />
      )}
    </>
  );
}

/** A single portfolio card rendered inside the grid. */
function ProofCard({
  study,
  readLabel,
  previewOpenLabel,
  previewCloseLabel,
}: CardProps) {
  const { meta, slug } = study;
  const spanClass = CARD_SPANS[meta.card_size ?? ""] ?? DEFAULT_CARD_SPAN;
  const isFullWidth =
    meta.card_size === "featured" || meta.card_size === "wide";

  return (
    <article className={`${spanClass} group flex flex-col`}>
      <div className="flex flex-1 flex-col overflow-hidden rounded-xl border border-stone-200 bg-white shadow-sm transition-shadow hover:shadow-md">
        <AccentBand color={meta.band_color} />

        {isFullWidth ? (
          /* ---- Full-width horizontal layout ---- */
          <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6 md:flex-row md:gap-8">
            {/* Left: text */}
            <div className="flex flex-1 flex-col gap-3">
              {meta.industry && (
                <span className="inline-block self-start font-mono text-[11px] font-semibold uppercase tracking-widest text-stone-400">
                  {meta.industry}
                </span>
              )}
              <h3 className="text-xl font-bold leading-snug tracking-tight text-slate-900 sm:text-2xl">
                {meta.title}
              </h3>
              <p className="text-sm leading-relaxed text-stone-500">
                {meta.description}
              </p>
            </div>
            {/* Right: metrics + tags + footer */}
            <div className="flex flex-col gap-4 md:w-72 md:shrink-0 md:border-l md:border-stone-100 md:pl-8">
              <CardContent
                meta={meta}
                slug={slug}
                readLabel={readLabel}
                previewOpenLabel={previewOpenLabel}
                previewCloseLabel={previewCloseLabel}
              />
            </div>
          </div>
        ) : (
          /* ---- Standard vertical card layout ---- */
          <div className="flex flex-1 flex-col gap-4 p-5 sm:p-6">
            {meta.industry && (
              <span className="inline-block self-start font-mono text-[11px] font-semibold uppercase tracking-widest text-stone-400">
                {meta.industry}
              </span>
            )}
            <h3 className="text-lg font-bold leading-snug tracking-tight text-slate-900 sm:text-xl">
              {meta.title}
            </h3>
            <p className="text-sm leading-relaxed text-stone-500">
              {meta.description}
            </p>
            <CardContent
              meta={meta}
              slug={slug}
              readLabel={readLabel}
              previewOpenLabel={previewOpenLabel}
              previewCloseLabel={previewCloseLabel}
            />
          </div>
        )}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function ProofPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Proof");

  const caseStudies = getAllContent("case-studies");

  return (
    <>
      {/* ----------------------------------------------------------------- */}
      {/* Hero                                                              */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-stone-50 pb-16 pt-24 md:pb-20 md:pt-32">
        <Container size="large">
          <div className="mx-auto max-w-3xl text-center">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center justify-center gap-3">
              <span className="inline-block h-px w-8 bg-emerald-600" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-emerald-600">
                {t("heroEyebrow")}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
              {t.rich("heroHeading", {
                green: (chunks) => (
                  <span className="text-emerald-600">{chunks}</span>
                ),
              })}
            </h1>

            {/* Subtitle */}
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-stone-500">
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Stats strip                                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="border-b border-stone-200 bg-white">
        <Container size="large">
          <div className="grid grid-cols-1 divide-y divide-stone-200 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {[
              {
                num: t("statProjectsNum"),
                label: t("statProjectsLabel"),
              },
              {
                num: t("statCostNum"),
                label: t("statCostLabel"),
              },
              {
                num: t("statRoiNum"),
                label: t("statRoiLabel"),
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center gap-1 px-6 py-8 text-center"
              >
                <span className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
                  {stat.num}
                </span>
                <span className="font-mono text-xs font-medium uppercase tracking-widest text-stone-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Section header                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white pt-20">
        <Container size="large">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              {t("sectionTitle")}
            </h2>
            <p className="max-w-sm text-sm leading-relaxed text-stone-400">
              {t("sectionNote")}
            </p>
          </div>
          <div className="mt-6 h-px w-full bg-stone-200" />
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Card grid                                                         */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-white pb-24 pt-10">
        <Container size="large">
          <div className="grid grid-cols-12 gap-5">
            {caseStudies.map((study) => (
              <ProofCard
                key={study.slug}
                study={study}
                readLabel={t("readCaseStudyButton")}
                previewOpenLabel={t("previewToggleOpen")}
                previewCloseLabel={t("previewToggleClose")}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Dark CTA block                                                    */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-slate-900 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
              {t("ctaHeading")}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-slate-400">
              {t("ctaDescription")}
            </p>
            <Link
              href="/talk"
              className="mt-8 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              {t("ctaButton")}
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
