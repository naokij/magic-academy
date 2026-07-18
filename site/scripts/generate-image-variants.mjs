#!/usr/bin/env node
// 给原图派生多档 JPG 变体 (供 srcset 用)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const [, , inputDir, ...restArgs] = process.argv;
if (!inputDir) {
  console.error('usage: generate-image-variants.mjs <dir> [--widths=200,400,800] [--quality=78] [--ext=jpg]');
  process.exit(1);
}

const opts = Object.fromEntries(
  restArgs
    .filter((a) => a.startsWith('--'))
    .map((a) => {
      const [k, v] = a.replace(/^--/, '').split('=');
      return [k, v];
    }),
);
const widths = (opts.widths || '200,400,800').split(',').map(Number);
const quality = Number(opts.quality || 78);
const ext = opts.ext || 'jpg';

if (!fs.existsSync(inputDir)) {
  console.warn(`⚠️  ${inputDir} 不存在,跳过`);
  process.exit(0);
}

let generated = 0;
let skipped = 0;
const files = fs.readdirSync(inputDir).filter((f) => /\.(png|jpg|jpeg)$/i.test(f));

for (const file of files) {
  const filepath = path.join(inputDir, file);
  const extname = path.extname(file).toLowerCase();
  const stem = path.basename(file, extname);
  const isPng = extname === '.png';

  for (const w of widths) {
    const outName = `${stem}-${w}.${ext}`;
    const outPath = path.join(inputDir, outName);
    if (fs.existsSync(outPath)) {
      const inStat = fs.statSync(filepath);
      const outStat = fs.statSync(outPath);
      if (outStat.mtimeMs >= inStat.mtimeMs) {
        skipped++;
        continue;
      }
    }
    try {
      let pipeline = sharp(filepath).resize({ width: w, withoutEnlargement: true });
      if (isPng) {
        // PNG 转 JPG
        pipeline = pipeline.flatten({ background: { r: 255, g: 255, b: 255 } }).jpeg({ quality, mozjpeg: true });
      } else {
        pipeline = pipeline.jpeg({ quality, mozjpeg: true });
      }
      await pipeline.toFile(outPath);
      generated++;
    } catch (e) {
      console.warn(`  ⚠️  ${file} @ ${w}px 失败: ${e.message}`);
    }
  }
}

console.log(`  ✅ ${inputDir} · 派生 ${generated} 个,跳过 ${skipped} 个 (${widths.join('/')} px)`);
