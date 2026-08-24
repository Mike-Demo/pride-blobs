# Pridatar — a fork of blobatar

This directory is a vendored fork of [Alain00/blobatar](https://github.com/Alain00/blobatar),
used under the MIT License. Copyright (c) 2026 Alain. The full upstream license
text is kept at `vendor/LICENSE`.

**Upstream commit:** `9ebabd25b23bae69ba4eb9d4d9e4cd3c87e79bd0` (`main`)

## What is unmodified

Everything under `vendor/` is copied verbatim from
`packages/blobatar/src`:

- `hash.ts` — seed hashing (murmur3 finalizer, streamed per trait key)
- `traits.ts` — seeded trait reads and overrides
- `shape.ts` — superellipse, blob, polygon, box and taper path builders
- `color.ts` — OKLCh conversion, contrast walk, mixing
- `styles/shapes.ts`, `styles/compose.ts`, `styles/blob.ts` — the ten-shape
  silhouette vocabulary and layout

## What this fork changes

- `flags.ts` — pride flags as ordered stripe lists.
- `palette.ts` — replaces the seeded single-hue ramp with flag-derived colors,
  reusing the upstream contrast walk so eyes stay legible on every stripe.
- `pridatar.ts` — a striping renderer: flag stripes are painted as hard-edged
  user-space gradients on the backdrop, the body, or both.

## What was left behind

The upstream animation layer (`animate.ts`, `morph.ts`, `idle.ts`, `ease.ts`,
`expression.ts`, `motion.css`) and the non-React framework adapters are not
vendored. Nothing in this fork depends on them, and they can be pulled in from
upstream later without touching the pride layer.
