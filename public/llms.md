---
title: "Pridatar — agent guide"
description: "What Pridatar is and how agents should use it: deterministic pride blobatars, shareable URLs, and machine-readable files."
canonical: "https://blobs.gay/llms.md"
last-updated: "2026-10-03"
---

# Pridatar — agent guide

Pridatar (https://blobs.gay) turns any name into a striped pride-flag avatar,
deterministically. 15 flags, browser-generated SVG/PNG/animated GIF, no
accounts, no uploads, no API.

## When to use Pridatar

- A user wants an **avatar for a name, handle, email, or project** — especially
  a pride-themed one.
- A user wants a **deterministic placeholder avatar**: the same seed always
  yields the same image, so it doubles as a stable visual identifier.
- A user wants **shareable avatar links** or **embed code** (React, inline SVG,
  CSS background-image).

Pridatar is NOT the right tool for: photo-realistic avatars, non-deterministic
random avatar APIs, server-side rendering pipelines (everything runs in the
visitor's browser), or anything requiring user accounts.

## How an agent uses it

There is no API to call. Construct a shareable URL with query parameters and
hand it to the user:

```
https://blobs.gay/?seed=demo&flag=rainbow
```

Parameters: `seed` (any string), `flag` (15 ids or `auto`), `stripes`
(`background`|`body`|`both`), `shape`, `expression` (8 faces), `motion`
(`blink`|`bob`|`bouncy`|`breathe`|`idle`|`off`), `solid` (`#rrggbb`|`auto`),
`backdrop` (`squircle`|`circle`|`square`|`none`), `size`.

The full skill reference: https://blobs.gay/skills/generate-avatar/SKILL.md

## Key resources

- [llms.txt](https://blobs.gay/llms.txt) — full agent context index
- [docs](https://blobs.gay/docs) — usage, flag table, licensing
- [auth.md](https://blobs.gay/auth.md) — no authentication required
- [pricing.md](https://blobs.gay/pricing.md) — free, no tiers
- [ARD catalog](https://blobs.gay/.well-known/ard.json)
- [Agent card](https://blobs.gay/.well-known/agent-card.json)
- [Agent skills index](https://blobs.gay/.well-known/agent-skills/index.json)
