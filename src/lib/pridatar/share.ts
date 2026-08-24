import { FLAG_IDS, type FlagId } from "./flags";
import type { StripeMode } from "./palette";
import type { BackgroundShape } from "./pridatar";

export type FlagSelectionValue = FlagId | "auto";
export type BackdropValue = BackgroundShape | "none";

export interface PridatarSearch {
  seed: string;
  flag: FlagSelectionValue;
  stripes: StripeMode;
  backdrop: BackdropValue;
  size: number;
}

export const DEFAULT_SEARCH: PridatarSearch = {
  seed: "ada@example.com",
  flag: "auto",
  stripes: "background",
  backdrop: "squircle",
  size: 160,
};

const STRIPE_MODES: readonly StripeMode[] = ["background", "body", "both"];
const BACKDROPS: readonly BackdropValue[] = ["squircle", "circle", "square", "none"];

const isFlag = (v: unknown): v is FlagSelectionValue =>
  v === "auto" || (typeof v === "string" && (FLAG_IDS as readonly string[]).includes(v));

export function parsePridatarSearch(raw: Record<string, unknown>): PridatarSearch {
  const seed = typeof raw["seed"] === "string" && raw["seed"].trim() ? raw["seed"].slice(0, 120) : DEFAULT_SEARCH.seed;
  const flag = isFlag(raw["flag"]) ? raw["flag"] : DEFAULT_SEARCH.flag;
  const stripes = STRIPE_MODES.includes(raw["stripes"] as StripeMode)
    ? (raw["stripes"] as StripeMode)
    : DEFAULT_SEARCH.stripes;
  const backdrop = BACKDROPS.includes(raw["backdrop"] as BackdropValue)
    ? (raw["backdrop"] as BackdropValue)
    : DEFAULT_SEARCH.backdrop;
  const rawSize = Number(raw["size"]);
  const size = Number.isFinite(rawSize) ? Math.min(320, Math.max(32, Math.round(rawSize))) : DEFAULT_SEARCH.size;
  return { seed, flag, stripes, backdrop, size };
}

/** Only non-default values end up in the URL, keeping shared links short. */
export function toSearchParams(search: PridatarSearch): Partial<PridatarSearch> {
  const out: Partial<PridatarSearch> = {};
  (Object.keys(DEFAULT_SEARCH) as (keyof PridatarSearch)[]).forEach((key) => {
    if (search[key] !== DEFAULT_SEARCH[key]) {
      Object.assign(out, { [key]: search[key] });
    }
  });
  return out;
}
