import { Check } from "lucide-react";
import { Section, SectionHead } from "@/components/layout";
import { Eyebrow } from "@/components/brand";
import { CTA } from "@/components/page";
import { CostWorksheet } from "./cost-worksheet";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Pricing" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PricingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Pricing");

  const benefits = [1, 2, 3].map((n) => ({
    title: t(`benefit${n}Title` as "benefit1Title"),
    description: t(`benefit${n}Description` as "benefit1Description"),
  }));

  return (
    <>
      {/* Hero + the worksheet, which is the argument */}
      <Section narrow className="border-t-0 pt-[72px]">
        <SectionHead
          eyebrow={t("heroEyebrow")}
          title={t("heroHeadline")}
          sub={t("heroSub")}
        />
        <CostWorksheet />
      </Section>

      <Section tone="subtle">
        <SectionHead eyebrow={t("whyWorksEyebrow")} title={t("whyWorksHeadline")} />
        <div className="grid gap-4 md:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex flex-col gap-3 rounded-xl border border-border bg-white p-6"
            >
              <h3 className="pl-h3">{b.title}</h3>
              <p className="text-[15px] leading-normal text-ink-muted">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* A note on honesty */}
      <Section>
        <div className="mx-auto grid max-w-[720px] gap-4">
          <Eyebrow>{t("honestyTitle")}</Eyebrow>
          <p className="pl-h2">
            {t("honestyLine1")}{" "}
            <span className="text-pickle">{t("honestyLine1Bold")}</span>
          </p>
          <p className="pl-lede text-ink-muted">{t("honestyLine2")}</p>
          <ul className="mt-2 flex flex-wrap gap-x-8 gap-y-2">
            {[t("honestyCheck1"), t("honestyCheck2")].map((item) => (
              <li key={item} className="flex items-center gap-2 font-semibold">
                <Check className="size-[18px] text-pickle" strokeWidth={2.5} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CTA
        tone="plain"
        title={t("ctaHeadline")}
        sub={t("ctaSub")}
        button={t("ctaButton")}
      />
    </>
  );
}
