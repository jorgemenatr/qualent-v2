import { Section } from "@/components/layout";
import { Eyebrow } from "@/components/brand";
import { PageHero, Prose, CTA } from "@/components/page";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "ControversialOpinions" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function OpinionsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("ControversialOpinions");

  // opinion 2 is a single paragraph; the rest run to two.
  const opinions = [1, 2, 3, 4, 5, 6].map((n) => ({
    n,
    title: t(`opinion${n}Title` as "opinion1Title"),
    subtitle: t(`opinion${n}Subtitle` as "opinion1Subtitle"),
    paras:
      n === 2
        ? [t("opinion2Paragraph1")]
        : [
            t(`opinion${n}Paragraph1` as "opinion1Paragraph1"),
            t(`opinion${n}Paragraph2` as "opinion1Paragraph2"),
          ],
  }));

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroHeading")}
        lede={t("heroDescription")}
      />

      {opinions.map((o, i) => (
        <Section key={o.n} tone={i % 2 === 1 ? "subtle" : "default"} narrow>
          <div className="grid gap-2.5 md:grid-cols-[7rem_1fr] md:gap-10">
            <Eyebrow tone="muted" className="md:pt-1.5">
              {t("opinionLabel", { n: String(o.n).padStart(2, "0") })}
            </Eyebrow>
            <div>
              <h2 className="pl-h2">{o.title}</h2>
              <p className="mt-1.5 text-[17px] font-semibold text-pickle">{o.subtitle}</p>
              <Prose className="mt-5">
                {o.paras.map((p, j) => (
                  <p key={j}>{p}</p>
                ))}
              </Prose>
            </div>
          </div>
        </Section>
      ))}

      <CTA title={t("ctaHeading")} sub={t("ctaDescription")} button={t("ctaButton")} />
    </>
  );
}
