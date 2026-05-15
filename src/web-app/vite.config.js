import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

const apiProxyTarget = process.env.VITE_API_PROXY_TARGET || 'http://127.0.0.1:8011'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5175,
    proxy: {
      '/api': {
        // In local dev, the API is served separately on 8011 by default.
        target: apiProxyTarget,
        changeOrigin: true,
      },
    }
  }
})
