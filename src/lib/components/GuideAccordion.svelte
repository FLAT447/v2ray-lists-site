<script>
	import { i18n } from '$lib/i18n.svelte.js';
	import { reveal } from '$lib/reveal.js';

	let { guide, delay = 0 } = $props();
	let open = $state(false);
</script>

<div class="md-card overflow-hidden !p-0" use:reveal={{ delay }}>
	<button
		class="guide-head flex w-full items-center gap-3 p-4 text-left"
		onclick={() => (open = !open)}
		aria-expanded={open}
	>
		<span
			class="material-symbols-outlined flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white"
			style="background:{guide.accent}; font-size:24px">{guide.icon}</span
		>
		<span class="flex min-w-0 flex-col">
			<span class="truncate text-base font-semibold text-on-surface">{guide.platform}</span>
			<span class="truncate text-sm text-on-surface-variant">{guide.client}</span>
		</span>
		<span
			class="material-symbols-outlined chev ml-auto text-on-surface-variant"
			style="font-size:24px"
			class:rotated={open}>expand_more</span
		>
	</button>

	<div
		class="grid transition-all duration-300"
		style="grid-template-rows:{open ? '1fr' : '0fr'};"
	>
		<div class="overflow-hidden">
			<div class="flex flex-col gap-5 border-t border-outline-variant p-4">
				<!-- Downloads -->
				<div class="flex flex-wrap gap-2">
					{#each guide.downloads as d}
						<a class="md-tonal !h-10" href={d.url} target="_blank" rel="noopener">
							<span class="material-symbols-outlined" style="font-size:18px">download</span>
							<span class="text-sm">{i18n.t('guide.download')} {d.label}</span>
						</a>
					{/each}
				</div>

				<!-- Steps -->
				<ol class="m-0 flex list-decimal flex-col gap-2 pl-5 text-sm leading-relaxed text-on-surface">
					{#each guide.steps as step}
						<li>{step}</li>
					{/each}
				</ol>

				<!-- Extra boxes -->
				{#each guide.boxes as box}
					<div class="rounded-lg p-4 {box.kind === 'troubleshooting' || box.kind === 'note' ? 'box-error' : 'bg-surface-container-high'}">
						<div class="box-title {box.kind === 'troubleshooting' ? 'box-title' : ''}">{box.title}</div>
						{#if box.kind === 'troubleshooting'}
							<div class="flex flex-col gap-3">
								{#each box.items as it}
									<div>
										<div class="text-sm font-semibold text-on-surface">{it.q}</div>
										<div class="text-sm text-on-surface-variant">{it.a}</div>
									</div>
								{/each}
							</div>
						{:else if box.kind === 'note'}
							<div class="flex flex-col gap-2 text-sm text-on-surface-variant">
								<p class="m-0">{box.text}</p>
								{#if box.link}
									<a
										class="font-medium text-primary no-underline"
										href={box.link.url}
										target="_blank"
										rel="noopener">{box.link.label}</a
									>
								{/if}
								{#if box.text2}
									<p class="m-0">{box.text2}</p>
								{/if}
							</div>
						{/if}
					</div>
				{/each}

				<!-- Update box -->
				<div class="rounded-lg box-info p-4">
					<div class="box-title">{guide.update.title}</div>
					<ol class="m-0 flex list-decimal flex-col gap-1.5 pl-5 text-sm leading-relaxed text-on-surface-variant">
						{#each guide.update.steps as step}
							<li>{step}</li>
						{/each}
					</ol>
				</div>
			</div>
		</div>
	</div>
</div>
