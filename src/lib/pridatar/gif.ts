/**
 * Animated GIF export.
 *
 * A canvas never runs the CSS animation that lives inside the SVG, so the loop
 * is posed one frame at a time through `frame`, rasterised, and quantised into
 * a GIF. The loop length comes from the motion preset and expression, which
 * keeps the exported file in step with what the playground shows.
 */
import { GIFEncoder, quantize, applyPalette } from "gifenc";
import { pridatar, type PridatarOptions } from "./pridatar";
import { motionLoop } from "./motion";

export interface GifOptions {
  /** Pixel size of the square output. Default 256. */
  size?: number;
  /** Frames per second. Default 20. */
  fps?: number;
  /** Hard cap on frame count, to keep files small. Default 48. */
  maxFrames?: number;
}

const drawFrame = async (
  svg: string,
  size: number,
  ctx: CanvasRenderingContext2D,
): Promise<ImageData> => {
  const image = new Image();
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not rasterize a frame"));
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  });
  ctx.clearRect(0, 0, size, size);
  ctx.drawImage(image, 0, 0, size, size);
  return ctx.getImageData(0, 0, size, size);
};

/** Encodes the current avatar's motion loop as an animated GIF blob. */
export async function encodeGif(
  name: string,
  opts: PridatarOptions = {},
  gif: GifOptions = {},
): Promise<Blob> {
  const size = gif.size ?? 256;
  const fps = gif.fps ?? 20;
  const maxFrames = gif.maxFrames ?? 48;

  const loop = motionLoop(opts.motion ?? "off");
  // A still avatar still exports, as a one-frame GIF.
  const count = loop === 0 ? 1 : Math.max(2, Math.min(maxFrames, Math.round(loop * fps)));
  const delay = loop === 0 ? 1000 : Math.max(20, Math.round((loop * 1000) / count));

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) throw new Error("Canvas is unavailable in this browser");

  const encoder = GIFEncoder();
  for (let i = 0; i < count; i += 1) {
    const frameOpts: PridatarOptions = { ...opts, size };
    if (loop !== 0) frameOpts.frame = i / count;
    const data = await drawFrame(pridatar(name, frameOpts), size, ctx);
    const palette = quantize(data.data, 256, { format: "rgba4444" });
    const index = applyPalette(data.data, palette, "rgba4444");
    encoder.writeFrame(index, size, size, { palette, delay, transparent: true });
  }
  encoder.finish();

  return new Blob([encoder.bytesView() as unknown as BlobPart], { type: "image/gif" });
}
