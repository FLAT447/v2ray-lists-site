<script>
	import '@fontsource/material-symbols-outlined';
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Toast from '$lib/components/Toast.svelte';
	import Background from '$lib/components/Background.svelte';
	import { loadStats } from '$lib/stats.svelte.js';

	let { children } = $props();

	loadStats();
</script>

<svelte:head>
	<title>V2Ray Lists Site</title>
</svelte:head>

<Background />
<div id="top"></div>
<Header />
<main>
	{@render children()}
</main>
<Footer />
<Toast />
