/**
 * Pridatar's silhouette vocabulary: the vendored ten, plus four animals and a
 * flag. Weights are declared here rather than as cumulative thresholds so the
 * table stays readable and the pin positions below can be derived from it.
 */
import { compose, faceFit, type Band } from "./vendor/styles/compose";
import type { Shape } from "./vendor/styles/shapes";
import {
  boxy, capsule, cloud, droplet, hexagon, nub, organic, round, sun, triangle,
} from "./vendor/styles/shapes";
import { bear, bunny, cat, flagShape, fox } from "./creatures";

/** `[shape, relative weight]`. Everyday shapes weigh more; the loud ones stay finds. */
const WEIGHTS: readonly (readonly [Shape, number])[] = [
  [round, 16], [organic, 20], [boxy, 8], [capsule, 7], [nub, 6],
  [cloud, 5], [droplet, 4], [hexagon, 3], [sun, 2], [triangle, 2],
  [cat, 7], [bunny, 6], [bear, 6], [fox, 5], [flagShape, 3],
];

const TOTAL = WEIGHTS.reduce((sum, [, w]) => sum + w, 0);

const BANDS: Band[] = [];
/** The mid-band position for each shape, so a shape can be pinned by name. */
const PINS: Record<string, number> = {};

let acc = 0;
for (const [shape, weight] of WEIGHTS) {
  const lower = acc / TOTAL;
  acc += weight;
  const upper = acc / TOTAL;
  BANDS.push([shape, upper]);
  PINS[shape.name] = (lower + upper) / 2;
}

export const SHAPE_IDS = WEIGHTS.map(([s]) => s.name) as readonly string[];
export type ShapeId = (typeof SHAPE_IDS)[number];

/** The `traits.shape` position that pins a silhouette, or undefined for `auto`. */
export const shapePin = (id: string): number | undefined => PINS[id];

export const style = compose(BANDS, faceFit);
