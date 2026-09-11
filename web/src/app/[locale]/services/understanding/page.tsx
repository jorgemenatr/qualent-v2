import { Section } from "@/components/layout";
import {
  PageHero, Prose, Strong, H2, CheckList, NumberedList, Callout, CTA, StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesUnderstanding" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function UnderstandingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesUnderstanding");

  const steps = [1, 2, 3].map((n) => ({
    title: t(`whatHappensStep${n}Title` as "whatHappensStep1Title"),
    text: t(`whatHappensStep${n}Description` as "whatHappensStep1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroSubtitle")}
        lede={t("heroDescription")}
        cost={t("heroCost")}
        mascot="labcoat"
      />
      <Section className="border-t-0 py-8"><StepRail active="understanding" /></Section>

      <Section narrow>
        <H2>{t("whatHappensTitle")}</H2>
        <NumberedList items={steps} />
      </Section>

      <Section tone="subtle" narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("whatYouGetTitle")}</H2>
            <CheckList
              items={[1, 2, 3, 4, 5].map((n) => t(`whatYouGetItem${n}` as "whatYouGetItem1"))}
            />
          </div>
          <Callout eyebrow={t("whyTitle")}>
            <Prose className="text-base">
              <p>{t("whyPara1")}</p>
              <p>{t("whyPara2")}</p>
              <p>{t("whyPara3")}</p>
              <Strong>{t("whyPara4")}</Strong>
            </Prose>
          </Callout>
        </div>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
