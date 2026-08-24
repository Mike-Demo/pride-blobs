/**
 * Motion.
 *
 * The composer already emits the grouping an animation needs (`mo-breathe`,
 * `mo-bob`, `mo-eyes`, and per-eye `--mo-lean` / `--mo-wrap`); what was missing
 * is the CSS. It ships inside the SVG rather than in the page stylesheet so a
 * copied or downloaded SVG animates on its own, and every selector is scoped to
 * the render's uid so two avatars on one page never share a rule.
 */

export const MOTION_PRESETS = ["off", "idle", "bouncy"] as const;
export type MotionPreset = (typeof MOTION_PRESETS)[number];

export const isMotionPreset = (v: unknown): v is MotionPreset =>
  typeof v === "string" && (MOTION_PRESETS as readonly string[]).includes(v);

interface Timing {
  /** Breathe cycle, seconds. */
  breathe: number;
  /** Breathe scale at peak. */
  swell: number;
  /** Bob cycle, seconds. */
  bob: number;
  /** Bob travel, user units. */
  rise: number;
  /** Blink cycle, seconds. */
  blink: number;
}

const TIMING: Record<Exclude<MotionPreset, "off">, Timing> = {
  idle: { breathe: 5.2, swell: 1.02, bob: 3.4, rise: 1.1, blink: 6.5 },
  bouncy: { breathe: 2.4, swell: 1.05, bob: 1.15, rise: 2.6, blink: 4 },
};

/** How an expression colors the motion: multipliers on the preset's timing. */
interface Character {
  /** Multiplies the breathe cycle length; >1 is slower. */
  breathe: number;
  /** Multiplies the breathe swell above 1. */
  swell: number;
  /** Multiplies the bob cycle length. */
  bob: number;
  /** Multiplies the bob travel. */
  rise: number;
  /** Multiplies the blink cycle length. `0` disables blinking. */
  blink: number;
}

const CALM: Character = { breathe: 1, swell: 1, bob: 1, rise: 1, blink: 1 };

/**
 * Per-expression motion character.
 *
 * A face and its movement should agree: a sleepy blob breathes slowly and
 * barely lifts, a surprised one is frozen mid-gasp, and eyes that are already
 * closed (wink, happy, sleepy) or deliberately narrowed (suspicious) do not
 * blink on top of that.
 */
const CHARACTER: Record<string, Character> = {
  neutral: CALM,
  happy: { breathe: 0.85, swell: 1.3, bob: 0.7, rise: 1.35, blink: 0 },
  wide: { breathe: 0.9, swell: 1.1, bob: 0.95, rise: 1.1, blink: 0.7 },
  sleepy: { breathe: 1.9, swell: 1.6, bob: 1.8, rise: 0.5, blink: 0 },
  wink: { breathe: 0.9, swell: 1.15, bob: 0.8, rise: 1.2, blink: 0 },
  side: { breathe: 1.15, swell: 0.8, bob: 1.3, rise: 0.6, blink: 1.3 },
  suspicious: { breathe: 1.5, swell: 0.6, bob: 1.6, rise: 0.4, blink: 0 },
  surprised: { breathe: 0.6, swell: 1.5, bob: 0.55, rise: 0.7, blink: 0 },
};

const characterOf = (expression?: string): Character =>
  (expression && CHARACTER[expression]) || CALM;

/**
 * A scoped `<style>` block for one render, or `""` when motion is off.
 *
 * Wrapped in `prefers-reduced-motion: no-preference`, so the static figure is
 * what anyone who asked for less motion sees — the markup is identical either
 * way, only the animation is gated. The expression tunes the timing so the
 * movement reads as the same mood as the face.
 */
export function motionStyle(uid: string, preset: MotionPreset, expression?: string): string {
  if (preset === "off") return "";
  const base = TIMING[preset];
  const c = characterOf(expression);
  const t: Timing = {
    breathe: base.breathe * c.breathe,
    swell: 1 + (base.swell - 1) * c.swell,
    bob: base.bob * c.bob,
    rise: base.rise * c.rise,
    blink: base.blink * (c.blink || 1),
  };
  const root = `#pa-${uid}`;
  const kf = (name: string) => `pa-${name}-${uid}`;

  return (
    `<style>@media (prefers-reduced-motion: no-preference){` +
    `@keyframes ${kf("breathe")}{0%,100%{transform:scale(1)}50%{transform:scale(${t.swell.toFixed(4)})}}` +
    `@keyframes ${kf("bob")}{0%,100%{transform:translateY(0)}50%{transform:translateY(-${t.rise.toFixed(3)}px)}}` +
    `@keyframes ${kf("blink")}{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(0.1)}}` +
    `${root} .mo-breathe{transform-origin:50px 62px;transform-box:view-box;` +
    `animation:${kf("breathe")} ${t.breathe.toFixed(2)}s ease-in-out infinite}` +
    `${root} .mo-bob{transform-box:view-box;` +
    `animation:${kf("bob")} ${t.bob.toFixed(2)}s ease-in-out infinite}` +
    (c.blink === 0
      ? ""
      : `${root} .mo-eye{transform-box:view-box;` +
        `animation:${kf("blink")} ${t.blink.toFixed(2)}s ease-in-out infinite;` +
        `animation-delay:calc(var(--mo-wrap) * 0.04s)}`) +
    `}</style>`
  );
}

