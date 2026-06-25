import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Relative base so the app works on Vercel, Netlify, GitHub Pages and shared hosting
// without any server-side routing. Routing is handled by HashRouter.
export default defineConfig({
  base: './',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    // Honor the PORT env var (used by the preview/launch harness) when present.
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          motion: ['framer-motion'],
          pdf: ['jspdf', 'html2canvas'],
          i18n: ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
        },
      },
    },
  },
})
