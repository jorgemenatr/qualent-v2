import { MascotWatermark } from "@/components/brand";

/**
 * Home hero backdrop. The brand drops the old blurred gradient blobs in favour
 * of the two mascot halves as a 14% watermark, hidden under 768px.
 */
export function HeroBackground() {
  return <MascotWatermark />;
}
