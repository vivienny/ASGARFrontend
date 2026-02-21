import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const isProd = process.env.NODE_ENV === 'production'
const base = isProd ? '/ASGARFrontend/' : '/'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      strategies: 'generateSW',
      injectRegister: 'auto',
      // ВАЖНО: добавляем base к путям в манифесте
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
      src: '/ASGARFrontend/icon-192.png',  // ← явно указываем полный путь
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/ASGARFrontend/icon-512.png',  // ← и здесь
      sizes: '512x512',
      type: 'image/png',
    }
  ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json}'],
        // ВАЖНО: указываем правильный base для кэширования
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
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
})