<script>
    import { FontAwesomeIcon } from "@fortawesome/svelte-fontawesome";
    import { faMobileScreen, faDesktop, faBook } from "@fortawesome/free-solid-svg-icons";
</script>

<section class="instructions animate-in" style="--delay: 0.4s">
    <div class="instructions__title">
        <FontAwesomeIcon icon={faBook} />
        <h2>Как подключить?</h2>
    </div>

    <div class="instructions__grid">
        <div class="guide">
            <div class="guide__header">
                <h3><FontAwesomeIcon icon={faMobileScreen} style="color: var(--blue-color)" /> На телефоне</h3>
            </div>
            <ul>
                <li>Нажмите на ссылку в Telegram или вставьте её в <b>Избранное</b>.</li>
                <li>Кликните по ссылке и нажмите <b>«Включить прокси»</b>.</li>
                <li>Настройки: <i>Данные и память → Прокси</i>.</li>
            </ul>
        </div>

        <div class="guide">
            <div class="guide__header">
                <h3><FontAwesomeIcon icon={faDesktop} style="color: var(--peach-color)" /> На компьютере</h3>
            </div>
            <ul>
                <li>Скопируйте ссылку и отправьте её себе в чат.</li>
                <li>Нажмите на неё прямо в приложении Telegram Desktop.</li>
                <li>Подтвердите подключение в диалоговом окне.</li>
            </ul>
        </div>
    </div>
</section>

<style>
    .instructions {
        margin-top: 60px;
        padding: 32px; /* Настройка внутреннего отступа для сходства с картой  */
        /* Копирование стилей ProxyCard  */
        background: color-mix(in srgb, var(--surface-color), transparent 50%);
        backdrop-filter: blur(12px);
        border: 1px solid color-mix(in srgb, var(--text-color), transparent 90%);
        border-radius: 24px;
        transition: transform 0.3s ease, border-color 0.3s;
    }

    .instructions:hover {
        transform: translateY(-5px); /* Эффект парения при наведении  */
        border-color: color-mix(in srgb, var(--blue-color), transparent 50%);
    }

    .instructions__title {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 15px;
        margin-bottom: 40px;
        font-size: 1.4rem;
        color: var(--blue-color); /* Выделение заголовка акцентным цветом */
    }

    /* Остальные стили сетки и списков сохранены для корректного отображения контента [cite: 68, 71] */
</style>
