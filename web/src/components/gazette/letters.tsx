import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { LETTERS, CLASSIFIEDS } from "@/lib/gazette";
import { Kicker, NewsRule } from "./rules";

/**
 * Readers write in. He answers in seven words or fewer — the reply is set in
 * the reporting face at green, so the eye finds the answer before the story.
 */
export async function Letters({
  limit,
  heading = true,
  className,
}: {
  limit?: number;
  /** Off where the page already carries the headline, so it is not said twice. */
  heading?: boolean;
  className?: string;
}) {
  const t = await getTranslations("Gazette");
  const items = limit ? LETTERS.slice(0, limit) : LETTERS;

  return (
    <section className={cn("grid gap-4", className)}>
      {heading ? (
        <Kicker
          section={t("lettersLabel")}
          topic={t("lettersTopic")}
          className="justify-self-start"
        />
      ) : null}
      <div className="md:columns-2 md:gap-8 md:[column-rule:1px_solid_var(--border)]">
        {items.map((item) => (
          <div
            key={item.place}
            className="mb-4 grid gap-2 break-inside-avoid border-b border-dashed border-rule-strong pb-4"
          >
            <p className="dl-small text-[0.875rem] leading-normal">
              <b className="text-[0.75rem] tracking-[0.04em] uppercase">
                {item.place} —
              </b>{" "}
              {item.letter}
            </p>
            <p className="flex gap-2 text-[1rem] leading-tight font-extrabold text-pickle [font-family:var(--font-archivo,sans-serif)] [font-stretch:85%]">
              <span className="pt-[3px] text-[0.6875rem] font-semibold tracking-[0.1em] text-ink-faint">
                {t("theLlama")}
              </span>
              {item.reply}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

/** Dense, monospaced, deadpan. The cheapest page in the paper. */
export async function Classifieds({ className }: { className?: string }) {
  const t = await getTranslations("Gazette");
  return (
    <section className={cn("grid gap-3", className)}>
      <Kicker section={t("classifiedsLabel")} className="justify-self-start" />
      <NewsRule />
      <div className="dl-classified sm:columns-2 sm:gap-5 lg:columns-3 [column-rule:1px_solid_var(--border)]">
        {CLASSIFIEDS.map((entry) => {
          const i = entry.indexOf(":");
          return (
            <p
              key={entry}
              className="mb-2.5 break-inside-avoid border-b border-dotted border-rule-strong pb-2.5"
            >
              <b>{entry.slice(0, i + 1)}</b>
              {entry.slice(i + 1)}
            </p>
          );
        })}
      </div>
    </section>
  );
}
