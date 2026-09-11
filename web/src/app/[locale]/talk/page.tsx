import { Section } from "@/components/layout";
import { PageHero } from "@/components/page";
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
      <PageHero
        center
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lede={t("heroLine1")}
      >
        <p className="max-w-[54ch] text-[17px] leading-relaxed text-ink-muted">
          {t("heroLine2")}
        </p>
        <p className="text-[15px] text-ink-faint">{t("heroLine3")}</p>
      </PageHero>

      <Section narrow className="border-t-0">
        <div className="pl-label-card">
          <div className="pl-label-head">
            <span>{t("heroEyebrow")}</span>
            <span className="font-sans text-[13px] font-semibold normal-case tracking-normal">
              17 min
            </span>
          </div>
          <div className="p-4 md:p-6">
            <iframe
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3W1-onS8oPLIGAhf0t7uCrUScrUMlKcEfR-UBBlnpfI_B6N6HSPX49X_skh9vnwUHEH77Kkfq8?gv=true"
              className="w-full rounded-lg"
              style={{ border: 0, minHeight: "600px" }}
              title={t("calendarIframeTitle")}
            />
          </div>
        </div>

        <p className="mt-10 text-center text-ink-muted">
          {t("alternativeContactText")}{" "}
          <a
            href={`mailto:${t("alternativeContactEmail")}`}
            className="font-semibold text-pickle-hover hover:underline"
          >
            {t("alternativeContactEmail")}
          </a>
        </p>
      </Section>
    </>
  );
}
