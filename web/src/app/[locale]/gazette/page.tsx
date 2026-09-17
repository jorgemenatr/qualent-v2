import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import {
  Paper,
  GazetteFooter,
  Masthead,
  NewsCard,
  NewsRule,
  Kicker,
  LlamaQuote,
  AdBreak,
  Letters,
  Classifieds,
} from "@/components/gazette";
import { getFrontPage } from "@/lib/gazette";
import { SubscribeForm } from "./subscribe-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gazette" });
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function GazettePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gazette");
  const { issue, lead, rest, older, column } = getFrontPage();

  return (
    <Paper>
      <Masthead issue={issue} />

      {/* Above the fold: the lead, and a rail of everything else filed today. */}
      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)]">
        {lead ? <NewsCard story={lead} size="lg" /> : null}

        <div className="grid content-start gap-5 lg:border-l lg:border-news-rule lg:pl-7">
          {/* The pull quote is the lead story's own, so it changes with the issue. */}
          {lead?.meta.quote ? (
            <LlamaQuote context={lead.meta.quote_context ?? t("nameplate")}>
              {lead.meta.quote}
            </LlamaQuote>
          ) : null}

          {rest.map((story) => (
            <div key={story.slug} className="grid gap-5">
              <NewsCard story={story} size="sm" art={false} />
              <NewsRule dashed />
            </div>
          ))}

          <div className="grid gap-2">
            <Kicker section={t("subscribeLabel")} className="justify-self-start" />
            <p className="dl-body">{t("subscribeText")}</p>
            <SubscribeForm />
            <p className="dl-small text-ink-faint">{t("subscribeNote")}</p>
          </div>
        </div>
      </div>

      <AdBreak kind="pharma" wide />

      {/* Back issues, four across. */}
      {older.length ? (
        <section className="grid gap-4">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <Kicker section={t("previouslyLabel")} topic={t("previouslyTopic")} />
            <Link href="/gazette/archive" className="dl-dateline text-ink hover:underline">
              {t("allIssues")}
            </Link>
          </div>
          <NewsRule />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {older.map((story) => (
              <NewsCard key={story.slug} story={story} size="sm" art={false} />
            ))}
          </div>
        </section>
      ) : null}

      <div className="grid items-start gap-9 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <Letters limit={3} />

        {column ? (
          <div className="grid content-start gap-3.5 border border-rule-strong bg-white p-6">
            <Kicker
              section={t("realColumnLabel")}
              topic={t("realColumnTopic")}
              className="justify-self-start"
            />
            <h3 className="dl-h3">{column.meta.title}</h3>
            <p className="dl-body text-ink-muted">{column.meta.description}</p>
            <Link
              href={`/gazette/${column.slug}`}
              className="dl-dateline text-ink hover:underline"
            >
              {t("readColumn")}
            </Link>
          </div>
        ) : null}
      </div>

      <Classifieds />

      <div className="flex justify-center">
        <Button variant="outline" asChild className="rounded-none">
          <Link href="/gazette/letters">
            {t("writeToEditor")} <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <GazetteFooter />
    </Paper>
  );
}
