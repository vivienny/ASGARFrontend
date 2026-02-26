
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import basicSsl from '@vitejs/plugin-basic-ssl'  // ← добавляем


// Определяем режим: продакшен или разработка
const isProd = process.env.NODE_ENV === 'production'
// В продакшене - /ASGARFrontend/, в разработке - /
const base = isProd ? '/ASGARFrontend/' : '/'

export default defineConfig({
  plugins: [
    basicSsl(),  // ← добавляем ПЕРВЫМ!
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      injectRegister: 'auto',
      manifest: {
        name: 'ASGAR Avia Services',
        short_name: 'ASGAR Avia',
        description: 'Каталог авиационных услуг',
        theme_color: '#1976d2',
        background_color: '#ffffff',
        display: 'standalone',
        scope: base,
        start_url: base,
        icons: [
          {
            src: `${base}icon-192.png`,
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: `${base}icon-512.png`,
            sizes: '512x512',
            type: 'image/png',
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        navigateFallback: `${base}index.html`,
      },
      devOptions: {
        enabled: true,
        type: 'module',
      },
    })
  ],
  base: base,
  server: {
    https:{},      // ← включаем HTTPS
    host: true,       // ← слушаем на всех интерфейсах
    port: 3000,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://10.82.26.48:8080', // прокси всё ещё HTTP (бэкенд)
        changeOrigin: true,
      },
    },
  },
})