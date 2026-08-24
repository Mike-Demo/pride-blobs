import { FLAGS, type FlagId } from "@/lib/pridatar";
import { cn } from "@/lib/utils";

export type FlagSelection = FlagId | "auto";

interface FlagPickerProps {
  value: FlagSelection;
  onChange: (value: FlagSelection) => void;
}

function Swatch({ stripes }: { stripes: readonly string[] }) {
  return (
    <span
      aria-hidden="true"
      className="flex h-6 w-6 shrink-0 flex-col overflow-hidden rounded-full ring-1 ring-border"
    >
      {stripes.map((color, i) => (
        <span key={`${color}-${i}`} className="flex-1" style={{ backgroundColor: color }} />
      ))}
    </span>
  );
}

export function FlagPicker({ value, onChange }: FlagPickerProps) {
  return (
    <div role="group" aria-label="Flag" className="grid grid-cols-2 gap-2 sm:grid-cols-3">
      <button
        type="button"
        onClick={() => onChange("auto")}
        aria-pressed={value === "auto"}
        className={cn(
          "flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          value === "auto"
            ? "border-primary bg-primary/10 text-foreground"
            : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
        )}
      >
        <span aria-hidden="true" className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[conic-gradient(from_0deg,#e40303,#ff8c00,#ffed00,#008026,#004dff,#750787,#e40303)] text-[10px] font-bold text-background">
          A
        </span>
        <span className="truncate font-medium">Auto</span>
        {value === "auto" ? (
          <span aria-hidden="true" className="ml-auto text-primary">
            ✓
          </span>
        ) : null}
      </button>

      {FLAGS.map((flag) => (
        <button
          key={flag.id}
          type="button"
          onClick={() => onChange(flag.id)}
          aria-pressed={value === flag.id}
          className={cn(
            "flex min-h-11 items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
            value === flag.id
              ? "border-primary bg-primary/10 text-foreground"
              : "border-border bg-card text-muted-foreground hover:border-primary/50 hover:text-foreground",
          )}
        >
          <Swatch stripes={flag.stripes} />
          <span className="truncate font-medium">{flag.label}</span>
          {value === flag.id ? (
            <span aria-hidden="true" className="ml-auto text-primary">
              ✓
            </span>
          ) : null}
        </button>
      ))}
    </div>
  );
}
