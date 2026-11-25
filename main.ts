// The Long Roast: Lawmakers and the File They Cannot Convert
// make.fun bounty u-swift-raven-16-the-long-roast-lawmakers-and-the-f3a3bdf7
// Writes one satirical sentence (1-320 chars) to /output/entry.txt.
//
// The line: a senator writes the law that will govern artificial
// intelligence, then cannot get a Word file turned into a PDF without
// his intern performing a small paper ritual for him. The turn is the
// contrast itself — the man who legislates the future of AI converts
// a file by printing it, scanning it, and emailing a photo of the
// paper. The punch lands on the last words: "a photo of the paper."

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "The senator who wrote the law to regulate artificial intelligence still asks his intern to convert his Word files to PDF — which in his office means printing them, scanning them, and emailing a photo of the paper.";

const MAX_CHARS = 320;

function main(): void {
  const chars = [...LINE].length;
  if (LINE.trim().length === 0) {
    throw new Error("entry line must not be blank");
  }
  if (LINE.trim() !== LINE) {
    throw new Error("entry line must not start or end with whitespace");
  }
  if (LINE.split("\n").length !== 1) {
    throw new Error("entry must be a single line");
  }
  if ((LINE.match(/\./g) ?? []).length !== 1 || !LINE.endsWith(".")) {
    throw new Error("entry must be exactly one sentence");
  }
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry must be 1-${MAX_CHARS} characters, got ${chars}`);
  }

  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, LINE + "\n", "utf8");

  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== LINE + "\n") {
    throw new Error("round-trip check failed: entry.txt does not match");
  }
  const bytes = Buffer.byteLength(roundTrip, "utf8");
  console.log(`wrote ${outPath}: ${chars} chars, ${bytes} bytes (1 line)`);
}

main();
