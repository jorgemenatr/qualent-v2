import { cn } from "@/lib/utils";

type Tone = "danger" | "brand" | "ink";

const tones: Record<Tone, string> = {
  danger: "text-coral border-coral",
  brand: "text-pickle border-pickle",
  ink: "text-ink border-ink",
};

/**
 * Rubber-stamp badge from the mug labels — TREATABLE, EXAMPLE, NOT A DRUG.
 * Tilted, condensed caps, hairline box. One per surface.
 */
export function Stamp({
  children,
  tone = "danger",
  tilt = -3,
  className,
}: {
  children: React.ReactNode;
  tone?: Tone;
  tilt?: number;
  className?: string;
}) {
  return (
    <span
      style={{ transform: `rotate(${tilt}deg)` }}
      className={cn(
        "inline-block rounded-[3px] border-2 px-2.5 py-1",
        "font-condensed text-[1.125rem] font-bold uppercase leading-none tracking-[0.04em]",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
