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
        name: 'V2Ray Lists Site (MTProxy)',
        short_name: 'MTProxy Lists',
        description: 'Бесплатные MTProxy',
        theme_color: '#05060a',
        background_color: '#1e1e2e', 
        display: 'standalone',
        start_url: '/v2ray-lists-site/mtproxy/',
        scope: '/v2ray-lists-site/mtproxy/',
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
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any maskable'
          }
        ]
      }
    })
  ],
  base: '/v2ray-lists-site/mtproxy/'
})
