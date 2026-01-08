"use client";

import Image from "next/image";

export function PageHeroBackground() {
  return (
    <>
      {/* Left llama - anchored to bottom left corner */}
      <div className="absolute left-0 bottom-0 hidden md:block pointer-events-none opacity-[0.12]">
        <Image
          src="/llama-left.svg"
          alt=""
          width={200}
          height={500}
          className="h-[50vh] w-auto lg:h-[60vh]"
          aria-hidden="true"
        />
      </div>

      {/* Right llama - anchored to top right corner */}
      <div className="absolute right-0 top-0 hidden md:block pointer-events-none opacity-[0.12]">
        <Image
          src="/llama-right.svg"
          alt=""
          width={200}
          height={500}
          className="h-[50vh] w-auto lg:h-[60vh]"
          aria-hidden="true"
        />
      </div>
    </>
  );
}
