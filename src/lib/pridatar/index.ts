export { pridatar, pridatarDataUri, resolvePridatar, autoFlag } from "./pridatar";
export type { PridatarOptions, ResolvedPridatar, BackgroundShape } from "./pridatar";
export { FLAGS, FLAG_IDS, getFlag } from "./flags";
export type { Flag, FlagId } from "./flags";
export { prideColors } from "./palette";
export type { PrideColors, StripeMode } from "./palette";
export { SHAPE_IDS, shapePin } from "./style";
export { MOTION_PRESETS, isMotionPreset, motionStyle, motionFrameStyle, motionLoop } from "./motion";
export type { MotionPreset } from "./motion";
export { EXPRESSION_IDS, expressionPins } from "./expression";
export type { ExpressionId, ExpressionSelection } from "./expression";
export type { ShapeId } from "./style";
export { normalizeSeed } from "./vendor/hash";

export const VERSION = "0.1.0";
