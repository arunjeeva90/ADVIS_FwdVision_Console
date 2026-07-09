import { chromium } from 'playwright';
import { existsSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const output = resolve(process.argv[2] ?? 'artifacts/console-current.png');
const url = process.env.CONSOLE_URL ?? 'http://127.0.0.1:5173';
const viewport = {
  width: Number(process.env.CONSOLE_WIDTH ?? 1600),
  height: Number(process.env.CONSOLE_HEIGHT ?? 900),
};

const outputDir = dirname(output);
if (!existsSync(outputDir)) {
  mkdirSync(outputDir, { recursive: true });
}

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport, deviceScaleFactor: 1 });
await page.goto(url, { waitUntil: 'networkidle' });
await page.screenshot({ path: output, fullPage: false });
await browser.close();

console.log(`Captured ${output} from ${url} at ${viewport.width}x${viewport.height}`);
