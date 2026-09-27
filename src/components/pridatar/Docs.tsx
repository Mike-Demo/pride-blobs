import { FLAGS } from "@/lib/pridatar";
import { Pridatar } from "./Pridatar";

const INSTALL = `# this fork lives in the repo, not on npm (yet)
src/lib/pridatar/   # generator
src/components/pridatar/Pridatar.tsx`;

const VANILLA = `import { pridatar, pridatarDataUri } from "@/lib/pridatar";

const svg = pridatar(user.email, { size: 48 });
const src = pridatarDataUri(user.email, { flag: "trans" });`;

const REACT = `import { Pridatar } from "@/components/pridatar/Pridatar";

<Pridatar name={user.email} size={48} />
<Pridatar name={user.email} flag="nonbinary" stripes="both" size={48} />`;

const MOTION = `// idle breathing + bob + blink, off by default
<Pridatar name={user.email} motion="idle" size={64} />
<Pridatar name={user.email} motion="bouncy" size={64} />

// same option on the string renderer
pridatar(user.email, { motion: "idle" });`;

function Block({ title, code }: { title: string; code: string }) {
  return (
    <div className="min-w-0">
      <h2 className="mb-2 text-sm font-semibold text-foreground">{title}</h2>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
    </div>
  );
}


/** Visible FAQ content; also mirrored into FAQPage JSON-LD on /docs. */
export const FAQS: ReadonlyArray<{ readonly q: string; readonly a: string }> = [
  {
    q: "Is Pridatar free to use?",
    a: "Yes. Pridatar is MIT-licensed open source software. Generate as many avatars as you like, right in your browser \u2014 no account, no fees.",
  },
  {
    q: "Do I need an account or upload anything?",
    a: "No. Type a name and the avatar is generated locally as SVG. Nothing leaves your browser: there is no server, no tracking, and no uploads.",
  },
  {
    q: "Will the same name always make the same avatar?",
    a: "Yes. Every visual choice \u2014 the flag, the stripes, the silhouette, the face \u2014 is derived deterministically from the name, so the same string renders the same blobatar on every device, every time.",
  },
  {
    q: "Can I use Pridatar avatars in my own project?",
    a: "Yes. The MIT license covers commercial and personal use. Pridatar is a fork of blobatar by Alain00 (also MIT); attribution is credited on the licenses page.",
  },
];

function Faq() {
  return (
    <div>
      <h2 className="mb-4 text-sm font-semibold text-foreground">Frequently asked questions</h2>
      <dl className="space-y-5">
        {FAQS.map((faq) => (
          <div key={faq.q}>
            <dt className="font-medium text-foreground">{faq.q}</dt>
            <dd className="mt-1 max-w-2xl text-sm text-muted-foreground">{faq.a}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Docs() {
  return (
    <div className="space-y-12">
      <div className="grid gap-6 md:grid-cols-3">
        <Block title="Where it lives" code={INSTALL} />
        <Block title="Anywhere" code={VANILLA} />
        <Block title="React" code={REACT} />
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">Flags</h2>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="bg-card text-xs uppercase tracking-widest text-muted-foreground">
                <th className="px-4 py-3 font-medium">Preview</th>
                <th className="px-4 py-3 font-medium">flag</th>
                <th className="px-4 py-3 font-medium">Stripes</th>
                <th className="hidden px-4 py-3 font-medium md:table-cell">Origin</th>
              </tr>
            </thead>
            <tbody>
              {FLAGS.map((flag) => (
                <tr key={flag.id} className="border-t border-border">
                  <td className="px-4 py-3">
                    <Pridatar name={flag.id} flag={flag.id} stripes="both" size={36} title={`${flag.label} example`} />
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-foreground">"{flag.id}"</td>
                  <td className="px-4 py-3">
                    <span
                      aria-hidden="true"
                      className="flex h-4 w-24 overflow-hidden rounded-sm ring-1 ring-border"
                    >
                      {flag.stripes.map((color, i) => (
                        <span
                          key={`${color}-${i}`}
                          className="flex-1"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </span>
                  </td>
                  <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">
                    {flag.note}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-sm font-semibold text-foreground">Motion</h2>
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
          <div className="min-w-0">
            <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
              <code>{MOTION}</code>
            </pre>
            <p className="mt-2 text-xs text-muted-foreground">
              The keyframes ship inside the SVG, so a copied or downloaded SVG animates on its own.
              Everything is wrapped in a reduced-motion query, so anyone who asked for less motion
              gets the still figure.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Pridatar name="ada@example.com" motion="idle" size={72} title="Idle motion example" />
            <Pridatar name="wren" motion="bouncy" size={72} title="Bouncy motion example" />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 text-sm text-muted-foreground">
        <h2 className="mb-2 text-sm font-semibold text-foreground">License and attribution</h2>
        <p>
          Pridatar is a fork of{" "}
          <a
            href="https://github.com/Alain00/blobatar"
            className="text-foreground underline underline-offset-4"
            target="_blank"
            rel="noreferrer"
          >
            Alain00/blobatar
          </a>{" "}
          (MIT, Copyright &copy; 2026 Alain). The seed hashing, silhouette vocabulary, layout and
          OKLCh color math are upstream and unmodified; the pride palettes and the striping renderer
          are this fork&apos;s. Upstream license text ships at{" "}
          <code className="font-mono text-xs text-foreground">src/lib/pridatar/vendor/LICENSE</code>,
          with the full change list in{" "}
          <code className="font-mono text-xs text-foreground">src/lib/pridatar/NOTICE.md</code>.
        </p>
      </div>

      <Faq />
    </div>
  );
}
