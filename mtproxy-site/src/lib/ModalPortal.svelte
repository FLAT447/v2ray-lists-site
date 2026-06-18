<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faTimes, faHeart, faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";
    import { faTelegram } from "@fortawesome/free-brands-svg-icons";
    import { i18n } from "./js/i18n.svelte";
    import { fade, scale, fly } from "svelte/transition";

    let {
        supportMethods,
        portalState,
        onClose,
        onCopy,
        onTelegram,
        onDonate,
    } = $props();

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose();
        }
    }
</script>

<div
    class="modal-backdrop"
    transition:fade={{ duration: 200 }}
    onclick={handleBackdropClick}
    role="dialog"
    aria-modal="true"
>
    <div
        class="modal-content"
        transition:scale={{ duration: 250, start: 0.8 }}
    >
        <div class="modal-logo">
            <div class="logo-circle">
                <FontAwesomeIcon icon={faHeart} style="color: var(--teal-color)" />
            </div>
        </div>

        <h2 class="modal-title">
            {i18n.t('support.title')}
        </h2>

        <div class="crypto-addresses">
            {#each supportMethods as method (method.id)}
                <div class="crypto-item">
                    <div class="crypto-label">
                        {method.label}
                    </div>
                    <div class="crypto-address-wrapper">
                        <code class="crypto-address">
                            {method.address}
                        </code>
                        <button
                            class="copy-btn"
                            onclick={() => onCopy(method.address, method.label)}
                            class:copied={portalState.copiedAddress === method.label}
                            title={i18n.t('support.action_copy')}
                        >
                            <FontAwesomeIcon
                                icon={portalState.copiedAddress === method.label ? faCheck : faCopy}
                            />
                        </button>
                    </div>
                </div>
            {/each}
        </div>

        <button
            class="modal-close"
            onclick={onClose}
            aria-label="Close"
        >
            <FontAwesomeIcon icon={faTimes} />
        </button>
    </div>

    {#if portalState.toastMessage}
        <div
            class="toast"
            in:fly={{ y: 16, duration: 220 }}
            out:fly={{ y: 16, duration: 180 }}
        >
            <FontAwesomeIcon icon={faCheck} />
            {portalState.toastMessage}
        </div>
    {/if}
</div>

<style>
    /* Backdrop — прямой потомок <body>, position: fixed работает корректно */
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.65);
        backdrop-filter: blur(5px);
        -webkit-backdrop-filter: blur(5px);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        pointer-events: all;
    }

    .modal-content {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        position: relative;
        background: var(--background-color);
        border-radius: 24px;
        border: 1px solid color-mix(in srgb, var(--teal-color), transparent 70%);
        width: 90%;
        max-width: 650px;
        max-height: 90vh;
        overflow-y: auto;
        padding: 48px 40px;
        box-shadow: 0 25px 80px rgba(0, 0, 0, 0.4),
                    inset 0 0 1px rgba(148, 226, 213, 0.2);
        text-align: center;
        box-sizing: border-box;
    }

    .modal-logo {
        display: flex;
        justify-content: center;
        margin-bottom: 32px;
    }

    .logo-circle {
        width: 100px;
        height: 100px;
        border: 2px solid var(--teal-color);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 3rem;
        color: var(--teal-color);
    }

    .logo-circle :global(svg) {
        animation: spin 3s linear infinite;
    }

    @keyframes spin {
        from { transform: rotate(0deg); }
        to   { transform: rotate(360deg); }
    }

    .modal-title {
        margin: 0 0 40px 0;
        font-size: 2.2rem;
        font-weight: 700;
        color: var(--text-color);
        line-height: 1.2;
    }

    .crypto-addresses {
        margin-bottom: 40px;
        text-align: left;
    }

    .crypto-item {
        margin-bottom: 24px;
        padding: 16px;
        background: color-mix(in srgb, var(--surface-color), transparent 50%);
        border-radius: 12px;
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 85%);
        transition: all 0.3s ease;
    }

    .crypto-item:hover {
        border-color: var(--teal-color);
        background: color-mix(in srgb, var(--teal-color), transparent 85%);
    }

    .crypto-label {
        font-size: 0.85rem;
        color: var(--teal-color);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 1px;
        margin-bottom: 8px;
    }

    .crypto-address-wrapper {
        display: flex;
        gap: 12px;
        align-items: center;
        background: color-mix(in srgb, var(--crust-color), transparent 20%);
        padding: 12px;
        border-radius: 8px;
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
    }

    .crypto-address {
        flex: 1;
        font-family: 'Courier New', monospace;
        font-size: 0.9rem;
        color: var(--text-color);
        word-break: break-all;
        overflow-wrap: break-word;
    }

    .copy-btn {
        flex-shrink: 0;
        background: color-mix(in srgb, var(--teal-color), transparent 70%);
        border: 1px solid var(--teal-color);
        color: var(--teal-color);
        width: 40px;
        height: 40px;
        border-radius: 6px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 1.1rem;
        transition: all 0.3s ease;
    }

    .copy-btn:hover {
        background: var(--teal-color);
        color: var(--background-color);
        transform: scale(1.05);
    }

    .copy-btn.copied {
        background: var(--green-color);
        border-color: var(--green-color);
        color: var(--background-color);
    }

    .action-buttons {
        display: flex;
        gap: 16px;
        margin-bottom: 24px;
    }

    .btn {
        flex: 1;
        padding: 14px 24px;
        border: none;
        border-radius: 10px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
    }

    .btn-primary {
        background: var(--blue-color);
        color: white;
    }

    .btn-primary:hover {
        background: var(--saphire-color);
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(137, 180, 250, 0.3);
    }

    .btn-danger {
        background: #d32f2f;
        color: white;
    }

    .btn-danger:hover {
        background: #b71c1c;
        transform: translateY(-2px);
        box-shadow: 0 8px 16px rgba(211, 47, 47, 0.3);
    }

    .modal-close {
        position: absolute;
        top: 16px;
        right: 16px;
        background: none;
        border: none;
        color: var(--text-color);
        font-size: 1.5rem;
        cursor: pointer;
        padding: 8px;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.2s ease;
        border-radius: 6px;
    }

    .modal-close:hover {
        background: color-mix(in srgb, var(--text-color), transparent 90%);
        color: var(--red-color);
        transform: rotate(90deg);
    }

    .toast {
        position: fixed;
        bottom: 28px;
        left: 50%;
        transform: translateX(-50%);
        background: var(--green-color);
        color: var(--crust-color);
        padding: 12px 22px;
        border-radius: 10px;
        font-weight: 600;
        font-size: 0.95rem;
        display: flex;
        align-items: center;
        gap: 8px;
        white-space: nowrap;
        box-shadow: 0 8px 24px rgba(166, 227, 161, 0.35),
                    0 2px 8px rgba(0, 0, 0, 0.2);
        z-index: 10001;
        pointer-events: none;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    @media (max-width: 640px) {
        .modal-content {
            width: 95%;
            padding: 32px 20px;
        }

        .modal-title {
            font-size: 1.8rem;
            margin-bottom: 28px;
        }

        .logo-circle {
            width: 80px;
            height: 80px;
            font-size: 2.2rem;
            margin-bottom: 24px;
        }

        .action-buttons {
            flex-direction: column;
        }

        .crypto-address {
            font-size: 0.85rem;
        }

        .btn {
            padding: 12px 16px;
            font-size: 0.95rem;
        }
    }

    :global(.light-theme) .modal-content {
        background: var(--background-color);
        border-color: color-mix(in srgb, var(--blue-color), transparent 70%);
    }

    :global(.light-theme) .logo-circle {
        border-color: var(--blue-color);
        color: var(--blue-color);
    }

    :global(.light-theme) .copy-btn {
        background: color-mix(in srgb, var(--blue-color), transparent 70%);
        border-color: var(--blue-color);
        color: var(--blue-color);
    }

    :global(.light-theme) .copy-btn:hover {
        background: var(--blue-color);
        color: white;
    }
</style>