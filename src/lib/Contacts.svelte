<script>
    import { fly, fade } from 'svelte/transition';
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { 
        faHeadset, 
        faXmark, 
        faUser, 
        faChevronRight,
        faArrowLeft 
    } from "@fortawesome/free-solid-svg-icons";
    import { 
        faTelegram, 
        faVk 
    } from "@fortawesome/free-brands-svg-icons";

    let view = $state('closed'); 
    let screen = $state('main');

    function toggleMenu(e) {
        e.stopPropagation();
        if (view === 'closed') {
            view = 'open';
            screen = 'main';
        } else {
            view = 'closed';
        }
    }

    function closeMenu() { 
        view = 'closed'; 
    }
    
    function goToPM() { 
        screen = 'pm'; 
    }
    
    function goToMain() { 
        screen = 'main'; 
    }
</script>

<svelte:window onclick={closeMenu} />

<div class="contacts">
    {#if view === 'open'}
        <div 
            in:fly={{ y: 20, duration: 300 }} 
            out:fade={{ duration: 200 }} 
            class="contacts__modal"
            onclick={(e) => e.stopPropagation()} 
            role="presentation"
        >
            <div class="contacts__header">

                <h3 class="contacts__title">Поддержка</h3>
                <p class="contacts__subtitle">
                    {#if screen === 'main'}
                        Выберите удобный способ связи.
                    {:else}
                        Выберите удобный способ связаться с автором.
                    {/if}
                </p>
            </div>

            <div class="contacts__body">
                {#if screen === 'main'}
                    <a href="https://t.me/flat447_chat" target="_blank" class="contacts__item">
                        <div class="contacts__item-content">
                            <div class="contacts__icon-circle contacts__icon-circle--telegram">
                                <FontAwesomeIcon icon={faTelegram} />
                            </div>
                            <div class="contacts__item-text">
                                <h4 class="contacts__item-title">Чат проекта</h4>
                                <p class="contacts__item-desc">Написать в общий чат.</p>
                            </div>
                        </div>
                    </a>

                    <button onclick={goToPM} class="contacts__item">
                        <div class="contacts__item-content">
                            <div class="contacts__icon-circle contacts__icon-circle--pm">
                                <FontAwesomeIcon icon={faUser} />
                            </div>
                            <div class="contacts__item-text">
                                <h4 class="contacts__item-title">Личные сообщения</h4>
                                <p class="contacts__item-desc">Связаться с автором напрямую.</p>
                            </div>
                        </div>
                        <FontAwesomeIcon icon={faChevronRight} class="contacts__chevron" />
                    </button>
                {:else}
                    <button onclick={goToMain} class="contacts__item contacts__item--back">
                        <div class="contacts__item-content">
                            <FontAwesomeIcon icon={faArrowLeft} />
                            <span class="contacts__back-label">Назад</span>
                        </div>
                    </button>

                    <a href="https://t.me/flflat" target="_blank" class="contacts__item">
                        <div class="contacts__item-content">
                            <div class="contacts__icon-circle contacts__icon-circle--telegram">
                                <FontAwesomeIcon icon={faTelegram} />
                            </div>
                            <div class="contacts__item-text">
                                <h4 class="contacts__item-title">Telegram</h4>
                                <p class="contacts__item-desc">Личные сообщения в TG.</p>
                            </div>
                        </div>
                    </a>

                    <a href="https://vk.com/alexey20082012" target="_blank" class="contacts__item">
                        <div class="contacts__item-content">
                            <div class="contacts__icon-circle contacts__icon-circle--vk">
                                <FontAwesomeIcon icon={faVk} />
                            </div>
                            <div class="contacts__item-text">
                                <h4 class="contacts__item-title">VK</h4>
                                <p class="contacts__item-desc">Личные сообщения в ВК.</p>
                            </div>
                        </div>
                    </a>
                {/if}
            </div>
        </div>
    {/if}

    <button onclick={toggleMenu} class="contacts__toggle">
        <div class="contacts__button-ripple">
            <div class="contacts__ripple-dot"></div>
            <div class="contacts__ripple-ring"></div>
            <div class="contacts__ripple-ring"></div>
            <div class="contacts__ripple-ring"></div>
        </div>

        <div class="contacts__toggle-wrapper">
            {#if view === 'open'}
                <div in:fade class="contacts__toggle-icon"><FontAwesomeIcon icon={faXmark} /></div>
            {:else}
                <div in:fade class="contacts__toggle-icon"><FontAwesomeIcon icon={faHeadset} /></div>
            {/if}
        </div>
    </button>
</div>

<style>
    * {
        box-sizing: border-box;
    }

    .contacts {
        position: fixed;
        bottom: 20px; 
        right: 20px;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 15px;
        font-family: 'Segoe UI', system-ui, sans-serif;
        z-index: 9999;
    }

    .contacts__modal {
        width: 350px;
        background: color-mix(in srgb, var(--surface-color), transparent 40%); 
        border-radius: 24px; 
        padding: 20px; 
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2); 
    }

    .contacts__header {
        position: relative;
    }

    .contacts__title { 
        margin: 0 0 4px 0;
        font-size: 1.1rem; 
        color: var(--text-color); 
    }
    .contacts__subtitle { 
        margin: 0 0 20px 0;
        font-size: 0.9rem; 
        opacity: 0.7; 
        color: var(--text-color); 
    }

    .contacts__ripple-container, .contacts__button-ripple {
        position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        pointer-events: none;
    }

    .contacts__ripple-container {
        top: 20px;
        left: 20px;
        width: 16px; 
        height: 16px;
    }

    .contacts__button-ripple {
        top: 4px;
        left: 4px;
        width: 10px;
        height: 10px;
    }

    .contacts__ripple-dot {
        background-color: var(--blue-color);
        border-radius: 50%;
        position: absolute;
    }

    .contacts__ripple-container .contacts__ripple-dot {
        width: 10px;
        height: 10px;
    }

    .contacts__button-ripple .contacts__ripple-dot {
        width: 10px;
        height: 10px;
        background-color: var(--green-color); 
    }

    .contacts__ripple-ring {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        border: 2px solid var(--blue-color);
        box-sizing: border-box;
        animation: ripple 5s cubic-bezier(0, 0.2, 0.8, 1) infinite;
    }

    .contacts__button-ripple .contacts__ripple-ring {
        border-color: color-mix(in srgb, var(--green-color), transparent 30%);
    }

    .contacts__ripple-ring:nth-child(2) { animation-delay: -0.6s; }
    .contacts__ripple-ring:nth-child(3) { animation-delay: -1.2s; }

    @keyframes ripple {
        0% { 
            transform: scale(0.1); 
            opacity: 1; 
        }
        30% { 
            transform: scale(3.8); 
            opacity: 0; 
        }
        100% { 
            transform: scale(3.8); 
            opacity: 0; 
        }
    }

    .contacts__body { 
        display: flex;
        flex-direction: column; 
        gap: 8px; 
    }

    .contacts__item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background-color: rgba(128, 128, 128, 0.1);
        border: 1px solid rgba(128, 128, 128, 0.1); 
        border-radius: 16px; 
        color: var(--text-color); 
        text-decoration: none;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); 
    }

    .contacts__item:hover {
        background-color: rgba(128, 128, 128, 0.15);
        transform: translateY(-2px); 
        border-color: var(--blue-color); 
    }

    .contacts__item:hover .contacts__icon-circle {
        transform: rotate(-10deg);
    }

    .contacts__item--back {
        background-color: transparent;
        border-color: transparent; 
        justify-content: flex-start;
    }

    .contacts__item-content { 
        display: flex; 
        align-items: center; 
        gap: 12px;
        text-align: left; 
    }

    .contacts__icon-circle {
        width: 40px;
        height: 40px;
        border-radius: 12px; 
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        color: white;
        transition: transform 0.3s ease;
    }

    .contacts__icon-circle--telegram { background-color: color-mix(in srgb, var(--saphire-color), transparent 10%); }
    .contacts__icon-circle--pm { background-color: color-mix(in srgb, var(--green-color), transparent 30%); }
    .contacts__icon-circle--vk { background-color: color-mix(in srgb, var(--blue-color), transparent 20%); }

    .contacts__item-title { margin: 0; font-size: 0.95rem; font-weight: 600; }
    .contacts__item-desc { margin: 0; font-size: 0.75rem; opacity: 0.6; }

    .contacts__chevron { 
        font-size: 0.8rem; 
        opacity: 0.4;
        transition: transform 0.3s; 
    }

    .contacts__toggle {
        position: relative; 
        width: 60px; 
        height: 60px;
        border-radius: 50%;
        background-color: var(--blue-color); 
        color: var(--crust-color);
        border: none;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2); 
        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        overflow: visible; 
    }

    .contacts__toggle:hover {
        transform: scale(1.09); 
    }
</style>
