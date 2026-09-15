# WANG Bingqi — Portfolio Website

**Computational Architectural Designer**

---

## 🌐 访问地址

| URL | 说明 |
|-----|------|
| `https://miki2022.eu.org` | 当前正式访问域名 |
| `https://studio.miki2022.eu.org` | Studio / 研究笔记站 |
| `https://wangbingqi.eu.org` | ⏳ 备用自定义域名（nic.eu.org 审核中） |

---

## 🚀 更新网站流程

1. 本地编辑 `src/` 下的代码
2. 构建：`npm --prefix "E:\Code\项目1-作品集网站" run build`
3. 打开 [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **wang-bingqi-portfolio** → **Upload assets**
4. 把 `dist\` 文件夹直接拖进去 → **Deploy**
5. 几秒后全球生效 ✅

> 不需要本地跑服务器，网站托管在 Cloudflare 全球 CDN，免费无限流量。

---

## 🔧 本地开发

```bash
cd "E:\Code\项目1-作品集网站"

# 安装依赖（仅首次）
npm install

# 启动开发服务器（热更新）
npm run dev
# → http://localhost:5173

# 构建生产版本
npm run build
# → dist/
```

---

## 📂 项目结构

```
E:\Code\项目1-作品集网站\
├── public/assets/           ← 网站图片（49 张，已优化为 webp/jpg）
│   ├── portrait-bw.webp         # 黑白自拍
│   ├── hero1.webp               # 首屏封面
│   ├── award-second-prize.webp  # 综合二等奖奖状
│   ├── award-wind-art.webp      # 风动艺术奖奖状
│   ├── maritime*.webp           # 大连海事博物馆
│   ├── theater*.webp            # 法兰克福临时剧场
│   ├── feather*.webp            # 浮羽亭
│   ├── bionic*.webp             # 仿生人类交流中心
│   ├── housing*.webp            # 华富邨社区中心
│   ├── thesis-*.webp / digifab-*.webp / kfs*.webp
│   └── zou-jingyu.jpg / zheng-hao.jpg / li-dexin.jpg   # 导师照片
├── src/
│   ├── App.tsx                  # 分节骨架（01–05）+ 滚动淡入
│   ├── index.css                # Tailwind 4 @theme 设计变量
│   ├── i18n/                    # 三语文本 en / zh-cn / zh-tw
│   └── components/              # 网页组件
│       ├── Hero.tsx             # 首屏封面
│       ├── Navbar.tsx           # 导航栏
│       ├── LangSwitcher.tsx     # 语言切换
│       ├── About.tsx            # 个人简介
│       ├── Projects.tsx         # 作品展示（gooood 风格全宽瀑布流）
│       ├── CV.tsx               # 履历时间线 + 荣誉（可展开证书/导师）
│       ├── Skills.tsx           # 技能标签
│       ├── Contact.tsx          # 联系方式
│       └── Footer.tsx           # 页脚
├── wang-bingqi-studio/      ← Studio 笔记子站（Astro + Decap CMS）
├── cache/                   ← 扔待处理项目素材，AI 处理完清空（已 gitignore）
├── miki的获奖图片/           # 原始获奖证书
├── miki的照片/               # 原始自拍
├── WANG Bingqi_CV.pdf       # 简历
├── WANG Bingqi_作品集.pdf    # 作品集
└── dist/                    # 构建产物（上传这个到 Cloudflare Pages，已 gitignore）
```

---

## 📝 账号信息

> ⚠️ 为避免泄露，本文件不再存放明文密码。
> 完整凭据见本地归档：`E:\DATA\Workbuddy储存\2026-09-01-14-40-57\.workbuddy\memory\imported-reasonix-global\wang-bingqi-accounts.md`

| 服务 | 备注 |
|------|------|
| nic.eu.org | 域名注册（handle `WB770-FREE`，密码见上归档） |
| Cloudflare | 托管 + DNS（账号 mikidaren@gmail.com） |
| Cloudflare Pages | 项目名 `wang-bingqi-portfolio` / `wang-bingqi-studio` |

---

## 🎨 设计风格

- **暗黑/粗野主义**（Hernan Diaz Alonso 风格）
- **gooood.cn 全宽瀑布流**项目展示
- 黑底 + 高对比度 + 粗体无衬线字体 + 克制动效

---

## 🧠 AI 记忆

用户长期档案已从 Reasonix 迁移至 WorkBuddy（2026-09-01），后续 AI 对话自动加载：

- **全局归档**：`E:\DATA\Workbuddy储存\2026-09-01-14-40-57\.workbuddy\memory\imported-reasonix-global\`
  （用户档案 `wang-bingqi-profile`、账号清单、分析人设、论文检索资源）
- **项目内笔记**：`.workbuddy/memory/`（按日工作日志 + 项目长期约定）
