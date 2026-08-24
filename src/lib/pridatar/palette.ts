/**
 * Pride palette resolution.
 *
 * Upstream blobatar derives a single hue from the seed. Pridatar replaces that
 * step: the colors come from a flag, and the seed only chooses which flag (in
 * `auto` mode) and how the figure is drawn. Everything else — the OKLCh math
 * and the contrast walk — is the upstream guarantee, reused unchanged so eyes
 * stay legible on top of every stripe.
 */

import { contrast, ensureContrast, fromHex, mix, toHex, type Oklch } from "./vendor/color";
import type { Flag } from "./flags";

/** Where the flag stripes are painted. */
export type StripeMode = "background" | "body" | "both";

export interface PrideColors {
  /** Stripes behind the figure, top to bottom. Empty when the backdrop is flat. */
  readonly bgStripes: readonly string[];
  /** Flat backdrop color, used when `bgStripes` is empty. */
  readonly bg: string;
  /** Stripes on the body, top to bottom. Empty when the body is flat. */
  readonly bodyStripes: readonly string[];
  /** Flat body color, and the fallback fill wherever a gradient cannot be used. */
  readonly head: string;
  /** Eye color, contrast-checked against the body. */
  readonly eye: string;
}

const PAPER: Oklch = { l: 0.97, c: 0.008, h: 0 };
const INK: Oklch = { l: 0.19, c: 0.02, h: 0 };
const WHITE: Oklch = { l: 1, c: 0, h: 0 };

/** The average of a stripe set in OKLab, which is what contrast is judged against. */
function average(stripes: readonly string[]): Oklch {
  return stripes
    .map(fromHex)
    .reduce((acc, c, i) => (i === 0 ? c : mix(acc, c, 1 / (i + 1))), fromHex(stripes[0]!));
}

/** Ink or paper, whichever starts further from `against`. */
const polarity = (against: Oklch): Oklch => (against.l >= 0.55 ? INK : PAPER);

const pale = (c: Oklch, amount: number): Oklch => mix(c, WHITE, amount);

export interface PaletteInput {
  readonly flag: Flag;
  readonly mode: StripeMode;
  /** 0–1 seeded position, used to keep flat fills from all landing on one stripe. */
  readonly pick: number;
}

export function prideColors({ flag, mode, pick }: PaletteInput): PrideColors {
  const stripes = flag.stripes;
  const mean = average(stripes);
  const chosen = fromHex(stripes[Math.min(stripes.length - 1, Math.floor(pick * stripes.length))]!);

  if (mode === "background") {
    const head = ensureContrast(polarity(mean), mean, 2.2);
    const eye = ensureContrast(polarity(head), head, 4.5);
    return {
      bgStripes: stripes,
      bg: toHex(mean),
      bodyStripes: [],
      head: toHex(head),
      eye: toHex(eye),
    };
  }

  const bodyMean = mean;
  const eye = ensureContrast(polarity(bodyMean), bodyMean, 4.5);
  const backdrop = mode === "both" ? stripes.map((s) => toHex(pale(fromHex(s), 0.74))) : [];

  return {
    bgStripes: backdrop,
    bg: toHex(pale(chosen, 0.9)),
    bodyStripes: stripes,
    head: toHex(ensureContrast(chosen, mean, 1)),
    eye: toHex(eye),
  };
}

/** Re-exported so callers can assert the guarantee without reaching into vendor code. */
export { contrast, fromHex, toHex };
