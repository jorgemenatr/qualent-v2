import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/brand";
import {
  PageHero,
  Prose,
  Strong,
  H2,
  CheckList,
  Callout,
  CTA,
  StepRail,
} from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Services" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");

  const reasons = [1, 2, 3, 4].map((n) => ({
    title: t(`section2Reason${n}Title` as "section2Reason1Title"),
    text: t(`section2Reason${n}Description` as "section2Reason1Description"),
  }));

  const lookFor = [1, 2, 3, 4].map((n) => ({
    title: t(`section3LookFor${n}Title` as "section3LookFor1Title"),
    text: t(`section3LookFor${n}Description` as "section3LookFor1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroHeadline")}
        lede={t("heroTagline")}
        mascot="labcoat"
      />

      <Section className="border-t-0 py-10">
        <StepRail />
      </Section>

      {/* 01 — understanding */}
      <Section narrow>
        <H2 eyebrow={t("step1Title")}>{t("section1Title")}</H2>
        <Prose>
          <p>{t("section1Para1")}</p>
          <p>{t("section1Para2")}</p>
          <p>{t("section1Para3")}</p>
          <p>{t("section1Para4")}</p>
          <Strong>{t("section1Para5")}</Strong>
        </Prose>
        <div className="mt-7">
          <Button variant="outline" asChild>
            <Link href="/services/understanding">
              {t("section1Cta")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* 02 — buy before build */}
      <Section tone="subtle" narrow>
        <H2 eyebrow={t("step2Title")}>{t("section2Title")}</H2>
        <Prose>
          <p>{t("section2Para1")}</p>
          <p>{t("section2Para2")}</p>
          <p>{t("section2Para3")}</p>
        </Prose>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <Callout eyebrow={t("section2MathTitle")}>
            <p className="font-semibold text-ink">{t("section2MathCustomLabel")}</p>
            <p className="text-[15px] leading-normal text-ink-muted">
              {t("section2MathCustomText")}
            </p>
          </Callout>
          <Callout>
            <p className="font-semibold text-ink">{t("section2MathSaasLabel")}</p>
            <p className="text-[15px] leading-normal text-ink-muted">
              {t("section2MathSaasText")}
            </p>
          </Callout>
        </div>

        <div className="mt-10">
          <H2>{t("section2WasteTitle")}</H2>
          <Prose>
            <p>{t("section2WastePara1")}</p>
            <p>{t("section2WastePara2")}</p>
            <Strong>{t("section2WastePara3")}</Strong>
          </Prose>
        </div>

        <div className="mt-10">
          <H2>{t("section2HurtTitle")}</H2>
          <p className="mb-6 text-[17px] leading-relaxed text-ink-muted">
            {t("section2HurtIntro")}
          </p>
          <div className="grid gap-4 md:grid-cols-2">
            {reasons.map((r) => (
              <div key={r.title} className="rounded-xl border border-border bg-white p-6">
                <h3 className="pl-h3">{r.title}</h3>
                <p className="mt-2 text-[15px] leading-normal text-ink-muted">{r.text}</p>
              </div>
            ))}
          </div>
          <Strong>
            <span className="mt-7 block">{t("section2Summary")}</span>
          </Strong>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/services/research">
                {t("section2Cta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* 03 — problems worth solving */}
      <Section narrow>
        <H2 eyebrow={t("step3Title")}>{t("section3Title")}</H2>
        <Prose>
          <p>{t("section3Para1")}</p>
          <p>{t("section3Para2")}</p>
          <Strong>{t("section3Para3")}</Strong>
        </Prose>

        <div className="mt-8">
          <Eyebrow>{t("section3LookForTitle")}</Eyebrow>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {lookFor.map((item) => (
              <div key={item.title} className="rounded-xl bg-lime-soft p-6">
                <h3 className="pl-h3">{item.title}</h3>
                <p className="mt-2 text-[15px] leading-normal text-ink-muted">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <Strong>
          <span className="mt-7 block">{t("section3Summary")}</span>
        </Strong>
        <div className="mt-6">
          <Button variant="outline" asChild>
            <Link href="/services/problem-identification">
              {t("section3Cta")} <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      {/* 04 — how we build */}
      <Section tone="subtle" narrow>
        <H2 eyebrow={t("step4Title")}>{t("section4Title")}</H2>
        <Prose>
          <p>{t("section4Para1")}</p>
          <Strong>{t("section4Para2")}</Strong>
        </Prose>

        <div className="mt-10">
          <H2>{t("section4ValueTitle")}</H2>
          <Prose>
            <p>{t("section4ValuePara1")}</p>
            <p>{t.rich("section4ValuePara2", { em: (c) => <em>{c}</em> })}</p>
          </Prose>
        </div>

        <div className="mt-10">
          <H2>{t("section4VulnerabilityTitle")}</H2>
          <Prose>
            <p>{t("section4VulnerabilityPara1")}</p>
            <Strong>{t.rich("section4VulnerabilityPara2", { em: (c) => <em>{c}</em> })}</Strong>
            <p>{t("section4VulnerabilityPara3")}</p>
          </Prose>
        </div>

        <div className="mt-10">
          <H2>{t("section4AiTitle")}</H2>
          <Prose>
            <p>{t("section4AiPara1")}</p>
            <Strong>{t("section4AiPara2")}</Strong>
          </Prose>
          <div className="mt-6">
            <Button variant="outline" asChild>
              <Link href="/services/implementation">
                {t("section4Cta")} <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* The offer */}
      <Section narrow>
        <Callout tone="label" eyebrow={t("offerTitle")}>
          <h2 className="pl-h2">{t("pricingTitle")}</h2>
          <p className="text-[17px] leading-relaxed text-ink-muted">{t("pricingIntro")}</p>
          <p className="text-2xl font-bold">
            {t.rich("pricingFormula", {
              highlight: (c) => <span className="text-pickle">{c}</span>,
            })}
          </p>
          <CheckList
            items={[t("pricingBullet1"), t("pricingBullet2"), t("pricingBullet3")]}
          />
          <p className="pl-rule-dashed pt-4 text-[15px] text-ink-muted">
            <span className="font-semibold text-ink">{t("pricingExampleLabel")}</span>{" "}
            {t("pricingExampleText")}
          </p>
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
