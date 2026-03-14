// 数字分身聊天系统
class DigitalAvatar {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.chatInput = document.getElementById('chatInput');
        this.sendBtn = document.getElementById('sendBtn');
        this.quickQuestions = document.querySelectorAll('.quick-question');
        
        this.knowledge = {
            identity: '码农',
            currentWork: ['搭建个人主页', '开发IDE插件'],
            expertise: ['LLM应用方向', 'IDE开发'],
            interests: ['编程', '数学（虽然很菜）', '地理'],
            characteristic: '喜欢地理，喜欢将复杂的东西简单化',
            projects: [
                { name: 'AI IDE 插件', desc: '基于LLM的智能代码辅助工具' },
                { name: '数字分身聊天', desc: '个人主页的智能问答系统' }
            ],
            contact: {
                email: 'contact@alphazx.dev',
                github: 'github.com/alphazx',
                twitter: '@alphazx'
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
            return `我最近在忙着：${this.knowledge.currentWork.join('、')}。主要是想探索一下Vibe Coding，同时也希望能开发一些实用的IDE插件来提升开发效率。`;
        }
        
        // 联系方式
        if (lowerMsg.includes('联系') || lowerMsg.includes('邮箱') || lowerMsg.includes('怎么找')) {
            return `你可以通过以下方式联系我：<br><br>
            📧 邮箱：${this.knowledge.contact.email}<br>
            🐙 GitHub：${this.knowledge.contact.github}<br>
            🐦 Twitter：${this.knowledge.contact.twitter}<br><br>
            欢迎随时交流！`;
        }
        
        // 作品/项目
        if (lowerMsg.includes('作品') || lowerMsg.includes('项目') || lowerMsg.includes('portfolio')) {
            let response = '我目前的主要作品有：<br><br>';
            this.knowledge.projects.forEach((project, index) => {
                response += `${index + 1}. <strong>${project.name}</strong> - ${project.desc}<br>`;
            });
            response += '<br>你可以在下面的项目展示区看到更多详情！';
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

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    new DigitalAvatar();
    initTheme();
});