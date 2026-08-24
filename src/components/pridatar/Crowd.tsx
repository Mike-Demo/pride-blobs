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

export function Crowd({ stripes = "background", size = 56 }: CrowdProps) {
  return (
    <ul className="flex flex-wrap justify-center gap-2 sm:gap-3">
      {NAMES.map((name) => (
        <li key={name} title={name}>
          <Pridatar name={name} stripes={stripes} size={size} />
        </li>
      ))}
    </ul>
  );
}
