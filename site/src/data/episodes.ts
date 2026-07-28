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
    excerpt: '一大早，安雨和茉茉在花园练习魔杖——石头魔杖"叮"地亮成茉莉色，龙珠魔杖"嗡"地亮成红色，两根魔杖真的一起睡、一起亮了！她们抱着各自的娃娃，比了一个爱心。可是，魔杖醒了，魔法是什么呢？中午，桌子又"咕噜咕噜"把她们俩拼到了一起；晚上，四个房间的门缝底下，透进来一丝粉色的光，比任何一次都粉、都亮。',
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
    excerpt: '今天是小太阳的生日！小光明要送她一个太阳娃娃，请大家一起保密。感知课上，晶晶心里"叮"地长出一颗小水晶，把蹦蹦跳跳的秘密封住了。安雨主做的太阳娃娃黄裙子、双马尾，和小太阳长得一模一样；小光明用光明魔法一裹——光球太激动，带着娃娃满教室飞，追得他头都要掉啦！下午，小甜点变出太阳蛋糕，还专门给小暗暗留了一块黑暗蛋糕。晚上，门缝底下透进来一丝金色的、暖暖的光。',
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
    excerpt: '音乐课上，安雨的龙珠魔杖"咔"地一声——龙嘴张开，魔杖变成了一支红色的小笛子！可是安雨把每个音都吹得端端正正，像背书一样，一片叶子都不动。直到她在花园里想起很远很远的家，吹出那首歪歪的龙族摇篮曲——喷泉跳起舞，影子排起队，连小甜心偷藏的甜甜圈都跳出来转圈圈。原来棍子不是坏掉了，棍子是想家了。',
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
    excerpt: '半夜，晶晶被"骨碌骨碌"的声音吵醒——茉茉的石头魔杖自己滚出了房间，滚过的地方留下一道茉莉色的光！晶晶敲墙叫起姐姐（敲墙暗号里可没有"快起床"），安雨早就穿戴整齐。孩子们跟着光走进半夜的花园，小满保安远远护送："放心，有我在！"石子路尽头，茉茉抱着小彩虹——原来魔杖要让石头开花，可是它只认茉茉的声音。晶晶扯着嗓子喊也没用，有些课，要自己上。直到茉茉说出那句最大声的话，整条石子路，茉莉朵朵开！',
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
    excerpt: '全宿舍睡过头，连"上学不可以迟到"的安雨都迟到了！茉茉说，小彩虹早上不在她怀里——它在窗台上，卷毛还乱了一撮。难道小彩虹活了？可是只要有人看，它就一动不动：瞪眼睛比赛输了，甜甜圈陷阱里的甜甜圈不见了，小甜心大喊"这次真的不是我！"影子说，它昨天半夜在走廊跑了三圈——它不怕影子，它怕人。傍晚的花园里，茉茉说出真心话，安雨吹起歪歪的摇篮曲，小彩虹终于站了起来，用金色的角轻轻碰了碰石头魔杖……晚上，晚安的队伍里，多了一声"叮"。',
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
    excerpt: '新同学点点只有三岁，是魔法学院最小最小的学生。她第一天上学就迟到了——不是她的错，对三岁的小朋友来说，这条走廊太长太长啦，全班一起出门去接她。晶晶抢着"我来我来"，点点只有一句口头禅："点点。自己来。"楼梯把台阶变矮，桌子变出小矮椅，餐台矮下一截，连甜甜圈都自己飞低——魔法学院会弯下腰来抱你。晚上，晚安的队伍第一次跑到第五间房，点点回敲了数不清的好多好多下——大家一致通过新暗号：好多好多下，就是"点点很开心"。',
    intro: '我叫晶晶，今年四岁。今天是我在魔法学院上学的第十一天。',
    charactersInScene: ['jingjing', 'liangliang', 'diandian', 'anyu', 'momo', 'xiaobaozi', 'xiaoman', 'xiaohaimian', 'xiaotianxin', 'xiaotiandian'],
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
