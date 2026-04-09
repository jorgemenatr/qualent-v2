import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, FileText, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesUnderstanding" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function UnderstandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesUnderstanding");

  return (
    <>
      {/* Hero */}
      <section className="py-20 md:py-28">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <FileText className="h-6 w-6 text-primary" />
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

      {/* What Happens */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">{t("whatHappensTitle")}</h2>
          <div className="mt-8 space-y-6">
            {[
              {
                step: "1",
                title: t("whatHappensStep1Title"),
                description: t("whatHappensStep1Description"),
              },
              {
                step: "2",
                title: t("whatHappensStep2Title"),
                description: t("whatHappensStep2Description"),
              },
              {
                step: "3",
                title: t("whatHappensStep3Title"),
                description: t("whatHappensStep3Description"),
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4">
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
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

      {/* Why We Do This */}
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">{t("whyTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>{t("whyPara1")}</p>
            <p>{t("whyPara2")}</p>
            <p>{t("whyPara3")}</p>
            <p className="text-foreground font-medium">
              {t("whyPara4")}
            </p>
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
