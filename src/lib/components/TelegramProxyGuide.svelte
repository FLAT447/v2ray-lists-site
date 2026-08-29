<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { reveal } from '$lib/reveal.js';

	const blocks = [
		{ key: 'pc', icon: 'desktop_windows' },
		{ key: 'phone', icon: 'smartphone' }
	];
</script>

<section id="tg" class="mx-auto max-w-6xl px-4 py-10">
	<h2 class="m-0 text-2xl font-bold text-on-surface">{i18n.t('tg.title')}</h2>
	<p class="mb-6 mt-2 text-on-surface-variant">{i18n.t('tg.subtitle')}</p>

	<div class="grid gap-5 md:grid-cols-2">
		{#each blocks as b, i}
			<div class="md-card flex flex-col gap-4" use:reveal={{ delay: i * 90 }}>
				<div class="flex items-center gap-2">
					<span class="material-symbols-outlined text-primary">{b.icon}</span>
					<h3 class="m-0 text-lg font-semibold text-on-surface">{i18n.t('tg.' + b.key)}</h3>
				</div>
				<ol class="m-0 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-on-surface">
					{#each i18n.t('tg.' + b.key + '.steps') as step}
						<li>{step}</li>
					{/each}
				</ol>
			</div>
		{/each}
	</div>
</section>
