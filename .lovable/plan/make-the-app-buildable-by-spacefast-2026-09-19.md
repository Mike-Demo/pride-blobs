# Make the app buildable by Spacefast

You handle Spacefast sign-in, the GitHub connection, and DNS. This plan covers only the changes inside the app so that a build from the repo produces a folder Spacefast can serve.

Workflow once done:

```text
edit in Lovable  ->  auto-sync to GitHub  ->  Spacefast builds & serves blobs.gay
```

## What changes and why

Today the build produces a small server app, because that's what Lovable's hosting runs. Nothing on this site actually needs a server — no database, no logins, everything happens in the visitor's browser — so the build gets switched to output plain files instead. Only two pages exist (`/` and `/docs`) plus a sitemap, so the output is tiny.

## Changes

1. **Build output becomes static files.** Switch the build target so it writes a folder of HTML/CSS/JS rather than a server bundle, and tell it to pre-render the home page and the docs page so each ships as real HTML.
2. **Sitemap becomes a real file.** It's currently generated on request by the server; it becomes a fixed file served alongside the pages. The robots file already points at the right address, so nothing else changes.
3. **Unknown-address handling.** With no server, a visitor landing on a mistyped address needs the host to fall back to the app. Add the small config file Spacefast reads for that, so deep links and share links never 404.
4. **Deploy notes in the repo.** A short `SPACEFAST.md` recording the build command and output folder to enter in Spacefast, plus the domain step — so the setup isn't only in this chat.

## Verification before I call it done

- Both pages exist as real HTML in the output, with their own titles, descriptions, social preview tags and the Search Console verification tag baked in.
- Opening the built folder in a browser: the avatar renders, flag/shape/expression pickers work, PNG and GIF downloads work, a share link restores the exact same avatar, and the CodePen button posts.

## What stays exactly the same

Editing and previewing in Lovable, all app behaviour, styling, and every component. No design or feature changes.

## Technical notes

- Build runs through `@lovable.dev/vite-tanstack-config` (TanStack Start + nitro, currently a Cloudflare Worker target). The change is a static nitro preset plus TanStack Start prerender entries for `/` and `/docs`; `vite dev` and the Lovable preview are untouched.
- `src/routes/sitemap[.]xml.ts` is replaced by `public/sitemap.xml`.
- SPA fallback config added under `public/` for Spacefast.
- Risk and rollback: if the static build misbehaves, reverting these config files restores the current Worker build exactly; Lovable hosting keeps working throughout, so the domain only moves once the Spacefast copy is verified.
