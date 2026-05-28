<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faYoutube, faTelegram, faGithub, faTiktok } from "@fortawesome/free-brands-svg-icons";
    import { faMoon, faSun, faChevronDown } from "@fortawesome/free-solid-svg-icons";
    import { theme } from "./js/theme.svelte";
    import { i18n } from "./js/i18n.svelte";
    import { slide } from "svelte/transition";

    let isAnimating = $state(false);
    let isDropdownOpen = $state(false);

    // Список доступных языков
    const languages = [
        { code: 'ru', label: 'Русский', short: 'RU' },
        { code: 'en', label: 'English', short: 'EN' },
        { code: 'uk', label: 'Українська', short: 'UK' },
        { code: 'be', label: 'Беларуская', short: 'BE' }
    ];

    // Получаем текущий выбранный объект языка
    let currentLang = $derived(languages.find(l => l.code === i18n.locale) || languages[0]);

    function handleToggle() {
        if (isAnimating) return;
        isAnimating = true;
        
        theme.toggle();
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }

    function selectLanguage(code) {
        i18n.locale = code;
        isDropdownOpen = false;
    }

    // Закрытие списка при клике вне его области
    function clickOutside(node) {
        const handleClick = (event) => {
            if (node && !node.contains(event.target) && !event.defaultPrevented) {
                isDropdownOpen = false;
            }
        };
        document.addEventListener('click', handleClick, true);
        return {
            destroy() {
                document.removeEventListener('click', handleClick, true);
            }
        };
    }
</script>

<header class="header">
    <div class="header__wrapper">
        <nav class="header__nav">
            <a href="https://flat447.github.io/v2ray-lists-site" class="header__title">
                <img class="header__image" src="https://cdn.jsdelivr.net/gh/FLAT447/v2ray-lists-site@gh-pages/favicon.png" alt="logo" width="30px">
                <p>V2Ray <span style="background: linear-gradient(60deg, var(--blue-color), var(--saphire-color)); background-clip: text; -webkit-background-clip: text; color: transparent;">Lists</span></p>
            </a>
   
            <ul class="header__list">
                <li class="header__list-item">
                    <a href="https://youtube.com/@flatyt447" target="_blank" aria-label="YouTube"><FontAwesomeIcon icon={faYoutube} style="color: var(--red-color)" /></a>
                </li>
                <li class="header__list-item">
                    <a href="https://t.me/flat447" target="_blank" aria-label="Telegram"><FontAwesomeIcon icon={faTelegram} style="color: var(--blue-color)" /></a>
                </li>
                <li class="header__list-item">
                    <a href="https://tiktok.com/@flflat447" target="_blank" aria-label="TikTok"><FontAwesomeIcon icon={faTiktok} style="color: var(--black-color)" /></a>
                </li>
             
                <li><div class="header__divinder"></div></li>
                
                <li class="header__list-item">
                    <a class="header__list-github" href="https://github.com/FLAT447/v2ray-lists" target="_blank">
                        <FontAwesomeIcon icon={faGithub} style="font-size: 22px;" />
                        <p>{i18n.t('header.github')}</p>
                    </a>
                </li>
                
                <li class="header__list-item" use:clickOutside>
                    <div class="custom-select">
                        <button 
                            class="custom-select__trigger" 
                            class:custom-select__trigger--active={isDropdownOpen}
                            onclick={() => isDropdownOpen = !isDropdownOpen}
                            aria-label="Toggle language menu"
                        >
                            <span>{currentLang.short}</span>
                            <span class="custom-select__arrow" class:custom-select__arrow--rotated={isDropdownOpen}>
                                <FontAwesomeIcon icon={faChevronDown} />
                            </span>
                        </button>

                        {#if isDropdownOpen}
                            <div class="custom-select__dropdown" transition:slide={{ duration: 500 }}>
                                <ul class="custom-select__options">
                                    {#each languages as lang}
                                        <li>
                                            <button 
                                                class="custom-select__option" 
                                                class:custom-select__option--selected={lang.code === i18n.locale}
                                                onclick={() => selectLanguage(lang.code)}
                                            >
                                                <span class="custom-select__option-code">{lang.short}</span>
                                                <span class="custom-select__option-label">{lang.label}</span>
                                            </button>
                                        </li>
                                    {/each}
                                </ul>
                            </div>
                        {/if}
                    </div>
                </li>

                <li class="header__list-item">
                    <button class="header__theme-toggle" onclick={handleToggle} aria-label="Toggle theme">
                        <div class="header__theme-container" class:is-spinning={isAnimating}>
                            {#if theme.current === 'light'}
                                <FontAwesomeIcon icon={faMoon} style="color: var(--blue-color)" />
                            {:else}
                                <FontAwesomeIcon icon={faSun} style="color: var(--yellow-color)" />
                            {/if}
                        </div>
                    </button>
                </li>
            </ul>
        </nav>
    </div>
</header>

<style>
    .header {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
        background-color: rgba(255, 255, 255, 0.05);
        -webkit-backdrop-filter: blur(30px);
        backdrop-filter: blur(30px);
        will-change: backdrop-filter;
        padding-block: 12px;
        padding-inline: 20px; /* Защитные отступы по бокам для десктопа */
        font-size: 22px;
        position: sticky;
        top: 0;
        transition: background-color 0.5s ease, border-color 0.5s ease;
        z-index: 999;
        box-shadow: 0 4px 30px rgba(0,0,0,0.15);
        animation: headerDrop 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
    }

    @keyframes headerDrop {
        from {
            opacity: 0;
            transform: translateY(-100%);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .header__wrapper {
        width: 100%;
        margin-inline: auto;
    }

    .header__divinder {
        background: rgba(255, 255, 255, 0.2);
        width: 1px;
        height: 22px; 
        margin: 0 4px;
    }

    :global(html[data-theme="light"]) .header__divinder {
        background: rgba(0, 0, 0, 0.15);
    }

    .header__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1300px;
        margin: auto;
        gap: 16px; /* Не даёт логотипу и списку слипаться */
    }

    .header__image {
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        flex-shrink: 0;
    }

    .header__title {
        display: flex;
        align-items: center;
        font-size: 22px;
        gap: 12px;
        flex-shrink: 0; /* Логотип не должен сжиматься */
        transition: 0.5s cubic-bezier(0.25, 1, 0.5, 1);
        &:hover {
            cursor: pointer;
            filter: drop-shadow(0 10px 15px var(--surface-color)) brightness(1.1);
        }
    }

    .header__title:hover .header__image {
        transform: rotateZ(20deg) scale(1.15);
    }

    .header__title p {
        font-weight: 700;
        color: var(--text-color);
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }

    .header__title:hover p {
        transform: translateY(-2px);
    }

    .header__list {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 0;
        margin: 0;
    }

    /* Анимации иконок соцсетей */
    .header__list-item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
    }

    .header__list-item :global(svg) {
        transition: transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.5s ease, filter 0.5s ease;
    }

    .header__list-item:hover :global(svg) {
        transform: rotateZ(15deg) scale(1.25);
        filter: drop-shadow(0 4px 8px rgba(0,0,0,0.3));
    }

    .header__list-github {
        display: flex;
        align-items: center;
        gap: 8px;
        border-radius: 10px;
        padding: 6px 10px;
        font-size: 18px;
        font-weight: 700;
        color: var(--text-color);
        transition: color 0.5s ease, filter 0.5s ease, transform 0.5s cubic-bezier(0.25, 1, 0.5, 1), background-color 0.5s ease;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.1);
        &:hover {
            background: rgba(255, 255, 255, 0.08);
            filter: drop-shadow(0 8px 16px var(--surface-color)) brightness(1.1);
            transform: translateY(-2px);
        }
    }

    .header__list-github:hover :global(svg) {
        transform: rotateZ(15deg) scale(1.15);
    }

    /* --- Стили кастомного выпадающего списка --- */
    .custom-select {
        position: relative;
        font-family: inherit;
    }

    .custom-select__trigger {
        background: rgba(255, 255, 255, 0.03);
        color: var(--text-color);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 10px;
        padding: 6px 12px;
        font-size: 16px;
        font-weight: 700;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    }

    :global(html[data-theme="light"]) .custom-select__trigger {
        border: 1px solid rgba(0, 0, 0, 0.1);
    }

    .custom-select__trigger:hover, .custom-select__trigger--active {
        background: rgba(255, 255, 255, 0.08);
        border-color: var(--blue-color, #3b82f6);
        box-shadow: 0 0 12px rgba(59, 130, 246, 0.2);
    }

    .custom-select__arrow {
        font-size: 12px;
        display: flex;
        align-items: center;
        transition: transform 0.5s cubic-bezier(0.25, 1, 0.5, 1) !important;
    }

    .custom-select__trigger:hover .custom-select__arrow :global(svg) {
        transform: none !important;
        filter: none !important;
    }

    .custom-select__arrow--rotated {
        transform: rotateX(180deg);
    }

    .custom-select__dropdown {
        position: absolute;
        top: calc(100% + 8px);
        right: 0;
        background: var(--surface-color, var(--background-color));
        -webkit-backdrop-filter: blur(20px);
        backdrop-filter: blur(20px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        overflow: hidden;
        z-index: 1000;
        min-width: 160px;
        transition: background-color 0.5s ease, border-color 0.5s ease, box-shadow 0.5s ease;
    }

    :global(html[data-theme="light"]) .custom-select__dropdown {
        border: 1px solid rgba(0, 0, 0, 0.08);
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    }

    .custom-select__options {
        list-style: none;
        padding: 4px;
        margin: 0;
    }

    .custom-select__option {
        width: 100%;
        background: transparent;
        border: none;
        color: var(--text-color);
        padding: 8px 12px;
        font-size: 15px;
        text-align: left;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 10px;
        border-radius: 8px;
        transition: background-color 0.3s ease, color 0.5s ease;
    }

    .custom-select__option:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--blue-color, #3b82f6);
    }

    :global(html[data-theme="light"]) .custom-select__option:hover {
        background: rgba(0, 0, 0, 0.04);
    }

    .custom-select__option--selected {
        background: rgba(59, 130, 246, 0.15) !important;
        color: var(--blue-color, #3b82f6) !important;
        font-weight: 700;
    }

    .custom-select__option-code {
        font-size: 12px;
        opacity: 0.6;
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 4px;
        border-radius: 4px;
        transition: background-color 0.5s ease;
    }

    :global(html[data-theme="light"]) .custom-select__option-code {
        background: rgba(0, 0, 0, 0.06);
    }

    .custom-select__option-label {
        white-space: nowrap;
    }

    /* --- Конец стилей селектора --- */

    .header__theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.5s ease;
    }

    .header__theme-container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        width: 32px; 
        height: 28px;
    }

    .header__theme-toggle:hover :global(svg) {
        transform: rotate(-20deg) scale(1.25);
    }

    .is-spinning {
        animation: spin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.25); }
        100% { transform: rotate(360deg) scale(1); }
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    /* --- Адаптивность под мобильные устройства --- */
    @media (max-width: 768px) {
        .header { 
            padding: 10px 12px; /* Чуть уменьшаем вертикальные и горизонтальные отступы самого хедера */
        }
        
        .header__title p { 
            display: none; 
        }
        
        .header__list-github p { 
            display: none; 
        }
        
        .header__list-github {
            padding: 6px; /* Делаем кнопку GitHub компактной круглой/квадратной иконкой */
        }

        .header__list {
            gap: 8px; /* Сужаем расстояние между элементами, чтобы всё влезло на экраны шириной от 320px */
        }

        .custom-select__trigger { 
            font-size: 14px; 
            padding: 5px 8px; 
            gap: 4px;
        }
    }

    /* Дополнительный брейкпоинт для ультра-маленьких экранов (до 360px) */
    @media (max-width: 360px) {
        .header__list {
            gap: 6px;
        }
        .header__divinder {
            margin: 0 2px;
        }
    }
</style>
