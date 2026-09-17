import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Wordmark } from "@/components/brand";
import { getCurrentIssue, volumeLine, editionDate, type Issue } from "@/lib/gazette";

/**
 * The nameplate. Newspaper convention: edition line, heavy rule, name set as
 * large as the page allows, then the est./price lines under a hairline.
 */
export async function Masthead({ issue }: { issue?: Issue }) {
  const t = await getTranslations("Gazette");
  const locale = await getLocale();
  const current = issue ?? getCurrentIssue();

  return (
    <header className="grid gap-2.5">
      <div className="dl-dateline flex flex-wrap justify-between gap-x-4 gap-y-1 tracking-[0.1em]">
        <span>{volumeLine(current)}</span>
        <span>{current ? editionDate(current.date, locale) : null}</span>
        <span>{t("price")}</span>
      </div>
      <div className="h-1 bg-news-rule" />
      <h1 className="dl-nameplate my-1.5 text-center">{t("nameplate")}</h1>
      <div className="dl-dateline flex flex-wrap justify-center gap-x-6 gap-y-1 text-center tracking-[0.1em]">
        <span>{t("established")}</span>
        <span aria-hidden className="hidden sm:inline">
          ·
        </span>
        <span>{t("tagline")}</span>
      </div>
      <div className="h-px bg-news-rule" />
    </header>
  );
}

/** Used on every page but the front, where the nameplate is a link home. */
export async function MastheadCompact({ className }: { className?: string }) {
  const t = await getTranslations("Gazette");
  return (
    <Link
      href="/gazette"
      className={cn("flex flex-wrap items-center gap-3.5", className)}
    >
      {/* The `font` shorthand in .dl-nameplate carries its own size, so the
          compact size has to be set after it rather than by a utility. */}
      <span className="dl-nameplate" style={{ fontSize: "1.75rem", lineHeight: 1 }}>
        {t("nameplate")}
      </span>
      <span className="dl-kicker text-ink-muted">{t("by")}</span>
      <Wordmark height={16} suffix="" />
    </Link>
  );
}
