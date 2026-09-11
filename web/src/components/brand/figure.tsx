import { cn } from "@/lib/utils";
import { Eyebrow } from "./eyebrow";

type Tone = "brand" | "lime" | "ink" | "inverse";

const tones: Record<Tone, string> = {
  brand: "text-pickle",
  lime: "text-lime-bright",
  ink: "text-ink",
  inverse: "text-paper",
};

/** A number that does the talking, with its unit underneath. */
export function Figure({
  value,
  label,
  tone = "brand",
  className,
  valueClassName,
}: {
  value: React.ReactNode;
  label?: React.ReactNode;
  tone?: Tone;
  className?: string;
  valueClassName?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span
        className={cn(
          "text-[2.5rem] font-bold leading-none tracking-[-0.02em]",
          tones[tone],
          valueClassName
        )}
      >
        {value}
      </span>
      {label ? <Eyebrow tone="muted">{label}</Eyebrow> : null}
    </div>
  );
}
