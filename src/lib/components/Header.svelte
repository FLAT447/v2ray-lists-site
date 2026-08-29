<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { themeStore } from '$lib/theme.svelte.js';
	import { social } from '$lib/config.js';

	const nav = ['subs', 'guides', 'proxy', 'tg'];
</script>

<header
	class="sticky top-0 z-50 backdrop-blur-md border-b border-outline-variant"
	style="background: color-mix(in srgb, var(--md-sys-color-surface) 88%, transparent);"
>
	<div class="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
		<a href="#top" class="flex items-center gap-2 font-semibold text-lg text-on-surface no-underline">
			<span class="material-symbols-outlined text-primary" style="font-size:28px">shield</span>
			<span>V2Ray Lists</span>
		</a>

		<nav class="ml-2 hidden items-center gap-1 md:flex">
			{#each nav as n}
				<a
					href={'#' + n}
					class="rounded-full px-4 py-2 text-sm font-medium text-on-surface-variant no-underline transition-colors hover:bg-surface-container-high hover:text-on-surface"
				>
					{i18n.t('nav.' + n)}
				</a>
			{/each}
		</nav>

		<div class="ml-auto flex items-center gap-1">
			<a class="md-icon-btn" href={social.telegram} target="_blank" rel="noopener" aria-label="Telegram">
				<span class="material-symbols-outlined">send</span>
			</a>
			<a class="md-icon-btn" href={social.tiktok} target="_blank" rel="noopener" aria-label="TikTok">
				<span class="material-symbols-outlined">music_note</span>
			</a>

			<div
				class="ml-1 flex items-center rounded-full border border-outline-variant p-0.5 text-sm font-semibold"
			>
				<button
					class="rounded-full px-3 py-1.5 transition-colors"
					class:bg-primary={i18n.locale === 'ru'}
					class:text-on-primary={i18n.locale === 'ru'}
					class:text-on-surface-variant={i18n.locale !== 'ru'}
					onclick={() => i18n.set('ru')}>RU</button
				>
				<button
					class="rounded-full px-3 py-1.5 transition-colors"
					class:bg-primary={i18n.locale === 'en'}
					class:text-on-primary={i18n.locale === 'en'}
					class:text-on-surface-variant={i18n.locale !== 'en'}
					onclick={() => i18n.set('en')}>EN</button
				>
			</div>

			<button
				class="md-icon-btn"
				onclick={() => themeStore.toggle()}
				aria-label="theme"
			>
				<span class="material-symbols-outlined">
					{themeStore.resolved === 'dark' ? 'light_mode' : 'dark_mode'}
				</span>
			</button>
		</div>
	</div>

	<nav class="flex gap-1 overflow-x-auto px-4 pb-2 md:hidden">
		{#each nav as n}
			<a
				href={'#' + n}
				class="whitespace-nowrap rounded-full bg-surface-container-high px-4 py-1.5 text-sm font-medium text-on-surface-variant no-underline"
			>
				{i18n.t('nav.' + n)}
			</a>
		{/each}
	</nav>
</header>
