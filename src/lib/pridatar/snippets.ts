/**
 * Pure snippet builders for the playground's code panel.
 * No DOM access: everything here is string building.
 */

import { pridatar, pridatarDataUri, type PridatarOptions } from "./pridatar";

export interface SnippetInput {
  readonly seed: string;
  readonly options: PridatarOptions;
  readonly size: number;
}

export interface Snippets {
  readonly react: string;
  readonly svg: string;
  readonly css: string;
}

/** Line breaks between top-level SVG children so the markup is readable. */
const prettySvg = (svg: string): string =>
  svg
    .replace(/></g, ">\n<")
    .split("\n")
    .map((line) => (/^<\/?(svg|style|defs)/.test(line) ? line : `  ${line}`))
    .join("\n");

/** A `url()`-safe data URI: quoted, with `#` and `"` percent-encoded. */
const cssUrl = (uri: string): string => `url("${uri.replace(/#/g, "%23").replace(/"/g, "%22")}")`;

const reactSnippet = ({ seed, options, size }: SnippetInput): string =>
  [
    `import { Pridatar } from "@/components/pridatar/Pridatar";`,
    ``,
    `<Pridatar`,
    `  name={${JSON.stringify(seed)}}`,
    `  flag="${options.flag ?? "auto"}"`,
    `  stripes="${options.stripes ?? "background"}"`,
    `  shape="${options.shape ?? "auto"}"`,
    `  expression="${options.expression ?? "auto"}"`,
    `  solid="${options.solid ?? "auto"}"`,
    `  motion="${options.motion ?? "off"}"`,
    `  background={${options.background === false ? "false" : `"${options.background ?? "squircle"}"`}}`,
    `  size={${size}}`,
    `/>`,
  ].join("\n");

export function buildSnippets(input: SnippetInput): Snippets {
  const { seed, options, size } = input;
  const svg = pridatar(seed, { ...options, size, title: seed });
  const uri = pridatarDataUri(seed, { ...options, size: undefined, title: seed });

  const css = [
    `/* Background image — no markup needed beyond one element. */`,
    `.pridatar {`,
    `  width: ${size}px;`,
    `  height: ${size}px;`,
    `  background-image: ${cssUrl(uri)};`,
    `  background-size: contain;`,
    `  background-repeat: no-repeat;`,
    `}`,
    ``,
    `/* Inline style variant, for a one-off avatar. */`,
    `<div style="width:${size}px;height:${size}px;background:${cssUrl(uri)} center/contain no-repeat"></div>`,
  ].join("\n");

  return { react: reactSnippet(input), svg: prettySvg(svg), css };
}

/** Payload for CodePen's prefill API (https://blog.codepen.io/documentation/prefill/). */
export function codepenPrefill(input: SnippetInput): string {
  const { seed, size } = input;
  const { svg, css } = buildSnippets(input);

  return JSON.stringify({
    title: `Pridatar — ${seed}`,
    description: "Deterministic pride blobatar, generated at blobs.gay",
    tags: ["pridatar", "avatar", "svg"],
    editors: "1100",
    html: [
      `<!-- Inline SVG -->`,
      svg,
      ``,
      `<!-- Same avatar as a CSS background -->`,
      `<div class="pridatar"></div>`,
    ].join("\n"),
    css: [
      `body {`,
      `  min-height: 100vh;`,
      `  margin: 0;`,
      `  display: grid;`,
      `  grid-auto-flow: column;`,
      `  place-content: center;`,
      `  gap: 24px;`,
      `  background: #0e0e12;`,
      `}`,
      ``,
      css.split("\n/* Inline style variant")[0]!.trim(),
    ].join("\n"),
  });
}

export const CODEPEN_ENDPOINT = "https://codepen.io/pen/define";
