// 魔法学院 · 剧集数据
// 数据真值源: 仓库根 docs/系列设定.md + stories/{slug}.md
// 文件名约定: slug = N-标题.md / .mp3 / .jpg

import type { Character } from './characters';
import { characters } from './characters';

export type EpisodeStatus = 'online' | 'soon';

export interface Episode {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  duration: string;        // e.g. "约 8 分钟"
  status: EpisodeStatus;
  cover: string;           // '/assets/covers/1-开学第一天.jpg'
  audio?: string;          // '/audio/1-开学第一天.mp3'
  banner?: string;
  color: string;           // token key
  excerpt: string;         // 列表卡片摘要（控制在一到两句话，避免卡片过高）
  intro: string;           // 故事开篇一句话
  charactersInScene: string[];   // 角色 id 数组
  next?: { title: string; status: EpisodeStatus; slug: string };
}

const charMap = (id: string): Character => characters.find((c) => c.id === id)!;

export const episodes: Episode[] = [
  {
    slug: '1-开学第一天',
    number: 1,
    title: '第一集 开学第一天',
    subtitle: '晶晶和亮亮的开学日',
    duration: '约 11 分 33 秒',
    status: 'online',
    cover: '/assets/covers/第一集.jpg',
    audio: '/audio/1-开学第一天.mp3',
    banner: '/assets/banners/城堡玩耍.jpg',
    color: 'gold',
    excerpt: '晶晶和亮亮来到魔法岛上学第一天：影子会端粥，铅笔有名字，魔法课上晶晶变出了第一朵粉色小花。',
    intro: '我叫晶晶,今年四岁。今天,是我和姐姐亮亮去魔法学院上学的第一天!',
    charactersInScene: ['jingjing', 'liangliang', 'xiaotongtong', 'xiaobaozi', 'xiaotianxin', 'xiaotiandian', 'xiaohaimian', 'xiaoyueliang', 'xiaoyueguang', 'xiaoguangming', 'aolia', 'aolian', 'ailisi', 'taliya'],
    next: { title: '第二集 晴天娃娃不见了', status: 'soon', slug: '2-晴天娃娃不见了' },
  },
  {
    slug: '2-晴天娃娃不见了',
    number: 2,
    title: '第二集 晴天娃娃不见了',
    subtitle: '小天天的生日惊喜',
    duration: '约 14 分 16 秒',
    status: 'online',
    cover: '/assets/covers/第二集.jpg',
    audio: '/audio/2-晴天娃娃不见了.mp3',
    color: 'pink',
    excerpt: '晴天娃娃不见了，小天天哭得全城下雨。晶晶撑起水晶保护罩，亮亮把城堡照得亮堂堂——雨什么时候才会停呢？',
    intro: '今天是我在魔法学院上学的第二天。早上醒来，外面在下雨——可是昨天还是大晴天呀！',
    charactersInScene: ['jingjing', 'liangliang', 'xiaotiantian', 'xiaohaiyang', 'xiaotongtong', 'xiaotianxin', 'xiaotiandian', 'xiaohaimian', 'xiaokunchong', 'ailisi'],
    next: { title: '第三集 甜心娃娃不见了', status: 'online', slug: '3-甜心娃娃不见了' },
  },
  {
    slug: '3-甜心娃娃不见了',
    number: 3,
    title: '第三集 甜心娃娃不见了',
    subtitle: '小甜心的生日惊喜',
    duration: '约 14 分 26 秒',
    status: 'online',
    cover: '/assets/covers/第三集.jpg',
    audio: '/audio/3-甜心娃娃不见了.mp3',
    color: 'rose',
    excerpt: '甜心娃娃不见了，小甜心忍着不哭——可一滴眼泪掉下来，窗外的春天"唰"地变成了秋天。',
    intro: '我叫晶晶,今年四岁。今天是我在魔法学院上学的第三天。门缝底下,透进来一丝粉粉的光。',
    charactersInScene: ['jingjing', 'liangliang', 'xiaotianxin', 'xiaomeigui', 'xiaotiandian', 'xiaohaimian'],
    next: { title: '第四集 新同学茉茉', status: 'soon', slug: '4-新同学茉茉' },
  },
  {
    slug: '4-新同学茉茉',
    number: 4,
    title: '第四集 新同学茉茉',
    subtitle: '想家的新同桌',
    duration: '约 11 分 40 秒',
    status: 'online',
    cover: '/assets/covers/第四集.jpg',
    audio: '/audio/4-新同学茉茉.mp3',
    color: 'violet',
    excerpt: '新同学茉茉抱着独角兽玩偶小彩虹，一整天都不说话——她想家了。晚上，门缝透出一丝茉莉色的光。',
    intro: '我叫晶晶,今年四岁。今天是我在魔法学院上学的第四天。今天,我们班要来一个新同学!',
    charactersInScene: ['jingjing', 'liangliang', 'momo', 'xiaobaozi', 'xiaoman', 'xiaotongtong', 'xiaotianxin', 'xiaotiandian', 'xiaoguangming', 'xiaohaimian'],
    next: { title: '第五集 新同学安雨', status: 'online', slug: '5-新同学安雨' },
  },
  {
    slug: '5-新同学安雨',
    number: 5,
    title: '第五集 新同学安雨',
    subtitle: '严肃的龙女新同学',
    duration: '约 11 分 03 秒',
    status: 'online',
    cover: '/assets/covers/第五集.jpg',
    audio: '/audio/5-新同学安雨.mp3',
    color: 'red',
    excerpt: '新同学安雨是一板一眼的龙女："上学，不可以迟到。"老师送的龙珠魔杖一直在睡觉——它还没认出新家。',
    intro: '我叫晶晶,今年四岁。今天是我在魔法学院上学的第五天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaotaiyang', 'xiaokunchong', 'xiaobaozi', 'xiaohaimian', 'xiaoman'],
    next: { title: '第六集 魔杖醒了', status: 'online', slug: '6-魔杖醒了' },
  },
  {
    slug: '6-魔杖醒了',
    number: 6,
    title: '第六集 魔杖醒了',
    subtitle: '一起睡，一起亮',
    duration: '约 9 分 41 秒',
    status: 'online',
    cover: '/assets/covers/第六集.jpg',
    audio: '/audio/6-魔杖醒了.mp3',
    color: 'pink',
    excerpt: '清晨的花园里，两根睡觉的魔杖一起醒了，亮成茉莉色和红色。两个好朋友抱着娃娃，比了一个爱心。',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第六天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaobaozi', 'xiaotianxin', 'xiaotiandian', 'xiaotaiyang'],
    next: { title: '第七集 小太阳的生日', status: 'online', slug: '7-小太阳的生日' },
  },
  {
    slug: '7-小太阳的生日',
    number: 7,
    title: '第七集 小太阳的生日',
    subtitle: '小太阳的生日惊喜',
    duration: '约 10 分 38 秒',
    status: 'online',
    cover: '/assets/covers/第七集.jpg',
    audio: '/audio/7-小太阳的生日.mp3',
    color: 'yellow',
    excerpt: '小太阳过生日，大家保密做了一个太阳娃娃。包装魔法一激动，光球带着娃娃满教室飞！',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第七天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaotaiyang', 'xiaoguangming', 'xiaoan', 'xiaotiandian', 'xiaobaozi', 'xiaohaimian'],
    next: { title: '第八集 安雨的棍子', status: 'online', slug: '8-安雨的棍子' },
  },
  {
    slug: '8-安雨的棍子',
    number: 8,
    title: '第八集 安雨的棍子',
    subtitle: '棍子原来是支笛子',
    duration: '约 12 分 45 秒',
    status: 'online',
    cover: '/assets/covers/第八集.jpg',
    audio: '/audio/8-安雨的棍子.mp3',
    color: 'red',
    excerpt: '音乐课上，安雨的魔杖"咔"地变成一支红色小笛子。原来棍子不是坏掉了，棍子是想家了。',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第八天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaobaozi', 'xiaohaiyang', 'xiaotaiyang', 'xiaokunchong', 'xiaotianxin', 'xiaotiandian', 'xiaohaimian'],
    next: { title: '第九集 茉莉朵朵开', status: 'online', slug: '9-茉莉朵朵开' },
  },
  {
    slug: '9-茉莉朵朵开',
    number: 9,
    title: '第九集 茉莉朵朵开',
    subtitle: '茉茉的石头会开花',
    duration: '约 11 分 05 秒',
    status: 'online',
    cover: '/assets/covers/第九集.jpg',
    audio: '/audio/9-茉莉朵朵开.mp3',
    color: 'moon',
    excerpt: '半夜，石头魔杖自己滚出房间找石头，滚过的地方留下茉莉色的光。它要让石头开花——可是只认茉茉的声音。',
    intro: '我叫晶晶，今年四岁。现在，是我在魔法学院的……半夜。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaoman'],
    next: { title: '第十集 小彩虹醒了', status: 'online', slug: '10-小彩虹醒了' },
  },
  {
    slug: '10-小彩虹醒了',
    number: 10,
    title: '第十集 小彩虹醒了',
    subtitle: '一二三，木头人！',
    duration: '约 13 分 05 秒',
    status: 'online',
    cover: '/assets/covers/第十集.jpg',
    audio: '/audio/10-小彩虹醒了.mp3',
    color: 'gold',
    excerpt: '小彩虹好像活了！可是只要有人看，它就一动不动。影子说：它昨天半夜，在走廊里跑了三圈。',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第十天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaobaozi', 'xiaoman', 'xiaotianxin', 'xiaotiandian'],
    next: { title: '第十一集 魔法学院的小不点', status: 'online', slug: '11-魔法学院的小不点' },
  },
  {
    slug: '11-魔法学院的小不点',
    number: 11,
    title: '第十一集 魔法学院的小不点',
    subtitle: '点点自己来！',
    duration: '约 16 分 04 秒',
    status: 'online',
    cover: '/assets/covers/第十一集.jpg',
    audio: '/audio/11-魔法学院的小不点.mp3',
    color: 'sky',
    excerpt: '三岁的新同学点点，第一天上学就在走廊里走了一个小时。她的口头禅是："点点。自己来。"',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第十一天。',
    charactersInScene: ['jingjing', 'liangliang', 'diandian', 'anyu', 'momo', 'xiaobaozi', 'xiaoman', 'xiaohaimian', 'xiaotianxin', 'xiaotiandian'],
    next: { title: '第十二集 双胞胎来了', status: 'online', slug: '12-双胞胎来了' },
  },
  {
    slug: '12-双胞胎来了',
    number: 12,
    title: '第十二集 双胞胎来了',
    subtitle: '连在一起，也可以分开',
    duration: '约 16 分 08 秒',
    status: 'online',
    cover: '/assets/covers/第十二集.jpg',
    audio: '/audio/12-双胞胎来了.mp3',
    color: 'mint',
    excerpt: '双胞胎莉莉和阳阳来了！他们的魔法一人只有一半，可是桌子把他俩拼到了教室两头——还好有太阳徽章暗号。',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第十二天。',
    charactersInScene: ['jingjing', 'liangliang', 'lili', 'yangyang', 'anyu', 'momo', 'diandian', 'xiaobaozi', 'xiaoman', 'xiaohaimian', 'xiaotianxin', 'xiaotiandian'],
  },
];

// 工具
export function getEpisodeBySlug(slug: string): Episode | undefined {
  return episodes.find((e) => e.slug === slug);
}

export function getCharactersInScene(ep: Episode): Character[] {
  return ep.charactersInScene.map((id) => charMap(id)).filter(Boolean);
}

export const onlineEpisodes = episodes.filter((e) => e.status === 'online');
