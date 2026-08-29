import { browser } from '$app/environment';

function createTheme() {
	let theme = $state('system');
	let resolved = $state('light');

	function apply(t) {
		let r = t;
		if (t === 'system') {
			r =
				browser && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
		}
		resolved = r;
		if (browser) document.documentElement.setAttribute('data-theme', r);
	}

	if (browser) {
		const saved = localStorage.getItem('theme');
		theme = saved || 'system';
		apply(theme);
		window
			.matchMedia('(prefers-color-scheme: dark)')
			.addEventListener('change', () => {
				if (theme === 'system') apply('system');
			});
	}

	return {
		get theme() {
			return theme;
		},
		get resolved() {
			return resolved;
		},
		set(v) {
			theme = v;
			if (browser) localStorage.setItem('theme', v);
			apply(v);
		},
		toggle() {
			this.set(resolved === 'dark' ? 'light' : 'dark');
		}
	};
}

export const themeStore = createTheme();
