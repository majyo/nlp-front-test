import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8011
  },
  proxy: {
    '/api': {
      target: 'http://192.168.40.7:8009',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '')
    }
  },
  plugins: [vue()]
})
