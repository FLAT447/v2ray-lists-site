<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { 
        faCopy, 
        faFileImport, 
        faBolt
     } from "@fortawesome/free-solid-svg-icons"; 
     import { i18n } from "./js/i18n.svelte";
</script>

<div class="grid">
    <div class="grid__title-container animate-in" style="--delay: 0.15s">
        <h1><FontAwesomeIcon icon={faBolt} /> {i18n.t('grid.title')}</h1> 
        <p>
            {i18n.t('grid.desc_1')}
            <strong>Hysteria2</strong>, <strong>ShadowSocks</strong>, <strong>TUIC</strong>, <strong>VLESS</strong>, <strong>VMess</strong>, <strong>Trojan</strong>, <strong>Reality</strong><br>
            {i18n.t('grid.desc_2')}
        </p>
    </div>

    <div class="grid__wrapper">
        <div class="grid__container blue animate-in" style="--delay: 0.28s">
            <div class="header__icon-wrapper">
                <FontAwesomeIcon icon={faCopy} /> 
            </div>
            <h3>{i18n.t('grid.step1_title')}</h3> 
            <p>{i18n.t('grid.step1_desc')}</p> 
        </div>

        <div class="grid__container purple animate-in" style="--delay: 0.38s">
            <div class="header__icon-wrapper">
                <FontAwesomeIcon icon={faFileImport} /> 
            </div>
            <h3>{i18n.t('grid.step2_title')}</h3> 
            <p>{i18n.t('grid.step2_desc')}</p>
        </div>

        <div class="grid__container orange animate-in" style="--delay: 0.48s">
            <div class="header__icon-wrapper">
                <FontAwesomeIcon icon={faBolt} />
            </div>
            <h3>{i18n.t('grid.step3_title')}</h3>
            <p>{i18n.t('grid.step3_desc_1')} <span class="highlight">{i18n.t('grid.step3_desc_2')}</span>.</p>
        </div>
    </div>
</div>

<style>
    .grid {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        padding: 30px 12px;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        box-sizing: border-box;
    }

    .grid__title-container {
        text-align: center;
        margin-bottom: 40px;
        max-width: 800px;
        width: 100%;
        box-sizing: border-box;
    }

    .grid__title-container h1 {
        font-size: 50px;
        font-weight: 700;
        color: var(--text-color);
        margin: 0 0 16px 0;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        transition: 0.5s;
    }

    .grid__title-container:hover h1 {
        transform: translateY(-5px);
        filter: drop-shadow(8px 8px 10px var(--surface-color)) brightness(1.1);
    }

    .grid__title-container :global(svg) {
        color: var(--blue-color);
        transition: 0.5s;
    }

    .grid__title-container:hover :global(svg) {
        transform: rotate(-5deg);
    }

    .grid__title-container p {
        font-size: 18px;
        line-height: 1.6;
        color: color-mix(in srgb, var(--text-color), transparent 5%);
        margin: 0;
    }

    .grid__wrapper {
        display: flex;
        flex-direction: row;
        gap: 24px;
        width: 100%;
        max-width: 1300px;
        box-sizing: border-box;
    }

    .grid__container {
        position: relative;
        overflow: hidden;
        background: color-mix(in srgb, var(--surface-color), transparent 50%);
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
        border-radius: 24px;
        padding: 40px 30px;
        flex: 1 1 0;
        min-width: 0;
        box-sizing: border-box;
        transition: transform 0.5s ease, background-color 0.5s ease, box-shadow 0.5s ease;
    }

    @media (max-width: 768px) {
        .grid {
            padding: 20px 12px;
        }

        .grid__title-container {
            margin-bottom: 24px;
        }

        .grid__title-container h1 {
            font-size: 32px;
        }

        .grid__title-container p {
            font-size: 14px;
        }

        .grid__wrapper {
            flex-direction: column;
            gap: 16px;
        }

        .grid__container {
            width: 100%;
            flex: none;
            padding: 28px 20px;
        }
    }

    @media (max-width: 480px) {
        .grid {
            padding: 16px 8px;
        }

        .grid__title-container h1 {
            font-size: 26px;
            gap: 8px;
        }

        .grid__title-container p {
            font-size: 13px;
            line-height: 1.5;
        }

        .grid__container {
            padding: 24px 16px;
        }

        .header__icon-wrapper {
            width: 40px;
            height: 40px;
            margin-bottom: 16px;
        }

        .grid__container :global(svg) {
            font-size: 18px;
        }

        .grid__container h3 {
            font-size: 16px;
            margin-bottom: 8px;
        }

        .grid__container p {
            font-size: 12px;
        }
    }

    .grid__container:hover {
        transform: translateY(-10px) scale(1.01);
    }

    .grid__container::after {
        content: '';
        position: absolute;
        top: -40px;
        right: -40px;
        width: 120px;
        height: 120px;
        border-radius: 50%;
        filter: blur(40px);
        will-change: filter;
        opacity: 0;
        transition: opacity 0.5s ease;
        z-index: 0;
    }

    .grid__container:hover::after {
        opacity: 0.4;
    }

    .blue::after { background-color: var(--blue-color); }
    .purple::after { background-color: var(--mauve-color); }
    .orange::after { background-color: var(--peach-color); }

    .header__icon-wrapper {
        position: relative;
        z-index: 1;
        width: 48px;
        height: 48px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        margin-bottom: 24px;
        transition: transform 0.5s, box-shadow 0.4s;
    }

    .grid__container :global(svg) {
        font-size: 20px;
    }

    .grid__container.blue:hover {
        box-shadow: 0 16px 25px var(--blue-color);
        /* box-shadow: 0 16px 25px color-mix(in srgb, var(--blue-color), transparent 60%); */
    }

    .grid__container.purple:hover {
        box-shadow: 0 16px 25px var(--mauve-color);
        /* box-shadow: 0 16px 25px color-mix(in srgb, var(--mauve-color), transparent 60%); */
    }

    .grid__container.orange:hover {
        box-shadow: 0 16px 25px var(--peach-color);
        /* box-shadow: 0 16px 25px color-mix(in srgb, var(--peach-color), transparent 60%); */
    }

    .blue .header__icon-wrapper { 
        background-color: color-mix(in srgb, var(--blue-color), transparent 80%);
        color: var(--blue-color);
    }

    .purple .header__icon-wrapper { 
        background-color: color-mix(in srgb, var(--mauve-color), transparent 80%);
        color: var(--mauve-color);     
    }

    .orange .header__icon-wrapper { 
        background-color: color-mix(in srgb, var(--peach-color), transparent 80%);
        color: var(--peach-color);       
    }

    .grid__container:hover .header__icon-wrapper {
        transform: scale(1.25) rotate(15deg);
    }

    .grid__container.blue:hover .header__icon-wrapper {
        box-shadow: 0 0 30px rgba(137, 180, 250, 0.8), 0 0 50px rgba(137, 180, 250, 0.5), inset 0 0 15px rgba(137, 180, 250, 0.4);
    }

    .grid__container.purple:hover .header__icon-wrapper {
        box-shadow: 0 0 35px rgba(203, 166, 247, 0.9), 0 0 60px rgba(203, 166, 247, 0.6), inset 0 0 20px rgba(203, 166, 247, 0.5);
    }

    .grid__container.orange:hover .header__icon-wrapper {
        box-shadow: 0 0 35px rgba(250, 179, 135, 0.9), 0 0 60px rgba(250, 179, 135, 0.714), inset 0 0 20px rgba(250, 179, 135, 0.5);    
    }

    .grid__container h3 {
        position: relative;
        z-index: 1;
        font-size: 20px;
        margin-bottom: 12px;
        color: var(--text-color);
    }

    .grid__container p {
        position: relative;
        z-index: 1;
        font-size: 14px;
        line-height: 1.6;
        color: color-mix(in srgb, var(--text-color), transparent 30%);
    }

    .highlight {
        color: var(--peach-color);
        font-weight: 700;
    }

    .animate-in {
        animation: slideUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: var(--delay, 0s);
    }

    @keyframes slideUp {
        from {
            opacity: 0;
            translate: 0 24px;
        }
        to {
            opacity: 1;
            translate: 0 0;
        }
    }
</style>
