# Magic Academy · Site 规约

> 6 岁小橘子口述的睡前有声绘本系列 — 由爸爸做工程化，女儿做创意口述。

## 技术栈

- **Astro 7** — 静态站点框架
- **TypeScript** — 类型安全
- **原生 CSS** — `src/styles/shared.css`(OKLch tokens + 组件)
- **pinyin-pro** — 给汉字注音,产生 `<ruby>` 块
- **sharp** — 构建时给原图派生 200/400/800/1200 变体
- **mmx-cli** + `qiaopi_mengmei` 音色 — TTS 配音(**项目默认音色**)

## 默认配音音色

> **`qiaopi_mengmei`**(俏皮萌妹)— 全剧集统一使用,生动可爱适合 4 岁女童视角

新增集数配音时直接用这个:

```bash
mmx speech synthesize \
  --text-file ../stories/N-标题.md \
  --voice qiaopi_mengmei \
  --out ../audio/N-标题.mp3
```

## 开发命令

```bash
# 一键开发(自动 sync 资源 + 算 audio duration + 写 hash + 起 dev server)
npm run dev

# 一键构建(同上 + build)
npm run build

# 预览构建产物
npm run preview

# 单独跑资源同步(派生图片 + 写 hash + 算 audio 时长)
npm run sync
```

## 项目结构

```
site/
├── public/                 运行时静态(由 sync 脚本生成)
│   ├── assets/             角色/场景/封面/横幅
│   ├── audio/              配音 mp3
│   └── fonts/              3 个字魂书雅宋 TTF
├── src/
│   ├── layouts/Base.astro  全站布局
│   ├── components/         CharacterPortrait, AudioPlayer, CharacterModal
│   ├── data/               characters.ts, episodes.ts, scenes.ts, asset-url.ts
│   ├── pages/              5 个 .astro 路由(/, /home, /story-list, /story/{slug}, /characters, /scenes)
│   └── styles/shared.css   全站样式
├── scripts/
│   ├── sync-assets.sh
│   ├── generate-image-variants.mjs
│   ├── generate-asset-hashes.mjs
│   └── build-durations.mjs  # 扫 audio/*.mp3 自动算时长,patch episodes.ts 的 duration
└── dist/                   git ignore
```

## 数据契约

- `episodes.ts` 中 `slug` = markdown 文件名 = mp3 文件名 = cover 文件名
- markdown 在仓库根 `stories/{slug}.md`,build 时 `fs.readFileSync` 读取
- 音频在仓库根 `audio/{slug}.mp3`,sync 时拷到 `site/public/audio/`
- `episodes.ts` 中 `duration` 字段**不要手写**——跑 `npm run sync` 时 `build-durations.mjs` 会自动读 mp3 真实时长并 patch

## 命名约定

- 故事文件:`stories/N-标题.md`(如 `1-开学第一天.md`)
- 角色 id:拼音,如 `jingjing` `baozi` `aolia`
- CSS token:`--c-{name}`、`--s-{n}`、`--r-{name}`
