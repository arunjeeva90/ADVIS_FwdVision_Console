import { PNG } from 'pngjs';
import pixelmatch from 'pixelmatch';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const [currentArg, referenceArg, outputArg] = process.argv.slice(2);

if (!currentArg || !referenceArg) {
  console.error('Usage: node scripts/compare-console.mjs <current.png> <reference.png> [diff.png]');
  process.exit(1);
}

const currentPath = resolve(currentArg);
const referencePath = resolve(referenceArg);
const diffPath = resolve(outputArg ?? 'artifacts/console-diff.png');

const current = PNG.sync.read(readFileSync(currentPath));
const reference = PNG.sync.read(readFileSync(referencePath));

if (current.width !== reference.width || current.height !== reference.height) {
  console.error(`Image size mismatch: current=${current.width}x${current.height}, reference=${reference.width}x${reference.height}`);
  console.error('Capture the console using the same viewport as your reference image, or resize the reference first.');
  process.exit(2);
}

const { width, height } = current;
const diff = new PNG({ width, height });
const mismatchedPixels = pixelmatch(
  current.data,
  reference.data,
  diff.data,
  width,
  height,
  {
    threshold: 0.12,
    includeAA: false,
  },
);

const diffDir = dirname(diffPath);
if (!existsSync(diffDir)) {
  mkdirSync(diffDir, { recursive: true });
}
writeFileSync(diffPath, PNG.sync.write(diff));

const changedPct = (mismatchedPixels / (width * height)) * 100;

console.log(JSON.stringify({
  current: currentPath,
  reference: referencePath,
  diff: diffPath,
  width,
  height,
  mismatchedPixels,
  changedPct: Number(changedPct.toFixed(2)),
}, null, 2));
