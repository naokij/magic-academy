// 魔法学院 · 场景图鉴
// 数据真值源: 仓库根 docs/系列设定.md + assets/locations/

export type SceneZone = 'castle' | 'life' | 'outdoor' | 'special';

export interface Scene {
  id: string;
  name: string;
  zone: SceneZone;
  zoneLabel: string;
  desc: string;
  image: string;
  highlights: string[];   // 3 个视觉亮点
  odId: string;           // data-od-id
}

export const scenes: Scene[] = [
  // ========== 城堡类 ==========
  {
    id: 'castle-outside',
    name: '城堡外观',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '白塔蓝顶的法式新哥特城堡,尖塔的塔尖戳到云里面。两侧有喷泉,玫瑰花丛的拱门,晚上挂着弯月。晶晶和亮亮第一次远眺的地方。',
    image: '/assets/locations/城堡全景.jpg',
    highlights: ['白塔蓝顶', '两侧喷泉', '玫瑰花拱门'],
    odId: 'scene-castle-outside',
  },
  {
    id: 'castle-near',
    name: '城堡近景',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '近距离看到的城堡墙面,白色大理石 + 金色雕花栏杆 + 玫瑰花窗。',
    image: '/assets/locations/城堡近景.jpg',
    highlights: ['白色大理石', '金色雕花', '玫瑰花窗'],
    odId: 'scene-castle-near',
  },
  {
    id: 'staircase',
    name: '楼梯',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '白色大理石旋转楼梯,金色雕花栏杆。楼梯会自己移动,踩上去像坐小船一样晃悠悠。楼梯顶上挂着彩色三角旗,晚上会变成星空。',
    image: '/assets/locations/楼梯.jpg',
    highlights: ['会自己移动', '金色雕花栏杆', '彩色三角旗'],
    odId: 'scene-staircase',
  },
  {
    id: 'hallway',
    name: '走廊',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '法式哥特拱顶长廊,两侧是彩色玫瑰花窗,白色立柱,地面金色魔法纹路。阳光从花窗照进来变成粉色和蓝色的小光斑。',
    image: '/assets/locations/走廊.jpg',
    highlights: ['彩色玫瑰花窗', '金色魔法纹路', '粉色蓝色光斑'],
    odId: 'scene-hallway',
  },
  {
    id: 'living',
    name: '客厅',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '学院公共休息室。云朵沙发、水晶吊灯、彩色图书墙、学院盾徽、飘浮的抱枕、说话的水晶球。',
    image: '/assets/locations/客厅.jpg',
    highlights: ['云朵沙发', '水晶吊灯', '说话的水晶球'],
    odId: 'scene-living',
  },
  {
    id: 'classroom',
    name: '教室',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '白蓝金三色主调教室。蓝底金色星月画的天花板,金色水晶吊灯,白金色哥特椅(尖顶宝座),桌上摆着金色小尖帽(像巫师帽)和会说话的铅笔。',
    image: '/assets/locations/教室.jpg',
    highlights: ['星空天花板', '水晶吊灯', '金色小尖帽'],
    odId: 'scene-classroom',
  },
  {
    id: 'bedroom',
    name: '卧室',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '两张对称的白紫色公主床,中间只隔一面薄薄的墙。晶晶和亮亮的房间就在这里——晚上她们隔着墙敲暗号:一下平安、两下晚安、三下锻炼……',
    image: '/assets/locations/卧室.jpg',
    highlights: ['双人隔墙', '敲墙暗号', '公主床帐'],
    odId: 'scene-bedroom',
  },
  {
    id: 'wash',
    name: '洗手间',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '学院内的洗手间,干净整洁,有小海豚形状的水龙头。',
    image: '/assets/locations/洗手间.jpg',
    highlights: ['干净整洁', '小海豚水龙头'],
    odId: 'scene-wash',
  },
  {
    id: 'bath',
    name: '浴室',
    zone: 'castle',
    zoneLabel: '城堡',
    desc: '学院内的浴室,小朋友们洗澡的地方。',
    image: '/assets/locations/浴室.jpg',
    highlights: ['小朋友们专用', '暖暖的热水'],
    odId: 'scene-bath',
  },

  // ========== 生活区 ==========
  {
    id: 'cafeteria',
    name: '食堂',
    zone: 'life',
    zoneLabel: '生活区',
    desc: '学院里最最最厉害的地方!食堂的影子会自动飘起来帮忙拿东西,麦片粥会自己跑到碗里,餐桌会根据每个人的口味变出想吃的菜。',
    image: '/assets/locations/食堂.jpg',
    highlights: ['影子自动取餐', '麦片粥自己跑', '餐桌变出菜'],
    odId: 'scene-cafeteria',
  },
  {
    id: 'kitchen',
    name: '厨房',
    zone: 'life',
    zoneLabel: '生活区',
    desc: '真正的魔法厨房!岛台上彩色魔法锅正在变出食物,食物会自己飞起来,盘子飘在空中。小海绵阿姨和小甜点一起在这里做饭。',
    image: '/assets/locations/厨房.jpg',
    highlights: ['彩色魔法锅', '飘浮的盘子', '小甜点的舞台'],
    odId: 'scene-kitchen',
  },
  {
    id: 'playground',
    name: '操场',
    zone: 'outdoor',
    zoneLabel: '户外',
    desc: '城堡东侧的开阔操场,晴天户外练习魔法会撑起防光罩(像大帐篷)。晶晶在这里第一次感受到了一颗小光球,亮亮感受到了一朵小云。',
    image: '/assets/locations/操场.jpg',
    highlights: ['防光罩练习', '感知魔法', '阳光充足'],
    odId: 'scene-playground',
  },
  {
    id: 'garden',
    name: '花园',
    zone: 'outdoor',
    zoneLabel: '户外',
    desc: '城堡西侧的梦幻花园。花环拱门、悬垂水晶吊坠、百合玫瑰薰衣草、星光喷雾、学院石碑、魔法喷泉。小昆虫在这里送信、小玫瑰在这里比衣服谁更粉。',
    image: '/assets/locations/花园.jpg',
    highlights: ['花环拱门', '魔法喷泉', '学院石碑'],
    odId: 'scene-garden',
  },
];

export const zoneMap: Record<SceneZone, string> = {
  castle: '城堡类',
  life: '生活区',
  outdoor: '户外',
  special: '特殊',
};
