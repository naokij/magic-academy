import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'site/public/logo/magic-academy-logo.jpg');
const OUT = path.join(ROOT, 'site/public/logo');

if (!fs.existsSync(SRC)) {
  console.error(`❌ ${SRC} not found`);
  process.exit(1);
}

const sizes = [
  { name: 'magic-academy-logo-32.png', w: 32, h: 32 },
  { name: 'magic-academy-logo-64.png', w: 64, h: 64 },
  { name: 'magic-academy-logo-180.png', w: 180, h: 180 },
  { name: 'magic-academy-logo-192.png', w: 192, h: 192 },
  { name: 'magic-academy-logo-512.png', w: 512, h: 512 },
  { name: 'favicon-32.png', w: 32, h: 32 },
  { name: 'favicon-16.png', w: 16, h: 16 },
];

for (const s of sizes) {
  await sharp(SRC)
    .resize(s.w, s.h, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(path.join(OUT, s.name));
  console.log(`✅ ${s.name} ${s.w}x${s.h}`);
}
console.log('done');
