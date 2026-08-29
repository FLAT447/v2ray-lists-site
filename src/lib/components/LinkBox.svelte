<script>
	import { pushToast } from '$lib/toast.svelte.js';
	import { copyText } from '$lib/clipboard.js';
	import { i18n } from '$lib/i18n.svelte.js';

	let { value = '', label = '', toast = '' } = $props();

	async function copy() {
		const ok = await copyText(value);
		pushToast(ok ? toast || i18n.t('copied') : 'Clipboard error');
	}
</script>

<div class="flex flex-col gap-2">
	{#if label}
		<span class="text-sm text-on-surface-variant">{label}</span>
	{/if}
	<div class="flex items-center gap-2">
		<input class="md-field flex-1" readonly value={value} onfocus={(e) => e.currentTarget.select()} />
		<button class="md-tonal shrink-0" onclick={copy} aria-label="copy">
			<span class="material-symbols-outlined">content_copy</span>
		</button>
	</div>
</div>
