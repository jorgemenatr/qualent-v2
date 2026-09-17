import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { cn } from "@/lib/utils";
import { Kicker, DisclaimerBand } from "./rules";

export type AdKind = "pharma" | "farms" | "political" | "lawyer";

/**
 * One inline ad break per page. Four grammars, all of them parodies of the
 * formats our readers already scroll past: the drug ad, the animal-rights PSA,
 * the attack ad, and the late-night injury lawyer. Every one closes on the
 * same piece of fine print, which is the only CTA he is allowed.
 */
export async function AdBreak({
  kind = "pharma",
  wide = false,
  className,
}: {
  kind?: AdKind;
  /** Full-measure ads carry the art; the ones in a rail are text only. */
  wide?: boolean;
  className?: string;
}) {
  const t = await getTranslations("Gazette");
  const cta = t("askYourBoss");
  const frame = "grid border-[1.5px] border-rule-strong";

  if (kind === "pharma") {
    return (
      <aside className={cn(frame, className)}>
        <div className={cn("grid items-center gap-4 bg-white p-5", wide && "sm:grid-cols-[1fr_auto]")}>
          <div className="grid gap-1.5">
            <Kicker section={t("advertisement")} tone="ad" className="justify-self-start" />
            <p className="dl-h2 text-pickle uppercase">{t("adPharmaHead")}</p>
            <p className="dl-body text-ink-muted">{t("adPharmaSub")}</p>
          </div>
          <Image
            src="/brand/mascot/pose-labcoat.png"
            alt=""
            width={140}
            height={140}
            className={cn("h-[120px] w-auto justify-self-end object-contain", wide ? "hidden sm:block" : "hidden")}
          />
        </div>
        <DisclaimerBand left={t("adPharmaBand")} right={cta} tone="green" />
      </aside>
    );
  }

  if (kind === "farms") {
    return (
      <aside className={cn(frame, className)}>
        <div className={cn("grid items-center gap-4 bg-lime-soft p-5", wide && "sm:grid-cols-[auto_1fr]")}>
          <Image
            src="/brand/mascot/scene-farm.png"
            alt=""
            width={140}
            height={140}
            className={cn("h-[110px] w-auto object-contain", wide ? "hidden sm:block" : "hidden")}
          />
          <div className="grid gap-1.5">
            <Kicker section={t("publicService")} tone="ad" className="justify-self-start" />
            <p className="dl-h2 text-pickle-deep uppercase">{t("adFarmsHead")}</p>
            <p className="dl-body text-ink-muted">{t("adFarmsSub")}</p>
          </div>
        </div>
        <DisclaimerBand left={t("adFarmsBand")} right={cta} tone="paper" />
      </aside>
    );
  }

  if (kind === "political") {
    return (
      <aside className={cn("grid bg-news-ink", className)}>
        <div className={cn("grid items-center gap-4 p-6", wide && "sm:grid-cols-[1fr_auto]")}>
          <div className="grid gap-2">
            <span className="dl-kicker text-news-red">{t("paidPolitical")}</span>
            <p className={cn("text-news-paper uppercase", wide ? "dl-h1" : "dl-h2")}>
              {t("adPoliticalHead")}
              <br />
              <span className="text-news-red">{t("adPoliticalHook")}</span>
            </p>
            <p className="dl-small text-llama">{t("adPoliticalSub")}</p>
          </div>
          <Image
            src="/brand/mascot/pose-standing.png"
            alt=""
            width={150}
            height={150}
            className={cn("h-[130px] w-auto justify-self-end object-contain grayscale contrast-[1.4] brightness-75", wide ? "hidden sm:block" : "hidden")}
          />
        </div>
        <DisclaimerBand left={t("adPoliticalBand")} right={cta} tone="red" />
      </aside>
    );
  }

  return (
    <aside className={cn("grid border-[3px] border-news-red", className)}>
      <div className="grid gap-2 bg-white p-5 text-center">
        <p className={cn("text-news-red uppercase", wide ? "dl-h1" : "dl-h2")}>{t("adLawyerHead")}</p>
        <p className="dl-h3 uppercase">{t("adLawyerSub")}</p>
        <p className="dl-small text-ink-muted">{t("adLawyerSymptoms")}</p>
        <p className={cn("mt-1.5 tracking-[0.04em] uppercase", wide ? "dl-h2" : "dl-h3")}>{t("adLawyerPhone")}</p>
      </div>
      <DisclaimerBand left={t("adLawyerBand")} right={cta} tone="ink" />
    </aside>
  );
}
