"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/** The paper's only ask. One field, and it costs one spreadsheet. */
export function SubscribeForm() {
  const t = useTranslations("Gazette");
  const id = useId();
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("sending");
    try {
      const res = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "gazette_newsletter" }),
      });
      setState(res.ok ? "done" : "error");
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return <p className="dl-body text-pickle-deep">{t("subscribeDone")}</p>;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-2">
      <div className="flex flex-wrap gap-2">
        <label htmlFor={id} className="sr-only">
          {t("subscribeLabel")}
        </label>
        <Input
          id={id}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("subscribePlaceholder")}
          className="h-10 min-w-0 flex-1 rounded-none bg-white"
        />
        <Button type="submit" disabled={state === "sending"} className="rounded-none">
          {t("subscribeButton")}
        </Button>
      </div>
      {state === "error" ? (
        <p className="dl-small text-coral">{t("subscribeError")}</p>
      ) : null}
    </form>
  );
}
