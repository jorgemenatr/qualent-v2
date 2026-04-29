import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Goal, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesProblemId" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProblemIdentificationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesProblemId");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Goal className="h-6 w-6 text-primary" />
          </div>
          <h1 className="mt-6 text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroTitle")}
          </h1>
          <p className="mt-2 text-xl text-primary font-medium">{t("heroSubtitle")}</p>
          <p className="mt-6 text-lg text-muted-foreground">
            {t("heroDescription")}
          </p>
          <p className="mt-4 text-lg font-medium text-foreground">
            {t("heroCost")}
          </p>
        </Container>
      </section>

      {/* The Challenge */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("challengeTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>{t("challengePara1")}</p>
            <p>{t("challengePara2")}</p>
            <p className="text-foreground font-medium">
              {t("challengePara3")}
            </p>
          </div>
        </Container>
      </section>

      {/* What We Do */}
      <section className="bg-muted/50 py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whatWeDoTitle")}</h2>
          <div className="mt-8 space-y-0">
            {[
              {
                title: t("whatWeDo1Title"),
                description: t("whatWeDo1Description"),
              },
              {
                title: t("whatWeDo2Title"),
                description: t("whatWeDo2Description"),
              },
              {
                title: t("whatWeDo3Title"),
                description: t("whatWeDo3Description"),
              },
              {
                title: t("whatWeDo4Title"),
                description: t("whatWeDo4Description"),
              },
              {
                title: t("whatWeDo5Title"),
                description: t("whatWeDo5Description"),
              },
            ].map((item, index) => (
              <div key={item.title} className={`flex gap-4 p-4 rounded-md ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
                <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What You Get */}
      <section className="py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whatYouGetTitle")}</h2>
          <div className="mt-8 space-y-0">
            {[
              t("whatYouGetItem1"),
              t("whatYouGetItem2"),
              t("whatYouGetItem3"),
              t("whatYouGetItem4"),
              t("whatYouGetItem5"),
              t("whatYouGetItem6"),
            ].map((item, index) => (
              <div key={item} className={`flex items-start gap-3 p-3 rounded-md ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Why This Matters */}
      <section className="bg-muted/50 py-12 md:py-16">
        <Container size="small">
          <div className="rounded-lg bg-amber-50 border-l-4 border-l-amber-500 p-6 md:p-8 dark:bg-amber-950/30 dark:border-l-amber-400">
            <h3 className="text-xl font-semibold mb-4">{t("whyMattersTitle")}</h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("whyMattersPara1")}</p>
              <p>{t("whyMattersPara2")}</p>
              <p className="text-foreground font-medium">
                {t("whyMattersPara3")}
              </p>
            </div>
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
