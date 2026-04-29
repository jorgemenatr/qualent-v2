import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ControversialOpinions" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ControversialOpinionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ControversialOpinions");

  const opinions = [
    {
      title: t("opinion1Title"),
      subtitle: t("opinion1Subtitle"),
      content: [t("opinion1Paragraph1"), t("opinion1Paragraph2")],
    },
    {
      title: t("opinion2Title"),
      subtitle: t("opinion2Subtitle"),
      content: [t("opinion2Paragraph1")],
    },
    {
      title: t("opinion3Title"),
      subtitle: t("opinion3Subtitle"),
      content: [t("opinion3Paragraph1"), t("opinion3Paragraph2")],
    },
    {
      title: t("opinion4Title"),
      subtitle: t("opinion4Subtitle"),
      content: [t("opinion4Paragraph1"), t("opinion4Paragraph2")],
    },
    {
      title: t("opinion5Title"),
      subtitle: t("opinion5Subtitle"),
      content: [t("opinion5Paragraph1"), t("opinion5Paragraph2")],
    },
    {
      title: t("opinion6Title"),
      subtitle: t("opinion6Subtitle"),
      content: [t("opinion6Paragraph1"), t("opinion6Paragraph2")],
    },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-transparent" />
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto w-12 h-1 bg-primary rounded-full mb-6" />
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroHeading")}
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </Container>
      </section>

      {/* Opinions */}
      {opinions.map((opinion, index) => {
        const accentColors = [
          "border-l-emerald-500",
          "border-l-blue-500",
          "border-l-amber-500",
          "border-l-violet-500",
          "border-l-rose-500",
          "border-l-cyan-500",
        ];
        const subtitleColors = [
          "text-emerald-600",
          "text-blue-600",
          "text-amber-600",
          "text-violet-600",
          "text-rose-600",
          "text-cyan-600",
        ];
        return (
          <section
            key={opinion.title}
            className={`py-16 ${index % 2 === 0 ? "bg-slate-50" : "bg-white"}`}
          >
            <Container size="small">
              <div className={`border-l-4 ${accentColors[index % accentColors.length]} pl-6`}>
                <h2 className="text-2xl font-bold">{opinion.title}</h2>
                <p className={`mt-2 text-xl font-medium ${subtitleColors[index % subtitleColors.length]}`}>
                  {opinion.subtitle}
                </p>
              </div>
              <div className="mt-6 space-y-4 text-muted-foreground">
                {opinion.content.map((paragraph, pIndex) => (
                  <p key={pIndex}>{paragraph}</p>
                ))}
              </div>
            </Container>
          </section>
        );
      })}

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
