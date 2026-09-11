import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { Section, SectionHead } from "@/components/layout";
import { Eyebrow, Figure } from "@/components/brand";
import { CTA } from "@/components/page";
import { getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Proof" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ProofPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Proof");

  const studies = getAllContent("case-studies").filter((s) => !s.meta.unlisted);

  const stats = [
    { value: t("statProjectsNum"), label: t("statProjectsLabel") },
    { value: t("statCostNum"), label: t("statCostLabel") },
    { value: t("statRoiNum"), label: t("statRoiLabel") },
  ];

  return (
    <>
      <Section narrow className="border-t-0 pt-[72px]">
        <SectionHead
          eyebrow={t("heroEyebrow")}
          title={t("heroHeadline")}
          sub={t("heroDescription")}
        />
        <div className="mx-auto grid max-w-[640px] grid-cols-3 gap-6 border-t-[1.5px] border-dashed border-rule-strong pt-6">
          {stats.map((stat) => (
            <Figure
              key={stat.label}
              value={stat.value}
              label={stat.label}
              valueClassName="text-[2rem]"
            />
          ))}
        </div>
      </Section>

      <Section className="border-t-0 pt-0">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {studies.map((study) => {
            const headline = study.meta.metrics?.[0];
            return (
              <article
                key={study.slug}
                className="flex flex-col gap-3.5 rounded-xl border border-border bg-white p-6"
              >
                <div className="flex items-center justify-between gap-3">
                  <Eyebrow tone="muted">
                    {study.meta.client || study.meta.industry}
                  </Eyebrow>
                  {study.meta.industry && study.meta.client ? (
                    <span className="rounded-full bg-lime-soft px-2.5 py-0.5 text-xs font-semibold text-pickle-deep">
                      {study.meta.industry}
                    </span>
                  ) : null}
                </div>

                <h2 className="pl-h3">{study.meta.title}</h2>

                {headline ? (
                  <Figure
                    value={headline.value}
                    label={headline.label}
                    valueClassName="text-[2.25rem]"
                  />
                ) : null}

                <p className="text-[15px] leading-normal text-ink-muted">
                  {study.meta.description}
                </p>

                <Link
                  href={`/proof/${study.slug}`}
                  className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-pickle-deep hover:underline"
                >
                  {t("readCaseStudyButton")} <ArrowRight className="size-4" />
                </Link>
              </article>
            );
          })}
        </div>
        <p className="mt-8 text-center text-sm text-ink-faint">{t("sectionNote")}</p>
      </Section>

      <CTA
        title={t("ctaHeading")}
        sub={t("ctaDescription")}
        button={t("ctaButton")}
      />
    </>
  );
}
