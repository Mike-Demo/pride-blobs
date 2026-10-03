# Generate a deterministic Pridatar avatar

Use this when an agent needs to produce or link to a pride-flag avatar for a
name, handle, email, or any other string — the same seed always yields the
same avatar.

## How it works

Everything runs in the browser at https://blobs.gay — there is no API to
call. To "generate" an avatar, construct a shareable URL with query
parameters and hand it to the user (or open it in a browser task). The page
renders the avatar from the parameters deterministically.

## URL parameters

| Param        | Values                                                                                      | Default        |
| ------------ | ------------------------------------------------------------------------------------------- | -------------- |
| `seed`       | Any text string (name, handle, email). Trimmed, max 120 chars. Drives the deterministic pick. | `pridatar`     |
| `flag`       | One of 15 ids: `rainbow`, `progress`, `trans`, `bisexual`, `pansexual`, `nonbinary`, `lesbian`, `asexual`, `genderqueer`, `genderfluid`, `agender`, `aromantic`, `intersex`, `demisexual`, `polysexual`, or `auto` | `rainbow` |
| `stripes`    | Where the flag stripes go: `background`, `body`, `both`                                      | `background`   |
| `shape`      | Silhouette: `round`, `organic`, `boxy`, `capsule`, `nub`, `cloud`, `droplet`, `hexagon`, `sun`, `triangle`, `cat`, `bunny`, `bear`, `fox`, `flag` | seed-derived |
| `expression` | Face: `neutral`, `happy`, `wide`, `sleepy`, `wink`, `side`, `suspicious`, `surprised`        | `neutral`      |
| `motion`     | Idle animation: `blink`, `bob`, `bouncy`, `breathe`, `idle`, `off`                            | `off`          |
| `solid`      | Solid color for the side the stripes do not cover, `#rrggbb`, or `auto`                      | `#0d0d0d`      |
| `backdrop`   | Frame: `squircle`, `circle`, `square`, `none`                                                | `squircle`     |
| `size`       | Pixel size of the rendered avatar                                                             | `160`          |

Only non-default values are needed; the page fills in the rest.

## Examples

```
https://blobs.gay/?seed=demo&flag=rainbow
https://blobs.gay/?seed=ada@example.com&flag=trans&shape=cat&expression=happy
https://blobs.gay/?seed=pride&flag=progress&stripes=both&motion=bouncy
```

## Notes

- Generation is fully client-side. No data leaves the browser; seeds are never
  uploaded or stored.
- For the full flag reference table and usage guides, see https://blobs.gay/docs.
