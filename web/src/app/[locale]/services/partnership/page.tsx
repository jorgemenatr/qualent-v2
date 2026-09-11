import { Section } from "@/components/layout";
import {
  PageHero, Prose, Strong, H2, CheckList, NumberedList, Callout, CTA, StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesPartnership" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PartnershipPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesPartnership");

  const included = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`included${n}Title` as "included1Title"),
    text: t(`included${n}Description` as "included1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroSubtitle")}
        lede={t("heroDescription")}
        cost={t("heroCost")}
        mascot="farm"
      />
      <Section className="border-t-0 py-8"><StepRail active="partnership" /></Section>

      <Section narrow>
        <H2>{t("whatsIncludedTitle")}</H2>
        <NumberedList items={included} />
      </Section>

      <Section tone="subtle" narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("howItWorksTitle")}</H2>
            <p className="-mt-4 mb-4 text-[17px] leading-relaxed text-ink-muted">
              {t("howItWorksIntro")}
            </p>
            <CheckList
              items={[1, 2, 3, 4, 5].map((n) => t(`howItWorksItem${n}` as "howItWorksItem1"))}
            />
          </div>
          <Callout eyebrow={t("whyMattersTitle")}>
            <Prose className="text-base">
              <p>{t("whyMattersPara1")}</p>
              <p>{t("whyMattersPara2")}</p>
              <Strong>{t("whyMattersPara3")}</Strong>
            </Prose>
          </Callout>
        </div>
        <div className="mt-8 rounded-xl border-[1.5px] border-dashed border-rule-strong p-6 text-[15px] text-ink-muted">
          {t("howItWorksNote")}
        </div>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
