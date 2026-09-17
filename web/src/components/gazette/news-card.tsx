import Image from "next/image";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import type { ContentItem } from "@/lib/content";
import { filedDate } from "@/lib/gazette";
import { Kicker, Dateline } from "./rules";

const SIZE = {
  lg: { head: "dl-h1", art: "aspect-[16/9]" },
  md: { head: "dl-h2", art: "aspect-[4/3]" },
  sm: { head: "dl-h3", art: "aspect-[4/3]" },
} as const;

/**
 * One filed story. The headline is the link — the whole card is clickable but
 * the anchor stays on the words, so the link text reads as the headline.
 */
export async function NewsCard({
  story,
  size = "md",
  art = true,
  className,
}: {
  story: ContentItem;
  size?: keyof typeof SIZE;
  art?: boolean;
  className?: string;
}) {
  const t = await getTranslations("Gazette");
  const locale = await getLocale();
  const { meta, slug } = story;
  const s = SIZE[size];
  const showArt = art && Boolean(meta.art);
  const archival = meta.tone === "archival";

  return (
    <article className={cn("grid content-start gap-3", className)}>
      {showArt ? (
        <div
          className={cn(
            "relative grid place-items-center overflow-hidden bg-lime-soft",
            s.art
          )}
        >
          <Image
            src={`/brand/mascot/${meta.art}`}
            alt=""
            fill
            sizes={size === "lg" ? "(max-width: 768px) 100vw, 60vw" : "(max-width: 768px) 100vw, 30vw"}
            className={cn("object-contain p-4", archival && "dl-halftone")}
          />
          {archival ? (
            <span aria-hidden className="dl-halftone-overlay absolute inset-0" />
          ) : null}
        </div>
      ) : null}

      <Kicker
        section={meta.section ?? "News"}
        topic={meta.topic}
        tone={meta.tone === "breaking" ? "breaking" : undefined}
      />

      <h3 className={s.head}>
        <Link
          href={`/gazette/${slug}`}
          className="decoration-pickle decoration-2 underline-offset-4 hover:underline"
        >
          {meta.title}
        </Link>
      </h3>

      {meta.description ? (
        <p className="dl-body text-ink-muted">{meta.description}</p>
      ) : null}

      <Dateline
        place={meta.place}
        byline={meta.byline ?? t("byline")}
        time={meta.date ? filedDate(meta.date, locale) : undefined}
      />
    </article>
  );
}

