// Prepares the photos behind the homepage's photo card and writes
// assets/photos.json: [{ file, place }].
//
// Photos are uploaded to assets/photos/ named after where they were taken,
// like "Chiang Mai, Thailand.jpg"; a trailing number tells apart several
// from one place ("Tokyo, Japan 2.jpg"). Each one that isn't already a small
// webp is turned upright, shrunk to 1200px on its short edge (sharp enough
// for the 2×2 card on a 2× or 3× screen, since the card crops the photo to a
// square) and saved as webp, which also drops its metadata (GPS included);
// the original is then deleted. The list is rebuilt from the file names, so
// it never needs editing by hand. Runs in the update-photos workflow and needs sharp.

import { readdir, rm, writeFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const DIR = new URL("../assets/photos/", import.meta.url);
const OUT = new URL("../assets/photos.json", import.meta.url);
const SHORT = 1200;
const IMAGE = /\.(jpe?g|png|webp|avif|tiff?|gif)$/i;

const stem = name => name.replace(/\.[^.]+$/, "");
const at = name => new URL(encodeURIComponent(name), DIR);

// A name for the webp that doesn't overwrite another photo.
function free(base, taken) {
  for (let n = 1; ; n++) {
    const name = `${n === 1 ? base : `${base} ${n}`}.webp`;
    if (!taken.has(name) && !existsSync(at(name))) return name;
  }
}

const files = (await readdir(DIR)).filter(f => IMAGE.test(f)).sort();
const done = new Set();
for (const file of files) {
  const input = sharp(fileURLToPath(at(file)), { failOn: "none" });
  const { width = 0, height = 0, orientation = 1 } = await input.metadata();
  const small = Math.min(width, height) <= SHORT && orientation === 1;
  if (/\.webp$/i.test(file) && small) {
    done.add(file);
    continue;
  }
  const name = /\.webp$/i.test(file) ? file : free(stem(file), done);
  const data = await input
    .rotate()
    .resize({ width: SHORT, height: SHORT, fit: "outside", withoutEnlargement: true })
    .webp({ quality: 80 })
    .toBuffer();
  if (name !== file) await rm(at(file));
  await writeFile(at(name), data);
  done.add(name);
  console.log(`${file} → ${name}`);
}

const photos = [...done].sort().map(file => ({
  file,
  place: stem(file).replace(/(\s+\d+)+$/, "").trim(),
}));
await writeFile(OUT, JSON.stringify(photos, null, 2) + "\n");
console.log(`${photos.length} photos`);
