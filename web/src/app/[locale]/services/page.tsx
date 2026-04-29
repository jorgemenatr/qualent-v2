import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, FileText, Search, Goal, Zap, Handshake } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PageHeroBackground } from "@/components/page-hero-background";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

const stepIcons = [FileText, Search, Goal, Zap, Handshake];
const stepHrefs = [
  "/services/understanding",
  "/services/research",
  "/services/problem-identification",
  "/services/implementation",
  "/services/partnership",
];

const STEP_COLORS = [
  { bg: "bg-emerald-600", bgLight: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/30", hover: "hover:border-emerald-500/40" },
  { bg: "bg-blue-600", bgLight: "bg-blue-500/10", text: "text-blue-600", border: "border-blue-500/30", hover: "hover:border-blue-500/40" },
  { bg: "bg-amber-600", bgLight: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/30", hover: "hover:border-amber-500/40" },
  { bg: "bg-violet-600", bgLight: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-500/30", hover: "hover:border-violet-500/40" },
  { bg: "bg-rose-600", bgLight: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/30", hover: "hover:border-rose-500/40" },
];

const REASON_BORDER_COLORS = [
  "border-l-emerald-500",
  "border-l-blue-500",
  "border-l-amber-500",
  "border-l-violet-500",
];

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  const steps = [
    {
      title: t("step1Title"),
      description: t("step1Description"),
      cost: t("step1Cost"),
      icon: stepIcons[0],
      href: stepHrefs[0],
    },
    {
      title: t("step2Title"),
      description: t("step2Description"),
      cost: t("step2Cost"),
      icon: stepIcons[1],
      href: stepHrefs[1],
    },
    {
      title: t("step3Title"),
      description: t("step3Description"),
      cost: t("step3Cost"),
      icon: stepIcons[2],
      href: stepHrefs[2],
    },
    {
      title: t("step4Title"),
      description: t("step4Description"),
      cost: t("step4Cost"),
      icon: stepIcons[3],
      href: stepHrefs[3],
    },
    {
      title: t("step5Title"),
      description: t("step5Description"),
      cost: t("step5Cost"),
      icon: stepIcons[4],
      href: stepHrefs[4],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-20 -left-20 w-[400px] h-[300px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-[400px] h-[300px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t.rich("heroSubtitle", {
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
            <p className="mt-4 text-lg font-medium text-foreground">
              {t("heroTagline")}
            </p>
          </div>
        </Container>
      </section>

      {/* Section 1: Why Understanding Comes First */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("section1Title")}
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>{t("section1Para1")}</p>
            <p>{t("section1Para2")}</p>
            <p>{t("section1Para3")}</p>
            <p className="text-foreground font-medium">
              {t("section1Para4")}
            </p>
            <p>
              <strong className="text-foreground">
                {t("section1Para5")}
              </strong>
            </p>
          </div>
          <div className="mt-8">
            <Button asChild>
              <Link href="/services/understanding">
                {t("section1Cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 2: Why We Try to Convince You Not to Hire Us */}
      <section className="relative bg-muted/50 py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("section2Title")}
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>{t("section2Para1")}</p>
            <p>{t("section2Para2")}</p>
            <p className="text-foreground font-medium">
              {t("section2Para3")}
            </p>
          </div>

          {/* The Math */}
          <div className="mt-10 rounded-lg border border-border bg-card/80 p-6 md:p-8">
            <h3 className="text-xl font-semibold mb-4">
              {t("section2MathTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">
                  {t("section2MathCustomLabel")}
                </strong>{" "}
                {t("section2MathCustomText")}
              </p>
              <p>
                <strong className="text-foreground">
                  {t("section2MathSaasLabel")}
                </strong>{" "}
                {t("section2MathSaasText")}
              </p>
            </div>
          </div>

          {/* We've Watched Companies Waste Money */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              {t("section2WasteTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("section2WastePara1")}</p>
              <p>{t("section2WastePara2")}</p>
              <p className="text-foreground font-medium">
                {t("section2WastePara3")}
              </p>
            </div>
          </div>

          {/* But Doesn't This Hurt Your Business? */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              {t("section2HurtTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("section2HurtIntro")}</p>
              <div className="grid gap-4 mt-6">
                {[
                  {
                    title: t("section2Reason1Title"),
                    description: t("section2Reason1Description"),
                  },
                  {
                    title: t("section2Reason2Title"),
                    description: t("section2Reason2Description"),
                  },
                  {
                    title: t("section2Reason3Title"),
                    description: t("section2Reason3Description"),
                  },
                  {
                    title: t("section2Reason4Title"),
                    description: t("section2Reason4Description"),
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`flex gap-4 p-4 rounded-lg border-l-4 ${REASON_BORDER_COLORS[index]} border border-border bg-background/50`}
                  >
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${STEP_COLORS[index].bg} text-xs font-bold text-white`}>
                      {index + 1}
                    </span>
                    <div>
                      <span className="font-semibold text-foreground">
                        {item.title}
                      </span>{" "}
                      <span>{item.description}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className="mt-10 text-lg font-medium text-foreground">
            {t("section2Summary")}
          </p>

          <div className="mt-8">
            <Button asChild>
              <Link href="/services/research">
                {t("section2Cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 3: Problem Identification */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("section3Title")}
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>{t("section3Para1")}</p>
            <p>{t("section3Para2")}</p>
            <p className="text-foreground font-medium">
              {t("section3Para3")}
            </p>
          </div>

          {/* What We Look For */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">{t("section3LookForTitle")}</h3>
            <div className="grid gap-4 mt-6">
              {[
                {
                  title: t("section3LookFor1Title"),
                  description: t("section3LookFor1Description"),
                },
                {
                  title: t("section3LookFor2Title"),
                  description: t("section3LookFor2Description"),
                },
                {
                  title: t("section3LookFor3Title"),
                  description: t("section3LookFor3Description"),
                },
                {
                  title: t("section3LookFor4Title"),
                  description: t("section3LookFor4Description"),
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`flex gap-4 p-4 rounded-lg border-l-4 ${REASON_BORDER_COLORS[index]} border border-border bg-background/50`}
                >
                  <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${STEP_COLORS[index].bg} text-xs font-bold text-white`}>
                    {index + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-foreground">
                      {item.title}:
                    </span>{" "}
                    <span>{item.description}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="mt-10 text-foreground font-medium">
            {t("section3Summary")}
          </p>

          <div className="mt-8">
            <Button asChild>
              <Link href="/services/problem-identification">
                {t("section3Cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 4: When We Build, We Do It Differently */}
      <section className="border-t border-border py-12 md:py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl md:text-3xl font-bold">
            {t("section4Title")}
          </h2>
          <div className="mt-8 space-y-6 text-muted-foreground leading-relaxed">
            <p>{t("section4Para1")}</p>
            <p className="text-foreground font-medium">
              {t("section4Para2")}
            </p>
          </div>

          {/* The Value of Code */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              {t("section4ValueTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("section4ValuePara1")}</p>
              <p>
                {t.rich("section4ValuePara2", {
                  em: (chunks) => <em className="text-foreground">{chunks}</em>,
                })}
              </p>
            </div>
          </div>

          {/* The Real Vulnerability */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              {t("section4VulnerabilityTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("section4VulnerabilityPara1")}</p>
              <p>
                {t.rich("section4VulnerabilityPara2", {
                  em: (chunks) => <em className="text-foreground">{chunks}</em>,
                })}
              </p>
              <p>{t("section4VulnerabilityPara3")}</p>
            </div>
          </div>

          {/* How AI Changes Our Approach */}
          <div className="mt-10">
            <h3 className="text-xl font-semibold mb-4">
              {t("section4AiTitle")}
            </h3>
            <div className="space-y-4 text-muted-foreground">
              <p>{t("section4AiPara1")}</p>
              <p className="text-foreground font-medium">
                {t("section4AiPara2")}
              </p>
            </div>
          </div>

          <div className="mt-8">
            <Button asChild>
              <Link href="/services/implementation">
                {t("section4Cta")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Section 5: The Offer Summary - Dark contrasting section */}
      <section className="relative bg-slate-900 text-white py-12 md:py-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-white/3 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="text-center mb-12">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t("offerTitle")}</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {steps.map((step, index) => {
              const color = STEP_COLORS[index];
              return (
                <Card
                  key={step.title}
                  className={`flex flex-col border-2 ${color.border} bg-slate-800/80 backdrop-blur-sm transition-all ${color.hover} hover:shadow-lg`}
                >
                  <CardContent className="flex flex-1 flex-col p-6">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${color.bgLight}`}>
                      <step.icon className={`h-6 w-6 ${color.text}`} />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-white">{step.title}</h3>
                    <p className="mt-2 text-sm text-slate-300 flex-1">
                      {step.description}
                    </p>
                    <p className={`mt-4 text-sm font-medium ${color.text}`}>
                      {step.cost}
                    </p>
                    <Button variant="ghost" size="sm" asChild className="mt-4 -ml-2 text-slate-300 hover:text-white">
                      <Link href={step.href}>
                        {t("offerDetails")} <ArrowRight className="ml-1 h-3 w-3" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Pricing Summary */}
          <div className="mt-16 max-w-2xl mx-auto">
            <div className="rounded-lg border border-slate-700 bg-slate-800/90 p-8 text-center">
              <h3 className="text-xl font-semibold mb-4 text-white">{t("pricingTitle")}</h3>
              <p className="text-slate-300">
                {t("pricingIntro")}
              </p>
              <p className="mt-4 text-lg font-semibold text-white">
                {t.rich("pricingFormula", {
                  highlight: (chunks) => <span className="text-primary">{chunks}</span>,
                })}
              </p>
              <ul className="mt-6 text-sm text-slate-300 space-y-2">
                <li>{t("pricingBullet1")}</li>
                <li>{t("pricingBullet2")}</li>
                <li>{t("pricingBullet3")}</li>
              </ul>
              <p className="mt-6 text-slate-300">
                <strong className="text-white">{t("pricingExampleLabel")}</strong>{" "}
                {t("pricingExampleText")}
              </p>
              <Button variant="secondary" size="sm" asChild className="mt-6">
                <Link href="/pricing">
                  {t("pricingCta")} <ArrowRight className="ml-1 h-3 w-3" />
                </Link>
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="relative border-t border-border py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl md:text-3xl font-bold">
              {t("ctaTitle")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("ctaSubtitle")}
            </p>
            <Button size="lg" className="mt-8" asChild>
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
