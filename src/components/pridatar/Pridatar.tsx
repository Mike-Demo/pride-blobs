import { useMemo } from "react";
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
  const svg = useMemo(
    () =>
      decorative
        ? pridatar(name, options)
        : pridatar(name, { ...options, title: options.title ?? name }),
    [name, options, decorative],
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
