// AlphaZx - Clean & Minimal Portfolio

// 手动指定项目的在线访问地址（仓库名 -> URL）
// 当 GitHub API 未返回 homepage 或需要覆盖时生效
const PROJECT_URLS = {
    // 示例：'my-project': 'https://my-project.vercel.app',
};

// 节流工具函数
function throttle(fn, wait) {
    let lastTime = 0;
    return function(...args) {
        const now = Date.now();
        if (now - lastTime >= wait) {
            lastTime = now;
            fn.apply(this, args);
        }
    };
}

// 带超时的 fetch 封装
async function fetchWithTimeout(url, options = {}, timeout = 5000) {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
        const response = await fetch(url, { ...options, signal: controller.signal });
        clearTimeout(id);
        return response;
    } catch (error) {
        clearTimeout(id);
        throw error;
    }
}

// 数字分身聊天系统
class DigitalAvatar {
    constructor() {
        this.chatWindow = document.getElementById('chatWindow');
        this.chatFloatBtn = document.getElementById('chatFloatBtn');
        this.chatCloseBtn = document.getElementById('chatCloseBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickQuestions = document.querySelectorAll('.quick-q');
        this.isOpen = false;
        
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
        this.chatFloatBtn.addEventListener('click', () => this.toggleChat());
        this.chatCloseBtn.addEventListener('click', () => this.closeChat());
        
        document.addEventListener('click', (e) => {
            if (this.isOpen && 
                !this.chatWindow.contains(e.target) && 
                !this.chatFloatBtn.contains(e.target)) {
                this.closeChat();
            }
        });
        
        this.sendBtn.addEventListener('click', () => this.handleSend());
        
        this.chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleSend();
            }
        });
        
        this.quickQuestions.forEach(btn => {
            btn.addEventListener('click', () => {
                const question = btn.dataset.question;
                this.chatInput.value = question;
                this.handleSend();
            });
        });
    }
    
    toggleChat() {
        this.isOpen ? this.closeChat() : this.openChat();
    }
    
    openChat() {
        this.isOpen = true;
        this.chatWindow.classList.add('open');
        this.chatInput.focus();
    }
    
    closeChat() {
        this.isOpen = false;
        this.chatWindow.classList.remove('open');
    }
    
    handleSend() {
        const message = this.chatInput.value.trim();
        if (!message) return;
        
        this.addUserMessage(message);
        this.chatInput.value = '';
        this.showTyping();
        
        setTimeout(() => {
            this.hideTyping();
            const response = this.generateResponse(message);
            this.addBotMessage(response);
        }, 600 + Math.random() * 400);
    }
    
    addUserMessage(text) {
        const div = document.createElement('div');
        div.className = 'message message-user';
        div.innerHTML = `
            <div class="message-avatar message-avatar-user">你</div>
            <div class="message-content message-content-user">${this.escapeHtml(text)}</div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }
    
    addBotMessage(text) {
        const div = document.createElement('div');
        div.className = 'message';
        div.innerHTML = `
            <div class="message-avatar message-avatar-bot">A</div>
            <div class="message-content message-content-bot">${text}</div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }
    
    showTyping() {
        const div = document.createElement('div');
        div.id = 'typingIndicator';
        div.className = 'message';
        div.innerHTML = `
            <div class="message-avatar message-avatar-bot">A</div>
            <div class="message-content message-content-bot">
                <div class="typing-indicator">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        this.chatMessages.appendChild(div);
        this.scrollToBottom();
    }
    
    hideTyping() {
        const typing = document.getElementById('typingIndicator');
        if (typing) typing.remove();
    }
    
    generateResponse(message) {
        const lowerMsg = message.toLowerCase();
        
        if (lowerMsg.includes('你好') || lowerMsg.includes('hi') || lowerMsg.includes('hello')) {
            return '你好！很高兴见到你！我是 AlphaZx 的数字分身，有什么我可以帮你的吗？';
        }
        
        if (lowerMsg.includes('做什么') || lowerMsg.includes('在干') || lowerMsg.includes('工作')) {
            const projects = window.githubProjectsData;
            if (!projects || projects.length === 0) {
                return '我最近正在学习 Vibe Coding 和探索 AI 工具链开发。<br><br>你可以去我的 <a href="https://github.com/AlphaZx-CJY" target="_blank" style="color: var(--text); font-weight: 500;">GitHub 主页</a> 查看最新动态！';
            }
            const topProjects = projects.slice(0, 3);
            let response = '我最近在 GitHub 上维护着以下项目：<br><br>';
            topProjects.forEach((project, index) => {
                const homepageLink = project.homepage
                    ? ` <a href="${project.homepage}" target="_blank" style="color: var(--text); font-weight: 500; font-size: 0.75rem;">[访问]</a>`
                    : '';
                response += `${index + 1}. <strong>${project.name}</strong> (${project.stars} ⭐) - ${project.description}${homepageLink}<br>`;
            });
            response += '<br>欢迎去 <a href="https://github.com/AlphaZx-CJY" target="_blank" style="color: var(--text); font-weight: 500;">GitHub</a> 查看更多详情！';
            return response;
        }
        
        if (lowerMsg.includes('联系') || lowerMsg.includes('邮箱') || lowerMsg.includes('怎么找')) {
            return `你可以通过以下方式联系我：<br><br>
            📧 邮箱：${this.knowledge.contact.email}<br>
            🐙 GitHub：${this.knowledge.contact.github}<br>
            💬 微信：${this.knowledge.contact.weixin}<br><br>
            欢迎随时交流！`;
        }
        
        if (lowerMsg.includes('作品') || lowerMsg.includes('项目') || lowerMsg.includes('portfolio')) {
            const projects = window.githubProjectsData;
            if (!projects || projects.length === 0) {
                return '暂时无法获取项目数据，请直接访问我的 <a href="https://github.com/AlphaZx-CJY" target="_blank" style="color: var(--text); font-weight: 500;">GitHub 主页</a> 查看所有项目。';
            }
            const topProjects = projects.slice(0, 4);
            let response = '我在 GitHub 上最受欢迎的 4 个项目：<br><br>';
            topProjects.forEach((project, index) => {
                const desc = project.description || project.desc || '暂无描述';
                const homepageLink = project.homepage
                    ? ` <a href="${project.homepage}" target="_blank" style="color: var(--text); font-weight: 500; font-size: 0.75rem;">[访问]</a>`
                    : '';
                response += `${index + 1}. <strong>${project.name}</strong> ⭐ ${project.stars} - ${desc}${homepageLink}<br>`;
            });
            response += `<br><a href="${this.knowledge.contact.githubUrl}?tab=repositories" target="_blank" style="color: var(--text); font-weight: 500;">查看更多项目 →</a>`;
            return response;
        }
        
        if (lowerMsg.includes('擅长') || lowerMsg.includes('技能') || lowerMsg.includes('技术')) {
            return `我主要专注于${this.knowledge.expertise.join('、')}。目前正在深入研究LLM在开发工具中的应用，希望能做出真正提升开发者效率的工具。`;
        }
        
        if (lowerMsg.includes('兴趣') || lowerMsg.includes('爱好') || lowerMsg.includes('喜欢')) {
            return `我的兴趣爱好包括：${this.knowledge.interests.join('、')}。特别说一下，我很喜欢地理，平时会看地图、研究各个地方的文化和地理特征。另外，我特别喜欢把复杂的东西简单化，这也是我做产品的理念。`;
        }
        
        if (lowerMsg.includes('经历') || lowerMsg.includes('工作') || lowerMsg.includes('工作经历') || lowerMsg.includes('学历') || lowerMsg.includes('毕业') || lowerMsg.includes('上海')) {
            let response = '以下是我的个人经历：<br><br>';
            
            response += '<strong>💼 华为OD（2021 至今）· 上海</strong><br>';
            response += '负责 DevEco Studio 亮点特性开发：<br>';
            response += '• 低代码平台 — 可视化拖拽式 UI 构建<br>';
            response += '• UI 生成 — 安卓 XML 自动转换为鸿蒙页面<br>';
            response += '• 智慧化调优 — AI 分析调优数据，自动识别问题<br>';
            response += '• UI 意图识别 — 智能解析用户设计意图<br><br>';
            
            response += '<strong>🏫 北京华宇软件（2019-2021）</strong><br>';
            response += '<em>语音识别项目</em>：基于 Kaldi 框架，支持自学习、热词加载、流式识别，在吉林市人民法院落地<br>';
            response += '<em>姿态识别项目</em>：监狱场景下危险动作检测，基于 STGCN + OpenPose，支持举手、下蹲、站立、摔倒、殴打等多姿态实时警报<br><br>';
            
            response += '<strong>🎓 杭州电子科技大学（2015-2019）</strong><br>';
            response += '软件工程专业 · 本科<br><br>';
            
            response += '目前工作地点：<strong>上海</strong>';
            return response;
        }
        
        if (lowerMsg.includes('华为') || lowerMsg.includes('华宇') || lowerMsg.includes('公司') || lowerMsg.includes('职场')) {
            return '我的职业生涯从 2019 年毕业开始：<br><br><strong>华为 OD（2021 至今）· 上海</strong><br>在 DevEco Studio 团队负责亮点特性开发，包括低代码、UI生成、智慧化调优、UI意图识别等功能。<br><br><strong>北京华宇软件（2019-2021）</strong><br>做过语音识别和姿态识别两个 AI 项目，分别在法院和监狱场景落地应用。';
        }
        
        if (lowerMsg.includes('名字') || lowerMsg.includes('你是谁')) {
            return '我是 AlphaZx（丛继晔），一个正在努力学习Vibe Coding的码农。这个数字分身是我做的一个小实验，用来展示LLM应用的可能性。';
        }
        
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
    
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        html.classList.add('dark');
    }
    
    themeToggle.addEventListener('click', () => {
        html.classList.toggle('dark');
        window.dispatchEvent(new Event('themechange'));
    });
}

// 滚动显示动画
function initReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// 返回顶部功能（整合到 FAB）
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (!backToTopBtn) return;
    
    const handleScroll = throttle(() => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    }, 100);
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// GitHub 贡献热力图 - 使用 GitHub 官方 SVG
class GitHubContributions {
    constructor(username) {
        this.username = username;
        this.container = document.getElementById('github-contributions');
        this.totalElement = document.getElementById('contribution-total');
        this.isDark = document.documentElement.classList.contains('dark');
        this.init();
    }
    
    init() {
        this.renderChart();
        this.observeThemeChange();
    }
    
    // 监听主题变化事件，自动切换热力图颜色
    observeThemeChange() {
        window.addEventListener('themechange', () => {
            const isDark = document.documentElement.classList.contains('dark');
            if (this.isDark !== isDark) {
                this.isDark = isDark;
                this.renderChart();
            }
        });
    }
    
    // 获取热力图颜色主题
    getTheme() {
        return this.isDark ? 'github-dark' : 'github';
    }
    
    renderChart() {
        if (!this.container) return;
        
        const theme = this.getTheme();
        
        this.container.innerHTML = `
            <a href="https://github.com/${this.username}" target="_blank" rel="noopener noreferrer" 
               class="github-chart-link block w-full overflow-x-auto">
                <img 
                    src="https://ghchart.rshah.org/${theme}/${this.username}" 
                    alt="GitHub Contributions" 
                    class="github-chart-img"
                    loading="lazy"
                    onerror="this.parentElement.innerHTML='<div style=\\'text-align: center; padding: 1.5rem 0; color: var(--text-muted); font-size: 0.875rem;\\'>无法加载贡献数据<br><a href=\\'https://github.com/${this.username}\\' target=\\'_blank\\' style=\\'color: var(--text); font-weight: 500;\\'>查看 GitHub 主页</a></div>'"
                />
            </a>
        `;
        
        // 隐藏总贡献数（因为SVG不暴露这个数据）
        if (this.totalElement) {
            this.totalElement.style.display = 'none';
        }
    }
}

// GitHub 项目加载
class GitHubProjects {
    constructor(username) {
        this.username = username;
        this.container = document.getElementById('github-pinned-projects');
        this.init();
    }
    
    async init() {
        try {
            let projects = await this.fetchPinnedRepos();
            if (!projects || projects.length === 0) {
                projects = await this.fetchTopRepos();
            }
            if (!projects || projects.length === 0) {
                throw new Error('未找到项目');
            }

            // 合并手动指定的在线访问地址
            projects = projects.map(project => {
                const manualUrl = PROJECT_URLS[project.name];
                if (manualUrl) {
                    project.homepage = manualUrl;
                }
                return project;
            });

            window.githubProjectsData = projects.sort((a, b) => b.stars - a.stars);
            this.renderProjects(projects);
        } catch (error) {
            console.log('加载 GitHub 项目失败:', error);
            window.githubProjectsData = null;
            this.renderError();
        }
    }
    
    renderError() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="project-card" style="text-align: center; min-height: 180px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="width: 48px; height: 48px; border-radius: 50%; background: var(--bg-subtle); display: flex; align-items: center; justify-content: center; margin-bottom: 1rem; color: var(--text-muted);">
                    <i class="fas fa-exclamation-triangle"></i>
                </div>
                <h3 style="font-size: 1rem; font-weight: 600; color: var(--text); margin-bottom: 0.375rem;">获取项目失败</h3>
                <p style="font-size: 0.875rem; color: var(--text-muted); margin-bottom: 1.25rem;">无法加载 GitHub 项目，请检查网络后重试</p>
                <button onclick="window.githubProjects.retry()" class="btn btn-primary">
                    <i class="fas fa-redo text-xs"></i>
                    重试
                </button>
            </div>
        `;
    }
    
    retry() {
        if (!this.container) return;
        
        this.container.innerHTML = `
            <div class="project-card" style="display: flex; align-items: center; justify-content: center; min-height: 180px; color: var(--text-muted);">
                <div style="text-align: center;">
                    <i class="fas fa-spinner fa-spin" style="margin-bottom: 0.5rem;"></i>
                    <div style="font-size: 0.875rem;">加载中...</div>
                </div>
            </div>
        `;
        
        this.init();
    }
    
    async fetchPinnedRepos() {
        try {
            const response = await fetchWithTimeout(`https://gh-pinned-repos.egoist.dev/?username=${this.username}`, {}, 5000);
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
    
    async fetchTopRepos() {
        try {
            const response = await fetchWithTimeout(`https://api.github.com/users/${this.username}/repos?sort=updated&per_page=6`, {}, 5000);
            if (!response.ok) throw new Error('获取失败');
            const data = await response.json();
            
            return data.map(repo => ({
                name: repo.name,
                description: repo.description || '暂无描述',
                stars: repo.stargazers_count,
                language: repo.language || 'Unknown',
                languageColor: this.getLanguageColor(repo.language),
                updated_at: repo.updated_at,
                html_url: repo.html_url,
                homepage: repo.homepage || ''
            }));
        } catch (error) {
            console.log('获取 repos 失败:', error);
            return null;
        }
    }
    
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
    
    formatDate(dateString) {
        if (!dateString) return '';
        const date = new Date(dateString);
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays <= 1) return '今天';
        if (diffDays <= 7) return `${diffDays} 天前`;
        if (diffDays <= 30) return `${Math.floor(diffDays / 7)} 周前`;
        if (diffDays <= 365) return `${Math.floor(diffDays / 30)} 个月前`;
        return `${Math.floor(diffDays / 365)} 年前`;
    }
    
    renderProjects(projects) {
        if (!this.container) return;

        const displayProjects = projects.slice(0, 4);

        this.container.innerHTML = displayProjects.map(project => {
            const hasHomepage = project.homepage && project.homepage.trim() !== '';
            const actionsHtml = hasHomepage
                ? `<div class="project-actions">
                    <a href="${project.homepage}" target="_blank" rel="noopener noreferrer" class="project-link" title="在线访问">
                        <i class="fas fa-external-link-alt" style="font-size: 0.625rem;"></i> 访问
                    </a>
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-link" title="查看源码">
                        <i class="fas fa-code" style="font-size: 0.625rem;"></i> 源码
                    </a>
                   </div>`
                : `<a href="${project.html_url}" target="_blank" rel="noopener noreferrer" class="project-link">
                    查看 <i class="fas fa-arrow-right" style="font-size: 0.625rem;"></i>
                   </a>`;

            return `
            <div class="project-card">
                <div class="project-header">
                    <a href="${project.html_url}" target="_blank" rel="noopener noreferrer"
                       class="project-name" title="${project.name}">${project.name}</a>
                    <div class="project-stars">
                        <i class="fas fa-star" style="font-size: 0.75rem; color: var(--text-muted);"></i>
                        <span>${project.stars}</span>
                    </div>
                </div>
                <p class="project-desc">${project.description}</p>
                <div class="project-footer">
                    <span class="project-lang">
                        <span class="project-lang-dot" style="background-color: ${project.languageColor}"></span>
                        <span>${project.language}</span>
                    </span>
                    ${actionsHtml}
                </div>
            </div>
            `;
        }).join('');
    }
}

// 微信模态框
function showWeixin() {
    const modal = document.getElementById('weixinModal');
    if (modal) modal.classList.add('active');
}

function closeWeixin() {
    const modal = document.getElementById('weixinModal');
    if (modal) modal.classList.remove('active');
}

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new DigitalAvatar();
    initTheme();
    initReveal();
    initBackToTop();
    
    // 延迟加载非关键数据，优先保证首屏交互
    const loadGitHubData = () => {
        window.githubProjects = new GitHubProjects('AlphaZx-CJY');
        new GitHubContributions('AlphaZx-CJY');
    };
    
    if ('requestIdleCallback' in window) {
        requestIdleCallback(loadGitHubData, { timeout: 2000 });
    } else {
        setTimeout(loadGitHubData, 100);
    }
});

// 点击模态框背景关闭
document.addEventListener('click', (e) => {
    const modal = document.getElementById('weixinModal');
    if (modal && e.target === modal) {
        modal.classList.remove('active');
    }
});
