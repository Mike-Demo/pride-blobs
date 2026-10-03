---
title: "Pridatar — deterministic pride blobatars from any name"
description: "Turn any name into a striped pride-flag avatar, the same way every time. 15 flags, browser-generated SVG/PNG/animated GIF, no accounts, no uploads."
canonical: "https://blobs.gay/"
last-updated: "2026-10-03"
---

# Pridatar — deterministic pride blobatars from any name

> Turn any name into a striped pride-flag blob avatar, the same way every time. 15 flags, browser-generated SVG/PNG/animated GIF, no accounts, no uploads.

Every name gets a flag, and keeps it. Type any string — a handle, an email,
a repo name — and Pridatar renders a deterministic avatar dressed in pride
flag stripes. The same seed always produces the same blob.

## How it works

- **Seed**: any text string. The seed drives the avatar deterministically.
- **15 pride flags**: rainbow, progress, trans, bisexual, pansexual, nonbinary, lesbian, asexual, genderqueer, genderfluid, agender, aromantic, intersex, demisexual, polysexual — each with an accessible, contrast-checked palette.
- **Shapes**: blob-style silhouettes plus cat, bunny, bear, fox, and a waving flag.
- **Expressions**: eight faces (neutral, happy, wide, sleepy, wink, side, suspicious, surprised).
- **Motion**: idle animations (blink, bob, bouncy, breathe, idle) or off.
- **Exports**: SVG, PNG, and animated GIF — all rendered in your browser.
- **Shareable URLs**: seed, flag, shape, expression, colors, and size all live in the link, e.g. `https://blobs.gay/?seed=demo&flag=rainbow`.

## Machine-readable resources

- [llms.txt](https://blobs.gay/llms.txt) — agent context index
- [auth.md](https://blobs.gay/auth.md) — authentication (none required)
- [pricing.md](https://blobs.gay/pricing.md) — pricing (free)
- [docs.md](https://blobs.gay/docs.md) — documentation
- [about.md](https://blobs.gay/about.md) — about the project
- [contact.md](https://blobs.gay/contact.md) — contact
- [privacy.md](https://blobs.gay/privacy.md) — privacy
- [Agent discovery (ARD)](https://blobs.gay/.well-known/ard.json)
- [Agent card](https://blobs.gay/.well-known/agent-card.json)
- [Agent skills index](https://blobs.gay/.well-known/agent-skills/index.json)
- [Plugin manifest](https://blobs.gay/plugin.json)

Pridatar is a pride-focused fork of [blobatar](https://github.com/Alain00/blobatar)
(MIT License), built by Mike Demopoulos. Source: https://github.com/Mike-Demo/pride-blobs
