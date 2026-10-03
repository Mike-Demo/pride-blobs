---
title: "Pridatar docs — usage, flags, and licensing"
description: "How to generate pride blobatars: install paths, vanilla and React usage, the full flag reference table, and upstream attribution."
canonical: "https://blobs.gay/docs"
last-updated: "2026-10-03"
---

# Pridatar docs

One function, one component, fifteen flags.

## Install paths

This fork lives in the repo, not on npm (yet):

```
src/lib/pridatar/   # generator
src/components/pridatar/Pridatar.tsx
```

## Usage

**Anywhere (vanilla):**

```js
import { pridatar, pridatarDataUri } from "@/lib/pridatar";

const svg = pridatar(user.email, { size: 48 });
const src = pridatarDataUri(user.email, { flag: "trans" });
```

**React:**

```jsx
import { Pridatar } from "@/components/pridatar/Pridatar";

<Pridatar name={user.email} size={48} />
<Pridatar name={user.email} flag="nonbinary" stripes="both" size={48} />
```

**Motion** (idle breathing + bob + blink, off by default):

```jsx
<Pridatar name={user.email} motion="idle" size={64} />
<Pridatar name={user.email} motion="bouncy" size={64} />

// same option on the string renderer
pridatar(user.email, { motion: "idle" });
```

Available motion presets: `blink`, `bob`, `bouncy`, `breathe`, `idle`, `off`.

## Flag reference

15 flags with accessible, contrast-checked palettes: `rainbow`, `progress`,
`trans`, `bisexual`, `pansexual`, `nonbinary`, `lesbian`, `asexual`,
`genderqueer`, `genderfluid`, `agender`, `aromantic`, `intersex`, `demisexual`,
`polysexual`. See the flag table on https://blobs.gay/docs for per-flag stripe
colors and notes.

## Shareable URLs

Every option can live in the URL: `seed`, `flag`, `stripes` (`background`,
`body`, `both`), `shape`, `expression`, `motion`, `solid` (`#rrggbb` or
`auto`), `backdrop` (`squircle`, `circle`, `square`, `none`), `size`.

Example: `https://blobs.gay/?seed=demo&flag=rainbow`

## Exports

SVG, PNG, and animated GIF — all rendered in the browser, nothing uploaded.
Copy-paste embed snippets (React, inline SVG, CSS `background-image`) and an
"Open in CodePen" button are on the generator page.

## FAQ

**Is Pridatar free to use?**
Yes. Pridatar is MIT-licensed open source software. Generate as many avatars
as you like, right in your browser — no account, no fees.

**Do I need an account or upload anything?**
No. Type a name and the avatar is generated locally as SVG. Nothing leaves
your browser: there is no server, no tracking, and no uploads.

**Will the same name always make the same avatar?**
Yes. Every visual choice — the flag, the stripes, the silhouette, the face —
is derived deterministically from the name, so the same string renders the
same blobatar on every device, every time.

**Can I use Pridatar avatars in my own project?**
Yes. The MIT license covers commercial and personal use. Pridatar is a fork
of blobatar by Alain00 (also MIT); attribution is credited on the licenses
page.

## Licensing

Pridatar is a pride-focused fork of [blobatar](https://github.com/Alain00/blobatar)
(MIT). Upstream and dependency credits: https://blobs.gay/licenses
