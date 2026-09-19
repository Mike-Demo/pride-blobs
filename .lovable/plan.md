# Fix the Spacefast output-folder mismatch

## Confirmed diagnosis

The Spacefast log shows that all three build stages complete and both `/` and `/docs` are prerendered successfully. The failure happens afterward because the current build writes the static site to `.output/public`, while Spacefast checks for `dist/client`.

The `vite-tsconfig-paths` and large-chunk messages are warnings and do not cause this failure.

## Changes

1. Add a small post-build script that copies the completed static files from `.output/public` into `dist/client`.
2. Update the existing `build` command so this compatibility copy runs only after `vite build` succeeds.
3. Keep the current TanStack/Nitro and prerender configuration unchanged, since the supplied log confirms it now builds both pages correctly.
4. Update the Spacefast guide to explain that `.output/public` is the framework output and `dist/client` is the Spacefast-compatible publish folder.

## Verification

- Run the same frozen install and production build used by Spacefast.
- Confirm `dist/client/index.html` and `dist/client/docs/index.html` exist.
- Confirm the copied output includes assets, favicon, robots file, sitemap, and `_redirects`.
- Serve `dist/client` locally and verify the home page, docs page, and a share URL load correctly.
- Check TypeScript after adding the copy script.

## Rollback

Revert the post-build script and restore the original `build` command. This does not alter avatar behavior or page content.
