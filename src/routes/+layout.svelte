<script>
	import '@fontsource/material-symbols-outlined';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Background from '$lib/components/Background.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>V2Ray Lists — бесплатные VPN конфигурации и MTProxy</title>
</svelte:head>

<Background />
<div id="top"></div>
<Header />
<main>
	{@render children()}
</main>
<Footer />
<Toast />
