import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  Paper,
  GazetteFooter,
  MastheadCompact,
  NewsRule,
  Kicker,
  NewsCard,
} from "@/components/gazette";
import { getIssues, getStoriesByIssue, editionDate } from "@/lib/gazette";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gazette" });
  return { title: t("archiveMetaTitle"), description: t("metaDescription") };
}

export default async function GazetteArchivePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gazette");
  const issues = getIssues();

  return (
    <Paper>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MastheadCompact />
        <Kicker section={t("archiveLabel")} topic={t("archiveTopic")} />
      </div>
      <NewsRule thick />

      {issues.map((issue) => {
        const stories = getStoriesByIssue(issue.number);
        return (
          <section key={issue.number} className="grid gap-4">
            <div className="grid items-baseline gap-x-6 gap-y-1 sm:grid-cols-[minmax(0,180px)_1fr]">
              <span
                className="dl-nameplate normal-case"
                style={{ fontSize: "clamp(2.5rem,7vw,4rem)", lineHeight: 0.9 }}
              >
                {t("issueNo", { n: issue.number })}
              </span>
              <div className="grid gap-1">
                <h2 className="dl-h2">{issue.name}</h2>
                <span className="dl-dateline">
                  {editionDate(issue.date, locale)} ·{" "}
                  {t("issueSummary", { count: stories.length })}
                </span>
              </div>
            </div>
            <NewsRule />
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {stories.map((story) => (
                <NewsCard key={story.slug} story={story} size="sm" art={false} />
              ))}
            </div>
          </section>
        );
      })}

      <GazetteFooter />
    </Paper>
  );
}
