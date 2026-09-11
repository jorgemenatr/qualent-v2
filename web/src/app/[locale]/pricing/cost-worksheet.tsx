"use client";

import { useId, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Figure, Stamp } from "@/components/brand";

function Row({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
  format: (n: number) => string;
}) {
  const id = useId();
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 flex items-center justify-between text-sm font-semibold"
      >
        <span>{label}</span>
        <span className="pl-figure text-ink-muted">{format(value)}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-1.5 w-full cursor-pointer appearance-none rounded-full bg-rule accent-pickle"
      />
    </div>
  );
}

/**
 * The pricing promise, made checkable. Two numbers the reader already knows,
 * and the fee falls out of them at exactly half.
 */
export function CostWorksheet() {
  const t = useTranslations("Pricing");
  const locale = useLocale();
  const [hours, setHours] = useState(15);
  const [rate, setRate] = useState(45);

  const annual = hours * 52 * rate;
  const fee = annual / 2;
  const money = (n: number) =>
    "$" + Math.round(n).toLocaleString(locale === "es" ? "es-MX" : "en-US");

  return (
    <div className="pl-label-card mx-auto max-w-[760px]">
      <div className="pl-label-head">
        <span>{t("worksheetTitle")}</span>
        <Stamp tone="ink" tilt={2} className="border-white text-white">
          {t("worksheetStamp")}
        </Stamp>
      </div>

      <div className="grid gap-5 p-7">
        <Row
          label={t("worksheetHours")}
          value={hours}
          min={1}
          max={60}
          onChange={setHours}
          format={(v) => `${v} h`}
        />
        <Row
          label={t("worksheetRate")}
          value={rate}
          min={20}
          max={150}
          onChange={setRate}
          format={(v) => `$${v}`}
        />

        <table className="pl-facts">
          <thead>
            <tr>
              <th scope="col">{t("worksheetLineItem")}</th>
              <th scope="col">{t("worksheetPerYear")}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{t("worksheetRowProblem")}</td>
              <td className="pl-figure">{money(annual)}</td>
            </tr>
            <tr>
              <td>{t("worksheetRowFee")}</td>
              <td className="pl-figure">{money(fee)}</td>
            </tr>
            <tr>
              <td>{t("worksheetRowKeep")}</td>
              <td className="pl-figure">
                {money(fee)} {t("worksheetKeepSuffix")}
              </td>
            </tr>
          </tbody>
        </table>

        <div
          className="flex flex-wrap items-end gap-10"
          aria-live="polite"
        >
          <Figure
            value={money(annual)}
            label={t("worksheetFigureProblem")}
            tone="ink"
            valueClassName="text-[2.25rem]"
          />
          <Figure
            value={money(fee)}
            label={t("worksheetFigureFee")}
            valueClassName="text-[2.25rem]"
          />
        </div>

        <p className="border-t border-border pt-4 text-sm text-ink-faint">
          {t("worksheetNote")}
        </p>
      </div>
    </div>
  );
}
