# 魔法学院 · 睡前有声绘本

> 创意来自 6 岁小橘子的睡前口述故事,爸爸整理成稿 + 工程化。

温柔的、4 岁女孩视角的睡前有声绘本系列。晶晶和亮亮是姐妹俩,也是故事的主角,她们在魔法学院里学魔法、交朋友、慢慢长大。

## 仓库结构

```
magic-academy/
├── assets/      原图(25 角色 + 13 场景 + 6 横幅 + 1 封面)
├── audio/       配音 mp3(qiaopi_mengmei 俏皮萌妹音色)
├── public/      字体源(字魂书雅宋 3 TTF)
├── stories/     故事正文 markdown
├── docs/        系列设定 + 原始口述
└── site/        Astro 7 静态站
    ├── src/
    │   ├── pages/      6 个路由
    │   ├── components/ CharacterPortrait
    │   ├── data/       characters + episodes + scenes + asset-url
    │   ├── layouts/    Base
    │   └── styles/     shared.css (OKLch tokens)
    └── scripts/    资源同步 + 派生
```

## 故事

| 集 | 标题 | 状态 |
|---|---|---|
| 1 | 第一集 开学第一天 | ✅ 已上线(qiaopi_mengmei 配音,11 分 33 秒) |
| 2-5 | 第二集 · 敬请期待 ... | ⏳ 占位 |

## 开发

```bash
cd site
npm install
npm run dev      # 一键开发(sync + astro dev)
npm run build    # 一键构建(产物在 site/dist/)
```

## 技术栈

- **Astro 7** 静态站
- **TypeScript** 类型安全
- **原生 CSS** OKLch tokens(暖金 + 粉蓝紫 + 米黄纸感)
- **pinyin-pro** 给汉字加 ruby 注音
- **sharp** 构建时给原图派生多档 + 真 ICO
- **mmx-cli** + `qiaopi_mengmei` 音色 TTS 配音

## License

本项目采用 **CC BY-NC-SA 4.0** 协议授权。

- **可**:分享、修改
- **需**:署名原作者(小橘子 · 口述 / Jiang Le 整理)、以相同协议共享
- **不可**:商业使用

详细条款见 [LICENSE](./LICENSE) 全文。
