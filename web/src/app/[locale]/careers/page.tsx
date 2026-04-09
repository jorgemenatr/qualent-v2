import { Link } from "@/i18n/navigation";
import { ArrowRight, Zap, Brain, Users, Clock } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}


export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  const values = [
    {
      icon: Zap,
      title: t("value1Title"),
      description: t("value1Description"),
    },
    {
      icon: Brain,
      title: t("value2Title"),
      description: t("value2Description"),
    },
    {
      icon: Users,
      title: t("value3Title"),
      description: t("value3Description"),
    },
    {
      icon: Clock,
      title: t("value4Title"),
      description: t("value4Description"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute -left-32 top-1/3 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-20 bottom-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroHeading")}
          </h1>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* What It's Like */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("whatItsLikeHeading")}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {values.map((value) => (
              <div
                key={value.title}
                className="rounded-lg border border-border bg-card/80 p-6 transition-colors hover:border-primary/30"
              >
                <value.icon className="h-6 w-6 text-primary mb-3" />
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Who We're Looking For */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("lookingForHeading")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              {t("lookingForIntro")}
            </p>
            <ul className="space-y-3 ml-1">
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  {t("lookingForItem1")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  {t("lookingForItem2")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  {t("lookingForItem3")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  {t("lookingForItem4")}
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ArrowRight className="h-5 w-5 text-primary mt-0.5 shrink-0" />
                <span>
                  {t("lookingForItem5")}
                </span>
              </li>
            </ul>
          </div>
        </Container>
      </section>

      {/* Open Positions */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("openPositionsHeading")}</h2>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-muted-foreground">
              {t("openPositionsEmpty")}
            </p>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
          <div className="text-center">
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
