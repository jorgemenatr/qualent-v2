import Image from "next/image";
import { cn } from "@/lib/utils";

const POSES = {
  full: { src: "/brand/logo/picklellama-mark-wordmark.svg", w: 600, h: 760 },
  square: { src: "/brand/logo/picklellama-square.png", w: 512, h: 512 },
  animated: { src: "/brand/logo/picklellama-animated.gif", w: 512, h: 512 },
  standing: { src: "/brand/mascot/pose-standing.png", w: 1024, h: 1536 },
  labcoat: { src: "/brand/mascot/pose-labcoat.png", w: 1024, h: 1536 },
  farm: { src: "/brand/mascot/scene-farm.png", w: 1024, h: 1536 },
} as const;

export type MascotVariant = keyof typeof POSES;

/**
 * One character per page. Lab coat on process/diagnostic pages, farm scene on
 * partnership and who-we-work-with, plain standing on About.
 * Never recoloured, outlined or flipped. Keep to 600px tall on screen.
 */
export function Mascot({
  variant = "square",
  size = 120,
  priority = false,
  className,
}: {
  variant?: MascotVariant;
  size?: number;
  priority?: boolean;
  className?: string;
}) {
  const pose = POSES[variant];
  return (
    <Image
      src={pose.src}
      alt=""
      aria-hidden
      width={pose.w}
      height={pose.h}
      priority={priority}
      unoptimized={variant === "animated"}
      className={cn("w-auto", variant === "square" && "rounded-[12%]", className)}
      style={{ height: size }}
    />
  );
}

/**
 * Hero watermark: the two mascot halves at 14%, hidden under 768px.
 * Replaces the blurred gradient blobs the old build used.
 */
export function MascotWatermark({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "pointer-events-none absolute inset-0 hidden select-none overflow-hidden md:block",
        className
      )}
    >
      <Image
        src="/brand/mascot/llama-left.svg"
        alt=""
        width={180}
        height={600}
        className="absolute bottom-0 left-0 h-[78%] w-auto opacity-[0.14]"
      />
      <Image
        src="/brand/mascot/llama-right.svg"
        alt=""
        width={180}
        height={600}
        className="absolute right-0 top-0 h-[78%] w-auto opacity-[0.14]"
      />
    </div>
  );
}
