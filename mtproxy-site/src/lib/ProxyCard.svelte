<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faCopy, faShuffle, faServer, faCheck, faClock } from "@fortawesome/free-solid-svg-icons";
    import { i18n } from "./js/i18n.svelte"; // если путь до i18n отличается, например '../lib/js/i18n.svelte', поправьте под ваш проект

    // Принимаем count и updatedTime из App.svelte
    let { title, type, list = [], count = 0, delay = "0s", updatedTime = "" } = $props();
    let copiedAll = $state(false);
    let copiedRandom = $state(false);

    const accentColor = type === 'wl' ? 'var(--mtproxy-wl-color)' : 'var(--mtproxy-bl-color)';
    async function copyToClipboard(text, stateKey) {
        if (!text) return;
        try {
            await navigator.clipboard.writeText(text);
            if (stateKey === 'random') {
                copiedRandom = true;
                setTimeout(() => copiedRandom = false, 2000);
            } else {
                copiedAll = true;
                setTimeout(() => copiedAll = false, 2000);
            }
        } catch (err) {
            console.error('Ошибка копирования:', err);
        }
    }

    function handleCopyAll() {
        if (list.length === 0) return;
        copyToClipboard(list.join('\n'), 'all');
    }

    function handleCopyRandom() {
        if (list.length === 0) return;
        const randomProxies = [...list]
            .sort(() => 0.5 - Math.random())
            .slice(0, 10);
        copyToClipboard(randomProxies.join('\n'), 'random');
    }
</script>

<div class="card animate-in" style="--delay: {delay}; --accent: {accentColor}">
    <div class="card__header">
        <div class="card__icon" style="background: color-mix(in srgb, {accentColor}, transparent 85%); color: {accentColor}">
            <FontAwesomeIcon icon={faServer} />
        </div>
        <div>
            <h3 class="card__title">{title}</h3>
            <span class="card__badge" style="background: {accentColor}">
                {type === 'wl' ? i18n.t('proxy.badge_whitelist') : i18n.t('proxy.badge_normal')}
            </span>
        </div>
    </div>

    <p class="card__desc">
        {type === 'wl' 
            ? i18n.t('proxy.desc_whitelist') 
            : i18n.t('proxy.desc_normal')}
    </p>

    <div class="card__meta">
        <div class="card__meta-item">
            {i18n.t('proxy.available')} <strong>{count ?? list.length}</strong>
        </div>
        {#if updatedTime}
            <div class="card__meta-item card__time">
                <FontAwesomeIcon icon={faClock} />
                <span>{updatedTime}</span>
            </div>
        {/if}
    </div>

    <div class="card__actions">
        <button 
            class="btn btn--primary {copiedAll ? 'btn--success' : ''}" 
            onclick={handleCopyAll}
            disabled={list.length === 0}
        >
            <FontAwesomeIcon icon={copiedAll ? faCheck : faCopy} />
            {copiedAll ? i18n.t('proxy.btn_success') : i18n.t('proxy.btn_all')}
        </button>
        <button 
            class="btn btn--secondary {copiedRandom ? 'btn--success' : ''}" 
            onclick={handleCopyRandom}
            disabled={list.length === 0}
        >
            <FontAwesomeIcon icon={copiedRandom ? faCheck : faShuffle} />
            {copiedRandom ? i18n.t('proxy.btn_success') : i18n.t('proxy.btn_random')}
        </button>
    </div>
</div>

<style>
    .card { background: color-mix(in srgb, var(--surface-color), transparent 50%); backdrop-filter: blur(12px); border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%); border-radius: 24px; padding: 24px; transition: transform 0.3s ease, border-color 0.3s; }
    .card:hover { transform: translateY(-5px); border-color: color-mix(in srgb, var(--accent), transparent 50%); }
    .card__header { display: flex; align-items: center; gap: 16px; margin-bottom: 16px; }
    .card__icon { width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 20px; }
    .card__title { margin: 0; font-size: 1.2rem; }
    .card__badge { font-size: 0.7rem; font-weight: 800; padding: 2px 8px; border-radius: 6px; text-transform: uppercase; color: white; }
    .card__desc { font-size: 0.9rem; opacity: 0.7; margin-bottom: 20px; line-height: 1.5; }
    
    /* Стили горизонтальной строки (Счетчик и Время рядышком) */
    .card__meta { 
        display: flex; 
        align-items: center; 
        gap: 20px; 
        font-size: 0.85rem; 
        margin-bottom: 20px; 
    }
    .card__meta-item {
        display: flex;
        align-items: center;
        gap: 6px; 
    }
    .card__time {
        font-variant-numeric: tabular-nums;
    }

    .card__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .btn { border: none; padding: 12px; border-radius: 12px; font-weight: 600; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; transition: all 0.4s; }
    .btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .btn--primary { background: var(--accent); color: var(--crust-color); }
    .btn--secondary { background: var(--crust-color); color: var(--text-color); border: 1px solid rgba(255,255,255,0.1); }
    .btn.btn--success { background: var(--green-color) !important; color: var(--crust-color) !important; border-color: transparent !important; }
    .btn:hover:not(:disabled) { filter: brightness(1.2); transform: translateY(-5px); }
    @media (max-width: 480px) { .card__actions { grid-template-columns: 1fr; } }
</style>
