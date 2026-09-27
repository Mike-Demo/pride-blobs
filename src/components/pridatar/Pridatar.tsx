import { useId, useMemo } from "react";
import { pridatar, type PridatarOptions } from "@/lib/pridatar";

export interface PridatarProps extends PridatarOptions {
  /** The person, bot, team or repo this stands for. */
  name: string;
  className?: string;
  /** Hides the avatar from assistive tech when it is purely ornamental. */
  decorative?: boolean;
}

/**
 * Inline SVG rather than an `<img>`: the markup is tiny, and inline keeps the
 * avatar in the page's own accessibility tree.
 */
export function Pridatar({ name, className, decorative = false, ...options }: PridatarProps) {
  // Unique per mount: gradient/animation ids must not repeat when the same
  // avatar renders twice on a page (e.g. the doubled Crowd marquee).
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const svg = useMemo(
    () =>
      decorative
        ? pridatar(name, { ...options, uid })
        : pridatar(name, { ...options, title: options.title ?? name, uid }),
    [name, options, uid, decorative],
  );

  return (
    <span
      className={className}
      aria-hidden={decorative || undefined}
      style={{ display: "inline-flex", lineHeight: 0 }}
      // The SVG is generated from a deterministic string builder in this repo;
      // the only interpolated user value is escaped in `pridatar()`.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
