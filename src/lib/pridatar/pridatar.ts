/**
 * Pridatar — deterministic pride blobatars.
 *
 * A fork of blobatar's static renderer. The silhouette vocabulary, the layout
 * and the seed hashing are upstream and unmodified; what changes is color:
 * every fill comes from a pride flag, painted as stripes rather than as a
 * single seeded hue.
 */

import { getFlag, FLAG_IDS, type Flag, type FlagId } from "./flags";
import { prideColors, type PrideColors, type StripeMode } from "./palette";
import { seedState, stream } from "./vendor/hash";
import { superellipse } from "./vendor/shape";
import { traits, type TraitOverrides } from "./vendor/traits";
import { style, shapePin, type ShapeId } from "./style";
import { expressionPins, type ExpressionSelection } from "./expression";
import { motionStyle, type MotionPreset } from "./motion";

export type BackgroundShape = "square" | "circle" | "squircle";

export interface PridatarOptions {
  /** Emits width/height attributes. Omit to let CSS size it. */
  size?: number;
  /** Which flag to wear. `"auto"` derives one from the seed. Default `"auto"`. */
  flag?: FlagId | "auto";
  /** Where the stripes are painted. Default `"background"`. */
  stripes?: StripeMode;
  /** Pins the silhouette. `"auto"` derives one from the seed. Default `"auto"`. */
  shape?: ShapeId | "auto";
  /** Pins the face. `"auto"` derives one from the seed. Default `"auto"`. */
  expression?: ExpressionSelection;
  /** Flat fill for whichever side the stripes do not cover. `"auto"` derives it. */
  solid?: string | "auto";
  /** Idle animation, shipped as CSS inside the SVG. Default `"off"`. */
  motion?: MotionPreset;
  /** Backdrop shape, or `false` for a transparent backdrop. Default `"squircle"`. */
  background?: false | BackgroundShape;
  /** Adds a `<title>` for screen readers. */
  title?: string;
  /** Applies NFC + trim + lowercase to the name. Default true. */
  normalize?: boolean;
  /** Pins individual layout traits, in the same 0–1 units the hash produces. */
  traits?: TraitOverrides;
}

export interface ResolvedPridatar {
  readonly flag: Flag;
  readonly colors: PrideColors;
  readonly stripes: StripeMode;
  readonly shape: string;
}

const escape = (s: string) =>
  s.replace(/[&<>]/g, (c) => (c === "&" ? "&amp;" : c === "<" ? "&lt;" : "&gt;"));

const backdropPath = (bg: BackgroundShape): string =>
  bg === "square"
    ? "M0 0H100V100H0Z"
    : superellipse({ cx: 50, cy: 50, rx: 50, ry: 50, n: bg === "circle" ? 2 : 6 });

/** Hard-edged vertical stripes, in user space so the whole figure shares one flag. */
function gradient(id: string, stripes: readonly string[]): string {
  const stops = stripes
    .map((color, i) => {
      const a = ((i / stripes.length) * 100).toFixed(3);
      const b = (((i + 1) / stripes.length) * 100).toFixed(3);
      return `<stop offset="${a}%" stop-color="${color}"/><stop offset="${b}%" stop-color="${color}"/>`;
    })
    .join("");
  return `<linearGradient id="${id}" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="100">${stops}</linearGradient>`;
}

/** Merges explicit silhouette and expression choices into the trait overrides. */
function shapeTraits(opts: PridatarOptions): TraitOverrides | undefined {
  const pin = !opts.shape || opts.shape === "auto" ? undefined : shapePin(opts.shape);
  const face = expressionPins(opts.expression);
  if (pin === undefined && !face && !opts.traits) return undefined;
  return {
    ...face,
    ...opts.traits,
    ...(pin === undefined ? {} : { shape: pin }),
  };
}

/** A user-supplied flat fill, or undefined when the palette should derive one. */
const solidFill = (opts: PridatarOptions): string | undefined =>
  !opts.solid || opts.solid === "auto" || !/^#[0-9a-fA-F]{6}$/.test(opts.solid)
    ? undefined
    : opts.solid;

/** Deterministic flag choice for `flag: "auto"`. */
export const autoFlag = (name: string, normalize = true): FlagId =>
  FLAG_IDS[Math.floor(stream(seedState(name, normalize), "pride.flag") * FLAG_IDS.length)]!;

/** The flag, colors and silhouette a name resolves to, before serialization. */
export function resolvePridatar(name: string, opts: PridatarOptions = {}): ResolvedPridatar {
  const normalize = opts.normalize ?? true;
  const mode: StripeMode = opts.stripes ?? "background";
  const flagId = !opts.flag || opts.flag === "auto" ? autoFlag(name, normalize) : opts.flag;
  const flag = getFlag(flagId);
  const t = traits(name, normalize, shapeTraits(opts));

  return {
    flag,
    stripes: mode,
    colors: prideColors({ flag, mode, pick: t("pride.stripe"), solid: solidFill(opts) }),
    shape: style.layout(t).shape,
  };
}

/** Renders a deterministic pride blobatar as SVG markup. */
export function pridatar(name: string, opts: PridatarOptions = {}): string {
  const normalize = opts.normalize ?? true;
  const { flag, colors, stripes } = resolvePridatar(name, opts);
  const t = traits(name, normalize, shapeTraits(opts));
  const layout = style.layout(t);

  const uid = seedState(`${name}|${flag.id}|${stripes}`, normalize).toString(36);
  const bgId = `pa-bg-${uid}`;
  const bodyId = `pa-body-${uid}`;

  const defs =
    (colors.bgStripes.length ? gradient(bgId, colors.bgStripes) : "") +
    (colors.bodyStripes.length ? gradient(bodyId, colors.bodyStripes) : "");

  const bg = opts.background ?? "squircle";
  const plate =
    bg === false
      ? ""
      : `<path d="${backdropPath(bg)}" fill="${
          colors.bgStripes.length ? `url(#${bgId})` : colors.bg
        }"/>`;

  const motion: MotionPreset = opts.motion ?? "off";
  const figure = style.render(
    layout,
    {
      head: colors.bodyStripes.length ? `url(#${bodyId})` : colors.head,
      eye: colors.eye,
    },
    motion !== "off",
  );
  const face = !opts.expression || opts.expression === "auto" ? undefined : opts.expression;
  const anim = motionStyle(uid, motion, face);


  const dim = opts.size ? ` width="${opts.size}" height="${opts.size}"` : "";
  const label = opts.title ? `<title>${escape(opts.title)}</title>` : "";

  const id = anim ? ` id="pa-${uid}"` : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"${dim}${id} role="img">${label}${
    anim
  }${defs ? `<defs>${defs}</defs>` : ""}${plate}${figure}</svg>`;
}

/** The same markup as a `data:` URI, for `<img src>` and CSS `url()`. */
export const pridatarDataUri = (name: string, opts: PridatarOptions = {}): string =>
  `data:image/svg+xml;utf8,${encodeURIComponent(pridatar(name, opts))}`;
