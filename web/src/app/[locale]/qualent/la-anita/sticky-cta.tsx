"use client";

import { useEffect, useState } from "react";
import { WhatsAppIcon } from "../_components/whatsapp-icon";

/**
 * Mobile-only bottom bar with the primary CTA. It appears once the hero's
 * button has scrolled away, and steps aside whenever another primary button
 * (marked `data-primary-cta`) is already on screen, so there is never two.
 */
export function StickyCta({ href, label }: { href: string; label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-primary-cta]"));
    if (targets.length === 0) return;
    const hero = targets[0];
    const onScreen = new Set<Element>();

    const update = () => {
      const pastHero = hero.getBoundingClientRect().bottom < 0;
      setShow(pastHero && onScreen.size === 0);
    };

    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      });
      update();
    });
    targets.forEach((t) => io.observe(t));
    return () => io.disconnect();
  }, []);

  return (
    <div
      inert={!show}
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#2E3D13]/95 px-4 pt-3 pb-[max(12px,env(safe-area-inset-bottom))] backdrop-blur-md transition-transform duration-300 ease-out motion-reduce:transition-none md:hidden ${
        show ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-12 w-full items-center justify-center gap-2.5 rounded-xl bg-[#ECF28F] px-5 text-[16px] font-bold text-[#1F2A0C] focus-visible:outline-3 focus-visible:outline-offset-2 focus-visible:outline-white"
      >
        <WhatsAppIcon className="size-5" />
        {label}
      </a>
    </div>
  );
}
