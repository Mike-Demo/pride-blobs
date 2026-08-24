import { useMemo, useState } from "react";
import { getRouteApi, useNavigate } from "@tanstack/react-router";
import {
  resolvePridatarSearch,
  toSearchParams,
  type BackdropValue,
  type PridatarSearch,
} from "@/lib/pridatar/share";
import { Pridatar } from "./Pridatar";
import { FlagPicker, type FlagSelection } from "./FlagPicker";
import { pridatar, resolvePridatar, type StripeMode } from "@/lib/pridatar";
import { copySvg, downloadPng, downloadSvg } from "@/lib/pridatar/export";
import { cn } from "@/lib/utils";

const STRIPE_MODES: { id: StripeMode; label: string }[] = [
  { id: "background", label: "Backdrop" },
  { id: "body", label: "Body" },
  { id: "both", label: "Both" },
];

const BACKDROPS: { id: BackdropValue; label: string }[] = [
  { id: "squircle", label: "Squircle" },
  { id: "circle", label: "Circle" },
  { id: "square", label: "Square" },
  { id: "none", label: "None" },
];

const CROWD = ["ada", "kasper", "tove", "juno", "remy", "sasha", "wren", "ines"];

function Segmented<T extends string>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  const labelId = `segmented-${label.toLowerCase().replace(/\s+/g, "-")}`;
  return (
    <div>
      <p
        id={labelId}
        className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground"
      >
        {label}
      </p>
      <div
        role="group"
        aria-labelledby={labelId}
        className="flex flex-wrap gap-1 rounded-lg border border-border bg-card p-1"
      >
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={value === o.id}
            className={cn(
              "min-h-11 flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              value === o.id
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {o.label}
          </button>
        ))}
      </div>
    </div>
  );
}

const routeApi = getRouteApi("/");

export function Playground() {
  const current = resolvePridatarSearch(routeApi.useSearch());
  const navigate = useNavigate({ from: "/" });
  const [status, setStatus] = useState<string | null>(null);

  const { seed: name, flag, stripes, backdrop, size } = current;

  const update = (patch: Partial<PridatarSearch>) => {
    void navigate({
      search: toSearchParams({ ...current, ...patch }),
      replace: true,
      resetScroll: false,
    });
  };
  const setName = (value: string) => update({ seed: value });
  const setFlag = (value: FlagSelection) => update({ flag: value });
  const setStripes = (value: StripeMode) => update({ stripes: value });
  const setBackdrop = (value: BackdropValue) => update({ backdrop: value });
  const setSize = (value: number) => update({ size: value });

  const seed = name.trim() || "pridatar";
  const options = useMemo(
    () => ({
      flag,
      stripes,
      background: backdrop === "none" ? (false as const) : backdrop,
    }),
    [flag, stripes, backdrop],
  );

  const resolved = useMemo(() => resolvePridatar(seed, options), [seed, options]);
  const svg = useMemo(() => pridatar(seed, { ...options, size, title: seed }), [seed, options, size]);

  const snippet = [
    `import { Pridatar } from "@/components/pridatar/Pridatar";`,
    ``,
    `<Pridatar`,
    `  name={${JSON.stringify(seed)}}`,
    `  flag="${flag}"`,
    `  stripes="${stripes}"`,
    `  background={${backdrop === "none" ? "false" : `"${backdrop}"`}}`,
    `  size={${size}}`,
    `/>`,
  ].join("\n");

  const announce = (message: string) => {
    setStatus(message);
    window.setTimeout(() => setStatus(null), 2000);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)]">
      <div className="space-y-6">
        <div>
          <label
            htmlFor="playground-name"
            className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Name, handle, email or id
          </label>
          <input
            id="playground-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ada@example.com"
            className="w-full rounded-lg border border-border bg-card px-4 py-3 text-base text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
          />
        </div>

        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
            Flag
          </p>
          <FlagPicker value={flag} onChange={setFlag} />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Segmented label="Stripes" options={STRIPE_MODES} value={stripes} onChange={setStripes} />
          <Segmented label="Backdrop" options={BACKDROPS} value={backdrop} onChange={setBackdrop} />
        </div>

        <div>
          <label
            htmlFor="playground-size"
            className="mb-2 block text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            Size — {size}px
          </label>
          <input
            id="playground-size"
            type="range"
            min={32}
            max={320}
            step={8}
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full accent-primary"
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="rounded-2xl border border-border bg-card p-6">
          <div className="flex min-h-[220px] items-center justify-center">
            <Pridatar name={seed} {...options} size={size} />
          </div>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            <span className="text-foreground">{resolved.flag.label}</span> · {resolved.shape} ·
            deterministic from <span className="text-foreground">{seed}</span>
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {CROWD.map((n) => (
            <Pridatar key={n} name={n} {...options} size={44} decorative />
          ))}
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => {
              void navigator.clipboard
                .writeText(window.location.href)
                .then(() => announce("Share link copied"))
                .catch(() => announce("Could not copy link"));
            }}
            className="min-h-11 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Copy share link
          </button>
          <button
            type="button"
            onClick={() => {
              void copySvg(svg).then(() => announce("SVG copied"));
            }}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Copy SVG
          </button>
          <button
            type="button"
            onClick={() => {
              downloadSvg(svg, `pridatar-${resolved.flag.id}`);
              announce("SVG downloaded");
            }}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Download SVG
          </button>
          <button
            type="button"
            onClick={() => {
              void downloadPng(svg, `pridatar-${resolved.flag.id}`, 512).then(() =>
                announce("PNG downloaded"),
              );
            }}
            className="min-h-11 rounded-lg border border-border px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            Download PNG
          </button>
        </div>

        <p aria-live="polite" className="h-4 text-sm text-muted-foreground">
          {status}
        </p>

        <pre className="overflow-x-auto rounded-xl border border-border bg-card p-4 text-xs leading-relaxed text-muted-foreground">
          <code>{snippet}</code>
        </pre>
      </div>
    </div>
  );
}
