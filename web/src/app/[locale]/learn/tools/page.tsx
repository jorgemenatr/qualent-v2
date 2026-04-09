import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import {
  ArrowRight,
  Target,
  Scale,
  CheckCircle,
  Sparkles,
  MessageSquare,
  Headphones,
  ClipboardList,
  Send,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "LearnTools" });
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function ToolsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("LearnTools");

  const tools = [
    {
      title: t("fivesTitle"),
      description: t("fivesDescription"),
      href: "/learn/tools/fives" as const,
      icon: Target,
      features: [
        t("fivesFeature1"),
        t("fivesFeature2"),
        t("fivesFeature3"),
        t("fivesFeature4"),
      ],
      color: "bg-blue-500/10 text-blue-600",
    },
    {
      title: t("buildVsBuyTitle"),
      description: t("buildVsBuyDescription"),
      href: "/learn/tools/build-vs-buy" as const,
      icon: Scale,
      features: [
        t("buildVsBuyFeature1"),
        t("buildVsBuyFeature2"),
        t("buildVsBuyFeature3"),
        t("buildVsBuyFeature4"),
      ],
      color: "bg-purple-500/10 text-purple-600",
    },
  ];

  const benefits = [
    {
      title: t("benefitDataDrivenTitle"),
      description: t("benefitDataDrivenDescription"),
    },
    {
      title: t("benefitAlignmentTitle"),
      description: t("benefitAlignmentDescription"),
    },
    {
      title: t("benefitSaveTitle"),
      description: t("benefitSaveDescription"),
    },
    {
      title: t("benefitExportTitle"),
      description: t("benefitExportDescription"),
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <Sparkles className="mr-2 h-4 w-4" />
              {t("heroBadge")}
            </div>
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroHeading")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* Tools Grid */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2">
            {tools.map((tool) => (
              <Card key={tool.title} className="flex flex-col">
                <CardHeader>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${tool.color}`}>
                    <tool.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="mt-4 text-xl">{tool.title}</CardTitle>
                  <CardDescription className="text-base">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-2">
                    {tool.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button className="mt-6 w-full" asChild>
                    <Link href={tool.href}>
                      {t("startAssessmentButton")} <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Additional Tools */}
      <section className="border-t border-border bg-muted/30 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-10">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("moreWaysHeading")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("moreWaysDescription")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t("askAnythingTitle")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("askAnythingDescription")}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/ask">
                    {t("askAnythingButton")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <Headphones className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t("audioLibraryTitle")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("audioLibraryDescription")}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/audio">
                    {t("audioLibraryButton")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <ClipboardList className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t("worksheetTitle")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("worksheetDescription")}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/worksheet">
                    {t("worksheetButton")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="group hover:border-primary/50 transition-colors">
              <CardContent className="pt-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                  <Send className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-medium">{t("submitRequestTitle")}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {t("submitRequestDescription")}
                </p>
                <Button variant="outline" size="sm" className="mt-4 w-full" asChild>
                  <Link href="/thunkbox/request">
                    {t("submitRequestButton")} <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </Container>
      </section>

      {/* Benefits */}
      <section className="border-t border-border bg-muted/50 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("whyUseHeading")}
            </h2>
            <p className="mt-3 text-muted-foreground">
              {t("whyUseDescription")}
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-lg border border-border bg-card p-5"
              >
                <h3 className="font-semibold">{benefit.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="border-t border-border py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center mb-12">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("howItWorksHeading")}
            </h2>
          </div>

          <div className="mx-auto max-w-3xl">
            <div className="space-y-8">
              {[
                {
                  step: "1",
                  title: t("step1Title"),
                  description: t("step1Description"),
                },
                {
                  step: "2",
                  title: t("step2Title"),
                  description: t("step2Description"),
                },
                {
                  step: "3",
                  title: t("step3Title"),
                  description: t("step3Description"),
                },
                {
                  step: "4",
                  title: t("step4Title"),
                  description: t("step4Description"),
                },
              ].map((item) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-bold">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="mt-1 text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="border-t border-border bg-primary/5 py-16 md:py-20">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">
              {t("ctaHeading")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("ctaDescription")}
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild>
                <Link href="/talk">
                  {t("ctaBookButton")} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/learn">
                  {t("ctaReportsButton")}
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
