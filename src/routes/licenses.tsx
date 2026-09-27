import { createFileRoute, Link } from "@tanstack/react-router";
import { Pridatar } from "@/components/pridatar/Pridatar";

const TITLE = "Open source & credits — Pridatar";
const DESCRIPTION =
  "Pridatar is built on open source software. Every library and artwork source it relies on is credited here.";

const BADGE_URL =
  "https://app.aikido.dev/audit-report/external/smlvhLoPnScdRnVeF7TjudEr/request";
const BADGE_IMG = "https://app.aikido.dev/assets/badges/full-light-theme.svg";

interface Credit {
  readonly name: string;
  readonly author: string;
  readonly license: string;
  readonly url: string;
  readonly note?: string;
}

interface CreditGroup {
  readonly title: string;
  readonly entries: readonly Credit[];
}

const GROUPS: readonly CreditGroup[] = [
  {
    title: "Upstream",
    entries: [
      {
        name: "blobatar",
        author: "Alain00",
        license: "MIT",
        url: "https://github.com/Alain00/blobatar",
        note: "The deterministic blob avatar generator Pridatar is forked from.",
      },
    ],
  },
  {
    title: "Open source libraries",
    entries: [
      {
        name: "React",
        author: "Meta and contributors",
        license: "MIT",
        url: "https://github.com/facebook/react/blob/main/LICENSE",
      },
      {
        name: "TanStack Start & Router",
        author: "Tanner Linsley and contributors",
        license: "MIT",
        url: "https://github.com/TanStack/router/blob/main/LICENSE",
      },
      {
        name: "Tailwind CSS",
        author: "Tailwind Labs",
        license: "MIT",
        url: "https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE",
      },
      {
        name: "Radix UI",
        author: "WorkOS",
        license: "MIT",
        url: "https://github.com/radix-ui/primitives/blob/main/LICENSE",
      },
      {
        name: "lucide-react",
        author: "Lucide contributors",
        license: "ISC",
        url: "https://github.com/lucide-icons/lucide/blob/main/LICENSE",
      },
      {
        name: "zod",
        author: "Colin McDonnell and contributors",
        license: "MIT",
        url: "https://github.com/colinhacks/zod/blob/main/LICENSE",
      },
    ],
  },
];

export const Route = createFileRoute("/licenses")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://blobs.gay/licenses" }],
  }),
  component: LicensesPage,
});

function LicensesPage() {
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
        <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Open source &amp; credits
        </h1>
        <p className="mt-2 max-w-xl text-sm text-muted-foreground">
          Pridatar is built on open source software. Everything it depends on is credited below.
        </p>
        <div className="mt-4">
          <a
            href={BADGE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Aikido Security Audit Report (opens in new tab)"
          >
            <img src={BADGE_IMG} alt="Aikido Security Audit Report" height={40} />
          </a>
        </div>

        {GROUPS.map((group) => (
          <section key={group.title} className="mt-10">
            <h2 className="text-lg font-semibold">{group.title}</h2>
            <ul className="mt-4 grid gap-4 sm:grid-cols-2">
              {group.entries.map((entry) => (
                <li key={entry.name} className="rounded-lg border border-border p-4">
                  <p className="font-medium">{entry.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {entry.author} · {entry.license}
                  </p>
                  {entry.note ? (
                    <p className="mt-1 text-sm text-muted-foreground">{entry.note}</p>
                  ) : null}
                  <a
                    href={entry.url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-block text-sm text-foreground underline underline-offset-4"
                  >
                    License source
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
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
