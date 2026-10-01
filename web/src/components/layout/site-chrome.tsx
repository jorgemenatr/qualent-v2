"use client";

import { usePathname } from "next/navigation";

/**
 * Pages that stand on their own, without the site's navigation or footer —
 * e.g. prospect landings reached from a QR, where the global chrome only
 * distracts. Matched against the full path, locale prefix included.
 */
const STANDALONE_PATHS = [/^\/[a-z]{2}\/qualent\/la-anita\/?$/];

export function isStandalonePath(pathname: string) {
  return STANDALONE_PATHS.some((re) => re.test(pathname));
}

/** Renders the global header/footer everywhere except standalone pages. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (isStandalonePath(pathname)) return null;
  return <>{children}</>;
}
