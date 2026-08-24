import { useId, useMemo, useState } from "react";
import {
  CODEPEN_ENDPOINT,
  buildSnippets,
  codepenPrefill,
  type SnippetInput,
} from "@/lib/pridatar/snippets";
import { cn } from "@/lib/utils";

type TabId = "react" | "svg" | "css";

const TABS: { id: TabId; label: string }[] = [
  { id: "react", label: "React" },
  { id: "svg", label: "Inline SVG" },
  { id: "css", label: "CSS" },
];

export interface CodeTabsProps extends SnippetInput {
  /** Surfaces copy/export feedback in the playground's live region. */
  onAnnounce: (message: string) => void;
}

/** Posts the prefill JSON to CodePen in a new tab, per their prefill API. */
function openInCodePen(payload: string) {
  const form = document.createElement("form");
  form.action = CODEPEN_ENDPOINT;
  form.method = "POST";
  form.target = "_blank";
  form.rel = "noopener";
  form.style.display = "none";

  const field = document.createElement("input");
  field.type = "hidden";
  field.name = "data";
  field.value = payload;
  form.appendChild(field);

  document.body.appendChild(form);
  form.submit();
  window.setTimeout(() => form.remove(), 1000);
}

export function CodeTabs({ onAnnounce, ...input }: CodeTabsProps) {
  const [tab, setTab] = useState<TabId>("react");
  const baseId = useId();
  const snippets = useMemo(() => buildSnippets(input), [input]);
  const code = snippets[tab];

  const copy = () => {
    void navigator.clipboard
      .writeText(code)
      .then(() => onAnnounce("Code copied"))
      .catch(() => onAnnounce("Could not copy the code"));
  };

  return (
    <div className="min-w-0 space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        <div role="tablist" aria-label="Code format" className="flex min-w-0 flex-wrap gap-1 rounded-lg border border-border bg-card p-1">
          {TABS.map((t) => (
            <button
              key={t.id}
              type="button"
              role="tab"
              id={`${baseId}-tab-${t.id}`}
              aria-selected={tab === t.id}
              aria-controls={`${baseId}-panel-${t.id}`}
              onClick={() => setTab(t.id)}
              className={cn(
                "min-h-11 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                tab === t.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={copy}
          className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Copy code
        </button>
        <button
          type="button"
          onClick={() => {
            openInCodePen(codepenPrefill(input));
            onAnnounce("Opening CodePen…");
          }}
          className="min-h-11 rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Open in CodePen
        </button>
      </div>

      <pre
        role="tabpanel"
        id={`${baseId}-panel-${tab}`}
        aria-labelledby={`${baseId}-tab-${tab}`}
        tabIndex={0}
        className="max-h-80 min-w-0 overflow-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground"
      >
        <code>{code}</code>
      </pre>
    </div>
  );
}
