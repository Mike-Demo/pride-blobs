/**
 * Pride flag definitions.
 *
 * Each flag is an ordered list of stripe colors, top to bottom, as authored by
 * the flag's designer. These are data, never Tailwind utilities: the flags are
 * the content of this project, not its chrome.
 */

export interface Flag {
  readonly id: FlagId;
  readonly label: string;
  /** Stripe colors, top to bottom. */
  readonly stripes: readonly string[];
  /** Short note on origin, shown in the flag reference. */
  readonly note: string;
}

export type FlagId =
  | "rainbow"
  | "progress"
  | "trans"
  | "bisexual"
  | "pansexual"
  | "nonbinary"
  | "lesbian"
  | "asexual"
  | "genderqueer"
  | "genderfluid"
  | "agender"
  | "aromantic"
  | "intersex"
  | "demisexual"
  | "polysexual";

export const FLAGS: readonly Flag[] = [
  {
    id: "rainbow",
    label: "Rainbow",
    stripes: ["#e40303", "#ff8c00", "#ffed00", "#008026", "#004dff", "#750787"],
    note: "The six-stripe flag, Gilbert Baker's 1978 design as simplified in 1979.",
  },
  {
    id: "progress",
    label: "Progress",
    stripes: [
      "#e40303",
      "#ff8c00",
      "#ffed00",
      "#008026",
      "#004dff",
      "#750787",
      "#613915",
      "#000000",
      "#5bcefa",
      "#f5a9b8",
      "#ffffff",
    ],
    note: "Daniel Quasar, 2018 — the chevron colors folded back into stripes.",
  },
  {
    id: "trans",
    label: "Transgender",
    stripes: ["#5bcefa", "#f5a9b8", "#ffffff", "#f5a9b8", "#5bcefa"],
    note: "Monica Helms, 1999.",
  },
  {
    id: "bisexual",
    label: "Bisexual",
    stripes: ["#d60270", "#9b4f96", "#0038a8"],
    note: "Michael Page, 1998.",
  },
  {
    id: "pansexual",
    label: "Pansexual",
    stripes: ["#ff218c", "#ffd800", "#21b1ff"],
    note: "First circulated online in 2010.",
  },
  {
    id: "nonbinary",
    label: "Nonbinary",
    stripes: ["#fcf434", "#ffffff", "#9c59d1", "#2c2c2c"],
    note: "Kye Rowan, 2014.",
  },
  {
    id: "lesbian",
    label: "Lesbian",
    stripes: ["#d52d00", "#ef7627", "#ff9a56", "#ffffff", "#d162a4", "#b55690", "#a30262"],
    note: "The five/seven-stripe orange-pink flag, 2018.",
  },
  {
    id: "asexual",
    label: "Asexual",
    stripes: ["#000000", "#a3a3a3", "#ffffff", "#800080"],
    note: "AVEN community vote, 2010.",
  },
  {
    id: "genderqueer",
    label: "Genderqueer",
    stripes: ["#b57edc", "#ffffff", "#4a8123"],
    note: "Marilyn Roxie, 2011.",
  },
  {
    id: "genderfluid",
    label: "Genderfluid",
    stripes: ["#ff75a2", "#ffffff", "#be18d6", "#000000", "#333ebd"],
    note: "JJ Poole, 2012.",
  },
  {
    id: "agender",
    label: "Agender",
    stripes: ["#000000", "#bcc4c7", "#ffffff", "#b7f684", "#ffffff", "#bcc4c7", "#000000"],
    note: "Salem X, 2014.",
  },
  {
    id: "aromantic",
    label: "Aromantic",
    stripes: ["#3da542", "#a7d379", "#ffffff", "#a9a9a9", "#000000"],
    note: "Current five-stripe revision, 2014.",
  },
  {
    id: "intersex",
    label: "Intersex",
    stripes: ["#ffd800", "#7902aa", "#ffd800"],
    note: "Morgan Carpenter, 2013 — purple ring on yellow, read here as stripes.",
  },
  {
    id: "demisexual",
    label: "Demisexual",
    stripes: ["#ffffff", "#6e0070", "#d3d3d3", "#000000"],
    note: "Derived from the asexual palette.",
  },
  {
    id: "polysexual",
    label: "Polysexual",
    stripes: ["#f61cb9", "#07d569", "#1c92f6"],
    note: "Tumblr community design, 2012.",
  },
] as const;

const BY_ID = new Map<FlagId, Flag>(FLAGS.map((f) => [f.id, f]));

export const getFlag = (id: FlagId): Flag => {
  const flag = BY_ID.get(id);
  if (!flag) throw new Error(`Unknown flag: ${id}`);
  return flag;
};

export const FLAG_IDS: readonly FlagId[] = FLAGS.map((f) => f.id);
