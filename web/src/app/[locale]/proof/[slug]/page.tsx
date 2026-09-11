import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Clock } from "lucide-react";

import { Container } from "@/components/layout";
import { Eyebrow, Figure } from "@/components/brand";
import { CTA } from "@/components/page";
import { MDXContent } from "@/components/mdx";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { routing } from "@/i18n/routing";
import { PreviewToggle } from "./preview-toggle";

/** Props for the case study page, following Next.js 15 async params pattern. */
interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}



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

  return (
    <article>
      {/* Hero */}
      <section className="border-b border-border bg-paper pb-12 pt-10">
        <Container size="small">
          <Link
            href="/proof"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            {t("backLink")}
          </Link>

          {meta.industry ? <Eyebrow>{meta.industry}</Eyebrow> : null}

          <h1 className="mt-3 text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold leading-snug tracking-[-0.015em] text-balance">
            {meta.title}
          </h1>

          <p className="pl-lede mt-4 max-w-[66ch] text-ink-muted">{meta.description}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13px] text-ink-faint">
            {meta.client ? <span>{meta.client}</span> : null}
            <span>
              {new Date(meta.date).toLocaleDateString(
                locale === "es" ? "es-MX" : "en-US",
                { year: "numeric", month: "long" }
              )}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="size-3.5" />
              {readTime}
            </span>
          </div>

          {meta.result ? (
            <p className="mt-6 inline-flex items-center rounded-md bg-lime-soft px-3.5 py-2 text-[15px] font-semibold text-pickle-deep">
              {meta.result}
            </p>
          ) : null}
        </Container>
      </section>

      {/* Metrics — the numbers do the talking */}
      {hasMetrics && (
        <section className="border-b border-border bg-white">
          <Container>
            <div className="grid grid-cols-2 gap-6 py-8 sm:grid-cols-3 lg:grid-cols-4">
              {meta.metrics!.map((metric) => (
                <Figure
                  key={metric.label}
                  value={metric.value}
                  label={metric.label}
                  valueClassName="text-[2rem]"
                />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* Live preview */}
      {hasPreview && (
        <section className="border-b border-border bg-paper-deep py-10">
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

      {/* Technologies */}
      {hasTags && (
        <section className="border-t border-border py-10">
          <Container size="small">
            <Eyebrow tone="muted">{t("techLabel")}</Eyebrow>
            <div className="mt-4 flex flex-wrap gap-2">
              {meta.tags!.map((tag) => (
                <span
                  key={tag}
                  className={
                    highlightSet.has(tag)
                      ? "rounded-full bg-lime-loud px-3 py-1 text-xs font-semibold text-pickle-deep"
                      : "rounded-full border border-border px-3 py-1 text-xs text-ink-muted"
                  }
                >
                  {tag}
                </span>
              ))}
            </div>
          </Container>
        </section>
      )}

      <CTA
        title={t("ctaHeading")}
        sub={t("ctaDescription")}
        button={t("ctaButton")}
      />
    </article>
  );
}
