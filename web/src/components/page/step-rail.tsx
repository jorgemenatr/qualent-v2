import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/brand";

export const STEP_SLUGS = [
  "understanding",
  "research",
  "problem-identification",
  "implementation",
  "partnership",
] as const;

export type StepSlug = (typeof STEP_SLUGS)[number];

/**
 * The five stages, shown on the process page and on every step page so the
 * reader always knows where they are. A genuine sequence, so it is numbered.
 */
export async function StepRail({ active }: { active?: StepSlug }) {
  const t = await getTranslations("Services");

  const steps = STEP_SLUGS.map((slug, i) => ({
    slug,
    title: t(`step${i + 1}Title` as "step1Title"),
    cost: t(`step${i + 1}Cost` as "step1Cost"),
    label: t("stepLabel", { n: String(i + 1).padStart(2, "0") }),
  }));

  return (
    <ol className="grid gap-y-6 border-t-[1.5px] border-dashed border-rule-strong pt-5 sm:grid-cols-2 lg:grid-cols-5">
      {steps.map((step) => {
        const on = step.slug === active;
        return (
          <li key={step.slug} className="pr-3">
            <Link href={`/services/${step.slug}`} className="grid gap-1.5 group">
              <Eyebrow tone={on ? "brand" : "muted"} className={cn(!on && "text-ink-faint")}>
                {step.label}
              </Eyebrow>
              <span
                className={cn(
                  "text-base font-bold underline-offset-[6px] decoration-pickle",
                  on ? "text-ink underline" : "text-ink-muted group-hover:underline"
                )}
              >
                {step.title}
              </span>
              <span className="text-[13px] text-ink-faint">{step.cost}</span>
            </Link>
          </li>
        );
      })}
    </ol>
  );
}
