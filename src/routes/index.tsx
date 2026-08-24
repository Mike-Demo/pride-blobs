import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import {
  parsePridatarSearch,
  resolvePridatarSearch,
  toSearchParams,
} from "@/lib/pridatar/share";
import { Pridatar } from "@/components/pridatar/Pridatar";
import { Crowd } from "@/components/pridatar/Crowd";
import { Playground } from "@/components/pridatar/Playground";
import { FLAGS } from "@/lib/pridatar";

const TITLE = "Pridatar — deterministic pride blobatars from any name";
const DESCRIPTION =
  "A pride-focused fork of blobatar: every name becomes a striped flag avatar, the same way every time. 15 flags, SVG output, no dependencies.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  validateSearch: (raw: Record<string, unknown>) => parsePridatarSearch(raw),
  component: Index,
});

function Index() {
  const resolved = resolvePridatarSearch(Route.useSearch());
  const navigate = useNavigate({ from: "/" });
  const heroName = resolved.seed;
  const setHeroName = (value: string) => {
    void navigate({
      search: toSearchParams({ ...resolved, seed: value }),
      replace: true,
      resetScroll: false,
    });
  };
  const seed = heroName.trim() || "pridatar";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <Pridatar name="pridatar" flag="rainbow" stripes="both" size={32} decorative />
          <span className="font-display text-lg font-semibold tracking-tight">Pridatar</span>
        </div>
        <nav className="flex items-center gap-5 text-sm text-muted-foreground">
          <a href="#playground" className="transition-colors hover:text-foreground">
            Playground
          </a>
          <Link to="/docs" className="transition-colors hover:text-foreground">
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

      <main id="main">
        <section className="mx-auto max-w-6xl px-5 pb-20 pt-8 sm:pt-16">
          <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_320px]">
            <div>
              <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs uppercase tracking-widest text-muted-foreground">
                MIT fork of blobatar · {FLAGS.length} flags
              </p>
              <h1 className="font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-6xl">
                Every name gets a flag,
                <br />
                and keeps it.
              </h1>
              <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                Pridatar turns any string — a handle, an email, a repo — into a striped pride
                blobatar. Same string, same avatar, every render. No accounts, no uploads, no
                network: a few hundred bytes of SVG generated in the browser.
              </p>

              <div className="mt-8 max-w-md">
                <label
                  htmlFor="hero-name"
                  className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  Try your own
                </label>
                <input
                  id="hero-name"
                  value={heroName}
                  onChange={(e) => setHeroName(e.target.value)}
                  placeholder="your handle"
                  className="w-full rounded-lg border border-border bg-card px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                />
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#playground"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Open the playground
                </a>
                <Link
                  to="/docs"
                  className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium transition-colors hover:bg-accent"
                >
                  Read the docs
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center gap-4 rounded-3xl border border-border bg-card p-8">
              <Pridatar name={seed} flag={resolved.flag} stripes="both" size={220} />
              <p className="text-center text-sm text-muted-foreground">{seed}</p>
            </div>
          </div>
        </section>

        <section className="border-y border-border bg-card/40 py-16">
          <div className="mx-auto max-w-6xl px-5">
            <h2 className="font-display text-center text-2xl font-semibold tracking-tight">
              A crowd, no two alike
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-sm text-muted-foreground">
              Forty ordinary handles. The flag, the silhouette and the face all come out of the
              name — nothing here was picked by hand.
            </p>
            <div className="mt-10">
              <Crowd stripes="background" size={56} />
            </div>
          </div>
        </section>

        <section id="playground" className="mx-auto max-w-6xl scroll-mt-8 px-5 py-20">
          <h2 className="font-display text-3xl font-semibold tracking-tight">Playground</h2>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Pin a flag or let the seed choose one, move the stripes onto the body, then take the
            SVG or a 512px PNG with you.
          </p>
          <div className="mt-10">
            <Playground />
          </div>
        </section>

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
        </div>
      </footer>
    </div>
  );
}
