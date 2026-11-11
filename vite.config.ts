import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// base './' makes every asset URL relative, so the built `dist/` folder
// works from an IPFS gateway path (/ipfs/<cid>/) as well as from a domain root.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  // Flat output (no assets/ folder): Unstoppable's file uploader takes a flat list of files.
  build: {
    rollupOptions: {
      output: {
        entryFileNames: '[name]-[hash].js',
        chunkFileNames: '[name]-[hash].js',
        assetFileNames: '[name]-[hash][extname]',
      },
    },
  },
  server: { port: 8765, host: true },
  preview: { port: 8765 },
})
