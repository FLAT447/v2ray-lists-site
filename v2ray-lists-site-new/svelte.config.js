import adapter from '@sveltejs/adapter-static';

export default {
	kit: {
		adapter: adapter({
			fallback: 'index.html'
		}),
		alias: {
			'$lib': 'src/lib'
		}
	},
	vitePlugin: {
		inspector: true
	}
};
