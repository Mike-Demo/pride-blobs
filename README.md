# Pride Blobs

Pride-focused blobatars: deterministic, name-seeded avatars dressed in pride flags.

**Live site**: https://blobs.gay

A fork of [blobatar](https://github.com/Alain00/blobatar) (MIT License), rewritten around
pride flags, creature silhouettes, expressions and animation.

## What it does

- **15 pride flags** mapped to accessible, contrast-checked colour palettes
- **Shapes**: classic blob plus cat, bunny, bear, fox and a waving flag silhouette
- **Expressions**: eight faces, each with matching idle/bouncy motion
- **Colour control**: striped flag fill on the body or the backdrop, with a solid colour on the other side
- **Exports**: SVG, PNG and animated GIF, generated entirely in the browser
- **Shareable URLs**: seed, flag, shape, expression, colours and size all live in the link
- **Embed code**: React, inline SVG and CSS `background-image` snippets, plus an "Open in CodePen" button

## Documentation

| Document | What's in it |
| --- | --- |
| [docs/spacefast-hosting.md](docs/spacefast-hosting.md) | How the live site is built and served, DNS, rollback |
| [docs/spacefast-lovable-prompt.md](docs/spacefast-lovable-prompt.md) | Reusable prompt to prepare another Lovable project for static hosting |
| [docs/history/architecture-and-decisions.md](docs/history/architecture-and-decisions.md) | Why the project is built the way it is |
| [SPACEFAST.md](SPACEFAST.md) | Short build spec for the host |
| [roadmap.md](roadmap.md) | Open and completed tasks |

## Development

Requires Node.js 20.3+ and [Bun](https://bun.sh) (npm also works).

```sh
git clone <this-repository-url>
cd <repository-name>
bun install
bun run dev
```

## Build

```sh
bun run build
```

This prerenders every public page to static HTML. The finished site lands in
`dist/client` (copied from the framework's `.output/public`). No server runtime,
database or login is required — the whole site is static files.

## Hosting

The public site at https://blobs.gay is built from this GitHub repository and served by
Spacefast. Editing happens in [Lovable](https://lovable.dev/projects/e4ae0ed4-df6b-4f52-9c92-49c8c2ad714d),
which commits straight to `main`; pushing to `main` from anywhere works the same way.
Because the host builds from GitHub, the live site keeps running independently of Lovable.

See [docs/spacefast-hosting.md](docs/spacefast-hosting.md) for the full setup.

## License

MIT, as is the upstream project. See `src/lib/pridatar/NOTICE.md` for attribution of the
vendored blobatar logic.
