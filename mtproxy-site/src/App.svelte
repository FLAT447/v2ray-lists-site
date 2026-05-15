<script>
    import { onMount } from 'svelte';
    import Background from "./lib/Background.svelte";
    import Footer from "./lib/Footer.svelte";
    import ProxyCard from "./lib/ProxyCard.svelte";
    import Instructions from "./lib/Instructions.svelte";
    import Contacts from './lib/Contacts.svelte';
    import { theme } from "./lib/js/theme.svelte.js";
    
    // Импорт иконок для кнопки смены темы
    import { faSun, faMoon, faBolt } from "@fortawesome/free-solid-svg-icons";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { icon } from '@fortawesome/fontawesome-svg-core';

    const WL_URL = 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/whitelist.txt';
    const BL_URL = 'https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/blacklist.txt';

    let whitelist = $state([]);
    let blacklist = $state([]);
    let loading = $state(true);

    onMount(async () => {
        // Применяем тему из localStorage при монтировании
        theme.updateBodyClass();
        
        try {
            const [wlRes, blRes] = await Promise.all([fetch(WL_URL), fetch(BL_URL)]);
            const wlText = await wlRes.text();
            const blText = await blRes.text();

            whitelist = wlText.split('\n').filter(line => line.includes('tg://proxy'));
            blacklist = blText.split('\n').filter(line => line.includes('tg://proxy'));
        } catch (e) {
            console.error("Ошибка загрузки:", e);
        } finally {
            loading = false;
            requestAnimationFrame(() => {
                document.body.classList.add('page-loaded');
            });
        }
    });
</script>

<Background />

<div class="theme-controls">
    <button 
        class="theme-btn" 
        onclick={() => theme.toggle()} 
        aria-label="Переключить тему"
    >
        <FontAwesomeIcon icon={theme.current === 'light' ? faMoon : faSun} />
    </button>
</div>

<main class="main-container">
    <section class="hero animate-in" style="--delay: 0.1s">
        <h1><FontAwesomeIcon icon={faBolt} style="color: var(--blue-color);"/> V2Ray <span class="gradient-text">Lists</span></h1>
        <p>Бесплатные прокси для Telegram. Обновляются автоматически.</p>
    </section>

    {#if loading}
        <div class="loader">Загрузка базы прокси...</div>
    {:else}
        <div class="proxy-grid">
            <ProxyCard 
                title="WhiteList (WL)" 
                type="wl" 
                list={whitelist} 
                delay="0.2s" 
            />
            <ProxyCard 
                title="BlackList (BL)" 
                type="bl" 
                list={blacklist} 
                delay="0.3s" 
            />
        </div>
    {/if}

    <Instructions />
</main>

<Footer />

<div class="contacts-wrapper">
    <Contacts />
</div>

<style>
    .contacts-wrapper {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
    }
    
    .main-container {
        max-width: 1000px;
        margin: 0 auto;
        padding: 10px 20px;
        min-height: 80vh;
    }

    .hero {
        text-align: center;
        margin-top: 0;
        margin-bottom: 50px;
    }

    .hero h1 { 
        font-size: 3.5rem; 
        margin-bottom: 10px; 
    }
    
    .gradient-text {
        background: linear-gradient(60deg, var(--blue-color), var(--saphire-color));
        -webkit-background-clip: text;
        background-clip: text;
        color: transparent;
    }

    .proxy-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
    }

    .loader {
        text-align: center;
        padding: 50px;
        font-size: 1.2rem;
        color: var(--blue-color);
    }

    /* Стили кнопки смены темы */
    .theme-controls {
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 100;
    }

    .theme-btn {
        background: color-mix(in srgb, var(--surface-color), transparent 50%);
        backdrop-filter: blur(10px);
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
        color: var(--text-color);
        width: 45px;
        height: 45px;
        border-radius: 12px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.2rem;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .theme-btn:hover {
        transform: scale(1.1) rotate(15deg);
        background: var(--surface-color);
        border-color: var(--blue-color);
    }

    /* Адаптив для мобильных устройств */
    @media (max-width: 768px) {
        .proxy-grid {
            grid-template-columns: 1fr;
        }
        
        .hero h1 {
            font-size: 2.5rem;
        }

        .theme-controls {
            top: 15px;
            right: 15px;
        }
    }
</style>
