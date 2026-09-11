import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/brand";

type Tone = "default" | "subtle" | "soft" | "loud" | "inverse" | "brand";

const tones: Record<Tone, string> = {
  default: "bg-paper text-ink",
  subtle: "bg-paper-deep text-ink",
  soft: "bg-lime-soft text-ink",
  loud: "bg-lime-loud text-pickle-deep",
  inverse: "bg-ink text-paper",
  brand: "bg-pickle text-white",
};

/**
 * One band of the page. Bands are separated by a hairline and carry generous
 * vertical padding; the accent tones appear once each per page at most.
 */
export function Section({
  tone = "default",
  narrow = false,
  className,
  innerClassName,
  id,
  children,
}: {
  tone?: Tone;
  narrow?: boolean;
  className?: string;
  innerClassName?: string;
  id?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "border-t border-border py-[var(--section-y)]",
        tones[tone],
        className
      )}
    >
      <div
        className={cn(
          narrow ? "pl-container-narrow" : "pl-container",
          innerClassName
        )}
      >
        {children}
      </div>
    </section>
  );
}

export function SectionHead({
  eyebrow,
  title,
  sub,
  align = "center",
  inverse = false,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  sub?: React.ReactNode;
  align?: "center" | "left";
  inverse?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "grid max-w-[640px] gap-3",
        align === "center" ? "mx-auto mb-10 text-center" : "mb-10",
        className
      )}
    >
      {eyebrow ? <Eyebrow tone={inverse ? "lime" : "brand"}>{eyebrow}</Eyebrow> : null}
      <h2 className="pl-h2">{title}</h2>
      {sub ? (
        <p className={cn("pl-lede", inverse ? "text-llama" : "text-ink-muted")}>
          {sub}
        </p>
      ) : null}
    </div>
  );
}
