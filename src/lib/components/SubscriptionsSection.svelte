<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { subscriptions } from '$lib/config.js';
	import { reveal } from '$lib/reveal.js';
	import SubscriptionCard from './SubscriptionCard.svelte';

	let filter = $state('all');

	const filtered = $derived(
		subscriptions.filter(
			(s) => filter === 'all' || s.name.startsWith(filter === 'black' ? 'BLACK' : 'WHITE')
		)
	);

	const chips = [
		{ v: 'all', l: i18n.t('filter.all') },
		{ v: 'black', l: i18n.t('filter.black') },
		{ v: 'white', l: i18n.t('filter.white') }
	];
</script>

<section id="subs" class="mx-auto max-w-6xl px-4 py-10">
	<div class="mb-6 flex flex-wrap items-end justify-between gap-4">
		<div>
			<h2 class="m-0 text-2xl font-bold text-on-surface">{i18n.t('subs.title')}</h2>
			<p class="mt-2 text-on-surface-variant">{i18n.t('subs.subtitle')}</p>
		</div>
		<div class="flex flex-wrap gap-2">
			{#each chips as c}
				<button
					type="button"
					class="rounded-full px-4 py-2 text-sm font-medium transition-colors duration-200"
					class:bg-primary-container={filter === c.v}
					class:text-on-primary-container={filter === c.v}
					class:bg-surface-container-high={filter !== c.v}
					class:text-on-surface-variant={filter !== c.v}
					onclick={() => (filter = c.v)}
				>
					{c.l}
				</button>
			{/each}
		</div>
	</div>

	<div class="grid gap-5 md:grid-cols-2">
		{#each filtered as s, i}
			<SubscriptionCard sub={s} delay={i * 90} />
		{/each}
	</div>
</section>
