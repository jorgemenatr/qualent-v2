import { Link } from "@/i18n/navigation";
import Image from "next/image";
import {
  ArrowRight,
  Zap,
  Goal,
  Rocket,
  XCircle,
  Shield,
  AlertTriangle,
  Users,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HeroBackground } from "@/components/hero-background";
import { getAllContent } from "@/lib/content";
import { getTranslations, setRequestLocale } from "next-intl/server";

const clientLogos = [
  { name: "Kroger", src: "/clients/kroger.svg", width: 120, height: 40 },
  { name: "Anaconda", src: "/clients/anaconda.svg", width: 140, height: 40 },
  { name: "CBTS", src: "/clients/cbts.webp", width: 100, height: 40, invert: true },
  { name: "Stacking Projects", src: "/clients/stacking-projects.png", width: 140, height: 40, invert: true },
  { name: "REPS", src: "/clients/reps.jpeg", width: 100, height: 40 },
];

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");
  const caseStudies = getAllContent("case-studies");

  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center py-20 md:py-32 overflow-hidden">
        <HeroBackground />

        <Container className="relative w-full">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-tight">
              {t("heroLine1")} <span className="text-primary">{t("heroProblems")}</span> {t("heroLine2")}
              <br className="hidden sm:block" />
              {t("heroLine3")} <span className="text-primary">{t("heroCheaperToFix")}</span> {t("heroLine4")}
            </h1>
            <p className="mt-8 text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {t("heroSubLine1")}
              <br className="hidden sm:block" />
              {t("heroSubLine2")}
              <br />
              <span className="text-foreground font-medium">
                {t("heroSubLine3")}
              </span>
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/talk">
                  {t("heroCtaPrimary")}{" "}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#guarantee">{t("heroCtaSecondary")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Client Logos Section */}
      <section className="border-t border-border py-12">
        <Container>
          <p className="text-center text-sm text-muted-foreground mb-8">
            {t("clientLogosLabel")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 opacity-70">
            {clientLogos.map((logo) => (
              <div
                key={logo.name}
                className="relative grayscale hover:grayscale-0 transition-all duration-300"
              >
                <Image
                  src={logo.src}
                  alt={logo.name}
                  width={logo.width}
                  height={logo.height}
                  className={`h-8 md:h-10 w-auto object-contain ${"invert" in logo && logo.invert ? "invert" : ""}`}
                />
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* The Guarantee Section */}
      <section
        id="guarantee"
        className="border-t border-border bg-primary/5 py-16 md:py-20"
      >
        <Container>
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center justify-center h-14 w-14 rounded-full bg-primary/10 mb-5">
              <Shield className="h-7 w-7 text-primary" />
            </div>
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("guaranteeTitle")}
            </h2>
            <p className="mt-4 text-2xl md:text-3xl font-semibold text-primary">
              {t("guaranteeHeadline")}
            </p>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {t("guaranteeLine1")}
              <br />
              {t("guaranteeLine2")}
            </p>
          </div>
        </Container>
      </section>

      {/* Why Now Section - The 6 Bullets */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("whyNowTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("whyNowSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: t("whyNowCard1Title"),
                text: t("whyNowCard1Text"),
              },
              {
                title: t("whyNowCard2Title"),
                text: t("whyNowCard2Text"),
              },
              {
                title: t("whyNowCard3Title"),
                text: t("whyNowCard3Text"),
              },
              {
                title: t("whyNowCard4Title"),
                text: t("whyNowCard4Text"),
              },
              {
                title: t("whyNowCard5Title"),
                text: t("whyNowCard5Text"),
              },
              {
                title: t("whyNowCard6Title"),
                text: t("whyNowCard6Text"),
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* What We Don't Do Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
                {t("whatWeDontDoTitle")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("whatWeDontDoSubtitle")}
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  t("whatWeDontDoItem1"),
                  t("whatWeDontDoItem2"),
                  t("whatWeDontDoItem3"),
                  t("whatWeDontDoItem4"),
                  t("whatWeDontDoItem5"),
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <XCircle className="h-4 w-4 flex-shrink-0 text-destructive" />
                    <span className="text-sm">{t("whatWeDontDoPrefix")} {item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-lg border border-border bg-card p-6 md:p-8">
              <h3 className="text-lg font-semibold">{t("ourPromiseTitle")}</h3>
              <p className="mt-3 text-sm text-muted-foreground">
                {t("ourPromiseLine1")}
                <br />
                {t("ourPromiseLine2")}
              </p>
              <p className="mt-4 text-xl font-semibold text-primary">
                {t("ourPromisePrice")}
              </p>
              <Button className="mt-5" asChild>
                <Link href="/services">{t("ourPromiseCta")}</Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* What We Actually Do Section */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("whatWeActuallyDoTitle")}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Goal className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{t("whatWeActuallyDoCard1Title")}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("whatWeActuallyDoCard1Text")}
                </p>
                <Link
                  href="/services/research"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t("learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Zap className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{t("whatWeActuallyDoCard2Title")}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("whatWeActuallyDoCard2Text")}
                </p>
                <Link
                  href="/services/implementation"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t("learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>

            <Card className="border-2 border-transparent transition-colors hover:border-primary/20">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="mt-4 font-semibold">{t("whatWeActuallyDoCard3Title")}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {t("whatWeActuallyDoCard3Text")}
                </p>
                <Link
                  href="/services/partnership"
                  className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
                >
                  {t("learnMore")} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Case Studies Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("realResultsTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("realResultsSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
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
                      <p className="text-sm font-semibold text-primary">
                        {study.meta.result}
                      </p>
                    </div>
                  )}
                  <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
                    {study.meta.description}
                  </p>
                  <div className="mt-auto pt-4">
                    <Link
                      href={`/proof/${study.slug}`}
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      {t("readCaseStudy")} <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button variant="outline" asChild>
              <Link href="/proof">
                {t("viewAllCaseStudies")} <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* The Three Risks Section */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("risksTitle")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("risksSubtitle")}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">{t("riskOperationalTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("riskOperationalText")}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <Users className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">{t("riskPeopleTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("riskPeopleText")}
              </p>
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-destructive/10 mb-3">
                <TrendingDown className="h-5 w-5 text-destructive" />
              </div>
              <h3 className="font-semibold">{t("riskCompetitiveTitle")}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                {t("riskCompetitiveText")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("ctaLine1")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              {t("ctaLine2")}
            </p>
            <p className="mt-3 text-xs text-muted-foreground/80 italic">
              {t("ctaLine3")}
            </p>
            <Button size="lg" className="mt-6" asChild>
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
