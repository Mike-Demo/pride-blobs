import { useEffect, useState } from "react";

/**
 * True once the client has hydrated.
 *
 * The site is prerendered to static HTML with default settings, so URL search
 * params must be ignored on the first client render to keep markup identical.
 */
export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
