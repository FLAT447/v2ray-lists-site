import { mirrors, mirrorOrder, mirrorLabels } from './config.js';

const STATS_FILE = 'stats.json';

async function fetchStats(key) {
	const ctrl = new AbortController();
	const to = setTimeout(() => ctrl.abort(), 9000);
	try {
		const res = await fetch(mirrors[key](STATS_FILE), { signal: ctrl.signal });
		if (!res.ok) throw new Error('bad');
		const data = await res.json();
		if (!data || typeof data !== 'object') throw new Error('empty');
		return { key, data };
	} finally {
		clearTimeout(to);
	}
}

export const stats = $state({
	status: 'loading', // loading | ready | failed
	mirror: null,
	data: null
});

export async function loadStats() {
	stats.status = 'loading';
	try {
		const first = await Promise.any(mirrorOrder.map((key) => fetchStats(key)));
		stats.mirror = first.key;
		stats.data = first.data;
		stats.status = 'ready';
	} catch {
		stats.status = 'failed';
	}
}

const subKeyMap = {
	BLACK_FULL: 'black',
	BLACK_LTE: 'black_lte',
	WHITE_FULL: 'white_full',
	WHITE_LITE: 'white_lite'
};

export function subStats(name) {
	if (stats.status !== 'ready' || !stats.data) return null;
	const key = subKeyMap[name];
	return stats.data.configs?.[key] ?? null;
}

export function proxyStats(name) {
	if (stats.status !== 'ready' || !stats.data) return null;
	const f = stats.data.files?.mtproto;
	if (!f) return null;
	if (name === 'BLACKLIST') return { count: f.black_count, updated: f.updated };
	if (name === 'WHITELIST') return { count: f.white_count, updated: f.updated };
	return null;
}
