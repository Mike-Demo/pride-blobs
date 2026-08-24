import { Pridatar } from "./Pridatar";
import type { StripeMode } from "@/lib/pridatar";

const NAMES = [
  "ada", "kasper", "tove", "juno", "remy", "sasha", "wren", "ines", "milo", "noor",
  "bex", "kai", "vera", "ozzy", "lior", "quinn", "sol", "hana", "eve", "rune",
  "tam", "iris", "zed", "poppy", "nix", "ari", "lux", "bo", "esme", "ravi",
  "fen", "cleo", "jax", "mira", "ode", "sage", "toya", "umi", "vale", "yara",
];

interface CrowdProps {
  stripes?: StripeMode;
  size?: number;
}

/**
 * A single-row carousel: the list scrolls itself, and is also freely
 * swipeable/scrollable. Pauses on hover, focus, and reduced-motion.
 */
export function Crowd({ stripes = "background", size = 56 }: CrowdProps) {
  return (
    <div
      className="crowd-marquee relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <ul
        className="crowd-track flex w-max items-center gap-3 sm:gap-4"
        aria-label="Example avatars generated from ordinary handles"
      >
        {[...NAMES, ...NAMES].map((name, i) => (
          <li
            key={`${name}-${i}`}
            title={name}
            className="shrink-0"
            aria-hidden={i >= NAMES.length || undefined}
          >
            <Pridatar name={name} stripes={stripes} size={size} decorative />
          </li>
        ))}
      </ul>
    </div>
  );
}
