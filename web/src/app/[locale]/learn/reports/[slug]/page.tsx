import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout";
import { MDXContent } from "@/components/mdx";
import { getContentBySlug, getAllSlugs } from "@/lib/content";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";

interface PageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("reports");
  return routing.locales.flatMap((locale) =>
    slugs.map((slug) => ({ locale, slug }))
  );
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const t = await getTranslations({ locale, namespace: "LearnReports" });
  const report = getContentBySlug("reports", slug);

  if (!report) {
    return {
      title: t("metaNotFoundTitle"),
    };
  }

  return {
    title: report.meta.title,
    description: report.meta.description,
    openGraph: {
      title: report.meta.title,
      description: report.meta.description,
      type: "article",
      publishedTime: report.meta.date,
      authors: report.meta.author ? [report.meta.author] : undefined,
    },
  };
}

export default async function ReportPage({ params }: PageProps) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LearnReports");

  const report = getContentBySlug("reports", slug);

  if (!report) {
    notFound();
  }

  return (
    <article className="py-12">
      <Container size="small">
        {/* Back Link */}
        <Link
          href="/learn"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          {t("backLink")}
        </Link>

        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight">
            {report.meta.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {report.meta.description}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {report.meta.author && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {report.meta.author}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(report.meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {report.readingTime}
            </div>
          </div>

          {/* Tags */}
          {report.meta.tags && report.meta.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {report.meta.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-muted px-3 py-1 text-xs text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <MDXContent source={report.content} />
        </div>
      </Container>
    </article>
  );
}
