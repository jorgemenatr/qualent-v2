import { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Building2, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout";
import { MDXContent } from "@/components/mdx";
import { getContentBySlug, getAllSlugs } from "@/lib/content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs("case-studies");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getContentBySlug("case-studies", slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  return {
    title: `${caseStudy.meta.title} | Case Study`,
    description: caseStudy.meta.description,
    openGraph: {
      title: caseStudy.meta.title,
      description: caseStudy.meta.description,
      type: "article",
      publishedTime: caseStudy.meta.date,
    },
  };
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const caseStudy = getContentBySlug("case-studies", slug);

  if (!caseStudy) {
    notFound();
  }

  return (
    <article className="py-12">
      <Container size="small">
        {/* Back Link */}
        <Link
          href="/proof"
          className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Proof
        </Link>

        {/* Header */}
        <header className="mb-12">
          {/* Result Badge */}
          {caseStudy.meta.result && (
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary">
              <TrendingUp className="h-4 w-4" />
              <span className="font-semibold">{caseStudy.meta.result}</span>
            </div>
          )}

          <h1 className="text-4xl font-bold tracking-tight">
            {caseStudy.meta.title}
          </h1>
          <p className="mt-4 text-xl text-muted-foreground">
            {caseStudy.meta.description}
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
            {caseStudy.meta.client && (
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                {caseStudy.meta.client}
              </div>
            )}
            {caseStudy.meta.industry && (
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                {caseStudy.meta.industry}
              </div>
            )}
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {new Date(caseStudy.meta.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {caseStudy.readingTime}
            </div>
          </div>

          {/* Tags */}
          {caseStudy.meta.tags && caseStudy.meta.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {caseStudy.meta.tags.map((tag) => (
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
          <MDXContent source={caseStudy.content} />
        </div>
      </Container>
    </article>
  );
}
