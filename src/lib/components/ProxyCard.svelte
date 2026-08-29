<script>
	import { onMount } from 'svelte';
	import { i18n } from '$lib/i18n.svelte.js';
	import { mirrors, mirrorOrder, mirrorLabels } from '$lib/config.js';
	import { pushToast } from '$lib/toast.svelte.js';
	import { copyText } from '$lib/clipboard.js';
	import { reveal } from '$lib/reveal.js';
	import { stats, proxyStats } from '$lib/stats.svelte.js';
	import LinkBox from './LinkBox.svelte';

	let { proxy, delay = 0 } = $props();

	let status = $state('loading'); // loading | ready | failed
	let activeMirror = $state(null);
	let content = $state('');

	const url = $derived(activeMirror ? mirrors[activeMirror](proxy.file) : '');
	const st = $derived(proxyStats(proxy.name));

	async function fetchText(key) {
		const ctrl = new AbortController();
		const to = setTimeout(() => ctrl.abort(), 9000);
		try {
			const res = await fetch(mirrors[key](proxy.file), { signal: ctrl.signal });
			if (!res.ok) throw new Error('bad');
			const txt = await res.text();
			if (!txt || !txt.trim()) throw new Error('empty');
			return txt;
		} finally {
			clearTimeout(to);
		}
	}

	async function select() {
		status = 'loading';
		try {
			const { k, txt } = await Promise.any(mirrorOrder.map((key) => fetchText(key).then((t) => ({ k: key, txt: t }))));
			activeMirror = k;
			content = txt;
			status = 'ready';
		} catch {
			status = 'failed';
		}
	}

	onMount(select);

	function pick10(text) {
		const lines = text
			.split('\n')
			.map((l) => l.trim())
			.filter(Boolean);
		for (let i = lines.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[lines[i], lines[j]] = [lines[j], lines[i]];
		}
		return lines.slice(0, 10).join('\n');
	}

	async function copyAll() {
		if (status !== 'ready') return;
		const ok = await copyText(content);
		pushToast(ok ? i18n.t('proxy.copiedAll') : 'Clipboard error');
	}

	async function copy10() {
		if (status !== 'ready') return;
		const ok = await copyText(pick10(content));
		pushToast(ok ? i18n.t('proxy.copied10') : 'Clipboard error');
	}
</script>

<div class="md-card flex flex-col gap-4" use:reveal={{ delay }}>
	<div class="flex items-center gap-2">
		<span class="material-symbols-outlined text-primary">public</span>
		<h3 class="m-0 text-lg font-semibold text-on-surface">{proxy.name}</h3>
		{#if status === 'ready'}
			<span class="md-chip ml-auto">{i18n.t('proxy.activeMirror')}: {mirrorLabels[activeMirror]}</span>
		{/if}
	</div>

	{#if status === 'loading'}
		<div class="flex items-center gap-2 text-sm text-on-surface-variant">
			<span class="material-symbols-outlined animate-spin" style="font-size:18px">progress_activity</span>
			{i18n.t('proxy.loading')}
		</div>
	{:else if status === 'failed'}
		<div class="flex items-center gap-2 text-sm text-error">
			<span class="material-symbols-outlined" style="font-size:18px">error</span>
			{i18n.t('proxy.failed')}
		</div>
		<button class="md-outlined self-start" onclick={select}>
			<span class="material-symbols-outlined" style="font-size:18px">refresh</span>
			{i18n.t('proxy.loading')}
		</button>
	{:else}
		<LinkBox value={url} label={i18n.t('proxy.link')} />

		<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-on-surface-variant">
			<span>
				<span class="material-symbols-outlined align-middle" style="font-size:16px">list_alt</span>
				{i18n.t('card.proxies')}:
				{#if st}
					<b class="text-on-surface">{st.count}</b>
				{:else if stats.status === 'ready'}
					—
				{:else}
					{i18n.t('card.statsFailed')}
				{/if}
			</span>
			<span>
				<span class="material-symbols-outlined align-middle" style="font-size:16px">schedule</span>
				{i18n.t('card.updated')}:
				{#if st}
					<b class="text-on-surface">{st.updated}</b>
				{:else if stats.status === 'ready'}
					—
				{:else}
					{i18n.t('card.statsFailed')}
				{/if}
			</span>
		</div>

		<div class="flex flex-wrap gap-3">
			<button class="md-filled" onclick={copyAll}>
				<span class="material-symbols-outlined">file_copy</span>
				{i18n.t('proxy.copyAll')}
			</button>
			<button class="md-tonal" onclick={copy10}>
				<span class="material-symbols-outlined">shuffle</span>
				{i18n.t('proxy.copy10')}
			</button>
		</div>
	{/if}
</div>
