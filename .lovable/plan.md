# Fix the Spacefast build

The build log shows two separate problems, and one wrong instruction in the deploy notes.

## What's going wrong

1. **The build crashes.** The site was switched to a "static" build mode that Lovable's build wrapper doesn't support. I checked the wrapper's own code: it only knows two output modes (both server-style), and anything else is left half-configured — which is exactly the crash at the end of the log (`rolldownOptions.input should not be an html file when building for SSR`).
2. **Nothing was pre-rendered.** Just before the crash the log says `Prerendered 0 routes` — the home page came back as "404" during that step, so even without the crash no real HTML pages were produced.
3. **The output folder in the notes is wrong.** SPACEFAST.md says `dist/client`, but the log shows everything being written to `.output/public`. Spacefast would serve an empty folder even after a green build.

## The fix

1. Remove the unsupported "static" setting from the build config and let the build run in its normal mode, which already writes the finished site files into `.output/public`.
2. Run the build here and read the output folder: confirm `index.html` and `docs/index.html` exist as real pages with their own titles, descriptions and the Google verification tag, alongside `sitemap.xml`, `robots.txt`, `favicon.png` and `_redirects`.
3. If the pages still don't come out as HTML in that mode, switch to single-page mode instead: one `index.html` shell plus the `_redirects` fallback already in place. Every page here renders in the browser anyway, so the site works either way — only the pre-baked page text for search engines differs. I'll say which of the two we ended up with.
4. Update SPACEFAST.md with the folder the build actually produces, so the Spacefast settings match.
5. Open the built site in a browser and check the avatar renders, the flag/shape/expression pickers work, PNG and GIF downloads work, and a share link restores the same avatar.

## About pushing

I can't push to GitHub directly — Lovable syncs the repo automatically once the changes are in. After it syncs, retry the Spacefast build (and correct the output folder in its build settings if it still says `dist/client`).

## Technical notes

- `vite.config.ts`: drop `nitro: { preset: "static" }`. Keep `server: { entry: "server" }`. Keep `pages` + `prerender` only if step 2 confirms they produce HTML; otherwise replace with TanStack Start's SPA shell mode.
- Fallback mode detail: `spa: { enabled: true }` generates a prerendered shell served for all routes; `public/_redirects` (`/*  /index.html  200`) already covers unknown paths on Spacefast.
- Rollback: reverting `vite.config.ts` returns to the current (broken) state; no app code changes are involved.
