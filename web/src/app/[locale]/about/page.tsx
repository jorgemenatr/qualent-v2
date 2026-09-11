import { Section } from "@/components/layout";
import { PageHero, Prose, Strong, H2, CTA } from "@/components/page";
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

  const values = [1, 2, 3, 4].map((n) => ({
    title: t(`howWeWorkCard${n}Title` as "howWeWorkCard1Title"),
    text: t(`howWeWorkCard${n}Text` as "howWeWorkCard1Text"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lede={t("heroSubtitle")}
        mascot="standing"
      />

      <Section narrow>
        <H2 eyebrow={t("storyEyebrow")}>{t("storyTitle")}</H2>
        <Prose>
          <p>{t("storyParagraph1")}</p>
          <p>{t("storyParagraph2")}</p>
          <p>{t("storyParagraph3")}</p>
          <Strong>
            {t("storyParagraph4")}{" "}
            <span className="text-pickle">{t("storyParagraph4Emphasis")}</span>{" "}
            {t("storyParagraph4End")} {t("storyParagraph4Bold")}
          </Strong>
        </Prose>
      </Section>

      <Section tone="subtle">
        <H2 eyebrow={t("howWeWorkEyebrow")}>{t("howWeWorkTitle")}</H2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-white p-6">
              <h3 className="pl-h3">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-normal text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
