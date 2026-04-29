import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");

  return (
    <>
      {/* Hero */}
      <section className="relative py-16 md:py-20 min-h-[40vh] flex items-center overflow-hidden">
        {/* Background styling - side gradient for distinction from homepage */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Gradient from left */}
          <div className="absolute inset-0 bg-gradient-to-r from-primary/8 via-transparent to-transparent" />
          {/* Decorative blur - positioned left */}
          <div className="absolute -left-32 top-1/2 -translate-y-1/2 w-[500px] h-[400px] rounded-full bg-primary/10 blur-3xl" />
          {/* Subtle lime accent - bottom right */}
          <div className="absolute -right-20 bottom-0 w-[300px] h-[250px] rounded-full bg-[rgba(132,204,22,0.08)] blur-3xl" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative">
          {/* Accent line */}
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            {t("heroTitle")}
          </h1>
          <div className="mt-6 space-y-4 text-lg text-muted-foreground">
            <p>
              {t("heroSubtitle")}
            </p>
          </div>
        </Container>
      </section>

      {/* Story */}
      <section className="border-t border-border py-16">
        <Container size="small">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("storyTitle")}</h2>
          <div className="mt-6 space-y-4 text-muted-foreground">
            <p>
              {t("storyParagraph1")}
            </p>
            <p>
              {t("storyParagraph2")}
            </p>
            <p>
              {t("storyParagraph3")}
            </p>
            <div className="border-l-4 border-l-primary pl-6">
              <p>{t("storyParagraph4")} <i>{t("storyParagraph4Emphasis")}</i> {t("storyParagraph4End")}
                <br />
                <br />
                <strong>{t("storyParagraph4Bold")}</strong>
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* How We Work */}
      <section className="relative bg-muted/50 py-16 overflow-hidden">
        {/* Subtle background accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-[400px] h-[300px] rounded-full bg-primary/5 blur-3xl" />
        </div>

        <Container size="small" className="relative">
          <div className="w-12 h-1 bg-primary rounded-full mb-6" />
          <h2 className="text-2xl font-bold">{t("howWeWorkTitle")}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div className="rounded-lg border border-border border-t-4 border-t-emerald-500 bg-emerald-50/50 p-6 transition-colors hover:border-primary/30 hover:border-t-emerald-500">
              <h3 className="text-lg font-semibold">{t("howWeWorkCard1Title")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("howWeWorkCard1Text")}
              </p>
            </div>
            <div className="rounded-lg border border-border border-t-4 border-t-blue-500 bg-blue-50/50 p-6 transition-colors hover:border-primary/30 hover:border-t-blue-500">
              <h3 className="text-lg font-semibold">{t("howWeWorkCard2Title")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("howWeWorkCard2Text")}
              </p>
            </div>
            <div className="rounded-lg border border-border border-t-4 border-t-amber-500 bg-amber-50/50 p-6 transition-colors hover:border-primary/30 hover:border-t-amber-500">
              <h3 className="text-lg font-semibold">{t("howWeWorkCard3Title")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("howWeWorkCard3Text")}
              </p>
            </div>
            <div className="rounded-lg border border-border border-t-4 border-t-violet-500 bg-violet-50/50 p-6 transition-colors hover:border-primary/30 hover:border-t-violet-500">
              <h3 className="text-lg font-semibold">{t("howWeWorkCard4Title")}</h3>
              <p className="mt-2 text-muted-foreground">
                {t("howWeWorkCard4Text")}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Team section - hidden for now
      <section className="py-20">
        <Container size="small">
          <h2 className="text-2xl font-bold">The Team</h2>
          <p className="mt-4 text-muted-foreground">
            We&apos;re a small, senior team. Everyone who works on your project has
            been doing this for years. No junior developers learning on your
            dime, no offshore teams you&apos;ll never meet.
          </p>
          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-12 text-center">
            <p className="text-sm text-muted-foreground">
              Team photos coming soon
            </p>
          </div>
        </Container>
      </section>
      */}

      {/* CTA */}
      <section className="relative border-t border-border py-16 overflow-hidden">
        {/* Subtle centered glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.08),transparent_70%)]" />
        </div>

        <Container size="small" className="relative">
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
