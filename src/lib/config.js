export const GITHUB_USER = 'FLAT447';
export const GITHUB_REPO = 'v2ray-lists';
export const GITVERSE_REPO = 'my-repo';
export const BRANCH = 'main';

export const mirrors = {
	github: (p) => `https://github.com/${GITHUB_USER}/${GITHUB_REPO}/raw/refs/heads/${BRANCH}/${p}`,
	gitverse: (p) =>
		`https://gitverse.ru/api/repos/${GITHUB_USER}/${GITVERSE_REPO}/raw/branch/${BRANCH}/${p}`,
	cdn: (p) => `https://cdn.jsdelivr.net/gh/${GITHUB_USER}/${GITHUB_REPO}@${BRANCH}/${p}`
};

export const mirrorOrder = ['cdn', 'github', 'gitverse'];
export const mirrorLabels = { github: 'GitHub', gitverse: 'GitVerse', cdn: 'CDN' };

export const subscriptions = [
	{ name: 'BLACK_FULL', file: 'BLACK_FULL.txt' },
	{ name: 'BLACK_LTE', file: 'BLACK_LTE.txt' },
	{ name: 'WHITE_FULL', file: 'WHITE_FULL.txt' },
	{ name: 'WHITE_LITE', file: 'WHITE_LITE.txt' }
];

export const formats = ['TXT', 'BASE64', 'CLASH'];

export function subPath(file, format) {
	if (format === 'TXT') return file;
	if (format === 'CLASH') return `CLASH/${file.replace(/\.txt$/, '.yml')}`;
	return `BASE64/${file}`;
}

export const proxyFiles = [
	{ name: 'BLACKLIST', file: 'blacklist.txt' },
	{ name: 'WHITELIST', file: 'whitelist.txt' }
];

export const social = {
	telegram: 'https://t.me/flat4470',
	tiktok: 'https://tiktok.com/@flflat447'
};

export const wallets = [
	{
		key: 'ton',
		label: { ru: 'GRAM', en: 'GRAM' },
		address: 'UQDqE26tfZV4qes9G7pCRZ8xSHJDw_fxqxj3yd9rTA4HEnCj'
	},
	{
		key: 'usdt',
		label: { ru: 'USDT (TRC20)', en: 'USDT (TRC20)' },
		address: 'TJGGZSd8pzwGaCNFt2UdDyKXN7EyYLMz6x'
	},
	{
		key: 'eth',
		label: { ru: 'ETH', en: 'ETH' },
		address: '0x91FB5B028ac58f47903d9398A513934a2289565B'
	},
	{
		key: 'btc',
		label: { ru: 'BTC', en: 'BTC' },
		address: 'bc1qmljmyh720tkgy23ensuuydkfgquwpqw2vaw48m'
	}
];

export const githubProfile = 'https://github.com/FLAT447';
export const siteRepo = 'https://github.com/FLAT447/v2ray-lists-site';
