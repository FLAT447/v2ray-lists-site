<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faHeart } from "@fortawesome/free-solid-svg-icons";
    import { i18n } from "./js/i18n.svelte";
    import SupportModal from "./SupportModal.svelte";
</script>

<footer class="footer animate-in" style="--delay: 0.6s">
    <div class="footer__wrapper">
        <div class="footer__made-by">
            {i18n.t('footer.made_by')}
            <span class="footer__heart">
                <FontAwesomeIcon icon={faHeart} />
            </span>
            <span class="footer__author">
                <a
                    href="https://github.com/FLAT447"
                    target="_blank"
                    class="footer__author-link">FLAT447</a
                >
            </span>
        </div>

        <div class="footer__support-section">
            <SupportModal />
        </div>

        <div class="footer__tech">
            <span class="footer__tech-text">{i18n.t('footer.written_on')}</span>
            <div class="footer__badge">
                <img
                    src="./svelte.svg"
                    alt="Svelte"
                    class="footer__icon"
                />
            </div>
            <span class="footer__tech-text">{i18n.t('footer.using')}</span>
            <div class="footer__badge">
                <img 
                    src="./vite.svg" 
                    alt="Vite" 
                    class="footer__icon" 
                />
            </div>
        </div>

        <div class="footer__source">
            <span class="footer__tech-text">{i18n.t('footer.source_code')}</span>
            <a
                href="https://github.com/FLAT447/v2ray-lists-site"
                target="_blank"
                class="footer__source-link"
            >
                V2Ray Lists Site
            </a>
        </div>
    </div>
</footer>

<style>
    .footer {
        padding: 40px 20px;
        margin-top: 60px;
        border-top: 1px solid
            color-mix(in srgb, var(--text-color), transparent 90%);
        font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
        background: var(--crust-color);
    }

    .footer__wrapper {
        max-width: 1200px;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
        text-align: center;
    }

    .footer__made-by {
        font-size: 1.3rem;
        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--text-color);
    }

    .footer__heart {
        color: var(--red-color);
        display: inline-block;
        animation: heartBeat 1.5s ease-in-out infinite;
    }

    @keyframes heartBeat {
        0%,
        100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.2);
        }
    }

    .footer__author-link {
        color: var(--blue-color);
        text-decoration: none;
        font-weight: 700;
        transition: 0.3s;
    }

    .footer__author-link:hover {
        color: var(--saphire-color);
        filter: brightness(1.2);
    }

    /* Секция поддержки */
    .footer__support-section {
        display: flex;
        justify-content: center;
    }

    .footer__tech {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        justify-content: center;
        gap: 12px;
        font-size: 1rem;
    }

    .footer__tech-text {
        color: color-mix(in srgb, var(--text-color), transparent 20%);
    }

    .footer__badge {
        display: flex;
        align-items: center;
        gap: 6px;
        background: color-mix(in srgb, var(--surface-color), transparent 50%);
        padding: 4px 10px;
        border-radius: 20px;
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
        transition: 0.4s;
    }

    .footer__badge:hover {
        transform: translateY(-5px);
        filter: brightness(1.2);
    }

    .footer__icon {
        width: 20px;
        height: 20px;
    }

    .footer__source {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 0.9rem;
        margin-top: 5px;
    }

    .footer__source-link {
        color: var(--blue-color);
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
        border-bottom: 1px dashed transparent;
    }

    .footer__source-link:hover {
        color: var(--saphire-color);
        border-bottom-color: var(--saphire-color);
        filter: brightness(1.2);
    }

    /*
     * Анимация появления использует только opacity — без transform.
     * transform создаёт новый stacking context, который ломает position: fixed
     * у дочерних элементов (в частности, у модального окна SupportModal).
     */
    :global(.animate-in) {
        animation: fadeIn 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s) both;
    }

    @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
    }

    @media (max-width: 768px) {
        .footer {
            padding: 30px 15px;
        }
        .footer__tech {
            gap: 8px;
        }
        .footer__made-by {
            font-size: 1.1rem;
        }
    }
</style>