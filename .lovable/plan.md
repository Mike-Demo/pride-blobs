# Move hosting to Spacefast, keep building in Lovable

The workflow you described works, and it's the cleanest option:

```text
edit in Lovable  ->  auto-sync to GitHub  ->  Spacefast builds & serves blobs.gay
```

You keep editing and previewing here exactly as you do today. Lovable stops being the thing that serves the public site; pushing to GitHub becomes the deploy trigger.

## What I can and can't do

- I can prepare the project so a Spacefast build from the repo works first try.
- I can't sign in to Spacefast, connect your GitHub account, or change DNS. Those are three clicks/commands on your side, and I'll give you the exact steps.
- I won't use the one-use sign-in link.

## The one real obstacle

The site is currently built as a small server app (that's how Lovable hosts it), not as a folder of files. Spacefast's Git path wants a build command and an output folder. Nothing here needs a server: no database, no logins, everything happens in the visitor's browser. Two pages exist (`/` and `/docs`) plus a sitemap, so the static output is tiny.

## Steps

1. Switch the build to produce static files: prerender `/` and `/docs`, and turn the sitemap into a plain file in `public/` instead of a generated one.
2. Build and confirm the output folder has real HTML for both pages with titles, descriptions, social tags and the Search Console verification tag baked in.
3. Check the built folder in a browser: blob renders, pickers work, PNG/GIF download works, share links restore the exact avatar, CodePen button posts.
4. Write a short `SPACEFAST.md` in the repo covering the parts you run:
   - Connect this Lovable project to GitHub (Plus menu → GitHub → Connect project), if it isn't already.
   - Connect that repo in Spacefast so each push builds and publishes.
   - Build command and output folder to enter there.
   - `sf domains add blobs.gay --role primary`, then the DNS records it prints.
5. Note the switchover: once blobs.gay is active on Spacefast, remove the domain from Lovable's project settings so the two don't fight over DNS. Rollbacks then happen on Spacefast (`sf rollback`), version history stays in Lovable and GitHub.

## Open question for you

- Spacefast can build from the repo itself, or you can run `sf publish` from your machine. Repo-connected is the "push to deploy" option you described; I'll write the docs for that unless you say otherwise.

## Technical notes

- Build currently targets a Cloudflare Worker via nitro through `@lovable.dev/vite-tanstack-config`. The change adds TanStack Start prerender config for the two routes and a static-friendly nitro preset; the dev server and Lovable preview are unaffected.
- `src/routes/sitemap[.]xml.ts` becomes `public/sitemap.xml`; `robots.txt` already points at it.
- No app logic, styling, or component changes.
