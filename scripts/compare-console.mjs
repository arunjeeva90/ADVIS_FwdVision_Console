import { createCanvas, loadImage } from 'canvas';
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const [currentArg, referenceArg, outputArg] = process.argv.slice(2);

if (!currentArg || !referenceArg) {
  console.error('Usage: node scripts/compare-console.mjs <current.png> <reference.png> [diff.png]');
  process.exit(1);
}

const currentPath = resolve(currentArg);
const referencePath = resolve(referenceArg);
const diffPath = resolve(outputArg ?? 'artifacts/console-diff.png');

const current = await loadImage(currentPath);
const reference = await loadImage(referencePath);

const width = Math.min(current.width, reference.width);
const height = Math.min(current.height, reference.height);

const canvasA = createCanvas(width, height);
const canvasB = createCanvas(width, height);
const diffCanvas = createCanvas(width, height);
const ctxA = canvasA.getContext('2d');
const ctxB = canvasB.getContext('2d');
const diffCtx = diffCanvas.getContext('2d');

ctxA.drawImage(current, 0, 0, width, height);
ctxB.drawImage(reference, 0, 0, width, height);

const a = ctxA.getImageData(0, 0, width, height);
const b = ctxB.getImageData(0, 0, width, height);
const d = diffCtx.createImageData(width, height);

let total = 0;
let max = 0;
let changed = 0;

for (let i = 0; i < a.data.length; i += 4) {
  const dr = Math.abs(a.data[i] - b.data[i]);
  const dg = Math.abs(a.data[i + 1] - b.data[i + 1]);
  const db = Math.abs(a.data[i + 2] - b.data[i + 2]);
  const delta = (dr + dg + db) / 3;
  total += delta;
  max = Math.max(max, delta);
  if (delta > 24) changed += 1;

  d.data[i] = Math.min(255, delta * 2.2);
  d.data[i + 1] = Math.min(255, delta * 0.65);
  d.data[i + 2] = Math.min(255, delta * 0.65);
  d.data[i + 3] = 255;
}

diffCtx.putImageData(d, 0, 0);
const diffDir = dirname(diffPath);
if (!existsSync(diffDir)) {
  mkdirSync(diffDir, { recursive: true });
}
writeFileSync(diffPath, diffCanvas.toBuffer('image/png'));

const pixels = width * height;
const mean = total / pixels;
const changedPct = (changed / pixels) * 100;

console.log(JSON.stringify({
  current: currentPath,
  reference: referencePath,
  diff: diffPath,
  width,
  height,
  meanDelta: Number(mean.toFixed(2)),
  maxDelta: Number(max.toFixed(2)),
  changedPct: Number(changedPct.toFixed(2)),
}, null, 2));
