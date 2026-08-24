/**
 * Browser-side export helpers. Kept out of components so the UI only wires
 * events to them.
 */

const download = (href: string, filename: string) => {
  const a = document.createElement("a");
  a.href = href;
  a.download = filename;
  a.click();
};

export function downloadSvg(svg: string, filename: string): void {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  download(url, `${filename}.svg`);
  URL.revokeObjectURL(url);
}

export async function copySvg(svg: string): Promise<void> {
  await navigator.clipboard.writeText(svg);
}

/** Rasterizes the SVG through a canvas, at whatever pixel size is asked for. */
export async function downloadPng(svg: string, filename: string, size = 512): Promise<void> {
  const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml" }));
  try {
    const image = new Image();
    image.width = size;
    image.height = size;
    await new Promise<void>((resolve, reject) => {
      image.onload = () => resolve();
      image.onerror = () => reject(new Error("Could not rasterize the avatar"));
      image.src = url;
    });

    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Canvas is unavailable in this browser");
    ctx.drawImage(image, 0, 0, size, size);
    download(canvas.toDataURL("image/png"), `${filename}.png`);
  } finally {
    URL.revokeObjectURL(url);
  }
}
