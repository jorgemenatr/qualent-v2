"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  variant = "card",
}: {
  thread: ProspectThread;
  position: string;
  /** "card" is the compact box; "whatsapp" dresses the same script as a WhatsApp chat window. */
  variant?: "card" | "whatsapp";
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

  if (variant === "whatsapp") {
    return <WhatsAppWindow visible={visible} scrollRef={boxRef} position={position} />;
  }

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

type Visible = { item: Item; i: number }[];

/** Which side of the chat an item sits on, seen from the candidate's phone. */
function sideOf(item: Item): "out" | "in" {
  if (item.kind === "msg") return item.from === "them" ? "out" : "in";
  return item.kind === "doc" ? "out" : "in";
}

/** The little hook on the first bubble of a run, as WhatsApp draws it. */
function Tail({ side }: { side: "out" | "in" }) {
  return (
    <svg
      viewBox="0 0 8 13"
      width="8"
      height="13"
      aria-hidden="true"
      className={`absolute top-0 ${side === "out" ? "-right-2 text-[#D9FDD3]" : "-left-2 -scale-x-100 text-white"}`}
    >
      <path fill="currentColor" d="M0 0h8L1.5 9.5C.9 10.4 0 10 0 9V0z" />
    </svg>
  );
}

function Ticks() {
  return (
    <svg viewBox="0 0 16 11" width="16" height="11" aria-label="leído" className="inline-block text-[#53BDEB]">
      <path
        fill="currentColor"
        d="M11.07.66 10.4.1a.37.37 0 0 0-.52.07L4.4 7.1 2.1 4.96a.37.37 0 0 0-.52.02l-.5.54a.37.37 0 0 0 .02.52l3.08 2.88a.37.37 0 0 0 .54-.04l5.9-7.7a.37.37 0 0 0-.05-.52zm4 0-.67-.56a.37.37 0 0 0-.52.07L8.4 7.1l-.73-.68-.5.63 1.35 1.26a.37.37 0 0 0 .54-.04l5.9-7.7a.37.37 0 0 0-.05-.52z"
      />
    </svg>
  );
}

function WhatsAppWindow({
  visible,
  scrollRef,
  position,
}: {
  visible: Visible;
  scrollRef: React.RefObject<HTMLDivElement | null>;
  position: string;
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-[#EFEAE2]">
      {/* Chat header, as the candidate sees it */}
      <div className="flex shrink-0 items-center gap-3 bg-[#008069] px-3 py-2.5 text-white">
        <svg viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" className="shrink-0 opacity-90">
          <path fill="currentColor" d="M12 4l1.4 1.4L7.8 11H20v2H7.8l5.6 5.6L12 20l-8-8z" />
        </svg>
        <span className="grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-white">
          <Image src="/qualent/qualent-icon.png" alt="" width={72} height={63} className="h-6 w-auto" />
        </span>
        <span className="min-w-0">
          <span className="block truncate text-[15px] font-semibold leading-tight">
            Asistente de contratación
          </span>
          <span className="block truncate text-[12px] leading-tight text-white/80">
            en línea · responde en segundos
          </span>
        </span>
      </div>

      <div
        ref={scrollRef}
        role="log"
        aria-live="off"
        aria-label={`Conversación de ejemplo con un candidato a ${position}`}
        tabIndex={0}
        className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto px-3 pb-3 pt-3 outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#008069] [background-image:radial-gradient(rgba(0,0,0,.045)_1px,transparent_1px)] [background-size:16px_16px]"
      >
        <span className="mx-auto mb-2 shrink-0 rounded-md bg-white/90 px-2.5 py-1 text-[11.5px] font-medium uppercase tracking-wide text-[#54656F] shadow-sm">
          Hoy
        </span>

        {visible.map(({ item, i }, idx) => {
          const side = sideOf(item);
          const prev = visible[idx - 1];
          const first = !prev || sideOf(prev.item) !== side;
          const bubble = [
            "relative max-w-[82%] shrink-0 px-2.5 pb-1.5 pt-1.5 text-[14.5px] leading-snug text-[#111B21] shadow-[0_1px_.5px_rgba(11,20,26,.13)]",
            side === "out" ? "self-end bg-[#D9FDD3]" : "self-start bg-white",
            first ? "mt-1.5" : "",
            first ? (side === "out" ? "rounded-lg rounded-tr-none" : "rounded-lg rounded-tl-none") : "rounded-lg",
          ].join(" ");

          if (item.kind === "typing") {
            return (
              <div key={i} className={`${bubble} flex gap-1 py-3`} aria-hidden="true">
                {first && <Tail side={side} />}
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="size-1.5 animate-bounce rounded-full bg-[#8696A0] motion-reduce:animate-none"
                    style={{ animationDelay: `${d * 0.16}s` }}
                  />
                ))}
              </div>
            );
          }

          if (item.kind === "doc") {
            return (
              <div key={i} className={bubble}>
                {first && <Tail side={side} />}
                <div className="mb-1 mt-0.5 flex items-center gap-2.5 rounded-md bg-[#C8EDC3]/60 px-2.5 py-2">
                  <span className="grid size-8 shrink-0 place-items-center rounded-md bg-[#709030] text-white">
                    <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                      <path fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" d="M5 12.5l4.5 4.5L19 7.5" />
                    </svg>
                  </span>
                  <span className="text-[12.5px] leading-snug">
                    <span className="block font-mono text-[#3B4A54]">{item.label}</span>
                    <span className="block font-semibold text-[#3F5A12]">Verificado · datos extraídos</span>
                  </span>
                </div>
                <span className="flex items-center justify-end gap-1 text-[11px] text-[#667781]">
                  {item.time} <Ticks />
                </span>
              </div>
            );
          }

          return (
            <div key={i} className={bubble}>
              {first && <Tail side={side} />}
              {item.text}
              <span className="float-right ml-2 mt-1.5 flex translate-y-0.5 items-center gap-1 text-[11px] leading-none text-[#667781]">
                {item.time}
                {side === "out" && <Ticks />}
              </span>
            </div>
          );
        })}
      </div>

      {/* Composer — decoration only */}
      <div className="flex shrink-0 items-center gap-2 px-2 pb-2.5 pt-1" aria-hidden="true">
        <span className="flex h-10 flex-1 items-center rounded-full bg-white px-4 text-[14px] text-[#8696A0] shadow-sm">
          Mensaje
        </span>
        <span className="grid size-10 place-items-center rounded-full bg-[#008069] text-white">
          <svg viewBox="0 0 24 24" width="18" height="18">
            <path fill="currentColor" d="M12 14a3 3 0 0 0 3-3V5a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3zm5-3a5 5 0 0 1-10 0H5a7 7 0 0 0 6 6.9V21h2v-3.1a7 7 0 0 0 6-6.9h-2z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
