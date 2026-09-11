import { Section } from "@/components/layout";
import {
  PageHero, Prose, Strong, H2, CheckList, NumberedList, CTA, StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesProblemId" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProblemIdPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesProblemId");

  const whatWeDo = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`whatWeDo${n}Title` as "whatWeDo1Title"),
    text: t(`whatWeDo${n}Description` as "whatWeDo1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroTitle")}
        lede={t("heroDescription")}
        cost={t("heroCost")}
      />
      <Section className="border-t-0 py-8"><StepRail active="problem-identification" /></Section>

      <Section narrow>
        <H2>{t("challengeTitle")}</H2>
        <Prose>
          <p>{t("challengePara1")}</p>
          <p>{t("challengePara2")}</p>
          <Strong>{t("challengePara3")}</Strong>
        </Prose>
      </Section>

      <Section tone="subtle" narrow>
        <H2>{t("whatWeDoTitle")}</H2>
        <NumberedList items={whatWeDo} />
      </Section>

      <Section narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("whatYouGetTitle")}</H2>
            <CheckList
              items={[1, 2, 3, 4, 5, 6].map((n) => t(`whatYouGetItem${n}` as "whatYouGetItem1"))}
            />
          </div>
          <div>
            <H2>{t("whyMattersTitle")}</H2>
            <Prose className="text-base">
              <p>{t("whyMattersPara1")}</p>
              <p>{t("whyMattersPara2")}</p>
              <Strong>{t("whyMattersPara3")}</Strong>
            </Prose>
          </div>
        </div>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
