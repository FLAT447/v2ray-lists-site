export const clientGuides = {
	ru: [
		{
			id: 'android',
			platform: 'Android',
			client: 'v2rayNG',
			icon: 'android',
			accent: '#1BD25F',
			downloads: [
				{
					label: 'v2rayNG',
					url: 'https://github.com/2dust/v2rayNG/releases/download/2.3.2/v2rayNG_2.3.2-universal.apk'
				}
			],
			steps: [
				'Скачайте и установите v2rayNG.',
				'Скопируйте в буфер обмена ссылку на конфиг из списка выше.',
				'Откройте v2rayNG: справа сверху нажмите + → «Импорт из буфера обмена».',
				'Справа сверху откройте меню «три точки» → «Проверить задержку профилей». После проверки в том же меню выберите «Сортировать по результатам теста».',
				'Выберите сервер с наименьшим пингом и нажмите ▶ (подключить) в правом нижнем углу.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Решение проблем',
					items: [
						{
							q: 'Нет интернета при подключении',
							a: 'Убедитесь, что включён VPN-режим в настройках. Попробуйте выбрать другой сервер с меньшим пингом.'
						},
						{
							q: 'Конфиги не появились',
							a: 'Убедитесь, что URL скопирован полностью. Попробуйте вставить его вручную через «Добавить профиль» → «Тип: Subscription».'
						},
						{
							q: 'Ошибка "Handshake timeout"',
							a: 'Сервер временно недоступен. Выберите другой сервер из списка или повторите проверку задержки.'
						},
						{
							q: 'Ошибка "Closed pipe"',
							a: 'Перезапустите приложение и попробуйте подключиться снова. Если не помогает — смените конфиг.'
						}
					]
				}
			],
			update: {
				title: 'Как обновить конфиги?',
				steps: [
					'Нажмите на иконку трёх полосок в левом верхнем углу.',
					'Выберите вкладку «Группы».',
					'Нажмите на иконку кружка со стрелкой в правом верхнем углу.'
				]
			}
		},
		{
			id: 'androidtv',
			platform: 'Android TV',
			client: 'v2rayNG',
			icon: 'tv',
			accent: '#7C4DFF',
			downloads: [
				{
					label: 'v2rayNG',
					url: 'https://github.com/2dust/v2rayNG/releases/download/2.3.2/v2rayNG_2.3.2-universal.apk'
				}
			],
			steps: [
				'Установите v2rayNG и зайдите в него.',
				'Скачайте один из QR-кодов из списка выше.',
				'В v2rayNG нажмите + справа сверху → «Импорт из QR-кода», затем выберите картинку (иконка фото в правом верхнем углу).',
				'Меню «три точки» справа сверху → «Проверить задержку профилей», затем в том же меню — «Сортировать по результатам теста».',
				'Выберите сервер с наименьшим пингом и нажмите ▶ в правом нижнем углу.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Решение проблем',
					items: [
						{
							q: 'Приложение не устанавливается',
							a: 'Включите установку из неизвестных источников в настройках безопасности Android TV.'
						},
						{
							q: 'Не работает пульт в приложении',
							a: 'Используйте физическую мышь или управление через ADB для навигации в приложении.'
						},
						{
							q: 'QR не сканируется',
							a: 'Убедитесь, что на экране ТВ изображение QR крупное и не смазано. Попробуйте другой файл из папки или импорт по ссылке с другого устройства.'
						}
					]
				}
			],
			update: {
				title: 'Как обновить конфиги?',
				steps: [
					'Нажмите на иконку трёх полосок в левом верхнем углу.',
					'Выберите вкладку «Группы».',
					'Нажмите на иконку кружка со стрелкой в правом верхнем углу.'
				]
			}
		},
		{
			id: 'windows',
			platform: 'Windows / Linux',
			client: 'Throne',
			icon: 'computer',
			accent: '#2D7FF9',
			downloads: [
				{
					label: 'Windows 10 / 11',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-windows64.zip'
				},
				{
					label: 'Windows 7 / 8 / 8.1',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-windowslegacy64.zip'
				},
				{
					label: 'Linux',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-linux-amd64.zip'
				}
			],
			steps: [
				'Скачайте Throne для своей системы по ссылкам выше.',
				'Скопируйте в буфер обмена ссылку на конфиг из списка выше.',
				'В Throne: Профили → Добавить профиль из буфера обмена.',
				'Выделите все конфиги (Ctrl+A). В меню Профили выберите «Тест задержки (пинга) выбранного профиля» и дождитесь окончания (во вкладке Логи появится «Тест задержек (пинга) завершён!»).',
				'Нажмите на заголовок колонки «Задержка (пинг)» для сортировки.',
				'В верхней части окна включите «Режим TUN» (галочка).',
				'Выберите конфиг с наименьшей задержкой: ЛКМ по строке → в меню — Запустить.'
			],
			boxes: [
				{
					kind: 'note',
					title: 'Ошибка MSVCP / VCRUNTIME?',
					text: 'Если программа не запускается, удалите старые версии Visual C++ и установите пакет:',
					link: {
						label: 'Скачать Visual C++ Runtimes',
						url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe'
					},
					text2: 'Распакуйте и запустите install_bat.all от имени администратора.'
				},
				{
					kind: 'troubleshooting',
					title: 'Решение проблем',
					items: [
						{
							q: 'Антивирус блокирует приложение',
							a: 'Добавьте Throne в исключения антивируса. Это ложное срабатывание — VPN-клиенты часто блокируются антивирусами.'
						},
						{
							q: 'Нет доступа в интернет после подключения',
							a: 'Убедитесь, что включён «Режим TUN» в верхней части окна Throne. Попробуйте запустить приложение от имени администратора.'
						},
						{
							q: 'Ошибка "Handshake timeout"',
							a: 'Сервер временно недоступен. Выберите другой профиль из списка.'
						}
					]
				}
			],
			update: {
				title: 'Как обновить конфиги?',
				steps: [
					'Нажмите кнопку «Настройки».',
					'Выберите «Группы».',
					'Нажмите «Обновить все подписки».'
				]
			}
		},
		{
			id: 'ios',
			platform: 'iOS / iPadOS',
			client: 'Streisand',
			icon: 'smartphone',
			accent: '#FF5A4D',
			downloads: [
				{
					label: 'Streisand',
					url: 'https://apps.apple.com/us/app/streisand/id6450534064'
				}
			],
			steps: [
				'Установите Streisand из App Store.',
				'Скопируйте в буфер обмена ссылку на конфиг из списка выше.',
				'Откройте Streisand и нажмите + → Import from Clipboard (добавить из буфера).',
				'Зажмите добавленную подписку и выберите Latency (задержка).',
				'Выберите сервер с наименьшей задержкой и нажмите Включить вверху экрана.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Решение проблем',
					items: [
						{
							q: 'Streisand недоступен в моём регионе',
							a: 'Смените регион App Store на США или другой поддерживаемый регион через настройки Apple ID.'
						},
						{
							q: 'Конфиги не загружаются',
							a: 'Убедитесь, что ссылка скопирована полностью без лишних пробелов. Попробуйте удалить подписку и добавить снова из буфера.'
						}
					]
				}
			],
			update: {
				title: 'Как обновить конфиги?',
				steps: [
					'Зажмите подписку и выберите Update (обновить).'
				]
			}
		},
		{
			id: 'macos',
			platform: 'MacOS',
			client: 'Hiddify',
			icon: 'desktop_mac',
			accent: '#12B5A5',
			downloads: [
				{
					label: 'Hiddify',
					url: 'https://github.com/hiddify/hiddify-app/releases/download/latest/Hiddify-MacOS.dmg'
				}
			],
			steps: [
				'Скачайте и установите Hiddify по ссылке выше.',
				'Нажмите «Новый профиль».',
				'Скопируйте в буфер обмена ссылку на конфиг из списка выше.',
				'Нажмите «Добавить из буфера обмена».',
				'Откройте «Настройки» и установите «Вариант маршрутизации» на «Индонезия».',
				'В левом верхнем меню нажмите на иконку настроек и выберите «VPN сервис».',
				'Включите VPN, нажав на иконку по центру.',
				'Чтобы сменить сервер: включите VPN и перейдите на вкладку «Прокси».'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Решение проблем',
					items: [
						{
							q: 'macOS блокирует запуск приложения',
							a: 'Перейдите в Системные настройки → Конфиденциальность и безопасность → разрешите запуск Hiddify.'
						},
						{
							q: 'VPN-профиль не устанавливается',
							a: 'Разрешите запрос на установку VPN-конфигурации, нажав «Разрешить» в появившемся диалоге macOS.'
						}
					]
				}
			],
			update: {
				title: 'Как обновить конфиги?',
				steps: [
					'Откройте Hiddify и выберите нужный профиль.',
					'Нажмите слева от названия профиля на иконку обновления.'
				]
			}
		}
	],
	en: [
		{
			id: 'android',
			platform: 'Android',
			client: 'v2rayNG',
			icon: 'android',
			accent: '#1BD25F',
			downloads: [
				{
					label: 'v2rayNG',
					url: 'https://github.com/2dust/v2rayNG/releases/download/2.3.2/v2rayNG_2.3.2-universal.apk'
				}
			],
			steps: [
				'Download and install v2rayNG.',
				'Copy the config link from the list above to your clipboard.',
				'Open v2rayNG: tap + at the top right → Import from clipboard.',
				'Open the three-dot menu at the top right → Test profile latency. After the test, in the same menu choose Sort by test results.',
				'Pick the server with the lowest ping and tap ▶ (connect) at the bottom right.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Troubleshooting',
					items: [
						{
							q: 'No internet after connecting',
							a: 'Make sure VPN mode is enabled in settings. Try a different server with lower ping.'
						},
						{
							q: 'Configs did not appear',
							a: 'Make sure the URL was copied completely. Try pasting it manually via Add profile → Type: Subscription.'
						},
						{
							q: 'Error "Handshake timeout"',
							a: 'The server is temporarily unavailable. Choose another server from the list or re-run the latency test.'
						},
						{
							q: 'Error "Closed pipe"',
							a: 'Restart the app and try connecting again. If that does not help, switch the config.'
						}
					]
				}
			],
			update: {
				title: 'How to update configs?',
				steps: [
					'Tap the three-line icon in the top left corner.',
					'Open the Groups tab.',
					'Tap the circular arrow icon in the top right corner.'
				]
			}
		},
		{
			id: 'androidtv',
			platform: 'Android TV',
			client: 'v2rayNG',
			icon: 'tv',
			accent: '#7C4DFF',
			downloads: [
				{
					label: 'v2rayNG',
					url: 'https://github.com/2dust/v2rayNG/releases/download/2.3.2/v2rayNG_2.3.2-universal.apk'
				}
			],
			steps: [
				'Install v2rayNG and open it.',
				'Download one of the QR codes from the list above.',
				'In v2rayNG tap + at the top right → Import from QR code, then pick the image (photo icon at top right).',
				'Three-dot menu at top right → Test profile latency, then in the same menu — Sort by test results.',
				'Pick the server with the lowest ping and tap ▶ at the bottom right.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Troubleshooting',
					items: [
						{
							q: 'App will not install',
							a: 'Enable installation from unknown sources in Android TV security settings.'
						},
						{
							q: 'Remote does not work in the app',
							a: 'Use a physical mouse or ADB control to navigate the app.'
						},
						{
							q: 'QR will not scan',
							a: 'Make sure the QR on the TV screen is large and not blurry. Try another file from the folder or import by link from another device.'
						}
					]
				}
			],
			update: {
				title: 'How to update configs?',
				steps: [
					'Tap the three-line icon in the top left corner.',
					'Open the Groups tab.',
					'Tap the circular arrow icon in the top right corner.'
				]
			}
		},
		{
			id: 'windows',
			platform: 'Windows / Linux',
			client: 'Throne',
			icon: 'computer',
			accent: '#2D7FF9',
			downloads: [
				{
					label: 'Windows 10 / 11',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-windows64.zip'
				},
				{
					label: 'Windows 7 / 8 / 8.1',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-windowslegacy64.zip'
				},
				{
					label: 'Linux',
					url: 'https://github.com/throneproj/Throne/releases/download/1.2.2/Throne-1.2.2-linux-amd64.zip'
				}
			],
			steps: [
				'Download Throne for your system using the links above.',
				'Copy the config link from the list above to your clipboard.',
				'In Throne: Profiles → Add profile from clipboard.',
				'Select all configs (Ctrl+A). In the Profiles menu choose Ping delay test for selected profile and wait until it finishes (the Logs tab will show "Ping delay test completed!").',
				'Click the "Delay (ping)" column header to sort.',
				'Enable TUN mode (checkbox) at the top of the window.',
				'Pick the config with the lowest delay: left-click the row → in the menu — Start.'
			],
			boxes: [
				{
					kind: 'note',
					title: 'MSVCP / VCRUNTIME error?',
					text: 'If the app does not start, remove old Visual C++ versions and install the package:',
					link: {
						label: 'Download Visual C++ Runtimes',
						url: 'https://aka.ms/vs/17/release/vc_redist.x64.exe'
					},
					text2: 'Unpack and run install_bat.all as administrator.'
				},
				{
					kind: 'troubleshooting',
					title: 'Troubleshooting',
					items: [
						{
							q: 'Antivirus blocks the app',
							a: 'Add Throne to your antivirus exclusions. This is a false positive — VPN clients are often blocked by antivirus.'
						},
						{
							q: 'No internet after connecting',
							a: 'Make sure TUN mode is enabled at the top of the Throne window. Try running the app as administrator.'
						},
						{
							q: 'Error "Handshake timeout"',
							a: 'The server is temporarily unavailable. Choose another profile from the list.'
						}
					]
				}
			],
			update: {
				title: 'How to update configs?',
				steps: [
					'Click the Settings button.',
					'Choose Groups.',
					'Click Update all subscriptions.'
				]
			}
		},
		{
			id: 'ios',
			platform: 'iOS / iPadOS',
			client: 'Streisand',
			icon: 'smartphone',
			accent: '#FF5A4D',
			downloads: [
				{
					label: 'Streisand',
					url: 'https://apps.apple.com/us/app/streisand/id6450534064'
				}
			],
			steps: [
				'Install Streisand from the App Store.',
				'Copy the config link from the list above to your clipboard.',
				'Open Streisand and tap + → Import from Clipboard.',
				'Long-press the added subscription and choose Latency.',
				'Pick the server with the lowest latency and tap Enable at the top of the screen.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Troubleshooting',
					items: [
						{
							q: 'Streisand is unavailable in my region',
							a: 'Change your App Store region to the US or another supported region via Apple ID settings.'
						},
						{
							q: 'Configs will not load',
							a: 'Make sure the link was copied completely with no extra spaces. Try deleting the subscription and adding it again from the clipboard.'
						}
					]
				}
			],
			update: {
				title: 'How to update configs?',
				steps: [
					'Long-press the subscription and choose Update.'
				]
			}
		},
		{
			id: 'macos',
			platform: 'MacOS',
			client: 'Hiddify',
			icon: 'desktop_mac',
			accent: '#12B5A5',
			downloads: [
				{
					label: 'Hiddify',
					url: 'https://github.com/hiddify/hiddify-app/releases/download/latest/Hiddify-MacOS.dmg'
				}
			],
			steps: [
				'Download and install Hiddify using the link above.',
				'Click New profile.',
				'Copy the config link from the list above to your clipboard.',
				'Click Add from clipboard.',
				'Open Settings and set Routing option to Indonesia.',
				'In the top-left menu tap the settings icon and choose VPN service.',
				'Enable VPN by tapping the center icon.',
				'To switch servers: enable VPN and go to the Proxy tab.'
			],
			boxes: [
				{
					kind: 'troubleshooting',
					title: 'Troubleshooting',
					items: [
						{
							q: 'macOS blocks the app from launching',
							a: 'Go to System Settings → Privacy & Security → allow Hiddify to run.'
						},
						{
							q: 'VPN profile will not install',
							a: 'Allow the VPN configuration install prompt by clicking Allow in the macOS dialog.'
						}
					]
				}
			],
			update: {
				title: 'How to update configs?',
				steps: [
					'Open Hiddify and select the desired profile.',
					'Tap the refresh icon to the left of the profile name.'
				]
			}
		}
	]
};
