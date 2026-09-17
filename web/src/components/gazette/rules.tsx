import { cn } from "@/lib/utils";

/**
 * Newspaper furniture: the rules, labels and bands that make the page read as
 * printed. Everything here is square-cornered by design — newsprint has no
 * radius — and the black label is the only place uppercase runs long.
 */
export function NewsRule({
  thick = false,
  dashed = false,
  className,
}: {
  thick?: boolean;
  dashed?: boolean;
  className?: string;
}) {
  if (dashed) {
    return (
      <div
        role="separator"
        className={cn("border-t border-dashed border-rule-strong", className)}
      />
    );
  }
  return (
    <div
      role="separator"
      className={cn("bg-news-rule", thick ? "h-1" : "h-px", className)}
    />
  );
}

export function Kicker({
  section,
  topic,
  tone,
  className,
}: {
  section: string;
  topic?: string;
  tone?: "ad" | "breaking";
  className?: string;
}) {
  return (
    <span className={cn("dl-kicker inline-flex flex-wrap items-center gap-2", className)}>
      <span
        className={cn(
          "px-2 py-1.5",
          tone === "ad"
            ? "border border-rule-strong text-ink-muted"
            : "text-news-paper",
          tone === "breaking" && "bg-news-red",
          !tone && "bg-news-ink"
        )}
      >
        {section}
      </span>
      {topic ? <span className="text-pickle">{topic}</span> : null}
    </span>
  );
}

export function Dateline({
  place,
  byline,
  time,
  className,
}: {
  place?: string;
  byline: string;
  time?: string;
  className?: string;
}) {
  return (
    <div className={cn("dl-dateline flex flex-wrap items-center gap-2", className)}>
      {place ? <span className="text-ink">{place}</span> : null}
      {place ? <span aria-hidden>—</span> : null}
      <span>{byline}</span>
      {time ? (
        <>
          <span aria-hidden>·</span>
          <span>{time}</span>
        </>
      ) : null}
    </div>
  );
}

/** He is quoted sparingly, in seven words or fewer, and always set apart. */
export function LlamaQuote({
  children,
  context,
  className,
}: {
  children: React.ReactNode;
  context: string;
  className?: string;
}) {
  return (
    <figure
      className={cn(
        "m-0 grid gap-2.5 border-t-4 border-b border-news-rule px-5 py-5 text-center sm:px-7",
        className
      )}
    >
      <blockquote className="dl-quote m-0 text-ink">&ldquo;{children}&rdquo;</blockquote>
      <figcaption className="dl-kicker tracking-[0.1em] text-ink-muted">
        {context}
      </figcaption>
    </figure>
  );
}

/** Closes every ad. The right side is the only CTA he is permitted. */
export function DisclaimerBand({
  left,
  right,
  tone = "ink",
  className,
}: {
  left: string;
  right: string;
  tone?: "ink" | "red" | "green" | "paper";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap justify-between gap-x-4 gap-y-1 px-3 py-2 text-[11px] leading-snug font-normal tracking-[0.06em] uppercase",
        tone === "ink" && "bg-news-ink text-news-paper",
        tone === "red" && "bg-news-red text-white",
        tone === "green" && "bg-pickle text-white",
        tone === "paper" && "bg-paper-deep text-ink-muted",
        className
      )}
      style={{ fontFamily: "var(--font-archivo, sans-serif)" }}
    >
      <span>{left}</span>
      <span className="opacity-80">{right}</span>
    </div>
  );
}
