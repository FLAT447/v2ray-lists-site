import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    svelte(),
    VitePWA({
      registerType: 'autoUpdate', 
      includeAssets: ['favicon.png', 'vite.svg', 'svelte.svg'], 
      manifest: {
        name: 'V2Ray Lists Site',
        short_name: 'V2Ray Lists',
        description: 'Бесплатные VPN ключи',
        theme_color: '#05060a', 
        background_color: '#1e1e2e',
        display: 'standalone',
        start_url: '/v2ray-lists-site/',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' 
          }
        ]
      }
    })
  ],
  base: '/v2ray-lists-site/',
})
