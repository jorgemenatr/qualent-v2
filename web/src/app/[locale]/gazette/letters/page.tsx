import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import {
  Paper,
  GazetteFooter,
  MastheadCompact,
  NewsRule,
  Kicker,
  Letters,
  AdBreak,
} from "@/components/gazette";
import { LetterForm } from "./letter-form";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Gazette" });
  return { title: t("lettersMetaTitle"), description: t("lettersTopic") };
}

export default async function GazetteLettersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Gazette");

  return (
    <Paper>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <MastheadCompact />
        <Kicker section={t("lettersLabel")} topic={t("toTheEditor")} />
      </div>
      <NewsRule thick />

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
        <div className="grid gap-6">
          <h1 className="dl-h1">{t("lettersHeadline")}</h1>
          <Letters heading={false} />
        </div>

        <aside className="grid content-start gap-5 border-[1.5px] border-rule-strong bg-white p-7">
          <Kicker section={t("writeInLabel")} className="justify-self-start" />
          <LetterForm />
        </aside>
      </div>

      <AdBreak kind="farms" wide />
      <GazetteFooter />
    </Paper>
  );
}
