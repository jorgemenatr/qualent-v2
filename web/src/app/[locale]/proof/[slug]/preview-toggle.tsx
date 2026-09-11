"use client";

import { useState } from "react";

import { ChevronDown, ChevronUp, ExternalLink } from "lucide-react";

import { Button } from "@/components/ui/button";

/** Props for the PreviewToggle client component. */
interface PreviewToggleProps {
  /** URL to embed in the iframe. */
  previewUrl: string;
  /** Optional external URL for the "View live site" link. */
  liveUrl?: string;
  /** Label for the "View live site" link. */
  viewLiveSiteLabel: string;
}

/**
 * Client component that renders an expandable iframe preview of a live site.
 *
 * Starts expanded by default and allows the user to collapse/expand the
 * preview with a toggle button.
 */
export function PreviewToggle({
  previewUrl,
  liveUrl,
  viewLiveSiteLabel,
}: PreviewToggleProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const handleToggle = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-background shadow-sm">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border bg-paper-deep px-4 py-3">
        <div className="flex items-center gap-3">
          {/* Browser dots */}
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
            <span className="h-2.5 w-2.5 rounded-full bg-pickle" />
          </div>
          <span className="font-mono text-xs text-muted-foreground">
            {previewUrl.replace(/^https?:\/\//, "")}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {viewLiveSiteLabel}
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={handleToggle}
            aria-expanded={isExpanded}
            aria-label={isExpanded ? "Collapse preview" : "Expand preview"}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Iframe */}
      {isExpanded && (
        <div className="relative aspect-[16/9] w-full bg-white">
          <iframe
            src={previewUrl}
            title="Live site preview"
            className="absolute inset-0 h-full w-full"
            loading="lazy"
            sandbox="allow-scripts allow-same-origin"
          />
        </div>
      )}
    </div>
  );
}
