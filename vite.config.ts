import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: './',
  server: {
    // Local dev only: forward /api/* to the Express server (server/, port 4000)
    // so the frontend can use the same relative paths as production.
    // Not needed with `vercel dev`, which serves /api itself.
    proxy: {
      '/api': 'http://localhost:4000',
    },
  },
})
