import type { ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'

// https://vite.dev/config/
export default defineConfig((mode: ConfigEnv) => {
  const env = loadEnv(mode.mode, process.cwd())
  return {
    plugins: [vue()],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: '/src',
        },
      ],
    },
    server: {
      hmr: true,
      proxy: {
        '/api': {
          target: env.VITE_GATEWAY_URL,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, '/'),
        },
      },
    },
  }
})
