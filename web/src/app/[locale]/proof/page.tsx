import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllContent } from "@/lib/content";
import { PageHeroBackground } from "@/components/page-hero-background";
import type { Metadata } from "next";

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
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/8 blur-3xl" />
        </div>
        <PageHeroBackground />
        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroHeading")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* Case Studies */}
      <section className="border-t border-border py-20">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {caseStudies.map((study) => (
              <Card key={study.slug} className="flex flex-col">
                <CardHeader>
                  <p className="text-sm text-muted-foreground">
                    {study.meta.client || study.meta.industry}
                  </p>
                  <CardTitle className="mt-2">{study.meta.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  {study.meta.result && (
                    <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-3">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <p className="text-lg font-semibold text-primary">
                        {study.meta.result}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-muted-foreground">
                    {study.meta.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Button variant="link" className="h-auto p-0" asChild>
                      <Link href={`/proof/${study.slug}`}>
                        {t("readCaseStudyButton")} <ArrowRight className="ml-1 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="bg-muted/50 py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold">{t("ctaHeading")}</h2>
            <p className="mt-4 text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                {t("ctaButton")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
