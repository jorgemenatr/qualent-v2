import { Section } from "@/components/layout";
import {
  PageHero, Prose, Strong, H2, CheckList, Callout, CTA, StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesResearch" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ResearchPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesResearch");

  const reasons = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`whenBuildReason${n}Title` as "whenBuildReason1Title"),
    text: t(`whenBuildReason${n}Description` as "whenBuildReason1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroSubtitle")}
        lede={t.rich("heroDescription", { em: (c) => <em>{c}</em> })}
        cost={t("heroCost")}
      />
      <Section className="border-t-0 py-8"><StepRail active="research" /></Section>

      <Section narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("whatWeResearchTitle")}</H2>
            <CheckList
              items={[1, 2, 3, 4, 5].map((n) => t(`whatWeResearchItem${n}` as "whatWeResearchItem1"))}
            />
          </div>
          <div>
            <H2>{t("whatYouGetTitle")}</H2>
            <CheckList
              items={[1, 2, 3, 4, 5].map((n) => t(`whatYouGetItem${n}` as "whatYouGetItem1"))}
            />
          </div>
        </div>
      </Section>

      <Section tone="subtle">
        <H2>{t("whenBuildTitle")}</H2>
        <p className="-mt-4 mb-7 text-[17px] leading-relaxed text-ink-muted">
          {t("whenBuildIntro")}
        </p>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map((r) => (
            <div key={r.title} className="rounded-xl border border-border bg-white p-6">
              <h3 className="pl-h3">{r.title}</h3>
              <p className="mt-2 text-[15px] leading-normal text-ink-muted">{r.text}</p>
            </div>
          ))}
        </div>
        <Strong><span className="mt-7 block">{t("whenBuildSummary")}</span></Strong>
      </Section>

      <Section narrow>
        <Callout tone="label" eyebrow={t("pricingNoteTitle")}>
          <Prose className="text-base">
            <p>{t("pricingNotePara1")}</p>
            <p>{t("pricingNotePara2")}</p>
            <Strong>{t("pricingNotePara3")}</Strong>
          </Prose>
        </Callout>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
