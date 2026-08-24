import { EXPRESSION_IDS, type ExpressionSelection, type StripeMode } from "@/lib/pridatar";
import type { FlagSelectionValue } from "@/lib/pridatar/share";
import { Pridatar } from "./Pridatar";
import { cn } from "@/lib/utils";

const LABELS: Record<string, string> = {
  auto: "Auto",
  neutral: "Neutral",
  happy: "Happy",
  wide: "Wide",
  sleepy: "Sleepy",
  wink: "Wink",
  side: "Side-eye",
  suspicious: "Suspicious",
  surprised: "Surprised",
};

export interface ExpressionPickerProps {
  value: ExpressionSelection;
  onChange: (value: ExpressionSelection) => void;
  seed: string;
  flag: FlagSelectionValue;
  stripes: StripeMode;
  shape: string;
}

/** Expression picker: every option previews the face it pins. */
export function ExpressionPicker({
  value,
  onChange,
  seed,
  flag,
  stripes,
  shape,
}: ExpressionPickerProps) {
  const options: ExpressionSelection[] = ["auto", ...EXPRESSION_IDS];

  return (
    <div role="group" aria-label="Expression" className="grid grid-cols-3 gap-2 sm:grid-cols-4">
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
              {...(shape === "auto" ? {} : { shape })}
              {...(id === "auto" ? {} : { expression: id })}
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
