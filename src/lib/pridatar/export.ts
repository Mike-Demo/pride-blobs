/**
 * Browser-side export helpers. Kept out of components so the UI only wires
 * events to them.
 */

/**
 * Triggers a file save. The anchor is attached to the document because a
 * detached anchor's click is ignored in several browsers, and object URLs are
 * revoked on the next tick so the download has time to start.
 */
const saveBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.rel = "noopener";
  a.style.display = "none";
  document.body.appendChild(a);
  a.click();
  window.setTimeout(() => {
    a.remove();
    URL.revokeObjectURL(url);
  }, 10_000);
};

export function downloadSvg(svg: string, filename: string): void {
  saveBlob(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }), `${filename}.svg`);
}

export async function copySvg(svg: string): Promise<void> {
  await navigator.clipboard.writeText(svg);
}

const rasterize = async (svg: string, size: number): Promise<Blob> => {
  // A data URI avoids blob-URL loading restrictions inside sandboxed frames.
  const src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  const image = new Image();
  image.decoding = "sync";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("Could not rasterize the avatar"));
    image.src = src;
  });

  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is unavailable in this browser");
  ctx.drawImage(image, 0, 0, size, size);

  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));
  if (!blob) throw new Error("Could not encode the PNG");
  return blob;
};

/** Rasterizes the SVG through a canvas, at whatever pixel size is asked for. */
export async function downloadPng(svg: string, filename: string, size = 512): Promise<void> {
  const blob = await rasterize(svg, size);
  saveBlob(blob, `${filename}.png`);
}
