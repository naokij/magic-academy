import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const SRC = path.join(ROOT, 'site/public/logo/magic-academy-logo.jpg');
const OUT = path.join(ROOT, 'site/public/favicon.ico');

const sizes = [16, 32, 48];
const bufs = await Promise.all(sizes.map(async (s) => {
  return await sharp(SRC).resize(s, s).png().toBuffer();
}));

function buildIco(buffers, sizes) {
  const numImages = buffers.length;
  const dirSize = 6 + 16 * numImages;
  let dataOffset = dirSize;
  const dir = Buffer.alloc(dirSize);
  dir.writeUInt16LE(0, 0);
  dir.writeUInt16LE(1, 2);
  dir.writeUInt16LE(numImages, 4);
  for (let i = 0; i < numImages; i++) {
    const offset = 6 + i * 16;
    const size = buffers[i].length;
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
  return Buffer.concat([dir, ...buffers]);
}

const ico = buildIco(bufs, sizes);
fs.writeFileSync(OUT, ico);
console.log(`✅ favicon.ico ${ico.length} bytes (${sizes.length} sizes: ${sizes.join(',')})`);
