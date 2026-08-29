<script>
	// Soft, slowly drifting blurred circles (Material 3 palette) behind the page.
	// Purely decorative; sits behind all content and ignores pointer events.
	const orbs = [
		{ cls: 'orb-primary', x: '-12%', y: '-10%', size: '46vmax', dur: '38s', delay: '0s' },
		{ cls: 'orb-tertiary', x: '62%', y: '-18%', size: '38vmax', dur: '44s', delay: '-12s' },
		{ cls: 'orb-inverse', x: '8%', y: '58%', size: '42vmax', dur: '50s', delay: '-26s' },
		{ cls: 'orb-secondary', x: '58%', y: '56%', size: '34vmax', dur: '32s', delay: '-8s' },
		{ cls: 'orb-primary', x: '78%', y: '74%', size: '26vmax', dur: '41s', delay: '-18s' }
	];
</script>

<div class="bg-orbs" aria-hidden="true">
	{#each orbs as orb}
		<span
			class="orb {orb.cls}"
			style="--x:{orb.x}; --y:{orb.y}; --size:{orb.size}; --dur:{orb.dur}; --delay:{orb.delay};"
		></span>
	{/each}
</div>

<style>
	.bg-orbs {
		position: fixed;
		inset: 0;
		z-index: -1;
		overflow: hidden;
		pointer-events: none;
	}

	.orb {
		position: absolute;
		left: var(--x);
		top: var(--y);
		width: var(--size);
		height: var(--size);
		border-radius: 9999px;
		filter: blur(64px);
		opacity: 0.45;
		transform: translateZ(0);
		will-change: transform;
		animation: orbFloat var(--dur) var(--md-sys-ease-emphasized) infinite alternate;
		animation-delay: var(--delay);
	}

	.orb-primary {
		background: var(--md-sys-color-primary);
	}
	.orb-tertiary {
		background: var(--md-sys-color-tertiary);
	}
	.orb-secondary {
		background: var(--md-sys-color-secondary);
	}
	.orb-inverse {
		background: var(--md-sys-color-inverse-primary);
	}

	@keyframes orbFloat {
		0% {
			transform: translate(0, 0) scale(1);
		}
		50% {
			transform: translate(7vw, 5vh) scale(1.12);
		}
		100% {
			transform: translate(-5vw, 9vh) scale(0.92);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.orb {
			animation: none;
		}
	}
</style>
