import { cp, mkdir, stat } from "node:fs/promises";
import { resolve } from "node:path";

const sourceDirectory = resolve(".output/public");
const targetDirectory = resolve("dist/client");

const isDirectory = async (path) => {
  try {
    return (await stat(path)).isDirectory();
  } catch {
    return false;
  }
};

if (!(await isDirectory(sourceDirectory))) {
  if (await isDirectory(targetDirectory)) {
    process.stdout.write(
      "No .output/public directory; dist/client already contains the static site.\n",
    );
    process.exit(0);
  }
  throw new Error(
    "Cannot copy static build output: neither .output/public nor dist/client exists.",
  );
}

await mkdir(targetDirectory, { recursive: true });
await cp(sourceDirectory, targetDirectory, { recursive: true, force: true });

process.stdout.write("Copied static site from .output/public to dist/client.\n");