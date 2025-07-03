import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  define: {
    'process.env.NODE_ENV': '"production"',
  },
  build: {
    lib: {
      entry: './src/main.js',
      name: 'SuperSearch',
      fileName: 'super-search',
      formats: ['es'],
    },
    rollupOptions: {
      external: [],
    },
  },
})
