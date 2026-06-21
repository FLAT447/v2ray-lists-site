<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faTimes, faHeart, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
    import { faTelegram } from "@fortawesome/free-brands-svg-icons";
    import { i18n } from "./js/i18n.svelte";
    import { fade, scale } from "svelte/transition";
    import { onDestroy } from "svelte";
    import { mount, unmount } from "svelte";
    import ModalPortal from "./ModalPortal.svelte";

    let isOpen = $state(false);

    // Общий реактивный объект состояния: передаём его в портал по ссылке,
    // чтобы мутации полей были видны внутри уже смонтированного дерева
    // (mount() в Svelte 5 не обновляет пропсы через portalInstance.* — это не реактивно).
    let portalState = $state({ copiedAddress: null, toastMessage: '' });

    // Контейнер, монтируемый прямо в <body>
    let portalTarget = $state(null);
    let portalInstance = $state(null);

    const supportMethods = [
        {
            id: 'ton',
            label: 'TON',
            address: 'UQBRZI9s95gtehUkm_NESZ-HJOmhJlHn025uu_Uqn1xfhlCR',
            color: '#0088cc'
        },

        {
            id: 'eth',
            label: 'Ethereum',
            address: '0x08DCB85468d46E1D48094d8945B762fCF6F3AD64',
            color: '#627eea'
        },

        {
            id: 'usdt',
            label: 'USDT (TRC20)',
            address: 'TUadZfsYhCsCEje852r4mWichUWvGcvY5E',
            color: '#009494'
        },

        {
            id: 'btc',
            label: 'Bitcoin',
            address: 'bc1q485z2g5gan0qmdyrg2r672ua2tukk08ns92s56',
            color: '#f8931a'
        }
    ];

    function openModal() {
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        document.documentElement.style.setProperty('--scrollbar-compensation', `${scrollbarWidth}px`);
        isOpen = true;
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = `${scrollbarWidth}px`;

        // Создаём div прямо в body — вне любых трансформируемых предков
        portalTarget = document.createElement('div');
        document.body.appendChild(portalTarget);
        portalInstance = mount(ModalPortal, {
            target: portalTarget,
            props: {
                supportMethods,
                portalState,
                onClose: closeModal,
                onCopy: copyAddress,
                onTelegram: openTelegram,
                onDonate: openDonate,
            }
        });
    }

    function closeModal() {
        isOpen = false;
        document.body.style.overflow = '';
        document.body.style.paddingRight = '';
        document.documentElement.style.removeProperty('--scrollbar-compensation');

        if (portalInstance) {
            unmount(portalInstance);
            portalInstance = null;
        }
        if (portalTarget) {
            portalTarget.remove();
            portalTarget = null;
        }
    }

    async function copyAddress(address, label) {
        try {
            await navigator.clipboard.writeText(address);
            portalState.copiedAddress = label;
            portalState.toastMessage = `${label} ${i18n.t('support.copied_success')}`;

            setTimeout(() => {
                portalState.copiedAddress = null;
                portalState.toastMessage = '';
            }, 2000);
        } catch (error) {
            console.error('Failed to copy:', error);
            portalState.toastMessage = i18n.t('support.copy_error');
        }
    }

    function openTelegram() {
        window.open('https://t.me/flat447', '_blank');
    }

    function openDonate() {
        window.open('https://yandex.com/support', '_blank');
    }

    function handleKeydown(event) {
        if (event.key === 'Escape' && isOpen) {
            closeModal();
        }
    }

    onDestroy(() => {
        if (isOpen) closeModal();
    });
</script>

<svelte:window onkeydown={handleKeydown} />

<button
    class="support-button"
    onclick={openModal}
    title={i18n.t('support.button_title')}
>
    <FontAwesomeIcon icon={faHeart} />
    <span>{i18n.t('support.button_text')}</span>
</button>

<style>
    .support-button {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 16px;
        background: linear-gradient(135deg, var(--red-color), color-mix(in srgb, var(--red-color), transparent 20%));
        color: var(--crust-color);
        border: none;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
    }

    .support-button:hover {
        transform: translateY(-2px);
        filter: brightness(1.15);
        box-shadow: 0 8px 24px rgba(243, 139, 168, 0.3);
    }

    .support-button:active {
        transform: translateY(0);
    }
</style>