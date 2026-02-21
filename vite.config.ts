import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Жёстко задаём base для продакшена
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],
  base: isProd ? '/ASGARFrontend/' : '/',
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