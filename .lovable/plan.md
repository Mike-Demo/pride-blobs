# Animated blobs

Add an optional idle animation so a Pridatar can gently breathe, bob and blink instead of sitting still.

The renderer already emits animation hooks (`mo-breathe`, `mo-bob`, `mo-eyes`, `mo-eye` groups with per-eye lean/wrap values) when asked, but nothing currently asks for them and no keyframes exist. This wires that path up.

## What you get

- A new **Motion** control in the playground: `Off` (default), `Idle`, `Bouncy`.
  - Idle: slow breathing scale plus a soft vertical bob, and an occasional blink.
  - Bouncy: same moves, faster and with more travel.
- The animation ships inside the SVG itself, so a copied SVG or a shared link animates too. Downloaded PNGs stay a still frame.
- Respects the system "reduce motion" setting: the avatar renders static for anyone who asked for less motion.
- Motion is part of the shareable URL, alongside seed, flag, shape, expression and solid color.
- Docs page gains a short Motion section with the prop and a live example.

## Technical notes

- New `src/lib/pridatar/motion.ts`: motion presets (`off | idle | bouncy`) plus a `motionStyle(uid, preset)` builder that returns a scoped `<style>` block with `@keyframes` for breathe, bob and blink, all selectors namespaced under the SVG's existing per-render `uid` so several avatars on one page never collide. Whole block is wrapped in `@media (prefers-reduced-motion: no-preference)`.
- `pridatar.ts`: add `motion?: MotionPreset` to `PridatarOptions`, pass `mo = motion !== "off"` into `style.render(...)`, inject the style block and an `id`/class on the root `<svg>` when motion is on. No change to geometry, so existing seeds render identically.
- Blink is driven by scaling the `mo-eyes` group vertically; the per-eye `--mo-lean` / `--mo-wrap` variables the composer already writes are used so leaning eyes blink along their own axis.
- `share.ts`: `motion` search param, default `"off"`, validated against the preset list.
- New `src/components/pridatar/MotionPicker.tsx` (segmented control matching the existing Stripes/Backdrop pattern), added to `Playground.tsx`, included in the generated code snippet, and exported from `src/lib/pridatar/index.ts`.
- Crowd/logo avatars stay static; only the playground preview and explicit `motion` callers animate.
