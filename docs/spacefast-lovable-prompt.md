# Reusable prompt: prepare a Lovable project for static hosting (Spacefast)

This is the prompt that produced the working static build for this project. Paste it into
another Lovable project you want to publish as a static site.

---

Prepare this Lovable project for static hosting on Spacefast, where I'll keep editing and previewing in Lovable and the public site will be served from the built static output. Do not touch GitHub, DNS, or any publishing/login steps — I'll handle those myself.

**Step 0 — Static check (stop if it fails).** Inspect the app first. If it needs a database, login, per-user pages, webhooks, cron, or any server function that must run at request time, STOP and tell me it can't be fully static and what my options are instead of producing a broken build. Only continue if every public page renders the same HTML for every visitor.

**Step 1 — Prerender all public routes.** In `vite.config.ts`, list every public, non-parameterized route under `tanstackStart.pages` and enable `prerender: { enabled: true, autoStaticPathsDiscovery: false }`. Make sure `@lovable.dev/vite-tanstack-config` is 2.20.0 or newer (older versions silently prerender nothing). Confirm after building that each listed route produced a real `<route>/index.html`. If the build writes every page but then hangs until timeout, hunt down the timer holding the process open (module-scope timers, TanStack Query gcTime, module-scope clients/pollers) and fix it with lazy creation, `.unref()`, or a `process.env.TSS_PRERENDERING` guard.

**Step 2 — Build output.** Do NOT set `nitro: { preset: "static" }` — it breaks the SSR build with "rolldownOptions.input should not be an html file". Keep the normal SSR/Nitro build, which prerenders into `.output/public`. Then add a small idempotent post-build script (e.g. `scripts/copy-static-output.mjs`) that copies `.output/public` to `dist/client` (creating or cleaning `dist/client` as needed, and skipping gracefully if the output already lives in `dist/client`), and change the build command in `package.json` to `vite build && node scripts/copy-static-output.mjs`. Static hosts expect the site in `dist/client`.

**Step 3 — Static files.** Create a static `public/sitemap.xml` listing every public route, make sure `public/robots.txt` points at `/sitemap.xml`, and add `public/_redirects` containing `/*  /index.html  200` so deep links work. If the project had a server-generated sitemap route, delete it. If any route's head metadata (title, description, og tags) only exists client-side, move it into that route's `head()` so it's baked into the prerendered HTML.

**Step 4 — Build spec file.** Create `SPACEFAST.md` documenting: install command, build command (`vite build && node scripts/copy-static-output.mjs`), and that the static output directory is `dist/client` (with `.output/public` as the raw Nitro output).

**Step 5 — Verify before claiming done.** Run the typecheck, run the full build, confirm `dist/client` contains an `index.html` for every route plus sitemap/robots/_redirects, and open each prerendered route in a browser to confirm it renders and that URL state (query params) still restores correctly after hydration. Report anything that only works pre-build, not after.

---

*For projects with a backend (database, auth, server functions), this prompt will correctly refuse — those need a different hosting approach.*
