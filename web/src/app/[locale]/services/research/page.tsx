import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Search, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesResearch" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesResearch");

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Search className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            {t("heroSubtitle")}
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            {t.rich("heroDescription", {
              em: (chunks) => <em>{chunks}</em>,
            })}
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            {t("heroCost")}
          </p>
        </Container>
      </section>

      {/* What We Research */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">{t("whatWeResearchTitle")}</h2>
          <div className="mt-8 space-y-4">
            {[
              t("whatWeResearchItem1"),
              t("whatWeResearchItem2"),
              t("whatWeResearchItem3"),
              t("whatWeResearchItem4"),
              t("whatWeResearchItem5"),
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="bg-muted/50 py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">{t("whatYouGetTitle")}</h2>
          <div className="mt-8 space-y-4">
            {[
              t("whatYouGetItem1"),
              t("whatYouGetItem2"),
              t("whatYouGetItem3"),
              t("whatYouGetItem4"),
              t("whatYouGetItem5"),
            ].map((item) => (
              <div key={item} className="flex items-start gap-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* When We Recommend Building */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">{t("whenBuildTitle")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("whenBuildIntro")}
          </p>
          <div className="mt-8 space-y-6">
            {[
              {
                title: t("whenBuildReason1Title"),
                description: t("whenBuildReason1Description"),
              },
              {
                title: t("whenBuildReason2Title"),
                description: t("whenBuildReason2Description"),
              },
              {
                title: t("whenBuildReason3Title"),
                description: t("whenBuildReason3Description"),
              },
              {
                title: t("whenBuildReason4Title"),
                description: t("whenBuildReason4Description"),
              },
              {
                title: t("whenBuildReason5Title"),
                description: t("whenBuildReason5Description"),
              },
              {
                title: t("whenBuildReason6Title"),
                description: t("whenBuildReason6Description"),
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <div className="h-1.5 w-1.5 mt-2.5 flex-shrink-0 rounded-full bg-primary" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-foreground font-medium">
            {t("whenBuildSummary")}
          </p>
        </Container>
      </section>

      {/* Pricing Note */}
      <section className="bg-muted/50 py-16">
        <Container size="small">
          <div className="rounded-lg border border-border bg-card/80 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4">{t("pricingNoteTitle")}</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("pricingNotePara1")}</p>
              <p>{t("pricingNotePara2")}</p>
              <p className="text-foreground font-medium">
                {t("pricingNotePara3")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center">
            <h2 className="text-2xl font-bold">{t("ctaTitle")}</h2>
            <p className="mt-4 text-muted-foreground">
              {t("ctaSubtitle")}
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
