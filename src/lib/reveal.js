export function reveal(node, { delay = 0 } = {}) {
	if (delay) node.style.transitionDelay = delay + 'ms';
	node.setAttribute('data-reveal', '');

	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (e.isIntersecting) {
					node.classList.add('in');
					io.unobserve(node);
				}
			}
		},
		{ threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
	);

	io.observe(node);

	return {
		destroy() {
			io.disconnect();
		}
	};
}
