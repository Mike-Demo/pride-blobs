# Browse the Pridatar pride flag catalog

Use this when an agent or user needs the list of pride flags Pridatar can
render onto an avatar, or the exact stripe colors of a flag.

## What it is

Pridatar (https://blobs.gay) renders deterministic avatars dressed in one of
15 pride flags. Each flag is mapped to an accessible, contrast-checked color
palette. The full reference table with notes and sources lives at
https://blobs.gay/docs — prefer that page for the authoritative, cited table.

## The 15 flags

`rainbow`, `progress`, `trans`, `bisexual`, `pansexual`, `nonbinary`,
`lesbian`, `asexual`, `genderqueer`, `genderfluid`, `agender`, `aromantic`,
`intersex`, `demisexual`, `polysexual`

Labels and palettes: Rainbow, Progress Pride, Transgender, Bisexual,
Pansexual, Nonbinary, Lesbian, Asexual, Genderqueer, Genderfluid, Agender,
Aromantic, Intersex, Demisexual, Polysexual.

## How to use the flag id

Pass the id as the `flag` query parameter on a shareable avatar URL:

```
https://blobs.gay/?seed=demo&flag=trans
```

`flag=auto` lets the seed pick a flag deterministically. Omit `flag` and it
defaults to `rainbow`.

Everything runs in the browser; there is no API, no account, and no server
side to call. This skill is a reference, not a tool invocation.
