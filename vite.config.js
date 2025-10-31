import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { fileURLToPath, URL } from 'node:url'
import process from 'node:process'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 加载环境变量
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [
      vue(),
      vueDevTools(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
    // 重要：对于 Vercel 部署，使用相对路径
    base: '/',
    build: {
      outDir: 'dist',
      target: 'esnext',
      // 优化 chunk 大小，避免 Vercel 限制
      rollupOptions: {
        external: [],
        output: {
          format: 'es',
          inlineDynamicImports: false,
          manualChunks: {
            vendor: ['vue', 'pinia'],
            charts: ['echarts', 'vue-echarts'],
            ui: ['element-plus', '@element-plus/icons-vue']
          }
        }
      },
      optimizeDeps: {
        include: ['jose', 'jose/dist/browser/index'],
        exclude: []
      },
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    server: {
      host: true,
      port: 3000,
      proxy: {
        // 和风天气代理
        '/qweather': {
          target: `https://${env.VITE_API_HOST || 'api.qweather.com'}`,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/qweather/, '')
        },
        // OpenWeatherMap 代理
        '/openweather': {
          // target: 'http://api.openweathermap.org',
          target: 'https://833jdct35.re.qweatherapi.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/openweather/, '/data/2.5')
        }
      }
    }
  }
})
