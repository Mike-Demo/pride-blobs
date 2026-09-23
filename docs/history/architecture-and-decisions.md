# Architecture and decisions

A record of how Pride Blobs is put together and why, so the project stays workable without
the original chat history.

## Origin

Forked in spirit from [blobatar](https://github.com/Alain00/blobatar) (MIT). The hashing
and layout logic was vendored into `src/lib/pridatar/vendor` rather than installed as a
dependency, so the project has no runtime dependency on upstream. Attribution lives in
`src/lib/pridatar/NOTICE.md`.

## Core modules (`src/lib/pridatar/`)

| File | Responsibility |
| --- | --- |
| `pridatar.ts` | Turns a seed into a full set of avatar traits |
| `flags.ts` | The 15 pride flags and their stripe definitions |
| `palette.ts` | Colour assignment, OKLCh contrast handling, solid-colour overrides |
| `style.ts` | Shape ids and body/backdrop geometry |
| `creatures.ts` | Cat, bunny, bear, fox and waving-flag silhouettes |
| `expression.ts` | The eight faces |
| `motion.ts` | Idle and bouncy SVG animation presets, tuned per expression |
| `share.ts` | URL state: parse, serialise, defaults |
| `export.ts` | SVG and PNG downloads |
| `gif.ts` | Animated GIF encoding |
| `snippets.ts` | React / inline SVG / CSS snippets and the CodePen prefill payload |

Rendering is pure SVG built from these traits — no canvas drawing, no image assets.

## Decisions worth remembering

**Deterministic by seed.** Same name plus same options always produces the same avatar.
Anything random would break share links and the gallery.

**Everything in the URL.** Seed, flag, shape, expression, stripe placement, backdrop,
solid colour and size are all query parameters. `share.ts` is the single source of truth
for defaults and parsing. `"auto"` is a valid stored value for shape, expression and
solid colour — it means "derive from the seed" and must stay whitelisted in the parser.

**Client-side exports.** GIF encoding uses `gifenc`, imported dynamically inside the
export function. A static named import breaks server rendering, because the package is
CommonJS. Poses are rasterised at fixed intervals so the loop is seamless.

**Animation follows expression.** Motion timing is derived from the selected face —
sleepy breathes slowly and doesn't blink, happy bounces faster and higher. Reduced-motion
preferences disable animation everywhere, including the gallery carousel.

**No backend.** No database, login, or request-time server logic. That is what makes the
static build possible, and it is a constraint worth keeping.

**Static prerendering.** `/` and `/docs` are prerendered to HTML at build time. Head
metadata lives in each route's `head()` so titles, descriptions and the Search Console
verification tag are baked into the served HTML rather than injected by the browser.

**Dual output folders.** The framework writes to `.output/public`; a post-build script
copies it to `dist/client` because that is what the host publishes. The script is
tolerant of both layouts so the build doesn't break if that ever changes.

**Design system.** Web Awesome is wired up locally (theme CSS plus the component loader in
`src/routes/__root.tsx`) rather than from a CDN. The tuned dark pride palette was kept
rather than remapped onto default tokens.

## Accessibility commitments

Decorative SVGs are hidden from screen readers, controls are grouped and labelled, there
is a skip link, focus is visible, tap targets are sized for mobile, and reduced-motion is
respected. Colour pairings are contrast-checked in `palette.ts`.

## SEO

`public/sitemap.xml` is static and lists every public route; `public/robots.txt` points at
it. The site is verified in Google Search Console via a meta tag in `src/routes/__root.tsx`
— that tag must survive any root-route edit.
