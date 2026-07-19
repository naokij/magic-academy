import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// 从 app-icon.jpg (1920x1920) 生成 Apple/Android 主屏图标 + favicon
// 源文件独立于站点 logo (magic-academy-logo.jpg), 互不影响
// 用法: node scripts/generate-app-icons.mjs

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'site/public/logo/app-icon.jpg');
const LOGO_DIR = path.join(ROOT, 'site/public/logo');
const PUBLIC = path.join(ROOT, 'site/public');

if (!fs.existsSync(SRC)) {
  console.error(`❌ ${SRC} not found`);
  process.exit(1);
}

// 1) PNG 各尺寸 (Apple touch icon 180 + Android/PWA 192/512 + favicon 占位 32)
const pngSizes = [
  { name: 'app-icon-192.png', out: LOGO_DIR, w: 192, h: 192 },
  { name: 'app-icon-512.png', out: LOGO_DIR, w: 512, h: 512 },
];

for (const s of pngSizes) {
  await sharp(SRC)
    .resize(s.w, s.h, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(path.join(s.out, s.name));
  console.log(`✅ ${s.name} ${s.w}x${s.h}`);
}

// 2) apple-touch-icon.png (180x180, 放 public 根, iOS 主屏图标)
await sharp(SRC)
  .resize(180, 180, { fit: 'cover' })
  .png({ quality: 90 })
  .toFile(path.join(PUBLIC, 'apple-touch-icon.png'));
console.log('✅ apple-touch-icon.png 180x180');

// 3) favicon 相关 PNG (16/32, 放 logo 目录)
const favPngs = [
  { name: 'favicon-16.png', w: 16, h: 16 },
  { name: 'favicon-32.png', w: 32, h: 32 },
];
for (const s of favPngs) {
  await sharp(SRC)
    .resize(s.w, s.h, { fit: 'cover' })
    .png({ quality: 90 })
    .toFile(path.join(LOGO_DIR, s.name));
  console.log(`✅ ${s.name} ${s.w}x${s.h}`);
}

// 4) favicon.ico (16/32/48 多尺寸 ICO)
async function buildIco() {
  const sizes = [16, 32, 48];
  const bufs = await Promise.all(sizes.map(async (s) => {
    return await sharp(SRC).resize(s, s, { fit: 'cover' }).png().toBuffer();
  }));
  const numImages = bufs.length;
  const dirSize = 6 + 16 * numImages;
  let dataOffset = dirSize;
  const dir = Buffer.alloc(dirSize);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(numImages, 4);
  for (let i = 0; i < numImages; i++) {
    const offset = 6 + i * 16;
    const size = bufs[i].length;
    dir.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], offset + 0);
    dir.writeUInt8(sizes[i] === 256 ? 0 : sizes[i], offset + 1);
    dir.writeUInt8(0, offset + 2);
    dir.writeUInt8(0, offset + 3);
    dir.writeUInt16LE(1, offset + 4);
    dir.writeUInt16LE(32, offset + 6);
    dir.writeUInt32LE(size, offset + 8);
    dir.writeUInt32LE(dataOffset, offset + 12);
    dataOffset += size;
  }
  const ico = Buffer.concat([dir, ...bufs]);
  fs.writeFileSync(path.join(PUBLIC, 'favicon.ico'), ico);
  console.log(`✅ favicon.ico ${ico.length} bytes (${sizes.length} sizes: ${sizes.join(',')})`);
}
await buildIco();

console.log('done');