import { Link } from "@/i18n/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, Clock } from "lucide-react";
import { Section } from "@/components/layout";
import { Eyebrow } from "@/components/brand";
import { PageHero, H2, CTA } from "@/components/page";
import { getAllContent } from "@/lib/content";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Learn" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function LearnPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Learn");
  const reports = getAllContent("reports");

  return (
    <>
      <PageHero
        eyebrow={t("heroEyebrow")}
        title={t("heroHeading")}
        lede={t("heroDescription")}
      />

      <Section>
        <H2>{t("reportsHeading")}</H2>

        {reports.length > 0 ? (
          <>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reports.map((report) => (
                <article
                  key={report.slug}
                  className="flex flex-col gap-3 rounded-xl border border-border bg-white p-6"
                >
                  <Eyebrow tone="muted">
                    {new Date(report.meta.date).toLocaleDateString(
                      locale === "es" ? "es-MX" : "en-US",
                      { month: "short", day: "numeric", year: "numeric" }
                    )}
                  </Eyebrow>
                  <h3 className="pl-h3">{report.meta.title}</h3>
                  <p className="text-[15px] leading-normal text-ink-muted">
                    {report.meta.description}
                  </p>
                  <span className="flex items-center gap-1.5 text-[13px] text-ink-faint">
                    <Clock className="size-3.5" />
                    {report.readingTime}
                  </span>
                  <Link
                    href={`/learn/reports/${report.slug}`}
                    className="mt-auto inline-flex items-center gap-1.5 pt-2 text-sm font-semibold text-pickle-deep hover:underline"
                  >
                    {t("readMoreButton")} <ArrowRight className="size-4" />
                  </Link>
                </article>
              ))}
            </div>
            <p className="mt-10 rounded-xl border-[1.5px] border-dashed border-rule-strong p-6 text-center text-[15px] text-ink-muted">
              {t("reportsMoreMessage")}
            </p>
          </>
        ) : (
          <p className="rounded-xl border-[1.5px] border-dashed border-rule-strong p-8 text-center text-ink-muted">
            {t("reportsEmptyMessage")}
          </p>
        )}
      </Section>

      <CTA title={t("ctaHeading")} sub={t("ctaDescription")} button={t("ctaButton")} />
    </>
  );
}
