# Hosting blobs.gay on Spacefast

The public site is built from this GitHub repository and served by Spacefast. Lovable is
where edits and previews happen; Lovable commits to `main`, Spacefast builds `main`.

```text
Lovable editor  ──commit──>  GitHub (main)  ──build──>  Spacefast  ──serves──>  blobs.gay
```

Nothing in the live path depends on Lovable at request time. If the Lovable project is
closed, the site keeps serving as long as DNS still points at Spacefast, and future edits
can be made through GitHub with any editor.

## Build settings

| Setting | Value |
| --- | --- |
| Install | `bun install` |
| Build command | `bun run build` |
| Output folder | `dist/client` |
| Node version | 20.3+ |

`bun run build` runs `vite build && node scripts/copy-static-output.mjs`.

## How the static build works

`vite.config.ts` lists the public routes under `tanstackStart.pages` and enables
prerendering with `autoStaticPathsDiscovery: false`:

```ts
tanstackStart: {
  server: { entry: "server" },
  pages: [{ path: "/" }, { path: "/docs" }],
  prerender: { enabled: true, autoStaticPathsDiscovery: false },
}
```

The framework writes the finished site to `.output/public`.
`scripts/copy-static-output.mjs` then copies it to `dist/client`, which is the folder
Spacefast publishes. The script is idempotent: if the output already lives in
`dist/client` it skips, and it only fails when neither directory exists.

**Do not set `nitro: { preset: "static" }`.** It breaks the SSR build with
`rolldownOptions.input should not be an html file when building for SSR`.

## What ships in the output

- `index.html` and `docs/index.html` — prerendered, each with its own title, description
  and the Google Search Console verification tag
- `sitemap.xml`, `robots.txt`, `favicon.png`
- `_redirects` containing `/*  /index.html  200`, so share links and unknown paths still
  load the app

## Adding a new page

1. Add the route file under `src/routes/`.
2. Add its path to `pages` in `vite.config.ts`.
3. Add its URL to `public/sitemap.xml`.
4. Build and confirm `dist/client/<route>/index.html` exists.

## Custom domain

```bash
sf domains add blobs.gay --role primary
sf domains check blobs.gay
```

Apply the DNS records Spacefast prints. Once the domain is active, remove the domain from
Lovable's project settings so the two don't compete over DNS. Search Console verification
keeps working because the tag is baked into the prerendered HTML.

## Rollback

Reverting the `pages`/`prerender` block in `vite.config.ts` and restoring the original
build command removes the static output and returns the project to a server build.
