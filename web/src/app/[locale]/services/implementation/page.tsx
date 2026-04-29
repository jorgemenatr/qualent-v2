import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Zap, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesImplementation" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const STEP_CIRCLE_COLORS = [
  "bg-emerald-600",
  "bg-blue-600",
  "bg-amber-600",
  "bg-violet-600",
  "bg-rose-600",
];

export default async function ImplementationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesImplementation");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">
            {t("heroSubtitle")}
          </p>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("heroDescription")}
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            {t("heroCost")}
          </p>
        </Container>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("howItWorksTitle")}</h2>
          <div className="mt-8 space-y-8">
            {[
              {
                step: "1",
                title: t("phase1Title"),
                duration: t("phase1Duration"),
                description: t("phase1Description"),
              },
              {
                step: "2",
                title: t("phase2Title"),
                duration: t("phase2Duration"),
                description: t("phase2Description"),
              },
              {
                step: "3",
                title: t("phase3Title"),
                duration: t("phase3Duration"),
                description: t("phase3Description"),
              },
              {
                step: "4",
                title: t("phase4Title"),
                duration: t("phase4Duration"),
                description: t("phase4Description"),
              },
              {
                step: "5",
                title: t("phase5Title"),
                duration: t("phase5Duration"),
                description: t("phase5Description"),
              },
            ].map((phase, index) => (
              <div key={phase.step} className="flex gap-4">
                <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${STEP_CIRCLE_COLORS[index]} text-sm font-bold text-white`}>
                  {phase.step}
                </div>
                <div>
                  <div className="flex items-center gap-3">
                    <h3 className="font-semibold">{phase.title}</h3>
                    <span className="text-xs text-muted-foreground">
                      {phase.duration}
                    </span>
                  </div>
                  <p className="mt-1 text-muted-foreground">{phase.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why Prototype First */}
      <section className="bg-muted/50 py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whyPrototypeTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              {t.rich("whyPrototypePara1", {
                em: (chunks) => <em className="text-foreground">{chunks}</em>,
              })}
            </p>
            <p>{t("whyPrototypePara2")}</p>
            <p>{t("whyPrototypePara3")}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              t("whyPrototypeBenefit1"),
              t("whyPrototypeBenefit2"),
              t("whyPrototypeBenefit3"),
            ].map((item) => (
              <div
                key={item}
                className="rounded-lg border border-border bg-card/80 p-4 text-center"
              >
                <CheckCircle className="mx-auto h-6 w-6 text-emerald-500" />
                <p className="mt-2 text-sm font-medium">{item}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Build */}
      <section className="py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whatWeBuildTitle")}</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {[
              t("whatWeBuildItem1"),
              t("whatWeBuildItem2"),
              t("whatWeBuildItem3"),
              t("whatWeBuildItem4"),
              t("whatWeBuildItem5"),
              t("whatWeBuildItem6"),
            ].map((item, index) => (
              <div key={item} className={`flex items-center gap-3 p-3 rounded-md ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
                <CheckCircle className="h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Pricing */}
      <section className="bg-muted/50 py-12 md:py-16">
        <Container size="small">
          <div className="rounded-lg bg-amber-50 border-l-4 border-l-amber-500 p-8 text-center dark:bg-amber-950/30 dark:border-l-amber-400">
            <h3 className="text-xl font-semibold mb-4">{t("pricingSectionTitle")}</h3>
            <p className="text-3xl font-bold text-primary">
              {t("pricingHeadline")}
            </p>
            <p className="mt-4 text-muted-foreground">
              {t("pricingExample")}
            </p>
            <p className="mt-6 text-sm text-muted-foreground">
              {t("pricingGuarantee")}
            </p>
            <Button variant="outline" size="sm" asChild className="mt-6">
              <Link href="/pricing">
                {t("pricingCta")}{" "}
                <ArrowRight className="ml-1 h-3 w-3" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border py-12 md:py-16">
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
