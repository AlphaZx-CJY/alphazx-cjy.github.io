// 数字分身聊天系统
class DigitalAvatar {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        
        this.knowledge = {
            identity: '软件工程师',
            location: '上海',
            currentWork: ['华为OD DevEco Studio 亮点特性开发', 'Vibe Coding 探索'],
            expertise: ['IDE工具链开发', 'AI应用', '低代码平台', '语音/姿态识别'],
            interests: ['编程', '地理', '将复杂的东西简单化'],
            characteristic: '喜欢地理，喜欢将复杂的东西简单化',
            education: {
                school: '杭州电子科技大学',
                major: '软件工程',
                period: '2015-2019'
            },
            experience: [
                {
                    company: '华为OD',
                    period: '2021至今',
                    location: '上海',
                    role: 'IDE亮点特性开发',
                    highlights: ['低代码平台', 'UI生成（安卓XML转鸿蒙）', '智慧化调优', 'UI意图识别']
                },
                {
                    company: '北京华宇软件',
                    period: '2019-2021',
                    projects: [
                        {
                            name: '语音识别系统',
                            tech: 'Kaldi',
                            features: ['自学习', '热词加载', '流式识别'],
                            deployment: '吉林市人民法院'
                        },
                        {
                            name: '姿态识别系统',
                            tech: 'STGCN + OpenPose',
                            scene: '监狱场景',
                            features: ['长时间举手', '下蹲', '站立', '摔倒', '殴打']
                        }
                    ]
                }
            ],
            projects: [],
            contact: {
                email: 'congjiye@outlook.com',
                github: 'github.com/AlphaZx-CJY',
                weixin: '15968182684',
                githubUrl: 'https://github.com/AlphaZx-CJY'
            }
        };
        
        this.init();
    }
    
    init() {
        // 发送按钮点击
        this.sendBtn.addEventListener('click', () => this.handleSend());
        
        // 回车发送
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });
        
        // 快捷问题
        this.quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.chatInput.value = question;
                this.handleSend();
            });
        });
    }
    
    handleSend() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        // 添加用户消息
        this.addUserMessage(message);
        this.chatInput.value = '';
        
        // 显示输入中
        this.showTyping();
        
        // 生成回复
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 800 + Math.random() * 500);
    }
    
    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message flex gap-3 justify-end';
        messageDiv.innerHTML = `
            <div class="bg-primary text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[80%] shadow-sm">
                <p class="text-sm leading-relaxed">${this.escapeHtml(text)}</p>
            </div>
            <div class="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex-shrink-0 flex items-center justify-center text-gray-600 dark:text-gray-300 text-sm font-bold">
                你
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    addBotMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'chat-message flex gap-3';
        messageDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                A
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 max-w-[80%] shadow-sm">
                <p class="text-gray-800 dark:text-gray-200 text-sm leading-relaxed">${text}</p>
            </div>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.scrollToBottom();
    }
    
    showTyping() {
        const typingDiv = document.createElement('div');
        typingDiv.id = 'typingIndicator';
        typingDiv.className = 'chat-message flex gap-3';
        typingDiv.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-primary flex-shrink-0 flex items-center justify-center text-white text-sm font-bold">
                A
            </div>
            <div class="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <div class="flex gap-1">
                    <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                    <div class="w-2 h-2 bg-gray-400 rounded-full typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(typingDiv);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) {
            typing.remove();
        }
    }
    
    generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        // 问候
        if (lowerMsg.includes('你好') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
            return '你好！很高兴见到你！我是 AlphaZx 的数字分身，有什么我可以帮你的吗？';
        }
        
        // 现在在做什么
        if (lowerMsg.includes('做什么') || lowerMsg.includes('在干') || lowerMsg.includes('工作')) {
            // 使用 GitHub 项目数据回答
            const projects = window.githubProjectsData;
            if (!projects || projects.length === 0) {
                return '我最近正在学习 Vibe Coding 和探索 AI 工具链开发。<br><br>你可以去我的 <a href="https://github.com/AlphaZx-CJY" target="_blank" class="text-primary hover:underline">GitHub 主页</a> 查看最新动态！';
            }
            const topProjects = projects.slice(0, 3);
            let response = '我最近在 GitHub 上维护着以下项目：<br><br>';
            topProjects.forEach((project, index) => {
                response += `${index + 1}. <strong>${project.name}</strong> (${project.stars} ⭐) - ${project.description}<br>`;
            });
            response += '<br>欢迎去 <a href="https://github.com/AlphaZx-CJY" target="_blank" class="text-primary hover:underline">GitHub</a> 查看更多详情！';
            return response;
        }
        
        // 联系方式
        if (lowerMsg.includes('联系') || lowerMsg.includes('邮箱') || lowerMsg.includes('怎么找')) {
            return `你可以通过以下方式联系我：<br><br>
            📧 邮箱：${this.knowledge.contact.email}<br>
            🐙 GitHub：${this.knowledge.contact.github}<br>
            💬 微信：${this.knowledge.contact.weixin}<br><br>
            欢迎随时交流！`;
        }
        
        // 作品/项目
        if (lowerMsg.includes('作品') || lowerMsg.includes('项目') || lowerMsg.includes('portfolio')) {
            // 使用 GitHub 项目数据，按 star 排序取前4个
            const projects = window.githubProjectsData;
            if (!projects || projects.length === 0) {
                return '暂时无法获取项目数据，请直接访问我的 <a href="https://github.com/AlphaZx-CJY" target="_blank" class="text-primary hover:underline">GitHub 主页</a> 查看所有项目。';
            }
            const topProjects = projects.slice(0, 4);
            let response = '我在 GitHub 上最受欢迎的 4 个项目：<br><br>';
            topProjects.forEach((project, index) => {
                const desc = project.description || project.desc || '暂无描述';
                response += `${index + 1}. <strong>${project.name}</strong> ⭐ ${project.stars} - ${desc}<br>`;
            });
            response += `<br><a href="${this.knowledge.contact.githubUrl}?tab=repositories" target="_blank" class="text-primary hover:underline">查看更多项目 →</a>`;
            return response;
        }
        
        // 技能/擅长
        if (lowerMsg.includes('擅长') || lowerMsg.includes('技能') || lowerMsg.includes('技术')) {
            return `我主要专注于${this.knowledge.expertise.join('、')}。目前正在深入研究LLM在开发工具中的应用，希望能做出真正提升开发者效率的工具。`;
        }
        
        // 兴趣
        if (lowerMsg.includes('兴趣') || lowerMsg.includes('爱好') || lowerMsg.includes('喜欢')) {
            return `我的兴趣爱好包括：${this.knowledge.interests.join('、')}。特别说一下，我很喜欢地理，平时会看地图、研究各个地方的文化和地理特征。另外，我特别喜欢把复杂的东西简单化，这也是我做产品的理念。`;
        }
        
        // 经历/工作经历/教育背景
        if (lowerMsg.includes('经历') || lowerMsg.includes('工作') || lowerMsg.includes('工作经历') || lowerMsg.includes('学历') || lowerMsg.includes('毕业') || lowerMsg.includes('上海')) {
            let response = '以下是我的个人经历：<br><br>';
            
            // 华为OD
            response += '<strong>💼 华为OD（2021 至今）· 上海</strong><br>';
            response += '负责 DevEco Studio 亮点特性开发：<br>';
            response += '• 低代码平台 — 可视化拖拽式 UI 构建<br>';
            response += '• UI 生成 — 安卓 XML 自动转换为鸿蒙页面<br>';
            response += '• 智慧化调优 — AI 分析调优数据，自动识别问题<br>';
            response += '• UI 意图识别 — 智能解析用户设计意图<br><br>';
            
            // 北京华宇
            response += '<strong>🏫 北京华宇软件（2019-2021）</strong><br>';
            response += '<em>语音识别项目</em>：基于 Kaldi 框架，支持自学习、热词加载、流式识别，在吉林市人民法院落地<br>';
            response += '<em>姿态识别项目</em>：监狱场景下危险动作检测，基于 STGCN + OpenPose，支持举手、下蹲、站立、摔倒、殴打等多姿态实时警报<br><br>';
            
            // 教育
            response += '<strong>🎓 杭州电子科技大学（2015-2019）</strong><br>';
            response += '软件工程专业 · 本科<br><br>';
            
            response += '目前工作地点：<strong>上海</strong>';
            return response;
        }
        
        // 华为/华宇/公司
        if (lowerMsg.includes('华为') || lowerMsg.includes('华宇') || lowerMsg.includes('公司') || lowerMsg.includes('职场')) {
            return '我的职业生涯从 2019 年毕业开始：<br><br><strong>华为 OD（2021 至今）· 上海</strong><br>在 DevEco Studio 团队负责亮点特性开发，包括低代码、UI生成、智慧化调优、UI意图识别等功能。<br><br><strong>北京华宇软件（2019-2021）</strong><br>做过语音识别和姿态识别两个 AI 项目，分别在法院和监狱场景落地应用。';
        }
        
        // 关于名字
        if (lowerMsg.includes('名字') || lowerMsg.includes('你是谁')) {
            return '我是 AlphaZx（丛继晔），一个正在努力学习Vibe Coding的码农。这个数字分身是我做的一个小实验，用来展示LLM应用的可能性。';
        }
        
        // 默认回复
        const defaultResponses = [
            '这是个有趣的问题！不过我还需要学习更多才能回答你。你可以问我关于我的项目、技能或者怎么联系我。',
            '嗯...这个问题有点超出我的知识范围了。不过我很乐意聊聊我现在在做的事情，或者我的项目作品！',
            '抱歉，我暂时还不能回答这个问题。你可以试试问我："你现在在做什么？"、"怎么联系你？"或者"你的作品有哪些？"'
        ];
        
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }
    
    scrollToBottom() {
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// 主题切换
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // 检查系统偏好
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
    });
}

// GitHub 项目加载类
class GitHubProjects {
    constructor(username) {
        this.username = username;
        this.container = document.getElementById('github-pinned-projects');
        this.init();
    }
    
    async init() {
        try {
            // 尝试获取 GitHub Pinned 项目
            let projects = await this.fetchPinnedRepos();
            if (!projects || projects.length === 0) {
                // 如果没有 pinned 项目，尝试获取最热门的仓库
                projects = await this.fetchTopRepos();
            }
            if (!projects || projects.length === 0) {
                throw new Error('未找到项目');
            }
            
            // 按 star 数排序，存储到全局供数字分身使用
            window.githubProjectsData = projects.sort((a, b) => b.stars - a.stars);
            
            this.renderProjects(projects);
        } catch (error) {
            console.log('加载 GitHub 项目失败:', error);
            window.githubProjectsData = null;
            this.renderError();
        }
    }
    
    // 显示错误状态
    renderError() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="col-span-1 sm:col-span-2 project-card rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 p-8 text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                    <i class="fas fa-exclamation-triangle text-2xl text-amber-500"></i>
                </div>
                <h3 class="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">获取项目失败</h3>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">无法加载 GitHub 项目，请检查网络后重试</p>
                <button onclick="window.githubProjects.retry()" class="inline-flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm transition-colors">
                    <i class="fas fa-redo"></i>
                    <span>重试</span>
                </button>
            </div>
        `;
    }
    
    // 重试方法
    retry() {
        if (!this.container) return;
        
        // 显示加载中状态
        this.container.innerHTML = `
            <div class="col-span-1 sm:col-span-2 project-card rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 p-8 text-center">
                <i class="fas fa-spinner fa-spin text-2xl text-primary/60"></i>
                <p class="mt-2 text-sm text-gray-500">加载中...</p>
            </div>
        `;
        
        // 重新初始化
        this.init();
    }
    
    // 尝试使用第三方 API 获取 pinned repos
    async fetchPinnedRepos() {
        try {
            // 使用一个支持 CORS 的服务获取 pinned repos
            const response = await fetch(`https://gh-pinned-repos.egoist.dev/?username=${this.username}`);
            if (!response.ok) throw new Error('获取失败');
            const data = await response.json();
            
            return data.map(repo => ({
                name: repo.repo,
                description: repo.description || '暂无描述',
                stars: repo.stars,
                language: repo.language || 'Unknown',
                languageColor: repo.languageColor || '#586069',
                updated_at: repo.created_at,
                html_url: `https://github.com/${this.username}/${repo.repo}`
            }));
        } catch (error) {
            console.log('获取 pinned repos 失败:', error);
            return null;
        }
    }
    
    // 使用 GitHub REST API 获取用户的顶部仓库
    async fetchTopRepos() {
        try {
            const response = await fetch(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=6`);
            if (!response.ok) throw new Error('获取失败');
            const data = await response.json();
            
            return data.map(repo => ({
                name: repo.name,
                description: repo.description || '暂无描述',
                stars: repo.stargazers_count,
                language: repo.language || 'Unknown',
                languageColor: this.getLanguageColor(repo.language),
                updated_at: repo.updated_at,
                html_url: repo.html_url
            }));
        } catch (error) {
            console.log('获取 repos 失败:', error);
            return null;
        }
    }
    
    // 获取编程语言颜色
    getLanguageColor(language) {
        const colors = {
            'TypeScript': '#3178c6',
            'JavaScript': '#f1e05a',
            'Python': '#3572A5',
            'Java': '#b07219',
            'C++': '#f34b7d',
            'C': '#555555',
            'Go': '#00ADD8',
            'Rust': '#dea584',
            'HTML': '#e34c26',
            'CSS': '#563d7c',
            'Vue': '#41b883',
            'React': '#61dafb',
            'Shell': '#89e051',
            'Unknown': '#586069'
        };
        return colors[language] || '#586069';
    }
    
    // 渲染项目卡片
    renderProjects(projects) {
        if (!this.container) return;
        
        // 只显示前4个项目
        const displayProjects = projects.slice(0, 4);
        
        this.container.innerHTML = displayProjects.map(project => `
            <div class="project-card rounded-xl overflow-hidden border border-gray-200/50 dark:border-gray-700/50 shadow-sm hover:shadow-md">
                <div class="p-4 sm:p-5">
                    <div class="flex justify-between items-start mb-2 sm:mb-3">
                        <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="text-sm sm:text-base font-bold truncate pr-2 hover:text-primary transition-colors" title="${project.name}">${project.name}</a>
                        <div class="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 flex-shrink-0">
                            <i class="fas fa-star text-yellow-500"></i>
                            <span>${project.stars}</span>
                        </div>
                    </div>
                    <p class="text-gray-600 dark:text-gray-400 mb-2 sm:mb-3 text-xs leading-relaxed line-clamp-2">${project.description}</p>
                    <div class="flex flex-wrap gap-1 mb-2 sm:mb-3">
                        <span class="px-2 py-0.5 bg-gray-100 dark:bg-gray-800 rounded-full text-xs flex items-center gap-1">
                            <span class="w-2 h-2 rounded-full" style="background-color: ${project.languageColor}"></span>
                            ${project.language}
                        </span>
                    </div>
                    <div class="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                        <span>${this.formatDate(project.updated_at)}</span>
                        <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="hover:bg-primary/10 dark:hover:bg-primary/20 hover:text-primary p-1 rounded transition-colors">
                            <i class="fas fa-external-link-alt mr-1"></i>查看
                        </a>
                    </div>
                </div>
            </div>
        `).join('');
    }
    
    // 格式化日期
    formatDate(dateString) {
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 7) {
            return `${diffDays} 天前`;
        } else if (diffDays <= 30) {
            return `${Math.floor(diffDays / 7)} 周前`;
        } else if (diffDays <= 365) {
            return `${Math.floor(diffDays / 30)} 个月前`;
        } else {
            return `${Math.floor(diffDays / 365)} 年前`;
        }
    }
}

// 显示微信号
function showWeixin() {
    const weixinModal = document.createElement('div');
    weixinModal.className = 'fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4';
    weixinModal.innerHTML = `
        <div class="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl transform transition-all scale-100">
            <div class="text-center">
                <div class="w-16 h-16 mx-auto mb-4 bg-green-500/10 rounded-full flex items-center justify-center">
                    <i class="fab fa-weixin text-3xl text-green-500"></i>
                </div>
                <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-gray-100">添加微信好友</h3>
                <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">扫码或搜索微信号添加好友</p>
                <div class="bg-gray-100 dark:bg-gray-700 rounded-xl p-4 mb-4">
                    <p class="text-2xl font-mono font-bold text-gray-800 dark:text-gray-200 tracking-wider">15968182684</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="w-full py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-colors">
                    知道了
                </button>
            </div>
        </div>
    `;
    weixinModal.addEventListener('click', (e) => {
        if (e.target === weixinModal) {
            weixinModal.remove();
        }
    });
    document.body.appendChild(weixinModal);
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new DigitalAvatar();
    initTheme();
    // 加载 GitHub 项目 - 修改为你的 GitHub 用户名
    window.githubProjects = new GitHubProjects('AlphaZx-CJY');
});