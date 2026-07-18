#!/bin/bash
# 同步仓库根目录的资源到 site/public/
# 1. 复制原图(限制大原图尺寸,避免 4K/5K 直接进 dist)
# 2. 派生 JPG + WebP 多档
# 3. 同步字体 + 音频
# 4. 生成资源 hash + 自动算 mp3 时长
set -e

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SITE_PUBLIC="$ROOT/site/public"
ASSETS_SRC="$ROOT/assets"
FONTS_SRC="$ROOT/public/fonts"
AUDIO_SRC="$ROOT/audio"

echo "🔄 同步资源 → $SITE_PUBLIC"

# 1) 同步 assets/(characters/locations/banners/covers)
#    加部署副本 resize 上限(防止 4K/5K 大原图进 dist)
mkdir -p "$SITE_PUBLIC/assets"

# characters: 2048px 还合理,不缩
rm -rf "$SITE_PUBLIC/assets/characters"
mkdir -p "$SITE_PUBLIC/assets/characters"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const src = '$ASSETS_SRC/characters';
const dst = '$SITE_PUBLIC/assets/characters';
const files = fs.readdirSync(src).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
(async () => {
  for (const f of files) {
    const buf = await sharp(path.join(src, f))
      .resize({ width: 2048, height: 2048, fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    await sharp(buf).toFile(path.join(dst, f));
  }
  console.log('  ✅ characters (cap 2048px):', files.length, 'files');
})();
"
echo "  ✅ assets/characters"

# locations: 长边 ≤ 1920px(卧室 4096→1920)
rm -rf "$SITE_PUBLIC/assets/locations"
mkdir -p "$SITE_PUBLIC/assets/locations"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const src = '$ASSETS_SRC/locations';
const dst = '$SITE_PUBLIC/assets/locations';
const files = fs.readdirSync(src).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
(async () => {
  for (const f of files) {
    const buf = await sharp(path.join(src, f))
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    await sharp(buf).toFile(path.join(dst, f));
  }
  console.log('  ✅ locations (cap 1920px):', files.length, 'files');
})();
"
echo "  ✅ assets/locations"

# banners: 长边 ≤ 1920px(5504→1920,单图从 4 MiB 降到 250-400 KB)
rm -rf "$SITE_PUBLIC/assets/banners"
mkdir -p "$SITE_PUBLIC/assets/banners"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const src = '$ASSETS_SRC/banners';
const dst = '$SITE_PUBLIC/assets/banners';
const files = fs.readdirSync(src).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
(async () => {
  for (const f of files) {
    const buf = await sharp(path.join(src, f))
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    await sharp(buf).toFile(path.join(dst, f));
  }
  console.log('  ✅ banners (cap 1920px):', files.length, 'files');
})();
"
echo "  ✅ assets/banners"

# covers: 长边 ≤ 1920px
rm -rf "$SITE_PUBLIC/assets/covers"
mkdir -p "$SITE_PUBLIC/assets/covers"
node -e "
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const src = '$ASSETS_SRC/covers';
const dst = '$SITE_PUBLIC/assets/covers';
const files = fs.readdirSync(src).filter(f => /\.(png|jpg|jpeg)$/i.test(f));
(async () => {
  for (const f of files) {
    const buf = await sharp(path.join(src, f))
      .resize({ width: 1920, height: 1920, fit: 'inside', withoutEnlargement: true })
      .toBuffer();
    await sharp(buf).toFile(path.join(dst, f));
  }
  console.log('  ✅ covers (cap 1920px):', files.length, 'files');
})();
"
echo "  ✅ assets/covers"

# 2) 同步 fonts
mkdir -p "$SITE_PUBLIC/fonts"
cp -f "$FONTS_SRC"/*.ttf "$SITE_PUBLIC/fonts/" 2>/dev/null || echo "  ⚠️  仓库根 public/fonts 为空,跳过"
echo "  ✅ fonts"

# 3) 同步 audio(没有就走 placeholder)
mkdir -p "$SITE_PUBLIC/audio"
if [ -d "$AUDIO_SRC" ] && ls "$AUDIO_SRC"/*.mp3 1>/dev/null 2>&1; then
  cp "$AUDIO_SRC"/*.mp3 "$SITE_PUBLIC/audio/"
  echo "  ✅ audio"
else
  echo "  ⚠️  audio/ 还没有 mp3,故事详情页会走占位"
fi

# 4) 派生图片 JPG fallback
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/characters" --widths=200,400,800 --quality=80 --ext=jpg
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/covers" --widths=400,800,1200 --quality=82 --ext=jpg
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/locations" --widths=400,800,1200 --quality=82 --ext=jpg
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/banners" --widths=800,1600 --quality=80 --ext=jpg

# 5) 派生图片 WebP(在 JPG 之后,同名不同扩展名)
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/characters" --widths=200,400,800 --quality=80 --ext=webp
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/covers" --widths=400,800,1200 --quality=82 --ext=webp
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/locations" --widths=400,800,1200 --quality=82 --ext=webp
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/banners" --widths=800,1600 --quality=80 --ext=webp

# 6) 生成资源内容 hash 映射表
node "$(dirname "$0")/generate-asset-hashes.mjs"

# 7) 扫描 audio/*.mp3 自动算时长,patch episodes.ts
node "$(dirname "$0")/build-durations.mjs"

echo "✨ 同步完成"
