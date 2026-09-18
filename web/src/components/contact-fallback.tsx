import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

export const CONTACT_EMAIL = "hello@picklellama.studio";

/**
 * Stands in for a form that used to post to the database. The site no longer
 * runs one, so rather than leave a submit button that fails, the reader gets
 * an address that actually reaches someone.
 */
export function ContactFallback({
  title,
  body,
  cta,
  subject,
  className,
}: {
  title?: React.ReactNode;
  body: React.ReactNode;
  cta: React.ReactNode;
  subject: string;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-3", className)}>
      {title ? <h3 className="pl-h3">{title}</h3> : null}
      <p className="text-[15px] leading-normal text-ink-muted">{body}</p>
      <a
        href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}`}
        className="inline-flex w-fit items-center gap-2 border-[1.5px] border-rule-strong bg-white px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-paper-deep"
      >
        <Mail className="size-4" aria-hidden />
        {cta}
      </a>
    </div>
  );
}
