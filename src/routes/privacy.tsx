import { createFileRoute, Link } from "@tanstack/react-router";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "Pridatar privacy policy";
const DESCRIPTION =
  "Pridatar collects no personal data: avatars are generated in your browser and never leave your device.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: TITLE,
  url: "https://blobs.gay/privacy",
  description: DESCRIPTION,
};

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://blobs.gay/privacy" },
      { property: "og:image", content: "https://blobs.gay/og-image.png" },
      { property: "og:site_name", content: "Pridatar" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blobs.gay/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://blobs.gay/privacy" },
      { rel: "alternate", type: "text/markdown", href: "https://blobs.gay/privacy.md" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <Link to="/" className="flex items-center gap-3">
          <Pridatar name="pridatar" flag="rainbow" stripes="both" size={32} decorative />
          <span className="font-display text-lg font-semibold tracking-tight">Pridatar</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <Link to="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
          <Link to="/docs" className="transition-colors hover:text-foreground">
            Docs
          </Link>
          <Link to="/licenses" className="transition-colors hover:text-foreground">
            Licenses
          </Link>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-3xl px-5 pb-24 pt-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Privacy policy
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Pridatar is designed to have almost nothing to say here.
        </p>

        <h2 className="mt-10 text-xl font-semibold">What we do not collect</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">No accounts, no logins, no personal data.</strong>{" "}
            There is no sign-up and no profile; we have no database of users.
          </li>
          <li>
            <strong className="text-foreground">No cookies.</strong> The site sets no cookies.
          </li>
          <li>
            <strong className="text-foreground">No uploads.</strong> Seeds, names, and avatars
            are generated and rendered entirely in your browser. Nothing you
            type ever leaves your device or is sent to a server.
          </li>
          <li>
            <strong className="text-foreground">No sale or sharing of data.</strong> There is
            nothing to sell or share.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">What we do measure</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Anonymous pageview counts</strong> via a
            self-hosted Umami analytics instance. Umami is cookieless; it
            records that a page was visited, not who visited it.
          </li>
          <li>
            <strong className="text-foreground">Framework-level session storage:</strong> the
            app framework stores scroll position in{" "}
            <code>sessionStorage</code> so back-navigation restores your place.
            It is cleared when the tab closes and never transmitted.
          </li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">Third parties</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Google Fonts:</strong> the site loads font
            files from Google Fonts to render text. Google receives standard
            HTTP request data (IP address, user agent) when fonts load, per
            Google&apos;s own privacy policy.
          </li>
          <li>No advertising, no trackers, no social widgets.</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold">Changes</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          If this policy changes, the updated version will be posted here with
          a new last-updated date. Last updated: October 3, 2026. Questions:{" "}
          <Link to="/contact" className="underline underline-offset-4">
            contact
          </Link>
          .
        </p>
      </main>

      <footer className="border-t border-border py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-2 px-5 text-center text-sm text-muted-foreground">
          <Pridatar name="pridatar" flag="progress" stripes="both" size={40} decorative />
          <p>
            Pridatar — a pride-focused fork of{" "}
            <a
              href="https://github.com/Alain00/blobatar"
              target="_blank"
              rel="noreferrer"
              className="text-foreground underline underline-offset-4"
            >
              blobatar
            </a>
            , MIT licensed.
          </p>
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-1">
            <Link to="/about" className="transition-colors hover:text-foreground">
              About
            </Link>
            <Link to="/contact" className="transition-colors hover:text-foreground">
              Contact
            </Link>
            <Link to="/privacy" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <a
              href="https://github.com/Mike-Demo"
              target="_blank"
              rel="noreferrer"
              aria-label="MikeDemo on GitHub (opens in new tab)"
              className="transition-colors hover:text-foreground"
            >
              MikeDemo on GitHub
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
