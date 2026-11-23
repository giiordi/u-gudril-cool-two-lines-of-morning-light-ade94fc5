// Two Lines of Morning Light — make.fun entry.
// The program writes one two-line micro poem about light and morning
// to <output>/entry.txt. The poem is the whole entry: it must be
// UTF-8 text of 1 to 120 characters, exactly two lines, and not only
// white space. The 120-character cap counts the line break between
// the two lines, and the file must not end with one: the judge reads
// the text exactly as written, so a stray trailing break would be a
// third, empty line in its eyes. The output directory comes from
// MAKEFUN_OUTPUT_DIR when the harness sets it, and defaults to /output.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// One image of light arriving, carried across both lines: light as a
// needle threading the curtain, then stitching the sleeper to the day.
// The second line opens the image instead of restating it, and leaves
// what the day will ask unsaid.
const POEM: string =
  "Light, thin as a needle, threads the curtain's hem.\n" +
  "It stitches my pillow, my hands, and I am sewn to the day.";

const MAX_CHARS = 120;

function validate(poem: string): void {
  if (poem.length < 1 || poem.length > MAX_CHARS) {
    throw new Error(`entry is ${poem.length} characters, must be 1 to ${MAX_CHARS}`);
  }
  if (poem.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  if (poem.endsWith("\n")) {
    throw new Error("entry must not end with a line break");
  }
  const lines: string[] = poem.split("\n");
  if (lines.length !== 2) {
    throw new Error(`entry must be exactly two lines, found ${lines.length}`);
  }
  for (const line of lines) {
    if (line.trim().length === 0) {
      throw new Error("neither line may be blank");
    }
  }
}

function main(): void {
  validate(POEM);
  const outDir: string = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath: string = join(outDir, "entry.txt");
  writeFileSync(outPath, POEM, "utf8");
  console.log(`wrote ${outPath} (${POEM.length} characters):`);
  console.log(POEM);
}

main();
