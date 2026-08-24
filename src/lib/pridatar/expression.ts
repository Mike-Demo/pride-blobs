/**
 * Expressions.
 *
 * The face has no dedicated geometry: it is the eye cluster `faceFit` builds
 * from a handful of hashed traits. An expression is therefore not new drawing
 * code, it is a set of pinned positions in those same 0â€“1 trait units, which
 * keeps every containment guarantee in the layout running.
 */
import type { TraitOverrides } from "./vendor/traits";

export const EXPRESSION_IDS = [
  "neutral",
  "happy",
  "wide",
  "sleepy",
  "wink",
  "side",
  "suspicious",
  "surprised",
] as const;

export type ExpressionId = (typeof EXPRESSION_IDS)[number];
export type ExpressionSelection = ExpressionId | "auto";

const EXPRESSIONS: Record<ExpressionId, TraitOverrides> = {
  neutral: {
    "eye.rx": 0.5, "eye.ratio": 0.45, "eye.scale": 0.5, "eye.stretch": 0.5,
    "eye.gap": 0.5, "gaze.x": 0.5, "gaze.y": 0.55, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0.4,
  },
  happy: {
    "eye.rx": 0.85, "eye.ratio": 0, "eye.scale": 0.55, "eye.stretch": 0.5,
    "eye.gap": 0.6, "gaze.x": 0.5, "gaze.y": 0.35, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0.05,
  },
  wide: {
    "eye.rx": 0.95, "eye.ratio": 0.3, "eye.scale": 0.9, "eye.stretch": 0.6,
    "eye.gap": 0.45, "gaze.x": 0.5, "gaze.y": 0.4, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0,
  },
  sleepy: {
    "eye.rx": 0.9, "eye.ratio": 0, "eye.scale": 0.4, "eye.stretch": 0,
    "eye.gap": 0.55, "gaze.x": 0.5, "gaze.y": 0.85, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0.99,
  },
  wink: {
    "eye.rx": 0.75, "eye.ratio": 0.5, "eye.scale": 0, "eye.stretch": 0,
    "eye.gap": 0.55, "gaze.x": 0.5, "gaze.y": 0.4, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0.2,
  },
  side: {
    "eye.rx": 0.6, "eye.ratio": 0.4, "eye.scale": 0.5, "eye.stretch": 0.5,
    "eye.gap": 0.35, "gaze.x": 0.98, "gaze.y": 0.5, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0.3,
  },
  suspicious: {
    "eye.rx": 0.85, "eye.ratio": 0.05, "eye.scale": 0.5, "eye.stretch": 0.2,
    "eye.gap": 0.5, "gaze.x": 0.8, "gaze.y": 0.75, "eye.dy": 0.5,
    "eye.lean": 0.95, "eye.lean2": 0.9, "eye.n": 0.9,
  },
  surprised: {
    "eye.rx": 1, "eye.ratio": 0, "eye.scale": 1, "eye.stretch": 0.5,
    "eye.gap": 0.7, "gaze.x": 0.5, "gaze.y": 0.15, "eye.dy": 0.5,
    "eye.lean": 0.5, "eye.lean2": 0.5, "eye.n": 0,
  },
};

/** Trait pins for an expression, or undefined for `auto`. */
export const expressionPins = (id?: ExpressionSelection): TraitOverrides | undefined =>
  !id || id === "auto" ? undefined : EXPRESSIONS[id];
