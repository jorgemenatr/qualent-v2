import { Check, Minus, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Eyebrow, Mascot, MascotWatermark, type MascotVariant } from "@/components/brand";

/**
 * Inner-page hero. One mascot pose per page — lab coat on the process and
 * diagnostic pages, farm on partnership and who-we-work-with, standing on
 * About. Without a pose it falls back to the watermark.
 */
export function PageHero({
  eyebrow,
  title,
  lede,
  cost,
  mascot,
  center = false,
  children,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  lede?: React.ReactNode;
  cost?: React.ReactNode;
  mascot?: MascotVariant;
  center?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border pb-[clamp(40px,6vw,64px)] pt-[clamp(56px,8vw,96px)]">
      {!mascot && <MascotWatermark />}
      <div
        className={cn(
          "pl-container relative grid items-center gap-10",
          mascot && "md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]"
        )}
      >
        <div
          className={cn(
            "grid max-w-[760px] gap-5",
            center ? "mx-auto justify-items-center text-center" : "justify-items-start"
          )}
        >
          {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
          <h1 className="text-[clamp(2rem,1.4rem+2.4vw,3.25rem)] font-bold leading-snug tracking-[-0.015em] text-balance">
            {title}
          </h1>
          {lede ? <p className="pl-lede max-w-[640px] text-ink-muted">{lede}</p> : null}
          {cost ? (
            <p className="inline-flex items-center gap-2.5 rounded-md bg-lime-soft px-3.5 py-2 text-base font-semibold text-pickle-deep">
              {cost}
            </p>
          ) : null}
          {children}
        </div>
        {mascot ? (
          <div className="hidden justify-center md:flex">
            <Mascot variant={mascot} size={mascot === "farm" ? 300 : 340} priority />
          </div>
        ) : null}
      </div>
    </section>
  );
}

export function Prose({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid max-w-[66ch] gap-[18px] text-[17px] leading-relaxed text-ink-muted",
        className
      )}
    >
      {children}
    </div>
  );
}

/** A paragraph that carries weight — the line the reader should keep. */
export function Strong({ children }: { children: React.ReactNode }) {
  return <p className="font-semibold text-ink">{children}</p>;
}

export function H2({
  children,
  eyebrow,
  className,
}: {
  children: React.ReactNode;
  eyebrow?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("mb-7 grid gap-2.5", className)}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="pl-h2">{children}</h2>
    </div>
  );
}

export function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="mt-3 text-[1.375rem] font-semibold leading-tight">{children}</h3>;
}

export function CheckList({
  items,
  tone = "brand",
}: {
  items: React.ReactNode[];
  tone?: "brand" | "danger";
}) {
  const Icon = tone === "danger" ? Minus : Check;
  return (
    <ul className="grid">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3 border-b border-border py-3 text-base leading-normal text-ink-muted"
        >
          <Icon
            className={cn(
              "mt-[3px] size-[18px] flex-none",
              tone === "danger" ? "text-coral" : "text-pickle"
            )}
            strokeWidth={2.5}
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Numbered only where the content is genuinely a sequence. */
export function NumberedList({
  items,
}: {
  items: { title: React.ReactNode; text: React.ReactNode; meta?: React.ReactNode }[];
}) {
  return (
    <ol className="grid gap-[18px]">
      {items.map((item, i) => (
        <li key={i} className="grid grid-cols-[40px_1fr] gap-4">
          <span className="grid size-10 place-items-center rounded-full bg-pickle font-condensed text-[17px] font-semibold text-white">
            {String(i + 1).padStart(2, "0")}
          </span>
          <div className="grid gap-1">
            <div className="flex flex-wrap items-baseline gap-3">
              <h3 className="pl-h3">{item.title}</h3>
              {item.meta ? <Eyebrow tone="muted">{item.meta}</Eyebrow> : null}
            </div>
            <p className="leading-normal text-ink-muted">{item.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function Callout({
  eyebrow,
  children,
  tone = "soft",
  className,
}: {
  eyebrow?: React.ReactNode;
  children: React.ReactNode;
  tone?: "soft" | "label";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid gap-3 p-7",
        tone === "label"
          ? "rounded-2xl border-[1.5px] border-rule-strong bg-white"
          : "rounded-xl bg-lime-soft",
        className
      )}
    >
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {children}
    </div>
  );
}

export function CTA({
  title,
  sub,
  button,
  href = "/talk",
  note,
  tone = "inverse",
}: {
  title: React.ReactNode;
  sub?: React.ReactNode;
  button: React.ReactNode;
  href?: string;
  note?: React.ReactNode;
  tone?: "inverse" | "plain";
}) {
  const inverse = tone === "inverse";
  return (
    <section
      className={cn(
        "border-t border-border py-[var(--section-y)]",
        inverse ? "bg-ink text-white" : "bg-paper"
      )}
    >
      <div className="mx-auto grid max-w-[600px] justify-items-center gap-4 px-[var(--gutter)] text-center">
        <h2
          className={cn(
            "text-[clamp(1.6rem,1.2rem+1.6vw,2.125rem)] font-bold leading-snug tracking-[-0.015em] text-balance",
            inverse && "text-white"
          )}
        >
          {title}
        </h2>
        {sub ? (
          <p
            className={cn(
              "text-[17px] leading-relaxed",
              inverse ? "text-llama" : "text-ink-muted"
            )}
          >
            {sub}
          </p>
        ) : null}
        <Button size="lg" variant={inverse ? "secondary" : "default"} asChild>
          <Link href={href}>
            {button} <ArrowRight className="size-4" />
          </Link>
        </Button>
        {note ? (
          <p className={cn("text-sm", inverse ? "text-llama" : "text-ink-faint")}>{note}</p>
        ) : null}
      </div>
    </section>
  );
}
