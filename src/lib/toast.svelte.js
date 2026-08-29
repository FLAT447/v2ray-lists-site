export const toasts = $state([]);
let idc = 0;

export function pushToast(message) {
	const id = ++idc;
	toasts.push({ id, message });
	setTimeout(() => {
		const i = toasts.findIndex((t) => t.id === id);
		if (i !== -1) toasts.splice(i, 1);
	}, 2600);
}
