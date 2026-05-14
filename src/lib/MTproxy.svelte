<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faShield, faArrowRight } from "@fortawesome/free-solid-svg-icons";
</script>

<section class="mtproxy">
    <div class="mtproxy__container animate-in" style="--delay: 0.65s">
        <div class="mtproxy__content">
            <div class="mtproxy__header">
                <div class="mtproxy__icon-wrapper">
                    <FontAwesomeIcon icon={faShield} class="mtproxy__icon" />
                </div>
                <h2 class="mtproxy__title">MTProxy</h2>
            </div>
            
            <p class="mtproxy__description">
                Проект также включает поддержку MTProxy. Это бесплатные конфигурации прокси для <span style="color: var(--blue-color);"><strong>Telegram</strong></span> на основе протокла <span style="color: var(--blue-color);"><strong>MTProto</strong></span>
            </p>

            <a 
                href="https://flat447.github.io/v2ray-lists-site/mtproxy" 
                target="_blank" 
                rel="noopener noreferrer"
                class="mtproxy__btn"
            >
                <span>Перейти к MTProxy</span>
                <FontAwesomeIcon icon={faArrowRight} />
            </a>
        </div>

        <div class="mtproxy__accent"></div>
    </div>
</section>

<style>
    .mtproxy {
        padding: 40px 20px 60px 20px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        width: 100%;
        box-sizing: border-box;
    }

    .mtproxy__container {
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
        box-sizing: border-box;
    }

    .mtproxy__accent {
        position: absolute;
        width: 400px;
        height: 400px;
        border-radius: 50%;
        right: -150px;
        top: -150px;
        z-index: 0;
        pointer-events: none;
    }

    .mtproxy__content {
        position: relative;
        z-index: 1;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        min-width: 0;
    }

    .mtproxy__header {
        display: flex;
        align-items: center;
        gap: 16px;
        min-width: 0;
    }

    .mtproxy__icon-wrapper {
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

    .mtproxy__icon-wrapper :global(svg) {
        font-size: 28px;
        color: var(--text-color);
    }

    .mtproxy__title {
        font-size: 32px;
        font-weight: 800;
        color: var(--text-color);
        margin: 0;
        letter-spacing: -0.5px;
        word-break: break-word;
    }

    .mtproxy__description {
        font-size: 16px;
        line-height: 1.6;
        color: color-mix(in srgb, var(--text-color), transparent 20%);
        margin: 0;
        max-width: 500px;
        word-break: break-word;
    }

    .mtproxy__btn {
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
        white-space: nowrap;
        flex-shrink: 0;
    }

    .mtproxy__btn:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 32px rgba(112, 59, 176, 0.4);
        filter: brightness(1.1);
    }

    .mtproxy__btn:active {
        transform: translateY(-1px);
    }

    @keyframes float {
        0%, 100% { transform: translateY(5px); }
        50% { transform: translateY(-5px); }
    }

    @media (max-width: 1024px) {
        .mtproxy {
            padding: 35px 20px 50px 20px;
        }

        .mtproxy__container {
            padding: 35px;
            gap: 25px;
        }

        .mtproxy__accent {
            width: 350px;
            height: 350px;
            right: -120px;
            top: -120px;
        }

        .mtproxy__title {
            font-size: 28px;
        }

        .mtproxy__description {
            font-size: 15px;
        }
    }

    @media (max-width: 768px) {
        .mtproxy {
            padding: 30px 15px 50px 15px;
        }

        .mtproxy__container {
            padding: 30px;
            gap: 20px;
            flex-direction: column;
            min-height: auto;
        }

        .mtproxy__accent {
            width: 300px;
            height: 300px;
            right: -100px;
            top: -100px;
        }

        .mtproxy__header {
            gap: 12px;
        }

        .mtproxy__icon-wrapper {
            width: 50px;
            height: 50px;
        }

        .mtproxy__icon {
            font-size: 24px;
        }

        .mtproxy__title {
            font-size: 26px;
        }

        .mtproxy__description {
            font-size: 14px;
            max-width: 100%;
        }

        .mtproxy__btn {
            padding: 14px 24px;
            font-size: 14px;
        }
    }

    @media (max-width: 480px) {
        .mtproxy {
            padding: 20px 12px 40px 12px;
        }

        .mtproxy__container {
            padding: 20px;
            border-radius: 16px;
            gap: 16px;
        }

        .mtproxy__header {
            flex-wrap: wrap;
            gap: 10px;
        }

        .mtproxy__title {
            font-size: 22px;
            width: 100%;
        }

        .mtproxy__description {
            font-size: 13px;
        }

        .mtproxy__btn {
            width: 100%;
            justify-content: center;
            padding: 14px 20px;
            font-size: 13px;
            gap: 8px;
        }

        .mtproxy__accent {
            width: 250px;
            height: 250px;
            right: -80px;
            top: -80px;
        }
    }

    @media (max-width: 360px) {
        .mtproxy {
            padding: 16px 10px 30px 10px;
        }

        .mtproxy__container {
            padding: 16px;
        }

        .mtproxy__icon-wrapper {
            width: 45px;
            height: 45px;
        }

        .mtproxy__icon-wrapper :global(svg) {
            font-size: 22px;
        }

        .mtproxy__title {
            font-size: 20px;
        }

        .mtproxy__btn {
            padding: 12px 16px;
            font-size: 12px;
        }
    }
</style>
