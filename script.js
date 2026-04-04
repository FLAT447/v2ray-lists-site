const htmlElement = document.documentElement;
const toggleButton = document.getElementById('theme-toggle');
const iconElement = toggleButton.querySelector('i');
const configGrid = document.querySelector('.config-grid');

// 1. ДАННЫЕ КАРТОЧЕК (просто добавляй новые сюда)
const configs = [
    { id: 1, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/1.txt', type: 'recommended' },
    { id: 2, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/2.txt', type: '' },
    { id: 3, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/3.txt', type: '' },
    { id: 4, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/4.txt', type: '' },
    { id: 5, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/5.txt', type: '' },
    { id: 6, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/6.txt', type: 'recommended' },
    { id: 7, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/7.txt', type: '' },
    { id: 8, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/8.txt', type: '' },
    { id: 9, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/9.txt', type: '' },
    { id: 10, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/10.txt', type: '' },
    { id: 11, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/11.txt', type: '' },
    { id: 12, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/12.txt', type: '' },
    { id: 13, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/13.txt', type: '' },
    { id: 14, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/14.txt', type: '' },
    { id: 15, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/15.txt', type: '' },
    { id: 16, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/16.txt', type: '' },
    { id: 17, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/17.txt', type: '' },
    { id: 18, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/18.txt', type: '' },
    { id: 19, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/19.txt', type: '' },
    { id: 20, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/20.txt', type: '' },
    { id: 21, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/21.txt', type: '' },
    { id: 22, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/22.txt', type: 'recommended' },
    { id: 23, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/23.txt', type: 'recommended' },
    { id: 24, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/24.txt', type: 'recommended' },
    { id: 25, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/25.txt', type: 'recommended' },
    { id: 26, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/26.txt', type: 'sni' },
];

// 2. ФУНКЦИЯ ОТРИСОВКИ
function renderCards() {
    configGrid.innerHTML = configs.map(conf => `
        <div class="card">
            <div class="card-header">
                <div class="card-id">${conf.id}</div>
                ${conf.type === 'recommended' ? '<span class="badge recommended">Рекомендованный</span>' : ''}
                ${conf.type === 'sni' ? '<span class="badge sni">Обход SNI/CIDR</span>' : ''}
            </div>
            <div class="url-box">
                <p class="url-text">${conf.url}</p>
            </div>
            <button class="btn-copy-main" onclick="copyText('${conf.url}', this)">
                <i class="fa-solid fa-copy"></i> Копировать ссылку
            </button>
        </div>
    `).join('');
}

// 3. ФУНКЦИЯ КОПИРОВАНИЯ
window.copyText = (text, btn) => {
    navigator.clipboard.writeText(text);
    if(btn) {
        const original = btn.innerHTML;
        
        // Добавляем класс для смены цвета
        btn.classList.add('copied'); 
        
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
        
        setTimeout(() => {
            btn.innerHTML = original;
            // Убираем класс через 2 секунды, возвращая исходный цвет
            btn.classList.remove('copied'); 
        }, 2000);
    }
};

// 4. ЛОГИКА ТЕМЫ (Твой код с исправленным порядком)
function setTheme(theme) {
    if (theme === 'light') {
        htmlElement.classList.add('light-theme');
        iconElement.classList.replace('fa-sun', 'fa-moon');
    } else {
        htmlElement.classList.remove('light-theme');
        iconElement.classList.replace('fa-moon', 'fa-sun');
    }
    localStorage.setItem('v2ray-theme', theme);
}

toggleButton.addEventListener('click', () => {
    const isLight = htmlElement.classList.contains('light-theme');
    setTheme(isLight ? 'dark' : 'light');
});

// Инициализация
const savedTheme = localStorage.getItem('v2ray-theme') || 'dark';
setTheme(savedTheme);
renderCards();
