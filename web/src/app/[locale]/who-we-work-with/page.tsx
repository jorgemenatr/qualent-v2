import { Link } from "@/i18n/navigation";
import {
  ArrowRight,
  Handshake,
  Compass,
  FlaskConical,
  Heart,
  Zap,
  Building2,
  Check,
  Minus,
} from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WhoWeWorkWith" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function WhoWeWorkWithPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WhoWeWorkWith");

  const values = [
    {
      icon: Handshake,
      title: t("value1Title"),
      description: t("value1Description"),
      bg: "bg-emerald-50/50",
    },
    {
      icon: Compass,
      title: t("value2Title"),
      description: t("value2Description"),
      bg: "bg-blue-50/50",
    },
    {
      icon: FlaskConical,
      title: t("value3Title"),
      description: t("value3Description"),
      bg: "bg-amber-50/50",
    },
    {
      icon: Heart,
      title: t("value4Title"),
      description: t("value4Description"),
      bg: "bg-rose-50/50",
    },
    {
      icon: Zap,
      title: t("value5Title"),
      description: t("value5Description"),
      bg: "bg-violet-50/50",
    },
    {
      icon: Building2,
      title: t("value6Title"),
      description: t("value6Description"),
      bg: "bg-cyan-50/50",
    },
  ];

  const goodFit = [
    t("goodFit1"),
    t("goodFit2"),
    t("goodFit3"),
    t("goodFit4"),
    t("goodFit5"),
    t("goodFit6"),
  ];

  const notFit = [
    t("notFit1"),
    t("notFit2"),
    t("notFit3"),
    t("notFit4"),
    t("notFit5"),
  ];

  const industries = [
    { label: t("industry1"), color: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30" },
    { label: t("industry2"), color: "bg-blue-500/20 text-blue-200 border-blue-400/30" },
    { label: t("industry3"), color: "bg-amber-500/20 text-amber-200 border-amber-400/30" },
    { label: t("industry4"), color: "bg-rose-500/20 text-rose-200 border-rose-400/30" },
    { label: t("industry5"), color: "bg-violet-500/20 text-violet-200 border-violet-400/30" },
    { label: t("industry6"), color: "bg-cyan-500/20 text-cyan-200 border-cyan-400/30" },
    { label: t("industry7"), color: "bg-pink-500/20 text-pink-200 border-pink-400/30" },
    { label: t("industry8"), color: "bg-teal-500/20 text-teal-200 border-teal-400/30" },
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

        <Container size="small" className="relative text-center">
          <div className="inline-block rounded-full border border-primary px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            {t("heroBadge")}
          </div>
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroHeading")}
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            {t("heroDescription")}
          </p>
        </Container>
      </section>

      {/* Pull Quote */}
      <section className="border-t border-border py-16">
        <Container size="small">
          <div className="bg-primary/5 border-l-4 border-l-primary rounded-r-lg p-8 md:p-10">
            <blockquote className="text-2xl md:text-3xl font-bold tracking-tight leading-snug max-w-3xl mx-auto">
              {t("pullQuote")}
            </blockquote>
          </div>
        </Container>
      </section>

      {/* Built for the Underserved Middle */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("underservedMiddleHeading")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              {t("underservedMiddleParagraph1")}
            </p>
            <p>
              {t("underservedMiddleParagraph2")}
            </p>
          </div>
        </Container>
      </section>

      {/* What We Value in a Partner */}
      <section className="relative bg-muted/50 py-20 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container className="relative">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-primary rounded-full mb-6 mx-auto" />
            <h2 className="text-2xl font-bold">{t("valuesHeading")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {values.map((value) => (
              <div
                key={value.title}
                className={`rounded-lg border border-border ${value.bg} p-6 transition-colors hover:border-primary/30`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 mb-4">
                  <value.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Are We a Good Fit? */}
      <section className="border-t border-border py-20">
        <Container size="small">
          <div className="text-center mb-12">
            <div className="w-12 h-1 bg-primary rounded-full mb-6 mx-auto" />
            <h2 className="text-2xl font-bold">{t("fitHeading")}</h2>
            <p className="mt-3 text-muted-foreground">
              {t("fitSubheading")}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Good fit */}
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-emerald-600 pb-3 mb-5 border-b-2 border-emerald-200">
                <Check className="h-4 w-4" />
                {t("goodFitHeading")}
              </h3>
              <ul className="space-y-0">
                {goodFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <Check className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Not a fit */}
            <div>
              <h3 className="flex items-center gap-2 text-base font-bold text-rose-500 pb-3 mb-5 border-b-2 border-rose-200">
                <Minus className="h-4 w-4" />
                {t("notFitHeading")}
              </h3>
              <ul className="space-y-0">
                {notFit.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 py-3 border-b border-border last:border-0"
                  >
                    <Minus className="h-4 w-4 text-rose-500 mt-0.5 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-foreground py-20">
        <Container size="small">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-background">
              {t("industriesHeading")}
            </h2>
            <p className="mt-3 text-background/50">
              {t("industriesDescription")}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            {industries.map((industry) => (
              <span
                key={industry.label}
                className={`rounded-full border px-5 py-2.5 text-sm transition-colors hover:border-primary hover:text-background hover:bg-primary/15 ${industry.color}`}
              >
                {industry.label}
              </span>
            ))}
          </div>

          <p className="text-center mt-8 text-sm text-background/40 italic">
            {t("industriesFootnote")}
          </p>
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
            <p className="mt-4 text-muted-foreground max-w-lg mx-auto">
              {t("ctaDescription")}
            </p>
            <Button className="mt-6" asChild>
              <Link href="/talk">
                {t("ctaButton")}{" "}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              {t("ctaFootnote")}
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
