import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(async ({ mode }) => {
  const plugins = [vue(), tailwindcss()]

  if (mode === 'development') {
    const { default: vueDevTools } = await import('vite-plugin-vue-devtools')
    plugins.push(vueDevTools())
  }

  return {
    plugins,
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              // Vue core
              if (id.includes('vue') || id.includes('pinia') || id.includes('vue-router')) {
                return 'vue-core'
              }
              // Charts library (large)
              if (id.includes('apexcharts') || id.includes('vue3-apexcharts')) {
                return 'charts'
              }
              // UI libraries
              if (id.includes('sweetalert2')) {
                return 'ui-libs'
              }
              // File upload
              if (id.includes('filepond')) {
                return 'filepond'
              }
              // Icons (large)
              if (id.includes('@tabler/icons')) {
                return 'icons'
              }
              // Date/time
              if (id.includes('date') || id.includes('vuepic')) {
                return 'datetime'
              }
              // Other vendors
              return 'vendor'
            }
          },
        },
      },
    },
    server: {
      host: true,
      proxy: {
        '/api': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
        '/storage': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
        '/sanctum': {
          target: 'http://localhost:8000',
          changeOrigin: true,
        },
      },
    },
  }
})
