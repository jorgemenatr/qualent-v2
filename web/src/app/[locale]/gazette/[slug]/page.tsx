import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { routing } from "@/i18n/routing";
import {
  Paper,
  GazetteFooter,
  MastheadCompact,
  NewsRule,
  Kicker,
  Dateline,
  LlamaQuote,
  DisclaimerBand,
  NewsCard,
  AdBreak,
  StoryBody,
} from "@/components/gazette";
import {
  getStory,
  getStories,
  getStoriesByIssue,
  getCurrentIssue,
  volumeLine,
  editionDate,
  CAST,
} from "@/lib/gazette";
import { Share } from "./share";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    getStories().map((story) => ({ locale, slug: story.slug }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const story = getStory(slug);
  if (!story) return {};
  const t = await getTranslations({ locale, namespace: "Gazette" });
  return {
    title: `${story.meta.title} | ${t("nameplate")}`,
    description: story.meta.description,
  };
}

export default async function GazetteArticlePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gazette");

  const story = getStory(slug);
  if (!story) notFound();

  const { meta, content } = story;
  const issue = getCurrentIssue();
  const inThisIssue = getStoriesByIssue(meta.issue ?? 0).filter(
    (s) => s.slug !== slug
  );
  const isColumn = meta.section === "From the desk of";

  return (
    <Paper>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MastheadCompact />
        <span className="dl-dateline">
          {volumeLine(issue)} · {issue ? editionDate(issue.date, locale) : null}
        </span>
      </div>
      <NewsRule thick />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <article className="grid min-w-0 gap-5">
          <Kicker
            section={meta.section ?? "News"}
            topic={meta.topic}
            tone={meta.tone === "breaking" ? "breaking" : undefined}
            className="justify-self-start"
          />

          <h1 className="dl-h1">{meta.title}</h1>

          {meta.description ? (
            <p className="dl-body text-[1.1875rem] text-ink-muted">
              {meta.description}
            </p>
          ) : null}

          <Dateline
            place={meta.place}
            byline={meta.byline ?? t("byline")}
            time={meta.filed_at}
          />

          {meta.art ? (
            <figure className="m-0 grid gap-0">
              <div className="relative grid aspect-[16/9] place-items-center bg-lime-soft">
                <Image
                  src={`/brand/mascot/${meta.art}`}
                  alt={meta.caption ?? ""}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  priority
                  className={
                    meta.tone === "archival"
                      ? "dl-halftone object-contain p-6"
                      : "object-contain p-6"
                  }
                />
                {meta.tone === "archival" ? (
                  <span aria-hidden className="dl-halftone-overlay absolute inset-0" />
                ) : null}
              </div>
              {meta.caption ? (
                <figcaption className="dl-small bg-news-ink px-3 py-1.5 text-[11px] tracking-[0.06em] text-news-paper uppercase">
                  {meta.caption}
                </figcaption>
              ) : null}
            </figure>
          ) : null}

          <StoryBody source={content} column={isColumn} />

          {meta.quote ? (
            <LlamaQuote context={meta.quote_context ?? t("nameplate")}>
              {meta.quote}
            </LlamaQuote>
          ) : null}

          {meta.sponsored ? (
            <DisclaimerBand
              left={meta.sponsored}
              right={t("askYourBoss")}
              tone="paper"
            />
          ) : null}

          <div className="dl-dateline flex flex-wrap items-center gap-2">
            <span>{t("shareLabel")}</span>
            <Share title={meta.title} />
            {meta.filed_under ? (
              <span className="ms-auto">
                {t("filedUnder", { topic: meta.filed_under })}
              </span>
            ) : null}
          </div>
        </article>

        <aside className="grid min-w-0 content-start gap-6 lg:border-l lg:border-news-rule lg:pl-7">
          {/* The editor picks the ad break in frontmatter; the column gets the
              PSA, everything else the injury lawyer, unless told otherwise. */}
          <AdBreak kind={meta.ad ?? (isColumn ? "farms" : "lawyer")} />

          {inThisIssue.length ? (
            <div className="grid gap-3.5">
              <Kicker
                section={t("moreLabel")}
                topic={t("moreTopic")}
                className="justify-self-start"
              />
              {inThisIssue.map((s) => (
                <div key={s.slug} className="grid gap-3.5">
                  <NewsCard story={s} size="sm" art={false} />
                  <NewsRule dashed />
                </div>
              ))}
            </div>
          ) : null}

          <div className="grid gap-2.5">
            <Kicker
              section={t("castLabel")}
              topic={t("castTopic")}
              className="justify-self-start"
            />
            {CAST.map(([name, desc]) => (
              <p key={name} className="dl-small text-[0.875rem]">
                <b>{name}</b> — {desc}
              </p>
            ))}
          </div>
        </aside>
      </div>

      <GazetteFooter />
    </Paper>
  );
}
