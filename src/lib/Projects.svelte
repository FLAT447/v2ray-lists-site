<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faNetworkWired, faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
    import { faGithub, faAndroid } from "@fortawesome/free-brands-svg-icons";
    import { i18n } from './js/i18n.svelte';

    const projects = [
        {
            id: 'dns_benchmark',
            icon: faNetworkWired,
            badge: 'Android',
            badgeIcon: faAndroid,
            badgeClass: 'project__badge--green',
            iconClass: 'project__icon--blue',
            descKey: 'projects.dns_benchmark.desc',
            url: 'https://github.com/FLAT447/DnsBenchmark'
        }
    ];
</script>

<section class="projects">
    <div class="projects__header">
        <div class="projects__heading">
            <h2 class="projects__title">{i18n.t('projects.title')}</h2>
        </div>
    </div>

    <div class="projects__grid">
        {#each projects as p}
            <a class="project" href={p.url} target="_blank" rel="noopener noreferrer">
                <div class="project__header">
                    <div class="project__icon {p.iconClass}">
                        <FontAwesomeIcon icon={p.icon} />
                    </div>
                    <div class="project__title-block">
                        <h3 class="project__name">{i18n.t(`projects.${p.id}.name`)}</h3>
                        <span class="project__badge {p.badgeClass}">
                            <FontAwesomeIcon icon={p.badgeIcon} />
                            {p.badge}
                        </span>
                    </div>
                </div>

                <p class="project__description">{i18n.t(p.descKey)}</p>

                <div class="project__footer">
                    <span class="project__link">
                        <FontAwesomeIcon icon={faGithub} />
                        <span>{i18n.t('projects.github_link')}</span>
                    </span>
                    <FontAwesomeIcon icon={faArrowUpRightFromSquare} class="project__link-arrow" />
                </div>
            </a>
        {/each}
    </div>
</section>

<style>
    * {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    .projects {
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 20px 60px 20px;
    }

    .projects__header {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: flex-end;
        gap: 20px;
        margin-bottom: 28px;
    }

    .projects__heading {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-width: 640px;
    }

    .projects__title {
        font-size: 2rem;
        font-weight: 700;
        color: var(--text-color);
        letter-spacing: -0.01em;
    }

    .projects__subtitle {
        font-size: 15px;
        opacity: 0.6;
        color: var(--text-color);
        line-height: 1.55;
    }

    .projects__all-btn {
        display: flex;
        align-items: center;
        gap: 10px;
        background: color-mix(in srgb, var(--surface-color), transparent 60%);
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 14px;
        height: var(--control-height);
        padding: 0 22px;
        color: var(--text-color);
        text-decoration: none;
        font-weight: 600;
        font-size: 14px;
        white-space: nowrap;
        transition: background 0.2s, transform 0.2s, color 0.2s;
        flex-shrink: 0;
    }
    .projects__all-btn:hover {
        background: var(--surface-color);
        color: var(--blue-color);
        transform: translateY(-2px);
    }

    .projects__grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 22px;
    }

    .project {
        position: relative;
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
        text-decoration: none;
        color: inherit;
        transition: transform 0.3s, box-shadow 0.4s, border-color 0.3s;
    }
    .project:hover {
        transform: translateY(-5px);
        box-shadow: 0 12px 28px rgba(0, 0, 0, 0.22);
        border-color: color-mix(in srgb, var(--blue-color), transparent 60%);
    }
    .project:hover .project__icon {
        transform: scale(1.25) rotate(15deg);
        box-shadow: 0 0 30px rgba(59, 130, 246, 0.8), 0 0 50px rgba(59, 130, 246, 0.5), inset 0 0 15px rgba(59, 130, 246, 0.4);
        background-color: color-mix(in srgb, var(--blue-color), transparent 70%);
    }
    .project:hover .project__link { opacity: 0.75; }
    .project:hover :global(.project__link-arrow) { opacity: 1; transform: translate(2px, -2px); }

    .project__header {
        display: flex;
        align-items: center;
        gap: 14px;
    }

    .project__icon {
        color: var(--blue-color);
        background-color: color-mix(in srgb, var(--blue-color), transparent 85%);
        border-radius: 12px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        font-size: 19px;
        flex-shrink: 0;
        transition: color 0.8s ease, background-color 0.8s ease, transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.8s ease;
    }

    .project__title-block {
        display: flex;
        flex-direction: column;
        gap: 6px;
        min-width: 0;
    }

    .project__name {
        font-size: 19px;
        font-weight: 700;
        color: var(--text-color);
        line-height: 1.2;
    }

    .project__badge {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 12px;
        font-weight: 700;
        padding: 4px 10px;
        border-radius: 8px;
        width: fit-content;
    }
    .project__badge--blue {
        color: var(--blue-color);
        background-color: color-mix(in srgb, var(--blue-color), transparent 85%);
    }
    .project__badge--green {
        color: var(--green-color);
        background-color: color-mix(in srgb, var(--green-color), transparent 85%);
    }
    .project__badge--mauve {
        color: var(--mauve-color);
        background-color: color-mix(in srgb, var(--mauve-color), transparent 85%);
    }
    .project__badge--peach {
        color: var(--peach-color);
        background-color: color-mix(in srgb, var(--peach-color), transparent 85%);
    }

    .project__description {
        font-size: 14px;
        line-height: 1.6;
        opacity: 0.75;
        color: var(--text-color);
        flex: 1;
        padding-bottom: 14px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.06);
    }

    .project__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
    }

    .project__link {
        display: flex;
        align-items: center;
        gap: 10px;
        color: var(--blue-color);
        font-weight: 600;
        font-size: 14px;
        transition: opacity 0.2s;
    }

    .project :global(.project__link-arrow) {
        font-size: 12px;
        color: var(--blue-color);
        opacity: 0.5;
        transition: opacity 0.2s, transform 0.2s;
    }

    @media (max-width: 480px) {
        .projects__header { flex-direction: column; align-items: stretch; }
        .projects__all-btn { width: 100%; justify-content: center; }
    }
</style>
