<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { proxyFiles } from '$lib/config.js';
	import { reveal } from '$lib/reveal.js';
	import ProxyCard from './ProxyCard.svelte';

	const subs = proxyFiles;
</script>

<section id="proxy" class="mx-auto max-w-6xl px-4 py-10">
	<h2 class="m-0 text-2xl font-bold text-on-surface">{i18n.t('proxy.title')}</h2>
	<p class="mb-6 mt-2 text-on-surface-variant">{i18n.t('proxy.subtitle')}</p>

	<div class="grid gap-5 md:grid-cols-2">
		{#each subs as p, i}
			<ProxyCard proxy={p} delay={i * 90} />
		{/each}
	</div>
</section>
