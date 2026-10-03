import { createFileRoute, Link } from "@tanstack/react-router";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "Contact Pridatar";
const DESCRIPTION =
  "How to reach the maintainer of Pridatar: GitHub issues and email.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: TITLE,
  url: "https://blobs.gay/contact",
  description: DESCRIPTION,
};

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://blobs.gay/contact" },
      { property: "og:image", content: "https://blobs.gay/og-image.png" },
      { property: "og:site_name", content: "Pridatar" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blobs.gay/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://blobs.gay/contact" },
      { rel: "alternate", type: "text/markdown", href: "https://blobs.gay/contact.md" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: ContactPage,
});

function ContactPage() {
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
          Contact
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Pridatar is a free, open-source side project maintained by Mike
          Demopoulos. The best way to reach out depends on what you need:
        </p>
        <ul className="mt-6 space-y-3 leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Bugs, flag corrections, feature ideas:</strong>{" "}
            open an issue at{" "}
            <a
              href="https://github.com/Mike-Demo/pride-blobs/issues"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              github.com/Mike-Demo/pride-blobs/issues
            </a>
          </li>
          <li>
            <strong className="text-foreground">Email:</strong>{" "}
            <a href="mailto:hey.demo@mikedemo.email" className="underline underline-offset-4">
              hey.demo@mikedemo.email
            </a>
          </li>
          <li>
            <strong className="text-foreground">GitHub:</strong>{" "}
            <a
              href="https://github.com/Mike-Demo"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              github.com/Mike-Demo
            </a>
          </li>
          <li>
            <strong className="text-foreground">X:</strong>{" "}
            <a
              href="https://x.com/Mike_Demo"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              x.com/Mike_Demo
            </a>
          </li>
          <li>
            <strong className="text-foreground">Bluesky:</strong>{" "}
            <a
              href="https://bsky.app/profile/mikedemo.bsky.social"
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4"
            >
              bsky.app/profile/mikedemo.bsky.social
            </a>
          </li>
        </ul>
        <p className="mt-6 leading-relaxed text-muted-foreground">
          There is no support desk, no SLA, and no paid support tier — this is
          a nights-and-weekends project. Issues on GitHub get the fastest
          response.
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
