import { createFileRoute, Link } from "@tanstack/react-router";
import { Docs } from "@/components/pridatar/Docs";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "Pridatar docs — usage, flags and licensing";
const DESCRIPTION =
  "How to generate pride blobatars: install paths, vanilla and React usage, the full flag reference table, and upstream attribution.";

export const Route = createFileRoute("/docs")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
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
        </div>
      </footer>
    </div>
  );
}
