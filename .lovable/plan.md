# Move hosting to Spacefast

Goal: produce a plain folder of static files for this site that can be published to Spacefast with `sf publish`, and keep blobs.gay pointed there instead of Lovable.

## What I can and can't do

- I can't sign in to Spacefast from here. There's no Spacefast integration in this chat, and I won't use the one-use sign-in link. The `sf login` step and the DNS change are yours to run.
- I can prepare the site so `sf publish` works in one command, and hand you the exact commands.

## The one real obstacle

The site is currently built as a small server app (that's how Lovable hosts it), not as a folder of files. Spacefast's simple path wants a folder. Nothing on this site actually needs a server: there's no database, no logins, everything happens in the visitor's browser. So it can be turned into plain files.

Two pages exist (`/` and `/docs`) plus a sitemap file, so the static output is small.

## Steps

1. Switch the build to produce static files: turn on prerendering for `/` and `/docs`, and make the sitemap a plain file in `public/` instead of a generated one.
2. Run the build and confirm the output folder contains real HTML for both pages, with the correct titles, descriptions and social preview tags baked in (share links must keep working, and they do — the seed/flag settings live in the address bar and are read in the browser).
3. Check the built folder in a browser locally: blob renders, pickers work, GIF/PNG download works, share links restore state, CodePen button posts.
4. Write a short `SPACEFAST.md` with the commands you run yourself:
   - `npm install -g spacefast`
   - `sf login`
   - `sf publish ./<output folder>`
   - `sf domains add blobs.gay --role primary` and the DNS records it prints
5. Note that after the domain moves, the old Lovable domain setting should be removed so the two don't fight over DNS, and that Google Search Console verification keeps working because the tag is baked into the page.

## Things to decide later (not blocking)

- You keep editing and previewing here in Lovable exactly as you do today — only where the live site is served changes. Decide whether to also keep publishing from Lovable as a staging copy, or stop entirely.
- Whether to commit `.spacefast/space.json` so repeat publishes update the same Space.

## Technical notes

- Build currently targets a Cloudflare Worker via nitro through `@lovable.dev/vite-tanstack-config`. The change is to add TanStack Start prerender config for the two routes and select a static-friendly nitro preset, leaving the dev server untouched.
- `src/routes/sitemap[.]xml.ts` becomes `public/sitemap.xml`; `robots.txt` already points at it.
- No app logic, styling, or component changes.
