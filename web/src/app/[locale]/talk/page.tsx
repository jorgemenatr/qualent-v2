import { Container } from "@/components/layout";
import { PageHeroBackground } from "@/components/page-hero-background";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Talk" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function TalkPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Talk");

  return (
    <>
      <section className="relative py-16 md:py-20 overflow-hidden">
        {/* Subtle background glow centered on calendar */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Soft gradient wash from top */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
          {/* Primary radial glow behind calendar area */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-[900px] h-[700px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(34,197,94,0.12),transparent_65%)]" />
          {/* Lime accent glow */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[500px] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(132,204,22,0.10),transparent_55%)]" />
        </div>
        <PageHeroBackground />

        <Container size="small" className="relative">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
              {t("heroTitle")}
            </h1>
            <p className="mt-4 text-xl text-muted-foreground">
              {t("heroLine1")}
            </p>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              {t("heroLine2")}
            </p>
            <p className="mt-3 text-sm text-muted-foreground/80 italic">
              {t("heroLine3")}
            </p>
          </div>

          {/* Google Calendar Embed */}
          <div className="mt-12 rounded-lg border border-border bg-card/80 backdrop-blur-sm p-4 md:p-8 shadow-sm overflow-hidden">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3W1-onS8oPLIGAhf0t7uCrUScrUMlKcEfR-UBBlnpfI_B6N6HSPX49X_skh9vnwUHEH77Kkfq8?gv=true"
              className="w-full rounded-lg"
              style={{ border: 0, minHeight: "600px" }}
              title={t("calendarIframeTitle")}
            />
          </div>

          {/* Alternative contact */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              {t("alternativeContactText")}{" "}
              <a
                href={`mailto:${t("alternativeContactEmail")}`}
                className="font-medium text-primary hover:underline"
              >
                {t("alternativeContactEmail")}
              </a>
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
