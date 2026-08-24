# Code panel: React, SVG, CSS + Open in CodePen

Today the playground shows one snippet (the React `<Pridatar />` usage). This adds tabbed output formats and a one-click CodePen handoff.

## Tabs in the code panel

- **React** — current snippet, unchanged.
- **SVG** — the full generated SVG markup for the current avatar (pretty-printed, copyable). This is what "inline SVG" means: paste straight into HTML.
- **CSS** — the avatar as a `background-image` using a `data:` URI, e.g. a `.pridatar { width/height; background-image: url("data:image/svg+xml,…"); }` rule, plus an inline-style variant (`<div style="…">`) for one-off usage.

Each tab gets a Copy button that reports success through the existing announce region.

## Open in CodePen

A button that posts to CodePen's prefill endpoint (`https://codepen.io/pen/define`) with a hidden form containing JSON for `html`, `css` and `title`:

- `html`: a small demo page with the inline SVG plus the CSS-background div, so both techniques are visible.
- `css`: the `.pridatar` rule and minimal centering/background styles.
- Opens in a new tab; no network calls from our side, no data leaves the browser beyond the form post.

## Technical notes

- New `src/lib/pridatar/snippets.ts` (pure, no DOM): builds the react/svg/css/inline strings and the CodePen prefill payload from `seed` + resolved options + size. Keeps string-building out of the component per the existing lib/UI split.
- `pridatarDataUri` already exists and is reused for the CSS variants; CSS `url()` needs the data URI quoted and `#` escaped — handled in the snippet builder.
- New `src/components/pridatar/CodeTabs.tsx` renders the tab group (accessible `role="tablist"`/`aria-selected`, 44px targets, `overflow-x-auto` `<pre>` to keep mobile overflow-free) and the CodePen form-post button.
- `Playground.tsx` swaps its single `<pre>` for `<CodeTabs />`; the inline snippet string moves into the new lib module.
- Docs page is untouched.
