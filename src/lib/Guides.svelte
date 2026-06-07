<script>
    import { slide } from "svelte/transition";
    import { quintOut } from "svelte/easing";
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import {
        faChevronDown,
        faTriangleExclamation,
        faCircleQuestion,
        faRotate,
        faDownload,
        faComputer,
        faLaptop,
        faBook,
        faQrcode
    } from "@fortawesome/free-solid-svg-icons";
    import {
        faAndroid,
        faApple,
        faWindows,
        faLinux
    } from "@fortawesome/free-brands-svg-icons";
    import { i18n } from "./js/i18n.svelte";

    // Жёсткие ссылки (fallback если API недоступен)
    const FALLBACK_URLS = {
        'v2rayNG': 'https://github.com/2dust/v2rayNG/releases/download/2.2.3/v2rayNG_2.2.3-fdroid_universal.apk',
        'Throne-win10': 'https://github.com/throneproj/Throne/releases/download/1.1.5/Throne-1.1.5-windows64.zip',
        'Throne-win7': 'https://github.com/throneproj/Throne/releases/download/1.1.5/Throne-1.1.5-windowslegacy64.zip',
        'Throne-linux': 'https://github.com/throneproj/Throne/releases/download/1.1.5/Throne-1.1.5-linux-amd64.zip',
        'Hiddify': 'https://github.com/hiddify/hiddify-app/releases/download/latest/Hiddify-MacOS.dmg'
    };

    // Данные для запросов к API GitHub
    const GITHUB_REPOS = {
        'v2rayNG': { owner: '2dust', repo: 'v2rayNG', asset: 'v2rayNG_.*-fdroid_universal.apk' },
        'Throne': { owner: 'throneproj', repo: 'Throne', assets: { win10: 'windows64-installer.exe', win7: 'windowslegacy64.zip', linux: 'linux-amd64.zip' } },
        'Hiddify': { owner: 'hiddify', repo: 'hiddify-app', asset: 'Hiddify-MacOS.dmg' }
    };

    // Изолированное реактивное состояние для хранения динамических ссылок с GitHub
    let githubData = $state({
        v2rayNG: { url: FALLBACK_URLS.v2rayNG, version: '' },
        throne: { win10: FALLBACK_URLS['Throne-win10'], win7: FALLBACK_URLS['Throne-win7'], linux: FALLBACK_URLS['Throne-linux'], version: '' },
        hiddify: { url: FALLBACK_URLS.Hiddify, version: '' }
    });

    // Вспомогательные состояния для интерфейса аккордеонов
    let openPlatform = $state(null);
    let openProblems = $state({});
    let urlsLoaded = $state(false);

    // Вычисляемый массив данных, который автоматически пересобирается при изменении локали i18n
    let platforms = $derived([
        {
            id: 'android',
            icon: faAndroid,
            iconColor: 'var(--green-color)',
            title: i18n.t('guides.android.title'),
            downloadUrl: githubData.v2rayNG.url,
            downloadLabel: i18n.t('guides.android.download'),
            steps: [
                i18n.t('guides.android.step1'),
                i18n.t('guides.android.step2'),
                i18n.t('guides.android.step3'),
                i18n.t('guides.android.step4'),
                i18n.t('guides.android.step5')
            ],
            problems: [
                { title: i18n.t('guides.android.prob1_title'), answer: i18n.t('guides.android.prob1_ans') },
                { title: i18n.t('guides.android.prob2_title'), answer: i18n.t('guides.android.prob2_ans') },
                { title: i18n.t('guides.android.prob3_title'), answer: i18n.t('guides.android.prob3_ans') },
                { title: i18n.t('guides.android.prob4_title'), answer: i18n.t('guides.android.prob4_ans') }
            ], 
            updateSteps: [
                i18n.t('guides.android.upd1'),
                i18n.t('guides.android.upd2'),
                i18n.t('guides.android.upd3')
            ]
        },
        {
            id: 'androidtv',
            icon: faAndroid,
            iconColor: 'var(--teal-color)',
            title: i18n.t('guides.atv.title'),
            downloadSections: [
                {
                    items: [
                        {
                            url: githubData.v2rayNG.url,
                            label: i18n.t('guides.android.download'),
                            icon: faDownload,
                            variant: 'platform-androidtv'
                        }
                    ]
                }
            ],
            steps: [
                i18n.t('guides.atv.step1'),
                i18n.t('guides.atv.step2'),
                i18n.t('guides.atv.step3'),
                i18n.t('guides.atv.step4'),
                i18n.t('guides.atv.step5')
            ],  
            problems: [
                { title: i18n.t('guides.atv.prob1_title'), answer: i18n.t('guides.atv.prob1_ans') },
                { title: i18n.t('guides.atv.prob2_title'), answer: i18n.t('guides.atv.prob2_ans') },
                { title: i18n.t('guides.atv.prob3_title'), answer: i18n.t('guides.atv.prob3_ans') }
            ],
            updateSteps: [
                i18n.t('guides.android.upd1'),
                i18n.t('guides.android.upd2'),
                i18n.t('guides.android.upd3')
            ]
        },
        {
            id: 'windows',
            icon: faComputer,
            iconColor: 'var(--blue-color)',
            title: i18n.t('guides.win.title'),
            downloadSections: [
                {
                    items: [
                        {
                            url: githubData.throne.win10,
                            label: i18n.t('guides.win.dl_win10'),
                            icon: faWindows,
                            variant: 'throne-win10'
                        },
                        {
                            url: githubData.throne.win7,
                            label: i18n.t('guides.win.dl_win7'),
                            icon: faWindows,
                            variant: 'throne-win7'
                        },
                        {
                            url: githubData.throne.linux,
                            label: i18n.t('guides.win.dl_linux'),
                            icon: faLinux,
                            variant: 'throne-linux-x64'
                        }
                    ]
                }
            ],
            steps: [
                i18n.t('guides.win.step1'),
                i18n.t('guides.win.step2'),
                i18n.t('guides.win.step3'),
                i18n.t('guides.win.step4'),
                i18n.t('guides.win.step5'),
                i18n.t('guides.win.step6'),
                i18n.t('guides.win.step7')
            ],
            warningBlock: {
                title: i18n.t('guides.win.warn_title'),
                text: i18n.t('guides.win.warn_text'),
                downloadUrl: 'https://aka.ms/vs/17/release/vc_redist.x64.exe',
                downloadLabel: i18n.t('guides.win.warn_dl'),
                note: i18n.t('guides.win.warn_note')
            },
            problems: [
                { title: i18n.t('guides.win.prob1_title'), answer: i18n.t('guides.win.prob1_ans') },
                { title: i18n.t('guides.win.prob2_title'), answer: i18n.t('guides.win.prob2_ans') },
                { title: i18n.t('guides.win.prob3_title'), answer: i18n.t('guides.win.prob3_ans') }
            ],
            updateSteps: [
                i18n.t('guides.win.upd1'),
                i18n.t('guides.win.upd2'),
                i18n.t('guides.win.upd3')
            ]
        },
        {
            id: 'ios',
            icon: faApple,
            iconColor: 'var(--text-color)',
            title: i18n.t('guides.ios.title'),
            downloadUrl: 'https://apps.apple.com/us/app/streisand/id6450534064',
            downloadLabel: i18n.t('guides.ios.download'),
            steps: [
                i18n.t('guides.ios.step1'),
                i18n.t('guides.ios.step2'),
                i18n.t('guides.ios.step3'),
                i18n.t('guides.ios.step4'),
                i18n.t('guides.ios.step5')
            ],
            problems: [
                { title: i18n.t('guides.ios.prob1_title'), answer: i18n.t('guides.ios.prob1_ans') },
                { title: i18n.t('guides.ios.prob2_title'), answer: i18n.t('guides.ios.prob2_ans') }
            ],
            updateSteps: [
                i18n.t('guides.ios.upd1')
            ]
        },
        {
            id: 'macos',
            icon: faLaptop,
            iconColor: 'var(--mauve-color)',
            title: i18n.t('guides.mac.title'),
            downloadUrl: githubData.hiddify.url,
            downloadLabel: i18n.t('guides.mac.download'),
            steps: [
                i18n.t('guides.mac.step1'),
                i18n.t('guides.mac.step2'),
                i18n.t('guides.mac.step3'),
                i18n.t('guides.mac.step4'),
                i18n.t('guides.mac.step5'),
                i18n.t('guides.mac.step6'),
                i18n.t('guides.mac.step7'),
                i18n.t('guides.mac.step8')
            ],
            problems: [
                { title: i18n.t('guides.mac.prob1_title'), answer: i18n.t('guides.mac.prob1_ans') },
                { title: i18n.t('guides.mac.prob2_title'), answer: i18n.t('guides.mac.prob2_ans') }
            ],
            updateSteps: [
                i18n.t('guides.mac.upd1'),
                i18n.t('guides.mac.upd2')
            ]
        }
    ]);

    function togglePlatform(id) {
        openPlatform = openPlatform === id ? null : id;
        if (openPlatform !== id) openProblems = {};
    }

    function toggleProblem(platformId, problemIdx) {
        const key = `${platformId}-${problemIdx}`;
        openProblems = { ...openProblems, [key]: !openProblems[key] };
    }

    // Запрос к GitHub API
    async function fetchLatestRelease(owner, repo) {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/releases/latest`, {
                headers: {
                    'Accept': 'application/vnd.github.v3+json'
                }
            });
            if (!response.ok) throw new Error(`GitHub API error: ${response.status}`);
            const data = await response.json();
            return {
                tag_name: data.tag_name,
                assets: data.assets || [],
                published_at: data.published_at
            };
        } catch (error) {
            console.warn(`Failed to fetch release for ${owner}/${repo}:`, error);
            return null;
        }
    }

    function findAsset(assets, pattern) {
        const regex = new RegExp(pattern, 'i');
        return assets.find(asset => regex.test(asset.name));
    }

    // Динамическая загрузка ссылок
    async function loadLatestUrls() {
        try {
            const [v2rayRelease, throneRelease, hiddifyRelease] = await Promise.all([
                fetchLatestRelease('2dust', 'v2rayNG'),
                fetchLatestRelease('throneproj', 'Throne'),
                fetchLatestRelease('hiddify', 'hiddify-app')
            ]);

            // Обновление v2rayNG
            if (v2rayRelease?.assets) {
                const asset = findAsset(v2rayRelease.assets, 'fdroid_universal.apk');
                if (asset?.browser_download_url) {
                    githubData.v2rayNG.url = asset.browser_download_url;
                    githubData.v2rayNG.version = v2rayRelease.tag_name;
                }
            }

            // Обновление Throne
            if (throneRelease?.assets) {
                const win10 = findAsset(throneRelease.assets, 'windows64-installer.exe');
                if (win10?.browser_download_url) githubData.throne.win10 = win10.browser_download_url;

                const win7 = findAsset(throneRelease.assets, 'windowslegacy64.zip');
                if (win7?.browser_download_url) githubData.throne.win7 = win7.browser_download_url;

                const linux = findAsset(throneRelease.assets, 'linux-amd64.zip');
                if (linux?.browser_download_url) githubData.throne.linux = linux.browser_download_url;
                
                githubData.throne.version = throneRelease.tag_name;
            }

            // Обновление Hiddify
            if (hiddifyRelease?.assets) {
                const asset = findAsset(hiddifyRelease.assets, 'Hiddify-MacOS.dmg');
                if (asset?.browser_download_url) {
                    githubData.hiddify.url = asset.browser_download_url;
                    githubData.hiddify.version = hiddifyRelease.tag_name;
                }
            }

            urlsLoaded = true;
        } catch (error) {
            console.error('Error loading URLs:', error);
            urlsLoaded = true;
        }
    }

    if (typeof window !== 'undefined') {
        loadLatestUrls();
    }
</script>

<section class="guides animate-in" style="--delay: 0.65s">
    <h2 class="guides__title">
        <FontAwesomeIcon icon={faBook} /> {i18n.t('guides.title')}
    </h2>

    <div class="guides__list">
        {#each platforms as platform}
            {@const isOpen = openPlatform === platform.id}
            <div class="guides__accordion-item" class:guides__accordion-item--open={isOpen}>
                <button
                    class="guides__header"
                    onclick={() => togglePlatform(platform.id)}
                    aria-expanded={isOpen}
                >
                    <span class="guides__header-info">
                        <span class="guides__header-badge" style="--guides-header-accent: {platform.iconColor}">
                            <span class="guides__header-badge-icon" style="color: {platform.iconColor}">
                                <FontAwesomeIcon icon={platform.icon} />
                            </span>
                        </span>
                        <span class="guides__header-heading">{platform.title}</span>
                    </span>
                    <span class="guides__header-chevron-box" class:guides__header-chevron-box--open={isOpen}>
                        <span class="guides__header-chevron" class:guides__header-chevron--open={isOpen}>
                            <FontAwesomeIcon icon={faChevronDown} />
                        </span>
                    </span>
                </button>

                {#if isOpen}
                    <div class="guides__content" transition:slide={{easing: quintOut, duration: 250}}>
                        {#if platform.downloadLabel} 
                            <a class="guides__download guides__download--platform-{platform.id}"
                               href={platform.downloadUrl}
                               target="_blank"
                               rel="noopener noreferrer"
                            >
                                <FontAwesomeIcon icon={faDownload} />
                                {platform.downloadLabel}
                            </a>
                        {/if}

                        {#if platform.downloadSections}
                            <div class="guides__download-layout">
                                {#each platform.downloadSections as section}
                                    <div class="guides__download-layout-links">
                                        {#each section.items as item}
                                            <a class="guides__download guides__download--multi guides__download--{item.variant}" 
                                               href={item.url} 
                                               target="_blank" 
                                               rel="noopener noreferrer"
                                            >
                                                <FontAwesomeIcon icon={item.icon} />
                                                {item.label}
                                            </a>
                                        {/each}
                                    </div>
                                    {/each}
                            </div>
                        {/if}

                        <ol class="guides__step-list">
                            {#each platform.steps as step}
                                <li class="guides__step-list-item">
                                    {@html step}
                                </li>
                            {/each}
                        </ol>

                        {#if platform.warningBlock}
                            <div class="guides__warning">
                                <div class="guides__warning-title">
                                    <FontAwesomeIcon icon={faTriangleExclamation} />
                                    {platform.warningBlock.title}
                                </div>
                                <p class="guides__warning-text">{platform.warningBlock.text}</p>
                                <a
                                    class="guides__download guides__download--danger"
                                    href={platform.warningBlock.downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <FontAwesomeIcon icon={faDownload} />
                                    {platform.warningBlock.downloadLabel}
                                </a>
                                {#if platform.warningBlock.note}
                                    <p class="guides__warning-note">{platform.warningBlock.note}</p>
                                {/if}
                            </div>
                        {/if}

                        <div class="guides__faq-title">
                            <FontAwesomeIcon icon={faTriangleExclamation} />
                            {i18n.t('guides.problems_title')}
                        </div>

                        <div class="guides__faq-list">
                            {#each platform.problems as problem, idx}
                                {@const key = `${platform.id}-${idx}`}
                                {@const problemOpen = !!openProblems[key]}
                                <div class="guides__faq-item" class:guides__faq-item--open={problemOpen}>
                                    <button
                                        class="guides__faq-item-trigger"
                                        onclick={() => toggleProblem(platform.id, idx)}
                                        aria-expanded={problemOpen}
                                    >
                                        <span class="guides__faq-item-trigger-main">
                                            <span class="guides__faq-item-trigger-icon">
                                                <FontAwesomeIcon icon={faCircleQuestion} />
                                            </span>
                                            <span class="guides__faq-item-question">{problem.title}</span>
                                        </span>
                                        <span class="guides__faq-item-chevron" class:guides__faq-item-chevron--open={problemOpen}>
                                            <FontAwesomeIcon icon={faChevronDown} />
                                        </span>
                                    </button>
                                    {#if problemOpen}
                                    <div class="guides__faq-item-answer" 
                                    in:slide={{ duration: 200, easing: quintOut }} 
                                    out:slide={{ duration: 200, easing: quintOut }}>
                                            {problem.answer}
                                        </div>
                                    {/if}
                                </div>
                            {/each}
                        </div>

                        {#if platform.updateSteps}
                            <div class="guides__refresh">
                                <div class="guides__refresh-title">
                                    <span class="guides__refresh-icon">
                                        <FontAwesomeIcon icon={faRotate} />
                                    </span>
                                    {i18n.t('guides.update_title')}
                                </div>
                                <ol class="guides__refresh-steps">
                                    {#each platform.updateSteps as step}
                                        <li>{@html step}</li>
                                    {/each}
                                </ol>
                            </div>
                        {/if}
                    </div>
                {/if}
            </div>
        {/each}
    </div>
</section>

<style>
    /* В ритме карточек конфигов и Grid: surface, цветные акценты catppuccin */
    .guides {
        max-width: 60rem;
        margin: 0 auto 2.5rem;
        padding: 0 1.25rem;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .guides__title {
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
        color: var(--text-color);
        margin-bottom: 1.25rem;
        letter-spacing: 0.01em;
    }

    .guides__list {
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
    }

    .guides__accordion-item {
        background: color-mix(in srgb, var(--surface-color), transparent 60%);
        -webkit-backdrop-filter: blur(14px);
        backdrop-filter: blur(14px);
        isolation: isolate;
        transform: translateZ(0);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        overflow: hidden;
        box-shadow: none;
        transition:
            border-color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(.light-theme) .guides__accordion-item {
        background: color-mix(in srgb, var(--surface-color), transparent 45%);
        border: 1px solid var(--surface-color);
    }

    .guides__accordion-item--open {
        border-color: color-mix(in srgb, var(--blue-color), transparent 45%);
        background: color-mix(in srgb, var(--surface-color), transparent 52%);
        box-shadow: 0 8px 24px color-mix(in srgb, var(--blue-color), transparent 88%);
    }

    :global(.light-theme) .guides__accordion-item--open {
        border-color: color-mix(in srgb, var(--blue-color), transparent 35%);
        box-shadow: 0 6px 20px color-mix(in srgb, var(--blue-color), transparent 82%);
    }

    .guides__header {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        padding: 0.85rem 1rem;
        background: none;
        border: none;
        cursor: pointer;
        color: var(--text-color);
        text-align: left;
        transition: background 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        font-family: inherit;
        position: relative;
        z-index: 1;
    }

    .guides__header:hover {
        background: color-mix(in srgb, var(--crust-color), transparent 12%);
    }

    :global(.light-theme) .guides__header:hover {
        background: color-mix(in srgb, var(--crust-color), transparent 35%);
    }

    .guides__header-info {
        display: flex;
        align-items: center;
        gap: 0.875rem;
        min-width: 0;
        font-size: 1.1rem;
        font-weight: 700;
        color: var(--text-color);
    }

    .guides__header-badge {
        width: 2.25rem;
        height: 2.25rem;
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: color-mix(in srgb, var(--guides-header-accent, var(--blue-color)), transparent 78%);
        border: 1px solid color-mix(in srgb, var(--guides-header-accent, var(--blue-color)), transparent 52%);
        transition: transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .guides__header:hover .guides__header-badge {
        transform: scale(1.1);
    }

    .guides__header-badge-icon {
        font-size: 1.6rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .guides__header-heading {
        line-height: 1.25;
    }

    .guides__header-chevron-box {
        width: 2rem;
        height: 2rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        color: color-mix(in srgb, var(--text-color), transparent 45%);
        transition:
            background 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            color 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .guides__header:hover .guides__header-chevron-box {
        color: var(--text-color);
    }

    .guides__header-chevron-box--open {
        background: color-mix(in srgb, var(--blue-color), transparent 78%);
        color: var(--blue-color);
    }

    .guides__header-chevron,
    .guides__faq-item-chevron {
        font-size: 1.1rem;
        transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .guides__header-chevron--open,
    .guides__faq-item-chevron--open {
        transform: rotate(180deg);
    }

    .guides__faq-item-chevron {
        color: color-mix(in srgb, var(--text-color), transparent 45%);
        flex-shrink: 0;
    }

    .guides__faq-item-chevron--open {
        color: var(--blue-color);
    }

    .guides__content {
        border-top: 1px solid rgba(255, 255, 255, 0.08);
        background: color-mix(in srgb, var(--crust-color), transparent 36%);
        padding: 1rem 1rem 1.1rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    :global(.light-theme) .guides__content {
        border-top-color: var(--surface-color);
        background: color-mix(in srgb, var(--crust-color), transparent 25%);
    }

    .guides__download-layout {
        display: flex;
        flex-direction: column;
        gap: 1.25rem;
    }

    .guides__download-layout-title {
        font-size: 0.9rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: color-mix(in srgb, var(--blue-color), var(--text-color) 35%);
        margin-bottom: 0.4rem;
    }

    .guides__download-layout-links {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
    }

    /* Как card__btn: сплошные бренд-цвета + crust для контраста */
    .guides__download {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        font-weight: 700;
        font-size: 0.9rem;
        line-height: 1.25;
        border-radius: 12px;
        padding: 0.5rem 1rem;
        text-decoration: none;
        border: none;
        box-shadow: none;
        transition:
            filter 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
        align-self: flex-start;
    }

    .guides__download:hover {
        filter: brightness(1.2);
        transform: translateY(-2px);
    }

    .guides__download:active {
        transform: translateY(0);
        filter: brightness(0.98);
    }

    .guides__download :global(svg) {
        font-size: 0.95em;
    }

    .guides__download--multi {
        font-size: 0.8125rem;
        padding: 0.5rem 0.95rem;
    }

    .guides__download--throne-win10 {
        background: var(--blue-color);
        color: var(--crust-color);
    }

    .guides__download--throne-win7 {
        background: var(--surface-color);
        color: var(--text-color);
        border: 1px solid color-mix(in srgb, var(--blue-color), transparent 40%);
    }

    .guides__download--throne-linux-x64 {
        background: color-mix(in srgb, var(--mauve-color), var(--crust-color) 55%);
        color: var(--text-color);
        border: 1px solid color-mix(in srgb, var(--mauve-color), transparent 35%);
    }

    .guides__download--platform-android {
        background: var(--green-color);
        color: var(--crust-color);
    }

    .guides__download--platform-androidtv {
        background: var(--teal-color);
        color: var(--crust-color);
    }

    .guides__download--platform-ios {
        background: var(--mauve-color);
        color: var(--crust-color);
    }

    .guides__download--platform-macos {
        background: color-mix(in srgb, var(--mauve-color), var(--pink-color) 35%);
        color: var(--crust-color);
    }

    .guides__download--danger {
        font-size: 0.9rem;
        padding: 0.5rem 0.9rem;
        background: var(--red-color);
        color: var(--crust-color);
    }

    .guides__warning {
        background: color-mix(in srgb, var(--peach-color), transparent 88%);
        border: 1px solid color-mix(in srgb, var(--peach-color), transparent 45%);
        border-radius: 14px;
        padding: 0.75rem 0.9rem;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        box-shadow: none;
    }

    :global(.light-theme) .guides__warning {
        background: color-mix(in srgb, var(--peach-color), transparent 92%);
        border-color: color-mix(in srgb, var(--peach-color), transparent 38%);
    }

    .guides__warning-title {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.9rem;
        font-weight: 700;
        color: color-mix(in srgb, var(--peach-color), var(--text-color) 15%);
    }

    .guides__warning-title :global(svg) {
        color: var(--peach-color);
        opacity: 1;
    }

    .guides__warning-text {
        font-size: 0.91rem;
        line-height: 1.6;
        color: var(--text-color);
    }

    .guides__warning-note {
        font-size: 0.9rem;
        font-style: italic;
        color: color-mix(in srgb, var(--text-color), transparent 35%);
    }

    .guides__warning-note :global(code) {
        font-family: ui-monospace, monospace;
        font-size: 0.8rem;
        padding: 0.1em 0.35em;
        border-radius: 0.25rem;
        background: color-mix(in srgb, var(--surface-color), transparent 30%);
    }

    /* Steps — list-decimal list-inside */
    .guides__step-list {
        list-style: decimal;
        list-style-position: inside;
        display: flex;
        flex-direction: column;
        gap: 0.65rem;
        padding: 0;
        margin: 0;
        font-size: 0.9125rem;
        line-height: 1.6;
        color: color-mix(in srgb, var(--text-color), transparent 8%);
    }

    .guides__step-list-item {
        display: list-item;
        text-align: left;
    }

    .guides__step-list-item :global(b),
    .guides__step-list-item :global(strong) {
        font-weight: 700;
        color: color-mix(in srgb, var(--blue-color), var(--text-color) 12%);
    }

    .guides__faq-title {
        display: flex;
        align-items: center;
        gap: 0.45rem;
        font-size: 0.9125rem;
        font-weight: 700;
        color: var(--yellow-color);
        border-bottom: 1px solid color-mix(in srgb, var(--yellow-color), transparent 55%);
        padding-bottom: 0.45rem;
        margin-bottom: 0.15rem;
    }

    .guides__faq-title :global(svg) {
        opacity: 0.95;
        color: var(--yellow-color);
    }

    .guides__faq-list {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
    }

    .guides__faq-item {
        background: color-mix(in srgb, var(--surface-color), transparent 58%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 12px;
        overflow: hidden;
        box-shadow: none;
        transition:
            border-color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            box-shadow 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    :global(.light-theme) .guides__faq-item {
        background: color-mix(in srgb, var(--surface-color), transparent 40%);
        border-color: var(--surface-color);
    }

    .guides__faq-item:hover {
        border-color: color-mix(in srgb, var(--blue-color), transparent 48%);
    }

    .guides__faq-item--open {
        border-color: color-mix(in srgb, var(--blue-color), transparent 38%);
        box-shadow: 0 4px 14px color-mix(in srgb, var(--blue-color), transparent 92%);
    }

    .guides__faq-item-trigger-main {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        min-width: 0;
        flex: 1;
    }

    .guides__faq-item-trigger {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 0.75rem;
        padding: 0.75rem 0.85rem;
        background: none;
        border: none;
        cursor: pointer;
        color: color-mix(in srgb, var(--text-color), transparent 5%);
        font-size: clamp(0.8125rem, 2.5vw, 0.875rem);
        font-weight: 600;
        text-align: left;
        font-family: inherit;
        transition:
            color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            background 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .guides__faq-item-trigger:hover {
        color: var(--blue-color);
        background: color-mix(in srgb, var(--blue-color), transparent 92%);
    }

    .guides__faq-item-trigger-icon {
        display: flex;
        align-items: center;
        flex-shrink: 0;
        font-size: 0.95rem;
        color: var(--blue-color);
        transition:
            color 0.75s cubic-bezier(0.22, 1, 0.36, 1),
            transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .guides__faq-item-trigger:hover .guides__faq-item-trigger-icon {
        color: var(--blue-color);
        transform: scale(1.3);
    }

    .guides__faq-item-question {
        min-width: 0;
        text-align: left;
    }

    /* Ответ: без боковой полосы (она ломала сетку с заголовком), только разделитель как у карточек */
    .guides__faq-item-answer {
        margin: 0;
        padding: 0.45rem 0.85rem 0.75rem;
        font-size: 0.9125rem;
        line-height: 1.55;
        color: color-mix(in srgb, var(--text-color), transparent 12%);
        border-top: 1px solid rgba(255, 255, 255, 0.07);
    }

    .guides__refresh {
        background: color-mix(in srgb, var(--blue-color), transparent 82%);
        border: 1px solid color-mix(in srgb, var(--blue-color), transparent 52%);
        border-radius: 14px;
        padding: 0.85rem 0.95rem;
        display: flex;
        transition: 0.3s;
        flex-direction: column;
        gap: 0.45rem;
        box-shadow: none;
        &:hover {
            transform: translateY(-5px);
            filter: drop-shadow(5px 15px 7px var(--surface-color)) brightness(1.1);
        }
    }

    :global(.light-theme) .guides__refresh {
        background: color-mix(in srgb, var(--blue-color), transparent 88%);
        border-color: color-mix(in srgb, var(--blue-color), transparent 42%);
    }

    .guides__refresh-title {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.9125rem;
        font-weight: 700;
        color: var(--blue-color);
        margin-bottom: 0;
    }

    .guides__refresh-icon {
        width: 1.6rem;
        height: 1.6rem;
        border-radius: 10px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        background: color-mix(in srgb, var(--blue-color), transparent 72%);
        color: var(--blue-color);
        font-size: 0.85rem;
    }

    .guides__refresh-steps {
        list-style: decimal;
        list-style-position: inside;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;
        padding: 0;
        margin: 0 0 0 0.15rem;
        font-size: 0.9125rem;
        line-height: 1.52;
        color: color-mix(in srgb, var(--text-color), transparent 8%);
    }

    .guides__refresh-steps li {
        display: list-item;
    }

    .guides__refresh-steps li :global(b),
    .guides__refresh-steps li :global(strong) {
        color: color-mix(in srgb, var(--blue-color), var(--text-color) 8%);
        font-weight: 700;
    }

    :global(.animate-in) {
        animation: fadeUp 0.55s cubic-bezier(0.22, 1, 0.36, 1) var(--delay, 0s) both;
    }

    @keyframes fadeUp {
        from {
            opacity: 0;
            transform: translateY(24px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media (max-width: 768px) {
        .guides {
            padding: 0 0.9375rem;
        }

        .guides__title {
            font-size: 1.3rem;
            margin-bottom: 1.1rem;
        }

        .guides__header {
            padding: 0.8rem 0.85rem;
        }

        .guides__header-info {
            font-size: 1.0375rem;
            gap: 0.65rem;
        }

        .guides__content {
            padding: 0.85rem 0.85rem 1rem;
        }
    }
</style>
