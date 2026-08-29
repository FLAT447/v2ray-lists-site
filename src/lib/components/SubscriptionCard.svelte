<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { mirrors, mirrorLabels, subPath, formats } from '$lib/config.js';
	import { stats, subStats } from '$lib/stats.svelte.js';
	import { reveal } from '$lib/reveal.js';
	import LinkBox from './LinkBox.svelte';
	import SelectMenu from './SelectMenu.svelte';

	let { sub, delay = 0 } = $props();

	let mirror = $state('github');
	let format = $state('TXT');

	const url = $derived(mirrors[mirror](subPath(sub.file, format)));
	const st = $derived(subStats(sub.name));

	const mirrorOptions = $derived(
		Object.keys(mirrors).map((m) => ({ value: m, label: mirrorLabels[m] }))
	);
	const formatOptions = $derived(formats.map((f) => ({ value: f, label: f })));
</script>

<div class="md-card flex flex-col gap-4" use:reveal={{ delay }}>
	<div class="flex items-center gap-2">
		<span class="material-symbols-outlined text-primary">hub</span>
		<h3 class="m-0 text-lg font-semibold text-on-surface">{sub.name}</h3>
	</div>

	<div class="grid gap-3 sm:grid-cols-2">
		<SelectMenu label={i18n.t('sub.mirror')} bind:value={mirror} options={mirrorOptions} />
		<SelectMenu label={i18n.t('sub.format')} bind:value={format} options={formatOptions} />
	</div>

	<LinkBox value={url} label={i18n.t('proxy.link')} toast={i18n.t('subs.copied')} />

	<div class="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-on-surface-variant">
		<span>
			<span class="material-symbols-outlined align-middle" style="font-size:16px">list_alt</span>
			{i18n.t('card.configs')}:
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
</div>
