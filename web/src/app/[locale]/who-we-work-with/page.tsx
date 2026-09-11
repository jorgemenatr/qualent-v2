import { Section } from "@/components/layout";
import { Eyebrow } from "@/components/brand";
import { PageHero, Prose, H2, CheckList, CTA } from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "WhoWeWorkWith" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function WhoWeWorkWithPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("WhoWeWorkWith");

  const values = [1, 2, 3, 4, 5, 6].map((n) => ({
    title: t(`value${n}Title` as "value1Title"),
    text: t(`value${n}Description` as "value1Description"),
  }));
  const industries = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => t(`industry${n}` as "industry1"));

  return (
    <>
      <PageHero
        eyebrow={t("heroBadge")}
        title={t("heroHeading")}
        lede={t("heroDescription")}
        mascot="farm"
      />

      {/* The belief, set as the one pull quote on the page */}
      <Section tone="loud" narrow>
        <div className="grid gap-4 text-center">
          <Eyebrow className="text-pickle-deep">{t("quoteEyebrow")}</Eyebrow>
          <blockquote className="mx-auto max-w-[52ch] text-[clamp(1.35rem,1rem+1.4vw,1.9rem)] font-bold leading-snug tracking-[-0.015em] text-pickle-deep text-balance">
            {t("pullQuote")}
          </blockquote>
        </div>
      </Section>

      <Section narrow>
        <H2>{t("underservedMiddleHeading")}</H2>
        <Prose>
          <p>{t("underservedMiddleParagraph1")}</p>
          <p>{t("underservedMiddleParagraph2")}</p>
        </Prose>
      </Section>

      <Section tone="subtle">
        <H2>{t("valuesHeading")}</H2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl border border-border bg-white p-6">
              <h3 className="pl-h3">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-normal text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section narrow>
        <H2>{t("fitHeading")}</H2>
        <p className="-mt-4 mb-7 text-[17px] leading-relaxed text-ink-muted">
          {t("fitSubheading")}
        </p>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Eyebrow>{t("goodFitHeading")}</Eyebrow>
            <div className="mt-3">
              <CheckList
                items={[1, 2, 3, 4, 5, 6].map((n) => t(`goodFit${n}` as "goodFit1"))}
              />
            </div>
          </div>
          <div>
            <Eyebrow className="text-coral">{t("notFitHeading")}</Eyebrow>
            <div className="mt-3">
              <CheckList
                tone="danger"
                items={[1, 2, 3, 4, 5].map((n) => t(`notFit${n}` as "notFit1"))}
              />
            </div>
          </div>
        </div>
      </Section>

      <Section tone="subtle" narrow>
        <H2>{t("industriesHeading")}</H2>
        <p className="-mt-4 mb-6 text-[17px] leading-relaxed text-ink-muted">
          {t("industriesDescription")}
        </p>
        <ul className="flex flex-wrap gap-2">
          {industries.map((industry) => (
            <li
              key={industry}
              className="rounded-full border border-rule-strong px-3.5 py-1.5 text-[15px] font-semibold"
            >
              {industry}
            </li>
          ))}
        </ul>
        <p className="mt-6 text-[15px] text-ink-faint">{t("industriesFootnote")}</p>
      </Section>

      <CTA
        title={t("ctaHeading")}
        sub={t("ctaDescription")}
        button={t("ctaButton")}
        note={t("ctaFootnote")}
      />
    </>
  );
}
