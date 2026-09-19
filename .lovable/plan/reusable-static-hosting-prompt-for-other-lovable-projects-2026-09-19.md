# Reusable static-hosting prompt for other Lovable projects

## What you get
A single copy-paste prompt, written from the exact fix sequence that made this project build for Spacefast:

1. A pre-flight check that the app is actually static (no database, login, or runtime server features) — the prompt makes the agent stop and tell you if it isn't, instead of producing a broken build.
2. Prerender every public route so real HTML pages are baked out.
3. Avoid the two build traps we hit: no `nitro: { preset: "static" }`, and the output-folder mismatch (`.output/public` vs the `dist/client` static hosts expect) solved with a small post-build copy script wired into the build command.
4. Static `sitemap.xml`, `robots.txt` pointing at it, and a `_redirects` SPA fallback.
5. A `SPACEFAST.md` build spec (output directory, build command).
6. Verification: typecheck, build, and a browser smoke test of every prerendered route before calling it done.

## Delivery
- Post the finished prompt in chat, ready to paste into other Lovable projects.
- Also save a copy as a file in your documents so you can grab it later.

## Notes
- The prompt is host-agnostic where possible but defaults to Spacefast specifics (output folder, `SPACEFAST.md`) since that's your setup.
- Lovable stays the editing/preview environment; the prompt doesn't touch GitHub, DNS, or publishing.
- Projects with backends need a different approach — the prompt makes the agent flag that instead of failing.
