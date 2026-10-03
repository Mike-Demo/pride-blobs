import { createFileRoute, Link } from "@tanstack/react-router";
import { Docs, FAQS } from "@/components/pridatar/Docs";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "Pridatar docs — usage, flags and licensing";
const DESCRIPTION =
  "How to generate pride blobatars: install paths, vanilla and React usage, the full flag reference table, and upstream attribution.";

const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: { "@type": "Answer", text: faq.a },
  })),
};

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "https://blobs.gay/docs" },
      { property: "og:image", content: "https://blobs.gay/og-image.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blobs.gay/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://blobs.gay/docs" },
      { rel: "alternate", type: "text/markdown", href: "https://blobs.gay/docs.md" },
    ],
    scripts: [
      { type: "application/ld+json", children: JSON.stringify(FAQ_JSON_LD) },
    ],
  }),
  component: DocsPage,
});

function DocsPage() {
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
          <Link
            to="/docs"
            className="transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Docs
          </Link>
          <Link
            to="/licenses"
            className="transition-colors hover:text-foreground"
            activeProps={{ className: "text-foreground" }}
          >
            Licenses
          </Link>
          <a
            href="https://github.com/Alain00/blobatar"
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-foreground"
          >
            Upstream
          </a>
        </nav>
      </header>

      <main id="main" className="mx-auto max-w-6xl px-5 pb-24 pt-4">
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">Docs</h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          One function, one component, fifteen flags.
        </p>
        <div className="mt-10">
          <Docs />
        </div>
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
          <p>
            <a
              href="https://github.com/Mike-Demo"
              target="_blank"
              rel="noreferrer"
              aria-label="MikeDemo on GitHub (opens in new tab)"
              className="text-foreground underline underline-offset-4"
            >
              MikeDemo on GitHub
            </a>
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
          </nav>
        </div>
      </footer>
    </div>
  );
}
