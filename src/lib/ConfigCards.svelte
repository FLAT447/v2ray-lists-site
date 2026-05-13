<script>
    import { onMount } from 'svelte';
    import { toCanvas } from 'qrcode';
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import {
        faStar, faBolt, faCopy, faCheck, faXmark,
        faSpinner, faDownload, faList,
        faQrcode, faMagnifyingGlass, faCircleXmark,
        faClock, faFileLines, faServer
    } from "@fortawesome/free-solid-svg-icons";

    const RECOMMENDED = new Set([1, 6, 22, 23, 24, 25]);
    const SNI = new Set([26]);

    function getType(id) {
        if (RECOMMENDED.has(id)) return 'recommended';
        if (SNI.has(id)) return 'sni';
        return '';
    }

    function getUrl(id) {
        return `https://raw.githubusercontent.com/FLAT447/v2ray-lists/refs/heads/main/githubmirror/${id}.txt`;
    }

    const configs = Array.from({ length: 26 }, (_, i) => {
        const id = i + 1;
        return { id, url: getUrl(id), type: getType(id) };
    });

    let currentView = $state('list');
    let currentFilter = $state('all');
    let searchQuery = $state('');
    let copyStates = $state({});
    let qrDataUrls = $state({});
    let stats = $state({ files: {} });

    let viewVisible = $state(true);

    function switchView(view) {
        if (view === currentView) return;
        viewVisible = false;
        setTimeout(() => {
            currentView = view;
            viewVisible = true;
        }, 220);
    }

    onMount(async () => {
        try {
            const res = await fetch('https://raw.githubusercontent.com/FLAT447/v2ray-lists/main/stats.json');
            if (res.ok) {
                stats = await res.json();
            }
        } catch (e) {
            console.error('Failed to load stats:', e);
        }
    });

    const filtered = $derived(
        configs.filter(c => {
            const q = searchQuery.trim().toLowerCase();
            const matchSearch =
                q === '' ||
                c.id.toString().includes(q) ||
                c.url.toLowerCase().includes(q);
            const matchFilter =
                currentFilter === 'all' || c.type === currentFilter;
            return matchSearch && matchFilter;
        })
    );

    function qrAction(node, url) {
        async function render(u) {
            try {
                await toCanvas(node, u, {
                    width: 150,
                    margin: 1,
                    color: { dark: '#000000', light: '#ffffff' }
                });
                const id = configs.find(c => c.url === u)?.id;
                if (id) qrDataUrls[id] = node.toDataURL('image/png');
            } catch (e) {
                console.error('QR render error:', e);
            }
        }

        render(url);
        return {
            update(newUrl) { render(newUrl); },
            destroy() {}
        };
    }

    function downloadQR(id) {
        const dataUrl = qrDataUrls[id];
        if (!dataUrl) return;
        const link = document.createElement('a');
        link.download = `v2ray-qr-${id}.png`;
        link.href = dataUrl;
        link.click();
    }

    async function copyLink(conf) {
        const id = conf.id;
        copyStates[id] = 'loading';
        try {
            await navigator.clipboard.writeText(conf.url);
            copyStates[id] = 'copied';
        } catch {
            copyStates[id] = 'error';
        }
        setTimeout(() => { copyStates[id] = 'idle'; }, 2000);
    }
</script>

<section class="configs">

    <div class="configs__controls animate-in" style="--delay: 0.58s">

        <div class="configs__tabs">
            <button
                class="configs__tab"
                class:configs__tab--active={currentView === 'list'}
                onclick={() => switchView('list')}
            >
                <FontAwesomeIcon icon={faList} />
                <span class="configs__tab-text">Списки</span>
            </button>
            <button
                class="configs__tab"
                class:configs__tab--active={currentView === 'qr'}
                onclick={() => switchView('qr')}
            >
                <FontAwesomeIcon icon={faQrcode} />
                <span class="configs__tab-text">QR-коды</span>
            </button>
        </div>

        <div class="configs__search">
            <FontAwesomeIcon icon={faMagnifyingGlass} class="configs__search-icon" />
            <input
                class="configs__search-input"
                type="text"
                placeholder="Поиск по ID или URL..."
                bind:value={searchQuery}
            />
            {#if searchQuery}
                <button class="configs__search-clear" onclick={() => searchQuery = ''}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            {/if}
        </div>

        <div class="configs__filters">
            <button
                class="configs__filter configs__filter--all"
                class:configs__filter--active={currentFilter === 'all'}
                onclick={() => currentFilter = 'all'}
            >Все</button>
            <button
                class="configs__filter configs__filter--recommended"
                class:configs__filter--active={currentFilter === 'recommended'}
                onclick={() => currentFilter = 'recommended'}
            >
                <FontAwesomeIcon icon={faStar} />
                Рекомендованные
            </button>
            <button
                class="configs__filter configs__filter--sni"
                class:configs__filter--active={currentFilter === 'sni'}
                onclick={() => currentFilter = 'sni'}
            >
                <FontAwesomeIcon icon={faBolt} />
                Обход SNI/CIDR
            </button>
        </div>

    </div>

    {#if filtered.length === 0}
        <div class="configs__empty">🔍 Ничего не найдено</div>

    {:else if currentView === 'list'}
        <div class="configs__view" class:configs__view--visible={viewVisible}>
        <div class="configs__grid">
            {#each filtered as conf, idx (conf.id)}
                {@const state = copyStates[conf.id] ?? 'idle'}
                {@const fileStat = stats.files[conf.id.toString()]}
                <div class="card" style="--i: {idx}">
                    <div class="card__header">
                        <span class="card__id"><FontAwesomeIcon icon={faServer} /> #{conf.id}</span>
                        {#if conf.type === 'recommended'}
                            <span class="card__badge card__badge--recommended">
                                <FontAwesomeIcon icon={faStar} /> Рекомендованный
                            </span>
                        {:else if conf.type === 'sni'}
                            <span class="card__badge card__badge--sni">
                                <FontAwesomeIcon icon={faBolt} /> Обход SNI/CIDR
                            </span>
                        {/if}
                    </div>

                    
                    <div class="card__url-box">
                        <p class="card__url-text">{conf.url}</p>
                    </div>
                    
                    <div class="card__stats-row">
                        <div class="card__stat">
                            <FontAwesomeIcon icon={faFileLines} />
                            <span>{fileStat?.count ?? '—'} конф.</span>
                        </div>
                        <div class="card__stat">
                            <FontAwesomeIcon icon={faClock} />
                            <span>{fileStat?.updated?.split()[0] ?? '—'}</span>
                        </div>
                    </div>

                    <button
                        class="card__btn"
                        class:card__btn--copied={state === 'copied'}
                        class:card__btn--error={state === 'error'}
                        onclick={() => copyLink(conf)}
                        disabled={state === 'loading'}
                    >
                        {#if state === 'loading'}
                            <FontAwesomeIcon icon={faSpinner} spin /> Загрузка...
                        {:else if state === 'copied'}
                            <FontAwesomeIcon icon={faCheck} /> Скопировано
                        {:else if state === 'error'}
                            <FontAwesomeIcon icon={faXmark} /> Ошибка
                        {:else}
                            <FontAwesomeIcon icon={faCopy} /> Копировать ссылку
                        {/if}
                    </button>
                </div>
            {/each}
        </div>
        </div>

    {:else}
        <div class="configs__view" class:configs__view--visible={viewVisible}>
        <div class="configs__grid configs__grid--qr">
            {#each filtered as conf, idx (conf.id)}
                {@const fileStat = stats.files[conf.id.toString()]}
                <div class="card card--qr" style="--i: {idx}">
                    <div class="card__header">
                        <span class="card__id"><FontAwesomeIcon icon={faServer} /> #{conf.id}</span>
                        {#if conf.type === 'recommended'}
                            <span class="card__badge card__badge--recommended">
                                <FontAwesomeIcon icon={faStar} /> РЕК.
                            </span>
                        {:else if conf.type === 'sni'}
                            <span class="card__badge card__badge--sni">
                                <FontAwesomeIcon icon={faBolt} /> SNI
                            </span>
                        {/if}
                    </div>

                    <div class="card__qr">
                        <canvas class="card__qr-canvas" use:qrAction={conf.url}></canvas>
                    </div>

                    <div class="card__stats-mini">
                        <span><FontAwesomeIcon icon={faFileLines} /> {fileStat?.count ?? '—'}</span>
                        <span><FontAwesomeIcon icon={faClock} /> {fileStat?.updated?.split(' | ')[0] ?? '—'}</span>
                    </div>

                    <button
                        class="card__btn"
                        onclick={() => downloadQR(conf.id)}
                        disabled={!qrDataUrls[conf.id]}
                    >
                        <FontAwesomeIcon icon={faDownload} /> Скачать
                    </button>
                </div>
            {/each}
        </div>
        </div>
    {/if}

</section>

<style>
    .configs {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        position: relative;
        z-index: 1;
        animation: configsAppear 0.8s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: 0.4s;
    }

    @keyframes configsAppear {
        from {
            opacity: 0;
            translate: 0 40px;
        }
        to {
            opacity: 1;
            translate: 0 0;
        }
    }
    @keyframes slideUp {
        from { 
            opacity: 0; 
            translate: 0 20px; 
        }
        to { 
            opacity: 1; 
            translate: 0 0; 
        }
    }

    .animate-in {
        animation: slideUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: var(--delay, 0s);
    }

    .configs__view {
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.22s ease, transform 0.22s ease;
    }

    .configs__view--visible {
        opacity: 1;
        transform: translateY(0);
    }

    .configs__view--visible .card:not(.card--qr) {
        animation: slideUp 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(var(--i, 0) * 28ms);
    }

    .configs__view--visible .card--qr {
        animation: qrPop 0.4s cubic-bezier(0.22, 1, 0.36, 1) both;
        animation-delay: calc(var(--i, 0) * 35ms);
    }

    @keyframes qrPop {
        from { 
            opacity: 0; 
            scale: 0.92; 
            translate: 0 12px; 
        }
        to { 
            opacity: 1; 
            scale: 1; 
            translate: 0 0; 
        }
    }
    .configs__controls {
        max-width: 1300px;
        margin: 0 auto 30px auto;
        padding: 0 20px;
        display: flex;
        flex-wrap: wrap;
        gap: 12px;
        align-items: center;
        justify-content: center;
    }

    .configs__tabs {
        display: flex;
        background: color-mix(in srgb, var(--crust-color), transparent 20%);
        padding: 4px;
        border-radius: 14px;
        border: 1px solid var(--surface-color);
        height: var(--control-height);
        box-sizing: border-box;
        align-items: center;
        flex-shrink: 0;
        gap: 2px;
    }

    .configs__tab {
        height: 100%;
        padding: 0 18px;
        border: none;
        background: transparent;
        color: var(--text-color);
        cursor: pointer;
        border-radius: 10px;
        font-weight: 600;
        font-size: 14px;
        opacity: 0.5;
        display: flex;
        align-items: center;
        gap: 8px;
        transition: background 0.2s, opacity 0.2s, color 0.2s;
        white-space: nowrap;
    }

    .configs__tab:hover {
        opacity: 0.8;
    }

    .configs__tab--active {
        background: var(--surface-color);
        opacity: 1;
        color: var(--blue-color);
    }

    .configs__tab-text {
        display: inline;
    }

    .configs__search {
        position: relative;
        flex: 1;
        min-width: 260px;
        height: var(--control-height);
    }

    .configs__search :global(.configs__search-icon) {
        position: absolute;
        left: 15px;
        top: 50%;
        transform: translateY(-50%);
        opacity: 0.4;
        pointer-events: none;
        font-size: 14px;
    }

    .configs__search-input {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 0 44px 0 42px;
        background: color-mix(in srgb, var(--crust-color), transparent 20%);
        border: 1px solid var(--surface-color);
        border-radius: 14px;
        color: var(--text-color);
        outline: none;
        font-size: 14px;
        font-family: inherit;
        transition: border-color 0.2s, background 0.2s;
    }

    .configs__search-input::placeholder {
        color: var(--text-color);
        opacity: 0.35;
    }

    .configs__search-input:focus {
        border-color: var(--blue-color);
        background: color-mix(in srgb, var(--crust-color), transparent 5%);
    }

    .configs__search-clear {
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        background: transparent;
        border: none;
        color: var(--text-color);
        opacity: 0.4;
        cursor: pointer;
        padding: 4px;
        display: flex;
        align-items: center;
        transition: opacity 0.2s;
        font-size: 15px;
    }

    .configs__search-clear:hover {
        opacity: 0.9;
    }

    .configs__filters {
        display: flex;
        gap: 8px;
        height: var(--control-height);
        flex-shrink: 0;
        align-items: center;
    }

    .configs__filter {
        height: 100%;
        box-sizing: border-box;
        padding: 0 18px;
        border-radius: 14px;
        border: 1px solid var(--surface-color);
        cursor: pointer;
        font-weight: 600;
        font-size: 14px;
        font-family: inherit;
        display: flex;
        align-items: center;
        gap: 7px;
        white-space: nowrap;
        transition: background 0.2s, color 0.2s, border-color 0.2s, filter 0.2s;
        background: color-mix(in srgb, var(--surface-color), transparent 40%);
        color: color-mix(in srgb, var(--text-color), transparent 20%);
    }

    .configs__filter:hover {
        filter: brightness(1.1);
    }

    .configs__filter--all.configs__filter--active {
        background: color-mix(in srgb, var(--blue-color), transparent 70%);
        border-color: var(--blue-color);
        color: var(--blue-color);
    }

    .configs__filter--recommended.configs__filter--active {
        background: color-mix(in srgb, var(--yellow-color), transparent 70%);
        border-color: var(--yellow-color);
        color: var(--yellow-color);
    }

    .configs__filter--sni.configs__filter--active {
        background: color-mix(in srgb, var(--mauve-color), transparent 70%);
        border-color: var(--mauve-color);
        color: var(--mauve-color);
    }

    .configs__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 22px;
        max-width: 1300px;
        margin: 0 auto 60px auto;
        padding: 0 20px;
    }

    .configs__grid--qr {
        grid-template-columns: repeat(auto-fill, minmax(210px, 1fr));
        gap: 18px;
    }

    .configs__empty {
        text-align: center;
        padding: 60px 20px;
        opacity: 0.55;
        font-size: 18px;
        color: var(--text-color);
    }

    .card {
        background: color-mix(in srgb, var(--surface-color), transparent 60%);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        isolation: isolate;
        transform: translateZ(0);
        border-radius: 20px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        display: flex;
        flex-direction: column;
        gap: 14px;
        transition: transform 0.3s, box-shadow 0.4s;
    }

    .card:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
    }

    .card--qr {
        align-items: center;
        text-align: center;
    }

    .card__header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
        width: 100%;
    }

    .card__id {
        font-size: 22px;
        font-weight: 700;
        color: var(--text-color);
    }

    .card__badge {
        font-size: 10px;
        padding: 4px 10px;
        border-radius: 8px;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        align-items: center;
        gap: 5px;
    }

    .card__badge--recommended {
        background: var(--yellow-color);
        color: var(--recommended-color);
    }

    .card__badge--sni {
        background: var(--mauve-color);
        color: var(--sni-color);
    }

    .card__stats-row {
        display: flex;
        gap: 15px;
        font-size: 13px;
        opacity: 0.8;
        color: var(--text-color);
    }

    .card__stat {
        display: flex;
        align-items: center;
        gap: 6px;
    }

    .card__stats-mini {
        display: flex;
        gap: 12px;
        font-size: 12px;
        opacity: 0.6;
        margin-bottom: 4px;
    }

    .card__url-box {
        background: var(--crust-color);
        border-radius: 12px;
        padding: 12px;
        flex: 1;
        width: 100%;
        box-sizing: border-box;
        overflow: hidden;
    }

    .card__url-text {
        font-family: monospace;
        font-size: 11.5px;
        word-break: break-all;
        opacity: 0.75;
        line-height: 1.5;
        color: var(--text-color);
    }

    .card__btn {
        background: var(--blue-color);
        color: var(--crust-color);
        border: none;
        border-radius: 12px;
        font-weight: 700;
        font-size: 14px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px;
        transition: filter 0.2s, transform 0.1s;
        width: 100%;
    }

    .card__btn:hover:not(:disabled) {
        filter: brightness(1.1);
        transform: translateY(-1px);
    }

    .card__btn:active:not(:disabled) {
        transform: translateY(0);
    }

    .card__btn:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }

    .card__btn--copied {
        background: var(--green-color);
    }

    .card__btn--error {
        background: var(--red-color);
    }

    .card__qr {
        background: #fff;
        padding: 10px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 14px rgba(0, 0, 0, 0.12);
        margin-bottom: 5px;
    }

    .card__qr-canvas {
        display: block;
        width: 150px;
        height: 150px;
    }

    @media (max-width: 768px) {
        .configs__controls {
            gap: 10px;
            padding: 0 15px;
        }

        .configs__search {
            min-width: auto;
            width: 100%;
            order: 3;
        }

        .configs__filters {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 5px;
            scrollbar-width: none;
            order: 2;
        }

        .configs__filters::-webkit-scrollbar {
            display: none;
        }

        .configs__tabs {
            width: 100%;
            order: 1;
        }

        .configs__tab {
            flex: 1;
            justify-content: center;
        }

        .configs__grid {
            padding: 0 15px;
        }
    }

    @media (max-width: 480px) {
        .configs__grid--qr {
            grid-template-columns: repeat(2, 1fr);
        }

        .configs__tab-text {
            display: none;
        }

        .configs__filter {
            padding: 0 12px;
            font-size: 12px;
        }
    }
</style>
