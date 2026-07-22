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
  excerpt: string;         // 列表卡片摘要
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
    excerpt: '晶晶和亮亮都是初级班新生 —— 姐妹俩刚来到魔法岛,兴奋得不行。台风「断剑」吹走了防护罩,四个守护者在守护小岛。食堂的影子会漂浮,午睡醒来老师发了点心,然后是魔法课。',
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
    excerpt: '早上醒来，外面在下雨——可是昨天还是大晴天呀！姐姐指着雨说："这个颜色，和昨晚走廊的蓝光一模一样。" 我们去找那个"下雨的人"——原来是小天天。晶晶伸出手指，"叮"的一声，撑起了水晶保护罩；亮亮举起星星法杖，把城堡照得亮堂堂。可是雨还是一直下。晴天娃娃到底去哪了呢？',
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
    excerpt: '门缝底下透进来一丝粉粉的光——是小甜心,她的甜心娃娃不见了。她忍着不哭,可一滴眼泪掉下来,窗外的春天"唰"地变成了秋天。晶晶和亮亮一边保密,一边用黑黑和奶 ki 的魔法赶工超大礼物盒——因为明天,是小甜心的生日。',
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
    excerpt: '班里来了新同学茉茉——紫罗兰色双马尾,抱着独角兽玩偶小彩虹。晶晶选她做新同桌,桌子们"咕噜咕噜"自己挪出位置。可是茉茉想家了,一整天都不说话……直到小甜心偷吃甜甜圈被抓包:"我就看看,不吃。"晚上,茉茉房间的门缝底下,透出一丝茉莉色的光。',
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
    excerpt: '班里又来了新同学——安雨,红棕色双马尾,头上有金色小龙角,身后还有一条长长的龙尾巴。她五岁就一板一眼:"上学,不可以迟到。"防光罩下,她展开红金色的龙族之翼;食堂里,小海绵阿姨特地做了加麦片的龙粮。小包子老师送她龙珠魔杖,可魔杖呼噜呼噜一直在睡觉——它还没认出这里是新家。晚上,门缝底下透进来一丝红色的微光。',
    intro: '我叫晶晶,今年四岁。今天是我在魔法学院上学的第五天。',
    charactersInScene: ['jingjing', 'liangliang', 'anyu', 'momo', 'xiaotaiyang', 'xiaokunchong', 'xiaobaozi', 'xiaohaimian', 'xiaoman'],
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
