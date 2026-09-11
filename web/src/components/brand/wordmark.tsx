import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The wordmark is hand-lettered — always the SVG, never set in type.
 * ".Studio" is the one part that is typeset (Source Sans 3 600).
 */
export function Wordmark({
  height = 26,
  suffix = ".Studio",
  className,
}: {
  height?: number;
  suffix?: string | null;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-baseline gap-0.5", className)}>
      <Image
        src="/brand/logo/wordmark.svg"
        alt="PickleLlama"
        width={Math.round(height * 6.4)}
        height={height}
        priority
        style={{ height, width: "auto", transform: "translateY(1px)" }}
      />
      {suffix ? (
        <span
          className="font-semibold tracking-[-0.02em] text-ink"
          style={{ fontSize: height * 0.82 }}
        >
          {suffix}
        </span>
      ) : null}
    </span>
  );
}
