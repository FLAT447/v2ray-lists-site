<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { mirrors, mirrorLabels, subPath, formats } from '$lib/config.js';
	import { reveal } from '$lib/reveal.js';
	import LinkBox from './LinkBox.svelte';
	import SelectMenu from './SelectMenu.svelte';

	let { sub, delay = 0 } = $props();

	let mirror = $state('github');
	let format = $state('TXT');

	const url = $derived(mirrors[mirror](subPath(sub.file, format)));

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
</div>
