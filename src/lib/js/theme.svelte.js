import { onMount } from 'svelte';

let currentTheme = $state(
    (typeof localStorage !== 'undefined' && localStorage.getItem('theme')) || 'dark'
);

export const theme = {
    get current() { return currentTheme; },
    toggle() {
        currentTheme = currentTheme === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', currentTheme);
        this.updateBodyClass();
    },
    updateBodyClass() {
        if (typeof document !== 'undefined') {
            document.documentElement.classList.toggle('light-theme', currentTheme === 'light');
        }
    }
};
