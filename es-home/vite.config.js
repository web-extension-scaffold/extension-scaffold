import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  base: urlPath,
  root: '.',
  plugins: [
    reactRefresh(),
  ],
  server: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
    base: '/',
  },
  build: {
    minify: false,
    base: urlPath,
    outDir: "dist",
    rollupOptions: {
      preserveEntrySignatures: true,
      output: {
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
