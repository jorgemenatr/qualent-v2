import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";
import { NewsRule, DisclaimerBand } from "./rules";

/**
 * Every Gazette view sits on newsprint rather than site paper, which is the
 * one signal that tells a reader they have walked into the other publication.
 */
export function Paper({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="flex-1 bg-news-paper">
      <div
        className={cn(
          "mx-auto grid max-w-[var(--container-md)] gap-8 px-[var(--gutter)] pt-10 pb-16",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

export async function GazetteFooter() {
  const t = await getTranslations("Gazette");
  return (
    <footer className="grid gap-3">
      <NewsRule thick />
      <div className="dl-dateline flex flex-wrap justify-between gap-x-4 gap-y-2">
        <span>{t("colophon")}</span>
        <Link href="/gazette/archive" className="text-ink hover:underline">
          {t("backIssues")}
        </Link>
      </div>
      <DisclaimerBand
        left={t("aiDisclosure")}
        right={t("askYourBoss")}
        tone="paper"
      />
    </footer>
  );
}
