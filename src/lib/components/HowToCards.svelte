<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { reveal } from '$lib/reveal.js';

	const cards = [
		{ key: 'copy', icon: 'content_copy', tint: 'var(--md-sys-color-primary-container)' },
		{ key: 'paste', icon: 'content_paste', tint: 'var(--md-sys-color-secondary-container)' },
		{ key: 'connect', icon: 'bolt', tint: 'var(--md-sys-color-tertiary-container)' }
	];
</script>

<section id="how" class="mx-auto max-w-6xl px-4 py-10">
	<div class="grid gap-5 md:grid-cols-3">
		{#each cards as c, i}
			<div class="md-card flex flex-col gap-3" use:reveal={{ delay: i * 90 }}>
				<div
					class="grid h-12 w-12 place-items-center rounded-full"
					style="background:{c.tint}; color:var(--md-sys-color-on-surface)"
				>
					<span class="material-symbols-outlined text-primary">{c.icon}</span>
				</div>
				<h3 class="m-0 text-lg font-bold text-on-surface">{i18n.t('how.' + c.key + '.title')}</h3>
				<p class="m-0 text-sm leading-relaxed text-on-surface-variant">
					{i18n.t('how.' + c.key + '.desc')}
				</p>
			</div>
		{/each}
	</div>
</section>
