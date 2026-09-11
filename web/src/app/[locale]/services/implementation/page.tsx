import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import {
  PageHero, Prose, Strong, H2, CheckList, NumberedList, Callout, CTA, StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ServicesImplementation" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ImplementationPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ServicesImplementation");

  const phases = [1, 2, 3, 4, 5].map((n) => ({
    title: t(`phase${n}Title` as "phase1Title"),
    text: t(`phase${n}Description` as "phase1Description"),
    meta: t(`phase${n}Duration` as "phase1Duration"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroSubtitle")}
        lede={t("heroDescription")}
        cost={t("heroCost")}
      />
      <Section className="border-t-0 py-8"><StepRail active="implementation" /></Section>

      <Section narrow>
        <H2>{t("howItWorksTitle")}</H2>
        <NumberedList items={phases} />
      </Section>

      <Section tone="subtle" narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("whyPrototypeTitle")}</H2>
            <Prose className="text-base">
              <Strong>{t.rich("whyPrototypePara1", { em: (c) => <em>{c}</em> })}</Strong>
              <p>{t("whyPrototypePara2")}</p>
              <p>{t("whyPrototypePara3")}</p>
            </Prose>
            <div className="mt-5">
              <CheckList
                items={[1, 2, 3].map((n) => t(`whyPrototypeBenefit${n}` as "whyPrototypeBenefit1"))}
              />
            </div>
          </div>
          <div>
            <H2>{t("whatWeBuildTitle")}</H2>
            <CheckList
              items={[1, 2, 3, 4, 5, 6].map((n) => t(`whatWeBuildItem${n}` as "whatWeBuildItem1"))}
            />
          </div>
        </div>
      </Section>

      <Section narrow>
        <Callout tone="label" eyebrow={t("pricingSectionTitle")}>
          <p className="pl-h2 text-pickle">{t("pricingHeadline")}</p>
          <p className="text-[17px] leading-relaxed text-ink-muted">{t("pricingExample")}</p>
          <p className="pl-rule-dashed pt-4 font-semibold text-ink">{t("pricingGuarantee")}</p>
          <div>
            <Button variant="secondary" asChild>
              <Link href="/pricing">
                {t("pricingCta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </Callout>
      </Section>

      <CTA title={t("ctaTitle")} sub={t("ctaSubtitle")} button={t("ctaButton")} />
    </>
  );
}
