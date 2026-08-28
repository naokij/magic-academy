# Magic Academy · 工作区规约

> 6 岁小橘子口述的睡前有声绘本系列 · 爸爸(Jiang Le)工程化。
> 这是全仓库唯一规约文件,覆盖内容真值源(仓库根)与工程化层(site/)。

## 这是什么

温柔、4 岁女孩视角的睡前有声绘本。主角晶晶(妹)/亮亮(姐)在魔法学院学魔法。
内容真值源在仓库根,`site/` 是把这些内容工程化成的 Astro 静态站,部署到 Cloudflare Pages(`magic-academy.pages.dev`)。
License: **CC BY-NC-SA 4.0**(署名小橘子口述 / Jiang Le 整理,非商业,相同协议共享)。

## 仓库布局

```
magic-academy/
├── assets/        原图真值源:characters/ locations/ banners/ covers/ episodes/(中文文件名;episodes=每集插图)
├── audio/         配音 mp3 真值源:{slug}.mp3
├── public/fonts/  猫啃网风雅宋真值源: display-song-bold.ttf (Bold, 400/700 共用)
├── stories/       故事正文 markdown 真值源:{slug}.md
├── docs/          系列设定.md(角色/世界观/魔法体系真值源)+ 原始设定.md
├── site/          Astro 7 静态站(部署 Cloudflare Pages: magic-academy.pages.dev)
│   ├── src/
│   │   ├── pages/      6 路由: / (跳转) /home /story-list /story/[slug] /characters /scenes
│   │   ├── components/ ResponsiveImage, CharacterPortrait
│   │   ├── data/       episodes.ts / characters.ts / scenes.ts / asset-url.ts / asset-hashes.json
│   │   ├── layouts/    Base.astro (全站布局 + 顶部导航)
│   │   └── styles/     shared.css (全站唯一,OKLch tokens)
│   ├── scripts/   sync-assets.sh + generate-image-variants / generate-asset-hashes / build-durations / asr+align-asr(字级时间戳)
│   ├── data/asr/  {slug}.aligned.json(字级时间戳,whisper+拼音对齐产出)
│   └── public/    sync 生成(见下"不要手改/不要提交"清单);logo/ 例外须入 git
└── .mimocode/     旧 mimo CLI 残留(publish-episode / count-chars),非主流程
```

**真值源 vs 派生产物**:仓库根的 `assets/ audio/ stories/ public/fonts/ docs/` 是人写的内容真值源;`site/public/{assets,audio,fonts}` 和 `site/src/data/asset-hashes.json`、`episodes.ts` 里的 `duration` 都是脚本派生产物。改内容改真值源,改完跑 sync。

## 开发命令(都在 `site/` 下跑)

```bash
cd site
npm install          # Node >= 22.12.0
npm run dev          # predev 自动 sync 资源 → astro dev --host
npm run build        # prebuild 自动 sync → astro build(产物 site/dist/)
npm run preview      # 预览构建产物
npm run sync         # 只跑资源同步,不启 dev server
```

`predev`/`prebuild` 钩子会自动调 `scripts/sync-assets.sh`,它做:复制+缩放原图 → 派生 JPG/WebP 多档 → 拷字体/音频 → 生成 `asset-hashes.json` → 扫 mp3 真实时长 patch `episodes.ts` 的 `duration`。**所以改了图/音频/故事后,dev 或 build 会自动同步,不用手动跑 sync。**

## 数据契约(改集数必读)

`site/src/data/episodes.ts` 里每个 episode:

- `slug` = `stories/{slug}.md` 文件名 = `audio/{slug}.mp3` 文件名
- `cover` 路径用**中文原图名**(如 `/assets/covers/第一集.jpg`),**不是** slug;slug 与封面文件名不一致是正常的
- `duration` 字段**不要手写**——`build-durations.mjs` 会读 mp3 真实时长覆盖它
- `status: 'online'` 才会在 `/story/{slug}` 生成路由(`getStaticPaths` 过滤);`'soon'` 是占位
- 角色 id 用拼音(如 `jingjing` `aolia` `ailisi`),对应 `characters.ts`;娃娃不进 `charactersInScene`(它们不是独立角色条目)
- `illustrations`(可选,第 16 集起):本集插图数组 `{ src: '/assets/episodes/画面名.jpg', caption }`,故事页正文后渲染"本集画面"画廊 + 点击 lightbox;封面仍是独立 `cover` 字段

发布上线:`status: 'soon'` → `'online'` → `npm run build` → commit → push。`.mimocode/command/publish-episode.md` 有半自动流程(注意该命令是跨项目通用的,里面提到的 `faries-vs-witch` / `website/` 路径不适用于本仓库,本仓库路径是 `site/src/data/episodes.ts`)。

**新增一集的完整发布清单(按序执行,每步完成再打勾):**

1. `stories/N-标题.md` 正文(遵守下方 markdown 写作规范)
2. 配音:`mmx speech synthesize` → `audio/N-标题.mp3`
3. 字级高亮:`site/scripts/asr.sh` + `align-asr.py` → `site/data/asr/{slug}.aligned.json`(对齐覆盖率应 100%)
4. 封面+插图:**用 jianying-image skill 直接生图**(第 16 集起;此前是只出提示词由用户手动生成)。命令:`/Users/jiangle/project/jianying-image-cli/.venv/bin/jianying-image generate --auth-dir /Users/jiangle/project/jianying-image-cli/auth -p "…" -o 输出.png -ref 参考图…`(auth-dir 必须显式传;输出固定 2048² PNG,用 `sips -s format jpeg --resampleWidth 1920` 转 JPG 入 `assets/`;**若输出只有 100 多 KB 且 source=viewport.screenshot,说明没抓到生成结果,原样重试即可**)。封面入 `assets/covers/第N集.jpg`(中文大写集数名,正方形 Q 版绘本风,画风锚定前集封面);每集另配 4–5 张剧情插图入 `assets/episodes/`(按画面内容取中文名,第 16 集起)。提示词经验(第 13/15/16 集踩坑确立):**不要写角色名**("小昆虫""小彩虹"这类名字会误导生图 AI),改用外观描述 + 参考图编号(`-ref` 顺序与提示词编号一一对应,关键特征点名强调"绝对不能丢");**场景必须给参考图**——`assets/locations/` 的锚点图(教室/花园/走廊/城堡全景等)大部分场景都有,提示词里要写清"场景=参考图N"(第 15 集曾漏给教室参考图);构图主体控制在 1–2 个,核心动作用短动词写清("站着、踮脚、举着、盖上");加一句"全画面只有这 N 个角色"防娃娃复制/路人乱入(背景毛绒玩具也算乱入——但注意教室锚点图里本身有的摆设不算);出图后**逐张目检**,参考图还原度不够就加强绑定重跑。第 16 集新增三条:①**场景锚点要写"造型/布局/配色严格保持参考图"**,否则 AI 会自己重画一版城堡;②**参考图里的人物会串脸**——用"茉茉抱小彩虹"当独角兽参考时,紫头发串到了姐姐头上,要写清"只要参考图N里的独角兽,不要里面的女孩";③**多角色同框必须锁身高关系**("两个6岁一样高、头顶同一水平线,3岁的只到肩膀")和**"玩偶抱在怀里,绝对不要站在地上"**,否则 AI 会把娃娃画成站在地上的小人;④**画风约束要先说**——"Q版水彩手绘平面插画,所有角色都是二维水彩手绘,绝对不要3D渲染/实物毛绒质感",否则玩偶会被画成毛绒实物(夜巡图曾因此返工);同尺寸玩偶排队要写"五个玩偶身高完全相同、头顶同一水平线",否则独角兽会被画得比娃娃大一圈。第 16 集终审返工再补两条:⑤**人形娃娃和动物玩偶同框会互相串**——甜心娃娃(人形)和甜甜(猫)同框时娃娃被画成了猫,要写清"它是人形娃娃,绝对不是猫/动物,没有猫耳朵没有尾巴";⑥**四足玩偶默认会被画成两腿站立的卡通人**——独角兽要写"四条腿着地走路,绝对不要两条腿站立,体型和其他娃娃一样小"
5. `episodes.ts`:新条目 `status:'online'` + 上一集 `next` 指向本集(`duration` 不手写,build 时脚本回写)
6. **同步检查 `characters.ts`**(易漏!):本集登场角色的 `power`/`bio` 是否落后于剧情——新魔法揭晓、魔杖新形态、新道具、新关系、弧线收拢都要补进对应角色条目(第 8/9 集曾漏更,后补 commit 76a59fd);**封面和插图里出现的图鉴人物,图要加进对应人物的 `portraits`**(纯玩偶出镜的图不挂,图鉴只有人类人物)
7. `docs/系列设定.md` 版本 +1:新魔法专节(4.x)+ 涉及角色行 + 3.x 相关条目 + 第六节沿革记录;未填的伏笔明确挂账
8. `npm run build` 验证:新路由生成、封面多档变体、音频同步、页数 +1
9. commit → push(git 操作每次都要先问用户)

## 不要手改 / 不要提交(gitignore)

这些是 sync 生成物,改了也会被覆盖,**真值源在仓库根**:

- `site/public/assets/` `site/public/audio/` `site/public/fonts/`
- `site/src/data/asset-hashes.json`(由 `generate-asset-hashes.mjs` 重写)
- `site/dist/` `site/.astro/` `.wrangler/` `.zcode/` `.playwright-cli/`
- `episodes.ts` 的 `duration` 字段

**例外:`site/public/logo/` 不在 ignore 列表**——8 个 logo/app-icon 是项目重要资产,必须入 git。

## 架构边界 / 编辑规则

- **路径别名**:`~/*` → `site/src/*`(tsconfig paths)。Vite `fs.allow: ['..']` 让 site 能 `fs.readFileSync` 读仓库根的 `stories/` `assets/` `audio/`。
- **故事详情页** `site/src/pages/story/[slug].astro`:build 时 `fs.readFileSync('../stories/{slug}.md')`,用 `pinyin-pro` 给每个汉字生成 `<ruby>` 注音。**不要把故事正文复制进 site**——真值源是根目录 markdown。
- **字级卡拉OK高亮**:故事页读 `site/data/asr/{slug}.aligned.json`(字级时间戳),`requestAnimationFrame` 驱动逐字高亮。该 json 由 `site/scripts/asr.sh`(whisper tiny 中文)+ `align-asr.py`(拼音空间 difflib 对齐,消解同音字 ASR 错误)产出。新增集数要做高亮,需先跑这两个脚本生成 aligned.json,否则页面降级为无高亮纯文本。
- **样式**:全站唯一 `site/src/styles/shared.css`,OKLch token(`--c-{name}` 颜色 / `--r-{name}` 圆角 / `--s-{n}` 间距)。display 字体用猫啃网风雅宋(本地 TTF),body 用系统黑体。新颜色优先复用已有 `--c-*`,不要硬编码十六进制。
- **缓存策略**:`site/public/_headers` 给 `/assets/ /audio/ /fonts/` 设 `immutable`。改了同名资源必须靠 `asset-hashes.json` 的 `?h=` query 换指纹——所以**改图后务必跑 sync 重生 hash**,否则 CDN 不刷新。

## 命名 / 用词约定

- 故事文件:`stories/N-标题.md`(如 `1-开学第一天.md`)
- 角色名用**简体规范字**;花园守护者统一写 **爱丽丝**(不是艾丽斯,见 git 历史 d029d32/980498a 全量改名)
- CSS token:`--c-{name}`(颜色,如 `--c-pink`)、`--r-{name}`(圆角)、`--s-{n}`(间距)

## 配音(TTS)

默认音色 **`qiaopi_mengmei`**(俏皮萌妹),全剧集统一。新增集数配音:

```bash
mmx speech synthesize --text-file ../stories/N-标题.md --voice qiaopi_mengmei --out ../audio/N-标题.mp3
```

## 故事 markdown 写作规范(`stories/N-标题.md`)

> 这些是 ASR 对齐 + 渲染的硬约束,违反会导致正文渲染截断或对齐失败。

- **段落分隔用空行**(`\n\n`)或 `---` 横线——两种都支持,`---` 会被自动视为场景分隔,不进 ASR ref_chars
- **可以用 markdown 加粗 `**xxx**`** —— `align-asr.py` 和 `[slug].astro` 都会自动剥离 `**` 标记,只保留中间文字
- **避免单星号 `*`**(markdown 斜体)—— `**` 会被剥离,但单 `*` 不会,会作为裸字符进入 ruby 渲染。例外:段首 `*` 会被整段过滤掉(被当成 markdown 强调列表项),所以更别用
- **不要用其他 markdown 语法**(标题/链接/列表/代码块/图片)——`[slug].astro` 只读取纯文本段落,不解析这些
- **段落里不要嵌入换行以外的空行嵌套**(`\n\n` 即可,`\n\n\n` 也 OK)
- 第一行必须是 `# N-标题`(标题行),后续行才进 ref_chars。如果标题含 `：`/`:` 标点会被剥掉
- 中文标点 + 全角符号都按标点处理(零时长紧贴前字,不会被高亮二分命中)
- **时长软预算**(第 16 集按 16 集实测重校):TTS 语速恒定 **≈4.25 字/秒(约 255 字/分钟,各集实测 4.19–4.37)**,换算:13 分钟≈3300 字、15 分钟≈3800 字、16 分钟≈4050 字、17 分钟≈4300 字。**常规集目标 14–16 分钟(约 3500–4100 字正文;近几集新常态均值约 16 分钟)**,重头集(新同学+大事件)可到 16–17 分钟,**17 分钟为上限**(第 15 集 17'03"/4327 字)——逼近上限要停下来审视是否注水。早期 1–10 集为 10–14 分钟档,仅供参考,不作为当前目标。写完对照自评

## 改敏感区域前先读

- 改角色/世界观/魔法体系 → 先读 `docs/系列设定.md`(v2 视觉锚定版,24 角色 + 12 场景已对图核对)
- 改故事详情页渲染/高亮 → 先读 `site/src/pages/story/[slug].astro` 顶部注释 + `site/scripts/align-asr.py` 顶部注释
- 改资源同步流程 → 先读 `site/scripts/sync-assets.sh`(原图缩放阈值:characters ≤2048,其余 ≤1920)
