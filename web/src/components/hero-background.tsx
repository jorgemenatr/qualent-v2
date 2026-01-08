"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export function HeroBackground() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Bold background gradient - moves slower (parallax) */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary/20 via-primary/10 to-background"
        style={{ transform: `translateY(${scrollY * 0.3}px)` }}
      />

      {/* Strong radial glow behind content */}
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_50%_40%,rgba(34,197,94,0.2),transparent)]"
        style={{ transform: `translateY(${scrollY * 0.4}px)` }}
      />

      {/* Left llama - anchored to bottom left corner */}
      {/* Hidden on mobile, visible from md breakpoint, larger on lg+ screens */}
      <div
        className="absolute left-0 bottom-0 hidden md:block pointer-events-none opacity-[0.15]"
      >
        <Image
          src="/llama-left.svg"
          alt=""
          width={200}
          height={500}
          className="h-[60vh] w-auto lg:h-[80vh]"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Right llama - anchored to top right corner */}
      {/* Hidden on mobile, visible from md breakpoint, larger on lg+ screens */}
      <div
        className="absolute right-0 top-0 hidden md:block pointer-events-none opacity-[0.15]"
      >
        <Image
          src="/llama-right.svg"
          alt=""
          width={200}
          height={500}
          className="h-[60vh] w-auto lg:h-[80vh]"
          aria-hidden="true"
          priority
        />
      </div>

      {/* Primary green - top left with wave animation */}
      <div
        className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/25 blur-3xl animate-float-slow"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      />

      {/* Primary green - top right with wave animation */}
      <div
        className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl animate-float-delayed"
        style={{ transform: `translateY(${scrollY * 0.45}px)` }}
      />

      {/* Lime green accent - centered behind content with pulse */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/3 h-72 w-[600px] rounded-full bg-[rgba(132,204,22,0.15)] blur-3xl animate-pulse-subtle"
        style={{ transform: `translate(-50%, calc(-33% + ${scrollY * 0.35}px))` }}
      />

      {/* Subtle lime at bottom edges with float */}
      <div
        className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[rgba(132,204,22,0.12)] blur-3xl animate-float-slow"
        style={{ transform: `translateY(${scrollY * 0.6}px)` }}
      />
      <div
        className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[rgba(132,204,22,0.12)] blur-3xl animate-float-delayed"
        style={{ transform: `translateY(${scrollY * 0.55}px)` }}
      />
    </>
  );
}
