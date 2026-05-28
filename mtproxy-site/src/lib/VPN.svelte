<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faEarth, faArrowRight } from "@fortawesome/free-solid-svg-icons";
    import { i18n } from "./js/i18n.svelte";
</script>

<section class="vpn">
    <div class="vpn__container animate-in" style="--delay: 0.65s">
        <div class="vpn__content">
            <div class="vpn__header">
                <div class="vpn__icon-wrapper">
                    <FontAwesomeIcon icon={faEarth} class="vpn__icon" />
                </div>
                <h2 class="vpn__title">{i18n.t('vpn.title')}</h2>
            </div>
            
            <p class="vpn__description">
                {i18n.t('vpn.description')}
            </p>

            <a 
                href="https://flat447.github.io/v2ray-lists-site/" 
                target="_blank" 
                rel="noopener noreferrer"
                class="vpn__btn"
            >
                <span>{i18n.t('vpn.button')}</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </a>
        </div>

        <div class="vpn__accent"></div>
    </div>
</section>

<style>
    .vpn {
        padding: 40px 0 0 0;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .vpn__container {
        max-width: 1200px;
        margin: 0 auto;
        background: color-mix(in srgb, var(--surface-color), transparent 60%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        isolation: isolate;
        transform: translateZ(0);
        border-radius: 24px;
        padding: 40px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        gap: 30px;
        min-height: 280px;
        transition: 0.3s ease;
        &:hover {
            border-color: color-mix(in srgb, var(--mauve-color), transparent 50%)  
        }
    }

    .vpn__accent {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        right: -150px;
        top: -150px;
        z-index: 0;
        pointer-events: none;
    }

    .vpn__content {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .vpn__header {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .vpn__icon-wrapper {
        width: 60px;
        height: 60px;
        background: var(--mauve-color);
        border-radius: 16px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        box-shadow: 0 8px 24px rgba(112, 59, 176, 0.3);
        animation: float 3s ease-in-out infinite;
        transition: 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 8px 14px color-mix(in srgb, var(--mauve-color), transparent 50%);
        &:hover {
            filter: brightness(1.1);
        }
    }

    .vpn__icon-wrapper :global(svg) {
        font-size: 28px;
        color: var(--text-color);
    }

    .vpn__title {
        font-size: 32px;
        font-weight: 800;
        color: var(--text-color);
        margin: 0;
        letter-spacing: -0.5px;
    }

    .vpn__description {
        font-size: 16px;
        line-height: 1.6;
        color: color-mix(in srgb, var(--text-color), transparent 20%);
        margin: 0;
        max-width: 500px;
    }

    .vpn__btn {
        background: var(--mauve-color);
        color: white;
        border-radius: 14px;
        padding: 16px 28px;
        font-weight: 700;
        font-size: 15px;
        cursor: pointer;
        display: inline-flex;
        align-items: center;
        gap: 10px;
        text-decoration: none;
        transition: all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        width: fit-content;
        box-sizing: border-box;
    }

    .vpn__btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(112, 59, 176, 0.4);
        filter: brightness(1.1);
    }

    .vpn__btn:active {
        transform: translateY(-1px);
    }

    @keyframes float {
        0%, 100% { transform: translateY(5px); }
        50% { transform: translateY(-5px); }
    }

    @media (max-width: 768px) {
        .vpn {
            padding: 30px 0 0 0;
        }

        .vpn__container {
            padding: 30px;
            gap: 20px;
            min-height: auto;
        }

        .vpn__accent {
            width: 500px;
            height: 300px;
            right: -100px;
            top: -100px;
        }

        .vpn__header {
            gap: 12px;
        }

        .vpn__icon-wrapper {
            width: 50px;
            height: 50px;
        }

        .vpn__icon {
            font-size: 24px;
        }

        .vpn__title {
            font-size: 26px;
        }

        .vpn__description {
            font-size: 14px;
            max-width: 100%;
        }
    }

    @media (max-width: 480px) {
        .vpn {
            padding: 20px 0 0 0;
        }

        .vpn__container {
            padding: 5px;
            border-radius: 16px;
        }

        .vpn__title {
            font-size: 22px;
        }

        .vpn__btn {
            width: 100%;
            justify-content: center;
            padding: 14px 16px;
        }
    }
</style>
