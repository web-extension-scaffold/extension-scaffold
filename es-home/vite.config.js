import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
require('dotenv').config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  root: '.',
  plugins: [
    reactRefresh(),
  ],
  server: {
    port: 8080,
    host: true,
    proxy: {
      "/es/ui": {
        target: "http://es-home:8080/es/ui",
        changeOrigin: true,
        secure: false,
      }
    }
  },
  build: {
    outDir: urlPath ? `${urlPath}/dist` : 'dist',
    base: urlPath,
  },
});
