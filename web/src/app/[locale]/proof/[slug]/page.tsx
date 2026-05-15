import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Building2,
  TrendingUp,
  Factory,
} from "lucide-react";

import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { MDXContent } from "@/components/mdx";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { PreviewToggle } from "./preview-toggle";

/** Props for the case study page, following Next.js 15 async params pattern. */
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

/** Band color mappings for the decorative accent stripe on the hero. */
const BAND_COLOR_MAP: Record<string, string> = {
  green: "from-emerald-500 to-emerald-600",
  acid: "from-lime-400 to-lime-500",
  warm: "from-amber-400 to-orange-500",
  dark: "from-stone-700 to-stone-900",
  stripe: "from-indigo-500 to-violet-600",
};

export async function generateStaticParams() {
  const slugs = getAllSlugs("case-studies");
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "ProofSlug" });
  const caseStudy = getContentBySlug("case-studies", slug);

  if (!caseStudy) {
    return {
      title: t("metaNotFoundTitle"),
    };
  }

  return {
    title: `${caseStudy.meta.title} ${t("metaTitleSuffix")}`,
    description: caseStudy.meta.description,
    openGraph: {
      title: caseStudy.meta.title,
      description: caseStudy.meta.description,
      type: "article",
      publishedTime: caseStudy.meta.date,
    },
  };
}

/**
 * Individual case study page with rich layout including hero section,
 * metrics strip, live site preview, MDX content, and call-to-action.
 */
export default async function CaseStudyPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ProofSlug");

  const caseStudy = getContentBySlug("case-studies", slug);

  if (!caseStudy) {
    notFound();
  }

  const { meta, content, readingTime: readTime } = caseStudy;
  const hasMetrics = meta.metrics && meta.metrics.length > 0;
  const hasPreview = Boolean(meta.preview_url);
  const hasTags = meta.tags && meta.tags.length > 0;
  const highlightSet = new Set(meta.tags_highlight ?? []);
  const bandGradient =
    BAND_COLOR_MAP[meta.band_color ?? "green"] ?? BAND_COLOR_MAP.green;

  return (
    <article>
      {/* ----------------------------------------------------------------- */}
      {/* Decorative band accent                                            */}
      {/* ----------------------------------------------------------------- */}
      <div
        className={`h-1 w-full bg-gradient-to-r ${bandGradient}`}
        aria-hidden="true"
      />

      {/* ----------------------------------------------------------------- */}
      {/* Hero Section                                                      */}
      {/* ----------------------------------------------------------------- */}
      <section className="bg-stone-50 pb-12 pt-10 dark:bg-stone-950">
        <Container size="small">
          {/* Back link */}
          <Link
            href="/proof"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
            {t("backLink")}
          </Link>

          {/* Industry tag */}
          {meta.industry && (
            <div className="mb-4 flex items-center gap-2">
              <Factory className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                {meta.industry}
              </span>
            </div>
          )}

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {meta.title}
          </h1>

          {/* Description */}
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
            {meta.description}
          </p>

          {/* Metadata row */}
          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-xs text-muted-foreground">
            {meta.client && (
              <div className="flex items-center gap-1.5">
                <Building2 className="h-3.5 w-3.5" />
                <span>{meta.client}</span>
              </div>
            )}
            {meta.industry && (
              <div className="flex items-center gap-1.5">
                <Factory className="h-3.5 w-3.5" />
                <span>{meta.industry}</span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              <span>
                {new Date(meta.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                })}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              <span>{readTime}</span>
            </div>
          </div>

          {/* Result badge */}
          {meta.result && (
            <div className="mt-6 inline-flex items-center gap-2 rounded-lg bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              <TrendingUp className="h-4 w-4" />
              {meta.result}
            </div>
          )}
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Metrics Strip                                                     */}
      {/* ----------------------------------------------------------------- */}
      {hasMetrics && (
        <section className="border-b border-t border-border bg-background">
          <Container>
            <div className="grid grid-cols-2 divide-x divide-border sm:grid-cols-3 lg:grid-cols-4">
              {meta.metrics!.map((metric) => (
                <div
                  key={metric.label}
                  className="px-4 py-6 text-center sm:px-6 sm:py-8"
                >
                  <p className="text-2xl font-bold tracking-tight sm:text-3xl">
                    {metric.value}
                  </p>
                  <p className="mt-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Live Preview                                                      */}
      {/* ----------------------------------------------------------------- */}
      {hasPreview && (
        <section className="bg-stone-50 py-10 dark:bg-stone-950">
          <Container>
            <PreviewToggle
              previewUrl={meta.preview_url!}
              liveUrl={meta.live_url}
              viewLiveSiteLabel={t("viewLiveSite")}
            />
          </Container>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* MDX Content                                                       */}
      {/* ----------------------------------------------------------------- */}
      <section className="py-12 sm:py-16">
        <Container size="small">
          <div className="prose prose-neutral dark:prose-invert mx-auto max-w-none">
            <MDXContent source={content} />
          </div>
        </Container>
      </section>

      {/* ----------------------------------------------------------------- */}
      {/* Tech Tags                                                         */}
      {/* ----------------------------------------------------------------- */}
      {hasTags && (
        <section className="border-t border-border py-10">
          <Container size="small">
            <h2 className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {t("techLabel")}
            </h2>
            <div className="flex flex-wrap gap-2">
              {meta.tags!.map((tag) => {
                const isHighlighted = highlightSet.has(tag);
                return (
                  <span
                    key={tag}
                    className={
                      isHighlighted
                        ? "rounded-full bg-lime-300 px-3 py-1 text-xs font-medium text-lime-900 dark:bg-lime-400 dark:text-lime-950"
                        : "rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                    }
                  >
                    {tag}
                  </span>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* CTA                                                               */}
      {/* ----------------------------------------------------------------- */}
      <section className="border-t border-border bg-stone-50 py-16 dark:bg-stone-950">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight">
              {t("ctaHeading")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                {t("ctaButton")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </article>
  );
}
