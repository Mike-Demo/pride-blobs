/**
 * Pridatar's own silhouettes: four animals and a flag.
 *
 * They follow the upstream `Shape` contract exactly — core size, an optional
 * body patch, the face region the eyes must fit inside, and decoration unioned
 * under the body — so they compose with the vendored vocabulary rather than
 * forking it.
 */
import { box, polygon, superellipse } from "./vendor/shape";
import type { Body, Ellipse, Shape } from "./vendor/styles/shapes";

const shrunk = (k: number) => (b: Body): Ellipse => ({
  cx: b.cx,
  cy: b.cy,
  rx: b.rx * k,
  ry: b.ry * k,
});

/** A rounded triangle, used for ears and muzzles. */
const wedge = (
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  rot: number,
  round = 0.16,
): string => polygon({ cx, cy, rx, ry, sides: 3, round, rot });

const r2 = (v: number) => Math.round(v * 100) / 100;

/**
 * A banner with a waving top and bottom edge, sampled as a polyline.
 *
 * Both edges share one phase so the cloth reads as a single ripple travelling
 * across it rather than as a shape that pinches in the middle.
 */
export function banner(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  amp: number,
  phase: number,
  steps = 18,
): string {
  const wave = (i: number) => Math.sin(phase + (i / steps) * Math.PI * 2.2) * amp;
  let d = `M${r2(cx - rx)} ${r2(cy - ry + wave(0))}`;
  for (let i = 1; i <= steps; i++) {
    d += `L${r2(cx - rx + (2 * rx * i) / steps)} ${r2(cy - ry + wave(i))}`;
  }
  for (let i = steps; i >= 0; i--) {
    d += `L${r2(cx - rx + (2 * rx * i) / steps)} ${r2(cy + ry + wave(i))}`;
  }
  return d + "Z";
}

/** Pointed ears, a slightly squared head. */
export const cat: Shape = {
  name: "cat",
  core: 0.86,
  body: (t, b) => {
    b.cy += 0.06 * b.ry;
    b.n = t.num("cat.n", 2.2, 3.2);
  },
  face: shrunk(0.86),
  decorate: (t, b, out) => {
    const lean = t.num("cat.ear", 8, 20);
    const h = b.ry * t.num("cat.earh", 0.5, 0.66);
    for (const s of [-1, 1]) {
      out.extra.push(
        wedge(b.cx + s * b.rx * 0.62, b.cy - b.ry * 0.72, b.rx * 0.32, h, s * lean),
      );
    }
  },
};

/** Two tall upright ears. */
export const bunny: Shape = {
  name: "bunny",
  core: 0.82,
  body: (t, b) => {
    b.cy += 0.12 * b.ry;
    b.n = t.num("bunny.n", 2, 2.6);
  },
  face: shrunk(0.86),
  decorate: (t, b, out) => {
    const lean = t.num("bunny.lean", 4, 16);
    const len = b.ry * t.num("bunny.len", 0.72, 0.95);
    for (const s of [-1, 1]) {
      out.extra.push(
        superellipse({
          cx: b.cx + s * b.rx * 0.36,
          cy: b.cy - b.ry * 0.92,
          rx: b.rx * 0.2,
          ry: len,
          n: 2,
          rot: s * lean,
        }),
      );
    }
  },
};

/** Round head, round ears. */
export const bear: Shape = {
  name: "bear",
  core: 0.88,
  body: (_t, b) => {
    b.n = 2.2;
  },
  face: shrunk(0.88),
  decorate: (t, b, out) => {
    const r = b.rx * t.num("bear.ear", 0.28, 0.36);
    const spread = t.num("bear.spread", 0.66, 0.78);
    for (const s of [-1, 1]) {
      out.petals.push({ cx: b.cx + s * b.rx * spread, cy: b.cy - b.ry * 0.68, r });
    }
  },
};

/** Wide swept ears and a tapered muzzle. */
export const fox: Shape = {
  name: "fox",
  core: 0.84,
  body: (t, b) => {
    b.cy -= 0.04 * b.ry;
    b.n = t.num("fox.n", 2, 2.6);
    b.ry *= 0.94;
  },
  face: (b) => ({ cx: b.cx, cy: b.cy - b.ry * 0.06, rx: b.rx * 0.8, ry: b.ry * 0.72 }),
  decorate: (t, b, out) => {
    const lean = t.num("fox.ear", 18, 32);
    for (const s of [-1, 1]) {
      out.extra.push(
        wedge(b.cx + s * b.rx * 0.74, b.cy - b.ry * 0.6, b.rx * 0.3, b.ry * 0.62, s * lean, 0.1),
      );
    }
    out.extra.push(
      wedge(b.cx, b.cy + b.ry * 0.78, b.rx * t.num("fox.snout", 0.32, 0.42), b.ry * 0.5, 180, 0.22),
    );
  },
};

/** A waving banner on a pole — the flag itself, wearing the flag. */
export const flagShape: Shape = {
  name: "flag",
  core: 1.02,
  body: (t, b) => {
    b.cx += b.rx * 0.12;
    b.ry = b.rx * t.num("flag.ratio", 0.58, 0.7);
  },
  face: (b) => ({ cx: b.cx, cy: b.cy, rx: b.rx * 0.72, ry: b.ry * 0.6 }),
  decorate: (t, b, out) => {
    const poleX = b.cx - b.rx - b.rx * 0.1;
    out.extra.push(box(poleX, b.cy + b.ry * 0.15, b.rx * 0.06, b.ry * 1.5));
    out.petals.push({ cx: poleX, cy: b.cy - b.ry * 1.35, r: b.rx * 0.1 });
    void t;
  },
  path: (b) => banner(b.cx, b.cy, b.rx, b.ry, b.ry * 0.16, b.rot),
};

export const CREATURE_SHAPES: readonly Shape[] = [cat, bunny, bear, fox, flagShape];
