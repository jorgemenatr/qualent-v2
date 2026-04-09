import { Suspense } from "react";
import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { FivesAssessment } from "@/components/tools/fives-assessment";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LearnToolsFives" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function FivesToolPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LearnToolsFives");

  return (
    <>
      {/* Header */}
      <section className="border-b border-border py-12">
        <Container>
          <Button variant="ghost" size="sm" asChild className="mb-4">
            <Link href="/learn">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("backLink")}
            </Link>
          </Button>
          <h1 className="text-3xl font-bold tracking-tight">{t("heading")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            {t("description")}
          </p>
          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-green-500" />
              <span>{t("legendStrongCandidate")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-yellow-500" />
              <span>{t("legendWorthEvaluating")}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-red-500" />
              <span>{t("legendLowerPriority")}</span>
            </div>
          </div>
        </Container>
      </section>

      {/* Tool */}
      <section className="py-12">
        <Container>
          <Suspense
            fallback={
              <div className="flex items-center justify-center py-12">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              </div>
            }
          >
            <FivesAssessment />
          </Suspense>
        </Container>
      </section>

      {/* Help Section */}
      <section className="border-t border-border bg-muted/50 py-12">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-xl font-bold">{t("helpHeading")}</h2>
            <p className="mt-2 text-muted-foreground">
              {t("helpDescription")}
            </p>
            <Button className="mt-4" asChild>
              <Link href="/talk">{t("helpButton")}</Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
