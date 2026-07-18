#!/bin/bash
# 同步仓库根目录的资源到 site/public/
set -e

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SITE_PUBLIC="$ROOT/site/public"
ASSETS_SRC="$ROOT/assets"
FONTS_SRC="$ROOT/public/fonts"
AUDIO_SRC="$ROOT/audio"

echo "🔄 同步资源 → $SITE_PUBLIC"

# 1) 同步 assets/(characters/locations/banners/covers)
rm -rf "$SITE_PUBLIC/assets"
mkdir -p "$SITE_PUBLIC/assets"
cp -R "$ASSETS_SRC/characters" "$SITE_PUBLIC/assets/characters"
cp -R "$ASSETS_SRC/locations" "$SITE_PUBLIC/assets/locations"
cp -R "$ASSETS_SRC/banners" "$SITE_PUBLIC/assets/banners"
cp -R "$ASSETS_SRC/covers" "$SITE_PUBLIC/assets/covers"
echo "  ✅ assets/{characters,locations,banners,covers}"

# 2) 同步 fonts
mkdir -p "$SITE_PUBLIC/fonts"
cp -f "$FONTS_SRC"/*.ttf "$SITE_PUBLIC/fonts/" 2>/dev/null || echo "  ⚠️  仓库根 public/fonts 为空,跳过"
echo "  ✅ fonts"

# 3) 同步 audio (没有音频就走占位)
mkdir -p "$SITE_PUBLIC/audio"
if [ -d "$AUDIO_SRC" ] && ls "$AUDIO_SRC"/*.mp3 1>/dev/null 2>&1; then
  cp "$AUDIO_SRC"/*.mp3 "$SITE_PUBLIC/audio/"
  echo "  ✅ audio"
else
  echo "  ⚠️  audio/ 还没有 mp3,故事详情页会走占位"
fi

# 4) 派生图片变体
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/characters" --widths=200,400,800
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/covers" --widths=400,800,1200 --quality=80
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/locations" --widths=400,800,1200 --quality=80
node "$(dirname "$0")/generate-image-variants.mjs" "$SITE_PUBLIC/assets/banners" --widths=800,1600 --quality=78

# 5) 生成资源内容 hash 映射表
node "$(dirname "$0")/generate-asset-hashes.mjs"

# 6) 扫描 audio/*.mp3 自动算时长,patch 进 episodes.ts
node "$(dirname "$0")/build-durations.mjs"

echo "✨ 同步完成"
