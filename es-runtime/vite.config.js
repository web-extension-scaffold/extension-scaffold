import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
require('dotenv').config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  plugins: [
    reactRefresh(),
  ],
  server: {
    port: 8081,
    host: true
  },
  build: {
    outDir: urlPath ? `${urlPath}/dist` : 'dist',
    base: urlPath,
  },
});