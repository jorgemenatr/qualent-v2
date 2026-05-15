"use client";

import { useState } from "react";

import { ExternalLink, X } from "lucide-react";

interface PreviewToggleProps {
  /** The URL to load in the iframe preview. */
  url: string;
  /** Label shown when the preview is collapsed. */
  openLabel: string;
  /** Label shown when the preview is expanded. */
  closeLabel: string;
}

/**
 * Client-side toggle that expands to show an iframe preview of a live project.
 * Used inside the proof page cards for projects that have a `preview_url`.
 */
export function PreviewToggle({
  url,
  openLabel,
  closeLabel,
}: PreviewToggleProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex flex-col gap-3">
      <button
        type="button"
        onClick={handleToggle}
        className="inline-flex items-center gap-1.5 self-start font-mono text-xs font-semibold uppercase tracking-wider text-emerald-600 transition-colors hover:text-emerald-500"
      >
        {isOpen ? (
          <>
            <X className="h-3.5 w-3.5" />
            {closeLabel}
          </>
        ) : (
          <>
            <ExternalLink className="h-3.5 w-3.5" />
            {openLabel}
          </>
        )}
      </button>

      {isOpen && (
        <div className="overflow-hidden rounded-lg border border-stone-200">
          <iframe
            src={url}
            title={`Preview of ${url}`}
            className="h-[400px] w-full border-0 sm:h-[500px]"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}
