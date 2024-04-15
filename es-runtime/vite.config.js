import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  base: urlPath,
  root: ".",
  plugins: [
    reactRefresh(),
  ],
  server: {
    port: 8081,
    strictPort: true,
    host: '0.0.0.0',
    base: '/',
  },
  build: {
    base: urlPath,
    outDir: "dist",
    minify: false,
  },
});