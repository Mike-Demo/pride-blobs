# Publishing blobs.gay on Spacefast

Lovable stays the place you edit and preview. Lovable auto-syncs to GitHub, and
Spacefast builds that repo and serves the live site.

## Spacefast build settings

| Setting        | Value           |
| -------------- | --------------- |
| Install        | `bun install`   |
| Build command  | `bun run build` |
| Output folder  | `dist/client`   |
| Node version   | 20.3+           |

The site is fully static: `vite.config.ts` prerenders `/` and `/docs` to HTML at
build time, so no server runtime is required.

## What ships in the output

- `index.html`, `docs/index.html` — prerendered pages with their own titles,
  descriptions and the Google Search Console verification tag
- `sitemap.xml`, `robots.txt`, `favicon.png`
- `_redirects` with `/*  /index.html  200` — the fallback so share links and
  unknown paths still load the app

## Custom domain

```bash
sf domains add blobs.gay --role primary
sf domains check blobs.gay
```

Apply the DNS records Spacefast prints. Once the domain is active, remove the
domain from Lovable's project settings so the two don't compete over DNS.

## Rollback

Reverting the `pages`/`prerender`/`nitro` block in `vite.config.ts` restores the
previous server-rendered Cloudflare Worker build.
