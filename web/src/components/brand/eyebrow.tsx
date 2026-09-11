import { cn } from "@/lib/utils";

type Tone = "brand" | "muted" | "inverse" | "lime";

const tones: Record<Tone, string> = {
  brand: "text-pickle",
  muted: "text-ink-muted",
  inverse: "text-paper",
  lime: "text-lime-bright",
};

/**
 * Condensed caps label. The only place uppercase is allowed in the brand —
 * DIAGNOSIS:, AMOUNT PER SERVING, OUR GUARANTEE.
 */
export function Eyebrow({
  children,
  tone = "brand",
  className,
  as: Tag = "span",
}: {
  children: React.ReactNode;
  tone?: Tone;
  className?: string;
  as?: "span" | "p" | "div";
}) {
  return (
    <Tag
      className={cn(
        "font-condensed text-sm font-semibold uppercase tracking-[0.06em] leading-none",
        tones[tone],
        className
      )}
    >
      {children}
    </Tag>
  );
}
