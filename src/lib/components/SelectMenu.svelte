<script>
	let {
		label = '',
		value = $bindable(),
		options = []
	} = $props();

	let open = $state(false);
	let root = $state(null);

	function choose(v) {
		value = v;
		open = false;
	}

	function onDocClick(e) {
		if (root && !root.contains(e.target)) open = false;
	}
	function onKey(e) {
		if (e.key === 'Escape') open = false;
	}

	const current = $derived(options.find((o) => o.value === value)?.label ?? value);
</script>

<svelte:window onclick={onDocClick} onkeydown={onKey} />

<div class="md-select flex flex-col gap-1" bind:this={root}>
	{#if label}
		<span class="text-xs font-semibold uppercase tracking-wide text-on-surface-variant">{label}</span>
	{/if}
	<button
		type="button"
		class="md-field-btn"
		aria-haspopup="listbox"
		aria-expanded={open}
		onclick={() => (open = !open)}
	>
		<span>{current}</span>
		<span class="material-symbols-outlined" style="font-size:20px">{open ? 'expand_less' : 'expand_more'}</span>
	</button>

	{#if open}
		<ul class="md-menu" role="listbox">
			{#each options as o}
				<li
					class="md-menu-item"
					role="option"
					aria-selected={o.value === value}
					onclick={() => choose(o.value)}
				>
					{#if o.value === value}
						<span class="material-symbols-outlined" style="font-size:18px">check</span>
					{:else}
						<span style="width:18px"></span>
					{/if}
					{o.label}
				</li>
			{/each}
		</ul>
	{/if}
</div>
