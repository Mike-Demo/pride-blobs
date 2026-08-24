import { SHAPE_IDS } from "@/lib/pridatar";
import type { FlagSelectionValue } from "@/lib/pridatar/share";
import type { StripeMode } from "@/lib/pridatar";
import { Pridatar } from "./Pridatar";
import { cn } from "@/lib/utils";

export type ShapeSelection = "auto" | string;

const LABELS: Record<string, string> = {
  auto: "Auto",
  round: "Round",
  organic: "Organic",
  boxy: "Boxy",
  capsule: "Capsule",
  nub: "Nub",
  cloud: "Cloud",
  droplet: "Droplet",
  hexagon: "Hexagon",
  sun: "Sun",
  triangle: "Triangle",
  cat: "Cat",
  bunny: "Bunny",
  bear: "Bear",
  fox: "Fox",
  flag: "Flag",
};

export interface ShapePickerProps {
  value: ShapeSelection;
  onChange: (value: ShapeSelection) => void;
  /** Seed the swatch previews use, so the picker shows the avatar being edited. */
  seed: string;
  flag: FlagSelectionValue;
  stripes: StripeMode;
}

/** Silhouette picker: every option previews itself with the current seed and flag. */
export function ShapePicker({ value, onChange, seed, flag, stripes }: ShapePickerProps) {
  const options: ShapeSelection[] = ["auto", ...SHAPE_IDS];

  return (
    <div
      role="group"
      aria-label="Silhouette"
      className="grid grid-cols-3 gap-2 sm:grid-cols-4"
    >
      {options.map((id) => {
        const selected = value === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-pressed={selected}
            className={cn(
              "flex min-h-11 min-w-0 items-center gap-2 rounded-lg border px-2 py-2 text-left text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              selected
                ? "border-primary bg-primary/10 text-foreground"
                : "border-border bg-card text-muted-foreground hover:text-foreground",
            )}
          >
            <Pridatar
              name={seed}
              flag={flag}
              stripes={stripes}
              {...(id === "auto" ? {} : { shape: id })}
              size={24}
              decorative
            />
            <span className="truncate">
              {LABELS[id] ?? id}
              {selected ? " ✓" : ""}
            </span>
          </button>
        );
      })}
    </div>
  );
}
