<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import HowToCards from '$lib/components/HowToCards.svelte';
	import SubscriptionsSection from '$lib/components/SubscriptionsSection.svelte';
	import GuidesSection from '$lib/components/GuidesSection.svelte';
	import ProxySection from '$lib/components/ProxySection.svelte';
	import TelegramProxyGuide from '$lib/components/TelegramProxyGuide.svelte';
</script>

<section class="mx-auto max-w-6xl px-4 pb-4 pt-12 text-center">
	<span class="md-chip hero-badge">{i18n.t('hero.badge')}</span>
	<h1 class="mt-3 text-4xl font-bold leading-tight text-on-surface md:text-5xl">
		{i18n.t('hero.title')}
	</h1>
	<p class="mx-auto mt-3 max-w-2xl text-on-surface-variant">{i18n.t('hero.subtitle')}</p>
</section>

<HowToCards />
<SubscriptionsSection />
<GuidesSection />
<ProxySection />
<TelegramProxyGuide />
