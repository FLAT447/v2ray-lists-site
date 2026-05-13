import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig({
  plugins: [svelte()],
  build: {
    // НЕ минифицируем CSS, чтобы сохранить все свойства
    minify: 'terser',
    cssMinify: false,
    
    // Оптимизация
    target: 'esnext',
    
    // Rollup опции
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
      }
    }
  },
  
  css: {
    // Включаем поддержку всех CSS свойств
    postcss: {
      plugins: [
        require('autoprefixer')({
          overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead']
        })
      ]
    }
  },
  base: "/v2ray-lists-site/"
})
