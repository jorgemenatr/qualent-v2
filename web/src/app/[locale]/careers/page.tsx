import { Section } from "@/components/layout";
import { PageHero, H2, CheckList, Callout, CTA } from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Careers" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function CareersPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Careers");

  const values = [1, 2, 3, 4].map((n) => ({
    title: t(`value${n}Title` as "value1Title"),
    text: t(`value${n}Description` as "value1Description"),
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroHeading")}
        lede={t("heroDescription")}
      />

      <Section>
        <H2>{t("whatItsLikeHeading")}</H2>
        <div className="grid gap-4 md:grid-cols-2">
          {values.map((v) => (
            <div key={v.title} className="rounded-xl bg-lime-soft p-6">
              <h3 className="pl-h3">{v.title}</h3>
              <p className="mt-2 text-[15px] leading-normal text-ink-muted">{v.text}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="subtle" narrow>
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <H2>{t("lookingForHeading")}</H2>
            <p className="-mt-4 mb-4 text-[17px] leading-relaxed text-ink-muted">
              {t("lookingForIntro")}
            </p>
            <CheckList
              items={[1, 2, 3, 4, 5].map((n) => t(`lookingForItem${n}` as "lookingForItem1"))}
            />
          </div>
          <Callout tone="label" eyebrow={t("openPositionsHeading")}>
            <p className="text-[17px] leading-relaxed text-ink-muted">
              {t("openPositionsEmpty")}
            </p>
          </Callout>
        </div>
      </Section>

      <CTA title={t("ctaHeading")} sub={t("ctaDescription")} button={t("ctaButton")} />
    </>
  );
}
