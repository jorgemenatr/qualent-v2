"use client";

import { useEffect, useRef, useState } from "react";
import type { ProspectThread } from "@/lib/qualent-prospects";

type Item =
  | { kind: "msg"; from: "them" | "us"; text: string; time: string; wait: number }
  | { kind: "doc"; label: string; time: string; wait: number }
  | { kind: "typing"; wait: number };

/**
 * One shared script, filled from the company's thread config. Keeping the
 * script here rather than in the data means all 25 pages stay consistent —
 * and fixing the wording once fixes it everywhere.
 */
function buildScript(t: ProspectThread, position: string): Item[] {
  const first = t.candidateName.split(" ").slice(0, 2).join(" ");
  return [
    { kind: "msg", from: "them", text: `Buenas, vi la vacante de ${position} en Facebook`, time: "9:14", wait: 360 },
    { kind: "typing", wait: 620 },
    { kind: "msg", from: "us", text: `¡Hola! ${position}, ${t.detail}. ¿Me comparte su nombre?`, time: "9:14", wait: 900 },
    { kind: "msg", from: "them", text: t.candidateName, time: "9:15", wait: 620 },
    { kind: "typing", wait: 480 },
    { kind: "msg", from: "us", text: `Gracias, ${first}. ${t.qualifier}`, time: "9:15", wait: 820 },
    { kind: "msg", from: "them", text: t.qualifierAnswer, time: "9:16", wait: 620 },
    { kind: "typing", wait: 520 },
    { kind: "msg", from: "us", text: `Perfecto. Mándeme foto de ${t.docs}.`, time: "9:16", wait: 800 },
    { kind: "doc", label: t.docLabel, time: "9:18", wait: 820 },
    { kind: "typing", wait: 560 },
    { kind: "msg", from: "us", text: `Todo en orden. ¿Le queda ${t.when} en ${t.location}?`, time: "9:18", wait: 900 },
    { kind: "msg", from: "them", text: "Sí, ahí estaré", time: "9:19", wait: 600 },
    { kind: "typing", wait: 460 },
    { kind: "msg", from: "us", text: "Agendado ✅ Le mando ubicación y un recordatorio un día antes.", time: "9:19", wait: 880 },
  ];
}

export function DemoThread({
  thread,
  position,
}: {
  thread: ProspectThread;
  position: string;
}) {
  const script = buildScript(thread, position);
  const [shown, setShown] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(script.length);
      return;
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    const start = () => {
      if (startedRef.current) return;
      startedRef.current = true;
      let t = 240;
      script.forEach((item, i) => {
        t += item.wait;
        timers.push(setTimeout(() => setShown(i + 1), t));
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            start();
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
    // The script is derived from props that do not change after mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // keep the newest bubble in view as the conversation plays
  useEffect(() => {
    const el = boxRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [shown]);

  // A typing indicator only shows while it is the newest item.
  const visible = script
    .map((item, i) => ({ item, i }))
    .filter(({ item, i }) => i < shown && !(item.kind === "typing" && i < shown - 1));

  return (
    <div
      ref={boxRef}
      className="flex max-h-[420px] flex-col gap-2 overflow-y-auto rounded-2xl bg-[#ECE5DD] px-3.5 pb-3.5"
    >
      <div className="sticky top-0 z-10 -mx-3.5 mb-3 flex shrink-0 items-center gap-2.5 rounded-t-2xl bg-[#709030] px-3.5 py-2.5 text-white">
        <span className="grid size-7 shrink-0 place-items-center rounded-full bg-white/25 text-[11px] font-bold">
          Q
        </span>
        <span>
          <span className="block text-[13px] font-semibold leading-tight">
            Asistente de contratación
          </span>
          <span className="block font-mono text-[10.5px] opacity-80">
            en línea · responde en segundos
          </span>
        </span>
      </div>

      {visible.map(({ item, i }) => {
        if (item.kind === "typing") {
          return (
            <div
              key={i}
              className="flex w-fit shrink-0 gap-1 self-start rounded-[9px] bg-white px-3.5 py-3 shadow-sm"
              aria-hidden="true"
            >
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="size-1.5 animate-bounce rounded-full bg-[#9AA8A1]"
                  style={{ animationDelay: `${d * 0.16}s` }}
                />
              ))}
            </div>
          );
        }
        if (item.kind === "doc") {
          return (
            <div
              key={i}
              className="max-w-[80%] shrink-0 self-end rounded-[9px] bg-[#DCF6E4] px-2.5 pb-1.5 pt-2.5 text-[13.5px] text-[#11201A] shadow-sm"
            >
              <div className="mb-1.5 flex items-center gap-2.5 rounded-md border border-[#DFE6E1] bg-[#F2F5F3] px-2.5 py-2">
                <span className="grid size-6 shrink-0 place-items-center rounded bg-[#709030] text-[11px] font-bold text-white">
                  ✓
                </span>
                <span className="font-mono text-[11px] leading-snug text-[#41504A]">
                  {item.label}
                  <br />
                  <span className="font-semibold text-[#4A6317]">
                    Verificado · datos extraídos
                  </span>
                </span>
              </div>
              <span className="float-right ml-2.5 mt-1 font-mono text-[9.5px] text-[#5C6B63]">
                {item.time} <span className="tracking-tighter text-[#3AA5D8]">✓✓</span>
              </span>
            </div>
          );
        }
        return (
          <div
            key={i}
            className={[
              "max-w-[80%] shrink-0 rounded-[9px] px-2.5 pb-1.5 pt-2 text-[13.5px] leading-snug text-[#11201A] shadow-sm",
              item.from === "them"
                ? "self-end bg-[#DCF6E4]"
                : "self-start bg-white",
            ].join(" ")}
          >
            {item.text}
            <span className="float-right ml-2.5 mt-1 font-mono text-[9.5px] text-[#5C6B63]">
              {item.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
