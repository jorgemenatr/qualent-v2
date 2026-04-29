import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Handshake, CheckCircle } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPartnership" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PartnershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPartnership");

  return (
    <>
      {/* Hero */}
      <section className="py-16 md:py-20">
        <Container size="small">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
            <Handshake className="h-6 w-6 text-primary" />
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

      {/* What's Included */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whatsIncludedTitle")}</h2>
          <div className="mt-8 space-y-0">
            {[
              {
                title: t("included1Title"),
                description: t("included1Description"),
              },
              {
                title: t("included2Title"),
                description: t("included2Description"),
              },
              {
                title: t("included3Title"),
                description: t("included3Description"),
              },
              {
                title: t("included4Title"),
                description: t("included4Description"),
              },
              {
                title: t("included5Title"),
                description: t("included5Description"),
              },
            ].map((item, index) => (
              <div key={item.title} className={`flex gap-4 p-4 rounded-md ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-emerald-500" />
                <div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-1 text-muted-foreground">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-muted/50 py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("howItWorksTitle")}</h2>
          <p className="mt-4 text-muted-foreground">
            {t("howItWorksIntro")}
          </p>
          <div className="mt-8 space-y-0">
            {[
              t("howItWorksItem1"),
              t("howItWorksItem2"),
              t("howItWorksItem3"),
              t("howItWorksItem4"),
              t("howItWorksItem5"),
            ].map((item, index) => (
              <div key={item} className={`flex items-start gap-3 p-3 rounded-md ${index % 2 === 1 ? "bg-muted/30" : ""}`}>
                <div className="h-1.5 w-1.5 mt-2.5 flex-shrink-0 rounded-full bg-primary" />
                <span className="text-muted-foreground">{item}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-lg bg-amber-50 border-l-4 border-l-amber-500 p-6 dark:bg-amber-950/30 dark:border-l-amber-400">
            <p className="text-muted-foreground">
              {t("howItWorksNote")}
            </p>
          </div>
        </Container>
      </section>

      {/* Why Partnership Matters */}
      <section className="py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-4" />
          <h2 className="text-2xl font-bold">{t("whyMattersTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>{t("whyMattersPara1")}</p>
            <p>{t("whyMattersPara2")}</p>
            <p className="text-foreground font-medium">
              {t("whyMattersPara3")}
            </p>
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
