<script>
	import { fly } from 'svelte/transition';
	import { toasts } from '$lib/toast.svelte.js';
</script>

<div class="toast-host" aria-live="polite">
	{#each toasts as t (t.id)}
		<div class="toast-item" in:fly={{ y: 40, duration: 400 }} out:fly={{ y: -40, duration: 350 }}>
			<span class="material-symbols-outlined" style="font-size:18px">check_circle</span>
			<span>{t.message}</span>
		</div>
	{/each}
</div>
