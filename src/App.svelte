<script>
    import { onMount } from 'svelte';
    import { theme } from "./lib/js/theme.svelte.js";
    import { i18n } from './lib/js/i18n.svelte.js';
    import Header from "./lib/Header.svelte";
    import Background from "./lib/Background.svelte";
    import Grid from './lib/Grid.svelte';
    import Footer from './lib/Footer.svelte';
    import Contacts from './lib/Contacts.svelte';
    import ConfigCards from './lib/ConfigCards.svelte';
    import Guides from './lib/Guides.svelte';
    import MTproxy from './lib/MTproxy.svelte';
    import Projects from './lib/Projects.svelte';

    onMount(() => {
        theme.updateBodyClass();
        i18n.init();
        // плавная загрузка через body — не создаёт stacking context
        requestAnimationFrame(() => {
            document.body.classList.add('page-loaded');
        });
    });
</script>

<Background />
<Header />
<Grid />
<ConfigCards />
<Projects />
<MTproxy />
<Guides />
<Footer />

<div class="contacts-wrapper">
    <Contacts />
</div>

<style>
    .contacts-wrapper {
        position: fixed;
        bottom: 30px;
        right: 30px;
        z-index: 9999;
    }
</style>
