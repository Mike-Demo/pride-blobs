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

/**
 * A scoped `<style>` block for one render, or `""` when motion is off.
 *
 * Wrapped in `prefers-reduced-motion: no-preference`, so the static figure is
 * what anyone who asked for less motion sees — the markup is identical either
 * way, only the animation is gated.
 */
export function motionStyle(uid: string, preset: MotionPreset): string {
  if (preset === "off") return "";
  const t = TIMING[preset];
  const root = `#pa-${uid}`;
  const kf = (name: string) => `pa-${name}-${uid}`;

  return (
    `<style>@media (prefers-reduced-motion: no-preference){` +
    `@keyframes ${kf("breathe")}{0%,100%{transform:scale(1)}50%{transform:scale(${t.swell})}}` +
    `@keyframes ${kf("bob")}{0%,100%{transform:translateY(0)}50%{transform:translateY(-${t.rise})}}` +
    `@keyframes ${kf("blink")}{0%,92%,100%{transform:scaleY(1)}96%{transform:scaleY(0.1)}}` +
    `${root} .mo-breathe{transform-origin:50px 62px;transform-box:view-box;` +
    `animation:${kf("breathe")} ${t.breathe}s ease-in-out infinite}` +
    `${root} .mo-bob{transform-box:view-box;` +
    `animation:${kf("bob")} ${t.bob}s ease-in-out infinite}` +
    `${root} .mo-eye{transform-box:view-box;` +
    `animation:${kf("blink")} ${t.blink}s ease-in-out infinite;` +
    `animation-delay:calc(var(--mo-wrap) * 0.04s)}` +
    `}</style>`
  );
}
