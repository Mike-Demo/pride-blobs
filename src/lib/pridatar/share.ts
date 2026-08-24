import { FLAG_IDS, type FlagId } from "./flags";
import type { StripeMode } from "./palette";
import type { BackgroundShape } from "./pridatar";
import { SHAPE_IDS } from "./style";

export type FlagSelectionValue = FlagId | "auto";
export type BackdropValue = BackgroundShape | "none";
export type ShapeSelectionValue = string;

export interface PridatarSearch {
  seed: string;
  flag: FlagSelectionValue;
  stripes: StripeMode;
  shape: ShapeSelectionValue;
  backdrop: BackdropValue;
  size: number;
}

export const DEFAULT_SEARCH: PridatarSearch = {
  seed: "ada@example.com",
  flag: "auto",
  stripes: "background",
  shape: "auto",
  backdrop: "squircle",
  size: 160,
};

const STRIPE_MODES: readonly StripeMode[] = ["background", "body", "both"];
const BACKDROPS: readonly BackdropValue[] = ["squircle", "circle", "square", "none"];

const isFlag = (v: unknown): v is FlagSelectionValue =>
  v === "auto" || (typeof v === "string" && (FLAG_IDS as readonly string[]).includes(v));

export type PridatarSearchInput = Partial<PridatarSearch>;

/** Keeps only valid, non-default values so `/` stays clean and links stay short. */
export function parsePridatarSearch(raw: Record<string, unknown>): PridatarSearchInput {
  const out: PridatarSearchInput = {};
  if (typeof raw["seed"] === "string" && raw["seed"].trim() && raw["seed"] !== DEFAULT_SEARCH.seed) {
    out.seed = raw["seed"].slice(0, 120);
  }
  if (isFlag(raw["flag"]) && raw["flag"] !== DEFAULT_SEARCH.flag) out.flag = raw["flag"];
  if (STRIPE_MODES.includes(raw["stripes"] as StripeMode) && raw["stripes"] !== DEFAULT_SEARCH.stripes) {
    out.stripes = raw["stripes"] as StripeMode;
  }
  const shape = raw["shape"];
  if (
    typeof shape === "string" &&
    shape !== DEFAULT_SEARCH.shape &&
    (SHAPE_IDS as readonly string[]).includes(shape)
  ) {
    out.shape = shape;
  }
  if (BACKDROPS.includes(raw["backdrop"] as BackdropValue) && raw["backdrop"] !== DEFAULT_SEARCH.backdrop) {
    out.backdrop = raw["backdrop"] as BackdropValue;
  }
  const rawSize = Number(raw["size"]);
  if (Number.isFinite(rawSize) && raw["size"] !== undefined) {
    const size = Math.min(320, Math.max(32, Math.round(rawSize)));
    if (size !== DEFAULT_SEARCH.size) out.size = size;
  }
  return out;
}

export function resolvePridatarSearch(search: PridatarSearchInput): PridatarSearch {
  return { ...DEFAULT_SEARCH, ...search };
}

/** Only non-default values end up in the URL, keeping shared links short. */
export function toSearchParams(search: PridatarSearch): PridatarSearchInput {
  const out: PridatarSearchInput = {};
  (Object.keys(DEFAULT_SEARCH) as (keyof PridatarSearch)[]).forEach((key) => {
    if (search[key] !== DEFAULT_SEARCH[key]) {
      Object.assign(out, { [key]: search[key] });
    }
  });
  return out;
}
