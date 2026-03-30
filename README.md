# AlphaZx 个人主页

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Live-brightgreen)](https://alphazx-cjy.github.io)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> 丛继晔的个人主页 - 展示工作经历、项目作品与数字分身聊天系统

🔗 **在线访问**: [https://alphazx-cjy.github.io](https://alphazx-cjy.github.io)

![预览](https://via.placeholder.com/800x400/15CE58/ffffff?text=AlphaZx+Portfolio)

## ✨ 特性

- 🎨 **现代化设计** - 简约风格，支持深色/浅色模式切换
- 📱 **响应式布局** - 完美适配桌面、平板和移动设备
- 🤖 **数字分身** - 智能聊天系统，基于 GitHub 数据实时回答访客问题
- 🔗 **GitHub 集成** - 自动获取和展示 Pinned 项目
- 🧊 **毛玻璃效果** - 精致的视觉体验
- ⚡ **纯前端实现** - 无需后端服务，GitHub Pages 直接部署

## 🛠️ 技术栈

- **HTML5** + **Tailwind CSS** - 页面结构与样式
- **Vanilla JavaScript** - 交互逻辑
- **GitHub API** - 动态获取项目数据
- **Font Awesome** - 图标库

## 📂 项目结构

```
.
├── index.html          # 主页面
├── app.js              # 交互逻辑与数字分身
├── CNAME               # 自定义域名配置
└── README.md           # 项目说明
```

## 🚀 快速开始

### 1. 克隆仓库

```bash
git clone https://github.com/AlphaZx-CJY/alphazx-cjy.github.io.git
cd alphazx-cjy.github.io
```

### 2. 本地预览

直接使用浏览器打开 `index.html`，或使用任意静态服务器：

```bash
# 使用 Python 简单 HTTP 服务器
python3 -m http.server 8000

# 或使用 Node.js 的 serve
npx serve .
```

访问 `http://localhost:8000` 查看效果。

### 3. 部署到 GitHub Pages

1. Fork 本仓库
2. 进入仓库 **Settings** → **Pages**
3. Source 选择 **Deploy from a branch**，分支选择 `main`
4. 保存后等待几分钟，访问 `https://你的用户名.github.io`

## 📝 个性化配置

### 修改个人信息

编辑 `index.html` 中的以下内容：

```html
<!-- 标题 -->
<title>AlphaZx - 丛继晔 | 个人主页</title>

<!-- 个人简介 -->
<h1>AlphaZx</h1>
<p>丛继晔</p>

<!-- 联系方式 -->
<a href="mailto:congjiye@outlook.com">...</a>
<a href="https://github.com/AlphaZx-CJY">...</a>
```

### 修改 GitHub 用户名

编辑 `app.js` 第 448 行：

```javascript
window.githubProjects = new GitHubProjects('你的GitHub用户名');
```

### 修改数字分身知识库

编辑 `app.js` 中的 `knowledge` 对象：

```javascript
this.knowledge = {
    identity: '软件工程师',
    location: '上海',
    // ... 其他信息
};
```

## 🔧 功能说明

### GitHub 项目展示

- 自动获取用户的 Pinned Repositories
- 按 Star 数排序，最多展示 4 个项目
- 获取失败时显示重试按钮
- 项目名称可点击跳转

### 数字分身聊天

支持回答以下类型问题：

| 问题类型 | 示例 |
|---------|------|
| 个人介绍 | "你是谁"、"叫什么名字" |
| 工作经历 | "工作经历"、"在做什么"、"公司" |
| 项目作品 | "有哪些作品"、"项目" |
| 联系方式 | "怎么联系"、"邮箱"、"微信" |
| 技能特长 | "擅长什么"、"技术栈" |

## 📄 关于我

我是丛继晔，一名软件工程师，目前在上海工作。

### 工作经历

- **华为 OD** (2021-至今) · 上海  
  DevEco Studio 亮点特性开发：低代码平台、UI 生成、智慧化调优、UI 意图识别

- **北京华宇软件** (2019-2021)  
  - 语音识别项目：基于 Kaldi 框架，吉林市人民法院落地
  - 姿态识别项目：基于 STGCN + OpenPose，监狱场景多姿态检测

- **杭州电子科技大学** (2015-2019)  
  软件工程专业

## 📮 联系方式

- 📧 邮箱：[congjiye@outlook.com](mailto:congjiye@outlook.com)
- 💬 微信：15968182684
- 🐙 GitHub：[AlphaZx-CJY](https://github.com/AlphaZx-CJY)

## 📜 License

MIT License © 2026 AlphaZx (丛继晔)

---

> 🚀 Built with Vibe Coding
