import { defineConfig } from 'vite'
import { viteStaticCopy } from 'vite-plugin-static-copy'
import dotenv from 'dotenv';
dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    viteStaticCopy({
      targets: [{
        src: 'node_modules/@moesol/es-iframe-to-dev-ext/public/debug-network-service-worker.js',
        dest: '.'
      }]
    })
  ],
  server: {
    host: '0.0.0.0',
    base: '/',
    port: 9095,
    strictPort: true,
  },
  preview: {
    port: 9095,
  },
  build: {
    sourcemap: true,
    rollupOptions: {
    }
  }
})
