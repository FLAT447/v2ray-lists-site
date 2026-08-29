<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { githubProfile, siteRepo } from '$lib/config.js';
	import SupportModal from './SupportModal.svelte';

	let modalOpen = $state(false);
</script>

<footer class="mt-16 border-t border-outline-variant bg-surface-container-lowest">
	<div class="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-8 text-center">
		<button class="md-filled" onclick={() => (modalOpen = true)}>
			<span class="material-symbols-outlined">favorite</span>
			{i18n.t('footer.support')}
		</button>

		<div class="text-sm text-on-surface-variant">
			{i18n.t('footer.developer')}
			<a class="footer-link font-medium text-primary" href={githubProfile} target="_blank" rel="noopener"
				>FLAT447</a
			>
		</div>
		<div class="text-sm text-on-surface-variant">
			{i18n.t('footer.source')}:
			<a class="footer-link font-medium text-primary" href={siteRepo} target="_blank" rel="noopener"
				>V2Ray Lists Site</a
			>
		</div>
	</div>
</footer>

<SupportModal open={modalOpen} onclose={() => (modalOpen = false)} />
