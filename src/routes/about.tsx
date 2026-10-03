import { createFileRoute, Link } from "@tanstack/react-router";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "About Pridatar — deterministic pride blobatars";
const DESCRIPTION =
  "What Pridatar is, who makes it, and how it works: deterministic pride blobatars generated entirely in the browser.";

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: TITLE,
  url: "https://blobs.gay/about",
  description: DESCRIPTION,
  about: {
    "@type": "WebApplication",
    name: "Pridatar",
    url: "https://blobs.gay/",
  },
};

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://blobs.gay/about" },
      { property: "og:image", content: "https://blobs.gay/og-image.png" },
      { property: "og:site_name", content: "Pridatar" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "https://blobs.gay/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://blobs.gay/about" },
      { rel: "alternate", type: "text/markdown", href: "https://blobs.gay/about.md" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify(JSON_LD) }],
  }),
  component: AboutPage,
});

function AboutPage() {
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
          About Pridatar
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Pridatar turns any name into a striped pride-flag avatar —
          deterministically. The same seed always produces the same blob, on
          every device, every time.
        </p>

        <h2 className="mt-10 text-xl font-semibold">The idea</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Avatars are identity, and identity should be joyful. Pridatar takes
          any text string — your name, your handle, your email, your project —
          and renders a little blob creature dressed in the stripes of a pride
          flag. Fifteen flags are built in, from rainbow and Progress Pride to
          trans, bisexual, pansexual, nonbinary, lesbian, asexual, genderqueer,
          genderfluid, agender, aromantic, intersex, demisexual, and
          polysexual, each mapped to an accessible, contrast-checked color
          palette.
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Shapes range from classic blob silhouettes to cat, bunny, bear, fox,
          and a waving flag. Eight expressions and idle animations give each
          blob personality. Export to SVG, PNG, or animated GIF, or grab
          copy-paste embed code — all generated locally in your browser.
        </p>

        <h2 className="mt-10 text-xl font-semibold">How it works</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Everything is deterministic and client-side. A seed string drives a
          pseudorandom pick of shape, expression, and colors; the flag stripes
          are applied from the chosen palette. Shareable URLs carry the seed
          and every option, so an avatar is just a link you can send. There is
          no server runtime, no database, no login, and no tracking of who
          generates what. Read the{" "}
          <Link to="/privacy" className="underline underline-offset-4">
            privacy policy
          </Link>{" "}
          for the full picture.
        </p>

        <h2 className="mt-10 text-xl font-semibold">Who makes it</h2>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Pridatar is built and maintained by Mike Demopoulos as a free,
          open-source side project. It is a pride-focused fork of{" "}
          <a
            href="https://github.com/Alain00/blobatar"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            blobatar
          </a>{" "}
          by Alain00, released under the MIT License. Source code:{" "}
          <a
            href="https://github.com/Mike-Demo/pride-blobs"
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
          >
            github.com/Mike-Demo/pride-blobs
          </a>
          .
        </p>
        <p className="mt-3 leading-relaxed text-muted-foreground">
          Questions, flag corrections, or feature ideas:{" "}
          <Link to="/contact" className="underline underline-offset-4">
            get in touch
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
