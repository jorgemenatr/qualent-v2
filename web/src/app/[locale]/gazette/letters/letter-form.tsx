"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

/**
 * Letters are real: they land in the database and the editor promotes them
 * into the paper by hand. The confirmation says only what is true — it has
 * been received, and he has not commented.
 */
export function LetterForm() {
  const t = useTranslations("Gazette");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setState("sending");
    setError(null);
    try {
      const res = await fetch("/api/gazette/letters", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          place: String(data.get("place") || ""),
          letter: String(data.get("letter") || ""),
          email: String(data.get("email") || ""),
        }),
      });
      if (!res.ok) {
        // A 400 is the validator telling the writer something useful; anything
        // else is ours to own, in their language rather than the server's.
        const body = res.status === 400 ? await res.json().catch(() => null) : null;
        setError(body?.error ?? t("formError"));
        setState("error");
        return;
      }
      setState("sent");
    } catch {
      setError(t("formError"));
      setState("error");
    }
  }

  if (state === "sent") {
    return (
      <div className="grid gap-2.5">
        <h3 className="dl-h3">{t("sentHead")}</h3>
        <p className="dl-body text-ink-muted">{t("sentBody")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3.5">
      <div className="grid gap-1.5">
        <Label htmlFor="place">{t("formPlace")}</Label>
        <Input
          id="place"
          name="place"
          placeholder={t("formPlacePlaceholder")}
          className="rounded-none bg-white"
        />
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="letter">{t("formStory")}</Label>
        <Textarea
          id="letter"
          name="letter"
          rows={6}
          required
          minLength={20}
          placeholder={t("formStoryPlaceholder")}
          className="rounded-none bg-white"
          aria-describedby="letter-hint"
        />
        <p id="letter-hint" className="dl-small text-ink-faint">
          {t("formStoryHint")}
        </p>
      </div>

      <div className="grid gap-1.5">
        <Label htmlFor="email">{t("formEmail")}</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder={t("formEmailPlaceholder")}
          className="rounded-none bg-white"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="dl-small text-ink-faint">
          {t("formEmailHint")}
        </p>
      </div>

      <Button type="submit" disabled={state === "sending"} className="rounded-none">
        {state === "sending" ? t("formSending") : t("formSubmit")}
      </Button>

      {error ? (
        <p role="alert" className="dl-small text-coral">
          {error}
        </p>
      ) : null}

      <p className="dl-small text-ink-faint">{t("formFine")}</p>
    </form>
  );
}
