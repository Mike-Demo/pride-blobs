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
      <h3 className="mb-2 text-sm font-semibold text-foreground">{title}</h3>
      <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
        <code>{code}</code>
      </pre>
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
        <h3 className="mb-4 text-sm font-semibold text-foreground">Flags</h3>
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
        <h3 className="mb-4 text-sm font-semibold text-foreground">Motion</h3>
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
        <h3 className="mb-2 text-sm font-semibold text-foreground">License and attribution</h3>
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
    </div>
  );
}
