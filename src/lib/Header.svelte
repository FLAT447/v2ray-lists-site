<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faYoutube, faTelegram, faGithub, faTiktok } from "@fortawesome/free-brands-svg-icons";
    import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
    import { theme } from "./js/theme.svelte";

    let isAnimating = $state(false);

    function handleToggle() {
        if (isAnimating) return;
        isAnimating = true;
        
        theme.toggle();

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
</script>

<header class="header">
    <div class="header__wrapper">
        <nav class="header__nav">
            <a href="https://flat447.github.io/v2ray-lists-site" class="header__title">
                <img class="header__image" src="./favicon.png" alt="logo" width="30px">
                <p>V2Ray <span style="background: linear-gradient(60deg, var(--blue-color), var(--saphire-color)); background-clip: text; -webkit-background-clip: text; color: transparent;">Lists</span></p>
            </a>
            <ul class="header__list">
                <li class="header__list-item">
                    <a href="https://youtube.com/@flatyt447" target="_blank"><FontAwesomeIcon icon={faYoutube} style="color: var(--red-color)" /></a>
                </li>
                <li class="header__list-item">
                    <a href="https://t.me/flat447" target="_blank"><FontAwesomeIcon icon={faTelegram} style="color: var(--blue-color)" /></a>
                </li>
                <li class="header__list-item">
                    <a href="https://tiktok.com/@flflat447" target="_blank"><FontAwesomeIcon icon={faTiktok} style="color: var(--black-color" /></a>
                </li>
                <li><div class="header__divinder"></div></li>
                <li class="header__list-item">
                    <a class="header__list-github" href="https://github.com/FLAT447/v2ray-lists" target="_blank">
                        <FontAwesomeIcon icon={faGithub} style="font-size: 22px;" />
                        <p>GitHub</p>
                    </a>
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
        font-size: 22px;
        position: sticky;
        top: 0;
        transition: background-color 0.3s ease, border-color 0.3s ease;
        z-index: 999;
        box-shadow: 0 1px 35px rgba(0,0,0,0.2);
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
        max-height: 60px;
        margin-inline: auto;
    }

    .header__divinder {
        background: rgba(255, 255, 255, 0.3);
        width: 1px;
        height: 22px; 
        margin: 0 6px;
    }

    .header__nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        max-width: 1300px;
        margin: auto;
    }

    .header__image {
        transition: 0.5s;
    }

    .header__title {
        display: flex;
        align-items: center;
        font-size: 22px;
        gap: 12px;
        transition: 0.3s ease-in-out;
        &:hover {
            cursor: pointer;
            filter: drop-shadow(5px 15px 7px var(--surface-color)) brightness(1.1);
        }
    }

    .header__title:hover .header__image {
        transform: rotateZ(20deg) scale(1.15);
    }

    .header__title p {
        font-weight: 700;
        color: var(--text-color);
        transition: 0.5s;
    }

    .header__title:hover p {
        transform: translateY(-2px);
    }

    .header__list {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .header__list-item :global(svg) {
        transition: transform 0.4s ease-in-out, color 0.3s ease;
    }

    .header__list-item:hover :global(svg) {
        transform: rotateZ(20deg) scale(1.3);
        filter: drop-shadow(10px 10px 10px var(--surface-color)) brightness(1.1);
    }

    .header__list-github {
        display: flex;
        align-items: center;
        gap: 6px;
        border-radius: 8px;
        padding: 4px;
        font-size: 20px;
        font-weight: 700;
        color: var(--text-color);
        transition: color 0.3s ease, filter 0.3s ease, transform 0.3s ease;
        &:hover {
            filter: drop-shadow(10px 10px 10px var(--surface-color)) brightness(1.1);
        }
    }

    .header__list-github p {
        transition: 0.3s ease-in-out;
    }

    .header__list-github:hover p {
        transform: translateY(-1px);
    }

    .header__list-github :global(svg) {
        transition: 0.2s ease-in-out;
    }

    .header__list-github:hover :global(svg) {
        transform: rotateZ(20deg) scale(1.2);
        filter: drop-shadow(5px 5px 10px var(--surface-color)) brightness(1.1);
    }

    .header__theme-toggle {
        background: none;
        border: none;
        cursor: pointer;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: 0.3s ease;
    }

    .header__theme-container {
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 22px;
        width: 32px; 
        height: 28px;
    }

    .header__theme-toggle :global(svg) {
        transition: 0.3s;
    }

    .header__theme-toggle:hover :global(svg) {
        transform: rotate(-20deg) scale(1.3);
    }

    .is-spinning {
        animation: spin 0.5s cubic-bezier(0.4, 0, 0.2, 1);
    }

    @keyframes spin {
        0% { transform: rotate(0deg) scale(1); }
        50% { transform: rotate(180deg) scale(1.3); }
        100% { transform: rotate(360deg) scale(1); }
    }

    li {
        list-style: none;
    }

    a {
        text-decoration: none;
    }

    @media (max-width: 768px) {
        .header__list-github p { display: none; }
        .header__title p { display: none; }
        .header { padding: 12px 15px; gap: 8px; }
    }
</style>
