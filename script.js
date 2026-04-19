// ====================== ДАННЫЕ ======================
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
    { id: 27, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/main/whitelist.txt', type: 'mtproxy-wl' },
    { id: 28, url: 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/main/blacklist.txt', type: 'mtproxy-bl'}
];

let currentView = 'list';
let currentFilter = 'all';
let searchQuery = '';

const configGrid = document.querySelector('.config-grid');
const searchInput = document.getElementById('config-search');
const filterBtns = document.querySelectorAll('.filter-btn');
const tabBtns = document.querySelectorAll('.tab-btn');
const clearBtn = document.getElementById('clear-search');
const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const toggleIcon = themeToggle.querySelector('i');

// ====================== QR-коды ======================
function generateQRCanvas(url, size = 150) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    canvas.classList.add('qr-canvas');
    
    try {
        const qr = qrcode(0, 'M');
        qr.addData(url);
        qr.make();
        
        const cellSize = size / qr.getModuleCount();
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, size, size);
        ctx.fillStyle = '#000000';
        
        for (let row = 0; row < qr.getModuleCount(); row++) {
            for (let col = 0; col < qr.getModuleCount(); col++) {
                if (qr.isDark(row, col)) {
                    ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
                }
            }
        }
        return canvas;
    } catch (err) {
        console.error('QR error:', err);
        return canvas;
    }
}

function downloadQRCanvas(canvas, filename) {
    try {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    } catch (e) {
        alert('Ошибка сохранения');
    }
}

// ====================== РЕНДЕР КАРТОЧЕК ======================
function renderCards() {
    const filtered = configs.filter(conf => {
        const matchSearch = conf.url.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            conf.id.toString().includes(searchQuery);
        // Добавлено условие для MTProxy
        const matchFilter = currentFilter === 'all' || 
                            conf.type === currentFilter || 
                            (currentFilter === 'mtproxy' && conf.type.startsWith('mtproxy'));
        return matchSearch && matchFilter;
    });
    
    if (filtered.length === 0) {
        configGrid.innerHTML = `<div style="grid-column:1/-1; text-align:center; padding:50px; opacity:0.6;">🔍 Ничего не найдено</div>`;
        return;
    }
    
    if (currentView === 'list') {
        configGrid.classList.remove('qr-active');
        configGrid.innerHTML = filtered.map(conf => {
            const isProxyList = conf.type === 'mtproxy-wl' || conf.type === 'mtproxy-bl';
            return `
                <div class="card ${isProxyList ? 'proxy-card' : ''}">
                    <div class="card-header">
                        <div class="card-id">#${conf.id}</div>
                        <div class="badges-container">
                            ${conf.type === 'recommended' ? '<span class="badge recommended"><i class="fa-solid fa-star"></i> Рекомендованный</span>' : ''}
                            ${conf.type === 'sni' ? '<span class="badge sni"><i class="fa-solid fa-bolt"></i> Обход SNI/CIDR</span>' : ''}
                            ${conf.type === 'mtproxy-wl' ? '<span class="badge mtproxy-wl"><i class="fa-solid fa-fire"></i> MTProxy БС</span>' : ''}
                            ${conf.type === 'mtproxy-bl' ? '<span class="badge mtproxy-bl"><i class="fa-solid fa-globe"></i> MTProxy ЧС</span>' : ''}
                        </div>
                    </div>
                    <div class="url-box">
                        <p class="url-text">${escapeHtml(conf.url)}</p>
                    </div>
                    <div class="card-actions">
                        <button class="btn-copy-main" data-url="${conf.url}" data-id="${conf.id}"><i class="fa-solid fa-copy"></i> ${isProxyList ? 'Весь список' : 'Копировать ссылку'}</button>${isProxyList ? `<button class="btn-copy-random" data-url="${conf.url}"><i class="fa-solid fa-shuffle"></i> 10 рандомных</button>` : ''}
                    </div>
                </div>
            `;
        }).join('');
        
        
// ====================== ОБРАБОТКА КОПИРОВАНИЯ ======================
document.querySelectorAll('.btn-copy-main').forEach(btn => {
    btn.addEventListener('click', async () => {
        const url = btn.getAttribute('data-url');
        const id = parseInt(btn.getAttribute('data-id'));
        const originalHTML = btn.innerHTML;

        // Если это ID 27 или 28 — скачиваем содержимое и копируем его
        if (id === 27 || id === 28) {
            btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Загрузка...';
            try {
                const response = await fetch(url);
                if (!response.ok) throw new Error();
                const text = await response.text();
                
                await navigator.clipboard.writeText(text.trim());
                
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
                btn.classList.add('copied');
            } catch (err) {
                btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Ошибка сети';
            }
            
            setTimeout(() => {
                btn.innerHTML = originalHTML;
                btn.classList.remove('copied');
            }, 2000);
        } else {
            // Для всех остальных (обычных ссылок) используем стандартную функцию
            copyToClipboard(url, btn);
        }
    });
});

        document.querySelectorAll('.btn-copy-random').forEach(btn => {
            btn.addEventListener('click', async () => {
                const url = btn.getAttribute('data-url');
                const originalHTML = btn.innerHTML;
                btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
                
                try {
                    const response = await fetch(url);
                    const text = await response.text();
                    const lines = text.split('\n').filter(line => line.trim().length > 5);
                    const randomLines = lines.sort(() => 0.5 - Math.random()).slice(0, 10).join('\n');
                    
                    await navigator.clipboard.writeText(randomLines);
                    btn.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано!';
                    btn.classList.add('copied');
                    setTimeout(() => {
                        btn.innerHTML = originalHTML;
                        btn.classList.remove('copied');
                    }, 2000);
                } catch (err) {
                    btn.innerHTML = '<i class="fa-solid fa-xmark"></i> Ошибка';
                    setTimeout(() => btn.innerHTML = originalHTML, 2000);
                }
            });
        });
    } 
    else {
        configGrid.classList.add('qr-active');
        configGrid.innerHTML = filtered.map(conf => `
            <div class="card qr-card" data-qr-id="${conf.id}">
                <div class="card-header">
                    <div class="card-id">#${conf.id}</div>
                    <div class="badges-container">
                        ${conf.type === 'recommended' ? '<span class="badge recommended"><i class="fa-solid fa-star"></i> РЕК.</span>' : ''}
                        ${conf.type === 'sni' ? '<span class="badge sni"><i class="fa-solid fa-bolt"></i> SNI/CIDR</span>' : ''}
                        ${conf.type === 'mtproxy-wl' ? '<span class="badge mtproxy-wl"><i class="fa-solid fa-fire"></i> MTP БС</span>' : ''}
                        ${conf.type === 'mtproxy-bl' ? '<span class="badge mtproxy-bl"><i class="fa-solid fa-globe"></i> MTP ЧС</span>' : ''}
                    </div>
                </div>
                <div class="qr-container" id="qr-${conf.id}">
                    <div class="qr-placeholder" style="width:150px;height:150px;display:flex;align-items:center;justify-content:center;">
                        <i class="fa-solid fa-spinner fa-pulse"></i>
                    </div>
                </div>
                <button class="btn-copy-main btn-download-qr" data-id="${conf.id}">
                    <i class="fa-solid fa-download"></i> Скачать
                </button>
            </div>
        `).join('');
        
        filtered.forEach(conf => {
            const container = document.getElementById(`qr-${conf.id}`);
            if (container) {
                const qrCanvas = generateQRCanvas(conf.url, 150);
                container.innerHTML = '';
                container.appendChild(qrCanvas);
                
                const downloadBtn = document.querySelector(`.qr-card[data-qr-id="${conf.id}"] .btn-download-qr`);
                if (downloadBtn) {
                    downloadBtn.addEventListener('click', (e) => {
                        e.stopPropagation();
                        downloadQRCanvas(qrCanvas, `v2ray-qr-${conf.id}.png`);
                    });
                }
            }
        });
    }
}

function copyToClipboard(text, buttonElement) {
    navigator.clipboard.writeText(text).then(() => {
        const originalHTML = buttonElement.innerHTML;
        buttonElement.classList.add('copied');
        buttonElement.innerHTML = '<i class="fa-solid fa-check"></i> Скопировано';
        setTimeout(() => {
            buttonElement.innerHTML = originalHTML;
            buttonElement.classList.remove('copied');
        }, 2000);
    });
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[m]));
}

// ====================== ОБРАБОТЧИКИ СОБЫТИЙ ======================
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentView = btn.getAttribute('data-view');
        renderCards();
    });
});

searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    clearBtn.classList.toggle('visible', searchQuery.length > 0);
    renderCards();
});

clearBtn.addEventListener('click', () => {
    searchQuery = '';
    searchInput.value = '';
    clearBtn.classList.remove('visible');
    renderCards();
});

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.getAttribute('data-filter');
        renderCards();
    });
});

// ====================== ТЕМА ======================
function setTheme(theme) {
    htmlElement.classList.toggle('light-theme', theme === 'light');
    toggleIcon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('v2ray-theme', theme);
}

themeToggle.addEventListener('click', () => {
    setTheme(htmlElement.classList.contains('light-theme') ? 'dark' : 'light');
});

// ====================== ЗАПУСК ======================
setTheme(localStorage.getItem('v2ray-theme') || 'dark');
renderCards();
