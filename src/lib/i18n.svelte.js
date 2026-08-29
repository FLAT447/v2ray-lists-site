import { browser } from '$app/environment';

const dict = {
	ru: {
		'brand.tag': 'VPN и прокси',
		'hero.badge': 'V2Ray Lists',
		'hero.title': 'Бесплатные VPN конфигурации и MTProxy',
		'hero.subtitle':
			'Подписки V2Ray, гайды по клиентам и прокси для Telegram. Выбери конфиг, подключись и обходи блокировки.',
		'nav.subs': 'V2Ray конфиги',
		'nav.guides': 'Гайды',
		'nav.proxy': 'Прокси',
		'nav.tg': 'Telegram',
		'how.copy.title': 'Скопируй',
		'how.copy.desc': 'Скопируй ссылку на подписку ниже одним нажатием.',
		'how.paste.title': 'Вставь',
		'how.paste.desc': 'Открой свой VPN-клиент и вставь ссылку в поле подписки.',
		'how.connect.title': 'Подключись',
		'how.connect.desc': 'Выбери самый быстрый конфиг и нажми подключить.',
		'subs.title': 'V2Ray конфиги',
		'subs.subtitle': 'Бесплатные подписки с конфигурациями для VPN-клиентов.',
		'sub.mirror': 'Зеркало',
		'sub.format': 'Формат',
		'sub.copy': 'Копировать',
		'subs.copied': 'Ссылка скопирована',
		'card.configs': 'Конфигов',
		'card.proxies': 'Прокси',
		'card.updated': 'Обновлено',
		'card.statsFailed': 'Нет данных',
		'filter.all': 'Все',
		'filter.black': 'Чёрные',
		'filter.white': 'Белые',
		'guides.title': 'Гайды на клиенты',
		'guides.subtitle': 'Как установить и настроить популярные клиенты.',
		'guide.download': 'Скачать',
		'guide.troubleshooting': 'Решение проблем',
		'guide.update': 'Как обновить конфиги?',
		'guide.note.msvcp': 'Ошибка MSVCP / VCRUNTIME?',
		'proxy.title': 'Прокси для Telegram',
		'proxy.subtitle': 'Списки прокси для Telegram. Рабочее зеркало выбирается автоматически.',
		'proxy.copyAll': 'Скопировать всё',
		'proxy.copy10': 'Скопировать 10',
		'proxy.loading': 'Выбираем рабочее зеркало…',
		'proxy.failed': 'Не удалось загрузить зеркало',
		'proxy.activeMirror': 'Активное зеркало',
		'proxy.link': 'Ссылка',
		'proxy.copiedAll': 'Файл скопирован в буфер',
		'proxy.copied10': '10 прокси скопировано',
		'tg.title': 'Использование прокси для Telegram',
		'tg.subtitle': 'Добавьте прокси из списка выше прямо в Telegram.',
		'tg.pc': 'На ПК',
		'tg.phone': 'На телефоне',
		'tg.pc.steps': [
			'Открой Telegram и перейди в меню (три полоски слева) → Настройки.',
			'Выбери «Данные и хранилище» → «Прокси».',
			'Нажми «Добавить прокси» и выбери тип: SOCKS5, HTTP или MTProto (зависит от формата в списке).',
			'Введи данные прокси из списка «Прокси для Telegram» выше (сервер, порт, секрет для MTProto).',
			'Включи прокси и проверь подключение — статус появится вверху чатов.'
		],
		'tg.phone.steps': [
			'В Telegram открой Настройки → «Данные и хранилище» → «Прокси».',
			'Нажми «Добавить прокси» и выбери тип (SOCKS5 / HTTP / MTProto).',
			'Вставь ссылку или данные прокси из списка «Прокси для Telegram» (для MTProto удобно копировать готовую ссылку).',
			'Включи прокси — рядом с именем появится галочка, а вверху чатов загорится значок прокси.'
		],
		'footer.support': 'Поддержать автора',
		'footer.developer': 'Developer',
		'footer.source': 'Исходный код сайта',
		'modal.title': 'Поддержать автора',
		'modal.subtitle': 'Криптокошельки для поддержки проекта',
		'modal.copy': 'Копировать',
		'modal.copied': 'Адрес скопирован',
		'modal.close': 'Закрыть',
		'copied': 'Скопировано'
	},
	en: {
		'brand.tag': 'VPN & proxies',
		'hero.badge': 'V2Ray Lists',
		'hero.title': 'Free VPN configs and MTProxy',
		'hero.subtitle':
			'V2Ray subscriptions, client guides and proxies for Telegram. Pick a config, connect and bypass blocks.',
		'nav.subs': 'V2Ray configs',
		'nav.guides': 'Guides',
		'nav.proxy': 'Proxies',
		'nav.tg': 'Telegram',
		'how.copy.title': 'Copy',
		'how.copy.desc': 'Copy the subscription link below with a single tap.',
		'how.paste.title': 'Paste',
		'how.paste.desc': 'Open your VPN client and paste the link into the subscription field.',
		'how.connect.title': 'Connect',
		'how.connect.desc': 'Pick the fastest config and hit connect.',
		'subs.title': 'V2Ray configs',
		'subs.subtitle': 'Free subscriptions with configs for VPN clients.',
		'sub.mirror': 'Mirror',
		'sub.format': 'Format',
		'sub.copy': 'Copy',
		'subs.copied': 'Link copied',
		'card.configs': 'Configs',
		'card.proxies': 'Proxies',
		'card.updated': 'Updated',
		'card.statsFailed': 'No data',
		'filter.all': 'All',
		'filter.black': 'Black',
		'filter.white': 'White',
		'guides.title': 'Client guides',
		'guides.subtitle': 'How to install and set up popular clients.',
		'guide.download': 'Download',
		'guide.troubleshooting': 'Troubleshooting',
		'guide.update': 'How to update configs?',
		'guide.note.msvcp': 'MSVCP / VCRUNTIME error?',
		'proxy.title': 'Proxies for Telegram',
		'proxy.subtitle': 'Proxy lists for Telegram. A working mirror is picked automatically.',
		'proxy.copyAll': 'Copy all',
		'proxy.copy10': 'Copy 10',
		'proxy.loading': 'Choosing a working mirror…',
		'proxy.failed': 'Failed to load mirror',
		'proxy.activeMirror': 'Active mirror',
		'proxy.link': 'Link',
		'proxy.copiedAll': 'File copied to clipboard',
		'proxy.copied10': '10 proxies copied',
		'tg.title': 'Using proxies in Telegram',
		'tg.subtitle': 'Add a proxy from the list above right inside Telegram.',
		'tg.pc': 'On desktop',
		'tg.phone': 'On phone',
		'tg.pc.steps': [
			'Open Telegram and go to the menu (three lines, top left) → Settings.',
			'Choose Data and Storage → Proxy.',
			'Tap Add Proxy and pick the type: SOCKS5, HTTP or MTProto (depends on the list format).',
			'Enter the proxy details from the “Proxies for Telegram” list above (server, port, secret for MTProto).',
			'Enable the proxy and check the connection — a status appears at the top of the chats.'
		],
		'tg.phone.steps': [
			'In Telegram open Settings → Data and Storage → Proxy.',
			'Tap Add Proxy and pick the type (SOCKS5 / HTTP / MTProto).',
			'Paste the proxy link or details from the “Proxies for Telegram” list (for MTProto, copy the ready link).',
			'Enable the proxy — a checkmark appears next to its name and a proxy icon lights up at the top of chats.'
		],
		'footer.support': 'Support the author',
		'footer.developer': 'Developer',
		'footer.source': 'Source code',
		'modal.title': 'Support the author',
		'modal.subtitle': 'Crypto wallets to support the project',
		'modal.copy': 'Copy',
		'modal.copied': 'Address copied',
		'modal.close': 'Close',
		'copied': 'Copied'
	}
};

function createI18n() {
	let locale = $state('ru');
	if (browser) {
		locale = localStorage.getItem('lang') || 'ru';
	}
	return {
		get locale() {
			return locale;
		},
		set(v) {
			locale = v;
			if (browser) localStorage.setItem('lang', v);
		},
		t(key) {
			return dict[locale]?.[key] ?? dict.ru[key] ?? key;
		}
	};
}

export const i18n = createI18n();
