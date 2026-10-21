# Security audit triage — 2026-10-21

Parent issue: [#4](https://github.com/Mike-Demo/pride-blobs/issues/4)

## Prioritization

The audit reports **0 confirmed findings**, so there are no remediation issues to
prioritize or file. Both reported leads remain unverified and must not be treated as
confirmed vulnerabilities or assigned severity. The rejected candidate
`meta-csp-unenforceable-directives` is intentionally not carried forward.

## Issue to file

### `[security][needs-validation] Audit leads to validate`

**Body:**

Track the two unresolved leads from [security audit issue #4](https://github.com/Mike-Demo/pride-blobs/issues/4). Neither is a confirmed finding; do not assign severity until the stated missing fact is established.

- [ ] **Analytics pageview reporting may transmit the visitor's seed (often a name/email) in the page URL, contradicting the published 'never leaves your device' privacy claim**
  - Fingerprint: `analytics-pageview-may-carry-seed-query`
  - Claimed root cause: Seed-bearing page URLs are present in the browser while an externally hosted analytics tracker with no in-repo query-stripping configuration collects pageviews, so the tracker may record the full URL including the `?seed=` query value.
  - Exact missing fact: The exact URL value in the `tracker.js` pageview payload and stored Umami pageview record for a seed-bearing URL (full URL including `?seed=...` query vs pathname only) is not in this repository and cannot be settled by static inspection; it is observable only by the owner in the Umami dashboard's stored pageview URLs or in the tracker's network request.

- [ ] **Any push to main (including Lovable's direct commits) builds and deploys to production with no in-repo review or CI gate**
  - Fingerprint: `unreviewed-main-push-deploys-to-production`
  - Claimed root cause: The documented Lovable to GitHub `main` to SpaceFast production path has no in-repo review, CI, or approval gate, so a single push to `main` may deploy unreviewed code to production if no out-of-repo gate exists.
  - Exact missing fact: Whether any out-of-repo control gates `main` to production is not source-visible: specifically GitHub branch protection / required pull-request reviews or required status checks on the `main` branch of Mike-Demo/pride-blobs, and/or a SpaceFast-side manual deploy approval. This is observable only by the owner in GitHub Settings > Branches and the SpaceFast project/deploy settings.
