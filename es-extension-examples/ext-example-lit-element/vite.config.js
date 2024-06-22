import reactRefresh from '@vitejs/plugin-react';
import babel from 'vite-plugin-babel';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  /* when in lib mode, must define process.env */
  define: {
    'process.env': JSON.stringify({
      NODE_ENV: process.env.NODE_ENV,
    })
  },
  base: urlPath,
  root: '.',
  plugins: [
    reactRefresh(),
    babel(),
  ],
  server: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
    base: '/',
  },
  build: {
    base: urlPath,
    outDir: "dist",
    /* lib config necessary to prevent "Failed to load extension Error" */
    lib: {
      name: "ext-example-lit-element",
      entry: ['./src/ext-lit-element.ts', './src/index.ts'],
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'es',
        /* preserveEntrySignatures: true => rollup preserves the exact structure of exports in the entry point modules in the output bundle */
        preserveEntrySignatures: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
