# Export a Pridatar avatar as a file

Use this when an agent needs a downloadable avatar file (SVG, PNG, animated
GIF) or copy-paste embed code for a generated Pridatar avatar.

## How it works

Export happens in the browser at https://blobs.gay — there is no API to call.
Open the avatar's shareable URL (see the generate-avatar skill) in a browser,
then use the export controls on the page:

- **SVG** — vector source, scales to any size.
- **PNG** — rasterized in the browser via canvas, at the chosen size.
- **Animated GIF** — the idle animation (if `motion` is not `off`) rendered
  as an animated GIF in the browser.

## Embed code

The page also offers copy-paste snippets:

- React component usage
- Inline SVG markup
- CSS `background-image` data URI
- An "Open in CodePen" button for a live playground

## Notes

- All rendering is local; nothing is uploaded to a server.
- The avatar artwork is MIT licensed (upstream blobatar by Alain00), so
  exported files can be reused freely with attribution.
- If the avatar is not deterministic across visits, check the URL carries the
  same `seed` — an empty seed renders the default `pridatar` avatar.
