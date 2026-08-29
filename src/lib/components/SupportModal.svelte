<script>
	import { fly } from 'svelte/transition';
	import { i18n } from '$lib/i18n.svelte.js';
	import { wallets } from '$lib/config.js';
	import { pushToast } from '$lib/toast.svelte.js';
	import { copyText } from '$lib/clipboard.js';

	let { open = false, onclose } = $props();

	async function copy(addr) {
		const ok = await copyText(addr);
		pushToast(ok ? i18n.t('modal.copied') : 'Clipboard error');
	}

	function onKey(e) {
		if (e.key === 'Escape' && open) onclose();
	}
</script>

<svelte:window onkeydown={onKey} />

{#if open}
	<div class="modal-scrim" onclick={() => onclose()} role="presentation">
		<div
			class="modal-card"
			in:fly={{ y: 30, duration: 350 }}
			out:fly={{ y: 30, duration: 250 }}
			onclick={(e) => e.stopPropagation()}
			role="dialog"
			aria-modal="true"
			aria-label={i18n.t('modal.title')}
		>
			<div class="mb-1 flex items-start justify-between gap-3">
				<div>
					<h2 class="m-0 text-xl font-bold text-on-surface">{i18n.t('modal.title')}</h2>
					<p class="m-0 mt-1 text-sm text-on-surface-variant">{i18n.t('modal.subtitle')}</p>
				</div>
				<button class="md-icon-btn shrink-0" onclick={() => onclose()} aria-label={i18n.t('modal.close')}>
					<span class="material-symbols-outlined">close</span>
				</button>
			</div>

			<div class="mt-4 flex flex-col gap-3">
				{#each wallets as w}
					<div class="rounded-lg bg-surface-container-low p-3">
						<div class="mb-1 text-xs font-semibold uppercase tracking-wide text-on-surface-variant">
							{w.label[i18n.locale]}
						</div>
						<div class="flex items-center gap-2">
							<code class="flex-1 break-all text-sm text-on-surface">{w.address}</code>
							<button class="md-tonal shrink-0 !h-9 !px-3" onclick={() => copy(w.address)}>
								<span class="material-symbols-outlined" style="font-size:18px">content_copy</span>
								<span class="text-sm">{i18n.t('modal.copy')}</span>
							</button>
						</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}
