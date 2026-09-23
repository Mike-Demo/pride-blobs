# Spacefast build spec

Full explanation: [docs/spacefast-hosting.md](docs/spacefast-hosting.md).

| Setting | Value |
| --- | --- |
| Install | `bun install` |
| Build command | `bun run build` |
| Output folder | `dist/client` |
| Node version | 20.3+ |

`bun run build` = `vite build && node scripts/copy-static-output.mjs`.

The site is fully static: `vite.config.ts` prerenders `/` and `/docs` to HTML at build
time, so no server runtime is required. The framework writes the finished site to
`.output/public`; the post-build script copies it to `dist/client` for Spacefast's
publish-folder check.

Do not set `nitro: { preset: "static" }` — it fails the SSR build.
