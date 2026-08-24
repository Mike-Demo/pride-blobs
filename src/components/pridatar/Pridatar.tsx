import { useMemo } from "react";
import { pridatar, type PridatarOptions } from "@/lib/pridatar";

export interface PridatarProps extends PridatarOptions {
  /** The person, bot, team or repo this stands for. */
  name: string;
  className?: string;
}

/**
 * Inline SVG rather than an `<img>`: the markup is tiny, and inline keeps the
 * avatar in the page's own accessibility tree.
 */
export function Pridatar({ name, className, ...options }: PridatarProps) {
  const svg = useMemo(
    () => pridatar(name, { title: options.title ?? name, ...options }),
    [name, options],
  );

  return (
    <span
      className={className}
      style={{ display: "inline-flex", lineHeight: 0 }}
      // The SVG is generated from a deterministic string builder in this repo;
      // the only interpolated user value is escaped in `pridatar()`.
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
}
