"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

/**
 * LinkedIn is where the decision-makers are, so it is the only named network.
 * The URL is read after mount — on the server there is no location to read,
 * and rendering one would not match what the client sees.
 */
export function Share({ title }: { title: string }) {
  const t = useTranslations("Gazette");
  const [url, setUrl] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setUrl(window.location.href);
  }, []);

  return (
    <>
      <Button variant="outline" size="sm" asChild className="rounded-none">
        <a
          href={
            url
              ? `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
              : "https://www.linkedin.com/"
          }
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("shareLinkedIn")}
        </a>
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="rounded-none"
        aria-label={title}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url || window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            setCopied(false);
          }
        }}
      >
        {copied ? t("shareCopied") : t("shareCopy")}
      </Button>
    </>
  );
}
