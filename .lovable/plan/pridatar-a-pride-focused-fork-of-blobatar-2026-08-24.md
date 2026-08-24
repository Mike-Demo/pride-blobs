# Pridatar — a Pride-focused fork of blobatar

A vendored MIT fork of [Alain00/blobatar](https://github.com/Alain00/blobatar) whose palettes come from pride flags instead of a single seeded hue, plus a landing page with a gallery, docs, and an interactive playground.

## What gets built

### 1. The vendored fork (`src/lib/pridatar/`)

Copy the core generator source (`blobatar.ts`, `color.ts`, `hash.ts`, `blob.ts`, `shape.ts`, `render.ts`, `traits.ts`, `expression.ts`, `internal.ts`, `uri.ts`) into the project, keep the upstream MIT `LICENSE` file and a `NOTICE`/README crediting Alain, and record the upstream commit the copy came from. Same deterministic seed → same avatar guarantee stays intact.

Animation modules (`morph`, `animate`, `idle`, `ease`) are skipped in the first pass — they are the largest part of upstream and add nothing to a static avatar surface. Easy to pull in later.

### 2. Pride palettes

A new `flags.ts` module defining each flag as an ordered stripe list, with a resolver that maps a flag plus the seed hash to the blobatar color slots (`bg`, `head`, `eye`), and a stripe-fill renderer so multi-color flags read as flags rather than as one flat color. Contrast enforcement from upstream `color.ts` is preserved so eyes stay legible on every stripe.

Flags (extended set):
Rainbow (6-stripe), Progress, Trans, Bisexual, Pansexual, Nonbinary, Lesbian, Asexual, Genderqueer, Genderfluid, Agender, Aromantic, Intersex, Demisexual, Polysexual.

Flag selection modes: pick one explicitly, or `auto` — deterministically derived from the seed, so a crowd renders as a varied, mixed field.

### 3. The app (`/`)

One page, three sections:

- **Hero + crowd gallery** — a dense field of generated avatars across names and flags, plus a live "type your name" input that regenerates the hero avatar as you type.
- **Playground** — name input, flag picker (swatch grid), size, expression, shape/stripe-style toggles; live preview, a small crowd preview of the same settings, copy-SVG and download-PNG actions, and a copyable code snippet matching the current settings.
- **Docs** — install/usage snippets for the vanilla and React entry points, flag reference table, and the attribution/licensing note.

## Technical notes

- Pure client-side generation: SVG string built by the vendored renderer, injected via a small `<Pridatar>` React component wrapping the core. No backend, no database.
- PNG download via canvas rasterization of the generated SVG in the browser.
- Design system in `src/styles.css`: dark, high-contrast stage so flag colors carry the page. Flag colors live as data in `flags.ts`, not as hardcoded Tailwind utilities; UI chrome uses semantic tokens only.
- Route `/` replaces the template placeholder, with its own `head()` metadata.
- Strict TypeScript, named exports, generator logic kept out of components.

## Not included

- Publishing to npm, or Vue/Svelte/Solid/Preact/CLI adapters (upstream has them; this fork starts with core + React).
- Creating the GitHub fork itself — this project is the fork's working tree and can be pushed to GitHub via the GitHub integration.
