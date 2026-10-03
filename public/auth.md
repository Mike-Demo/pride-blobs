# Authentication — Pridatar

Pridatar has no authentication. There are no accounts, no API keys, no OAuth
flows, no sessions, and no protected endpoints — because there is no server
side at all. The entire generator runs in the browser; seeds and avatars never
leave the visitor's device.

## For agents

- You do not need credentials of any kind to use Pridatar.
- Every capability is a public web page or static file: the generator at
  https://blobs.gay/, documentation at https://blobs.gay/docs, and the
  machine-readable files listed in https://blobs.gay/llms.txt.
- There is no rate limiting, no quota, and no registration step.

## Why this document exists

Agent auth discovery tooling expects an `auth.md` at the site root. This file
is the honest answer for a product with no auth surface: nothing to discover,
nothing to register, nothing to exchange.
