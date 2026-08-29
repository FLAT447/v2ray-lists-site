<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { clientGuides } from '$lib/clientGuides.js';
	import { reveal } from '$lib/reveal.js';
	import GuideAccordion from './GuideAccordion.svelte';

	const guides = $derived(clientGuides[i18n.locale] ?? clientGuides.ru);
</script>

<section id="guides" class="mx-auto max-w-6xl px-4 py-10">
	<h2 class="m-0 text-2xl font-bold text-on-surface">{i18n.t('guides.title')}</h2>
	<p class="mb-6 mt-2 text-on-surface-variant">{i18n.t('guides.subtitle')}</p>

	<div class="flex flex-col gap-4">
		{#each guides as g, i}
			<GuideAccordion guide={g} delay={i * 80} />
		{/each}
	</div>
</section>
