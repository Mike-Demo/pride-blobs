import { cp, mkdir, rm, stat } from "node:fs/promises";
import { resolve } from "node:path";

const sourceDirectory = resolve(".output/public");
const targetDirectory = resolve("dist/client");

try {
  const source = await stat(sourceDirectory);
  if (!source.isDirectory()) {
    throw new Error("Static build output is not a directory");
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  throw new Error(`Cannot copy static build output: ${message}`);
}

await rm(targetDirectory, { recursive: true, force: true });
await mkdir(targetDirectory, { recursive: true });
await cp(sourceDirectory, targetDirectory, { recursive: true });

process.stdout.write("Copied static site from .output/public to dist/client.\n");