import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dotenv from 'dotenv';
dotenv.config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  preview: {
    port: 9091
  },
  define: {
    'process.env': JSON.stringify(process.env)
  },
  base: urlPath,
  root: '.',
  plugins: [
    reactRefresh(),
    nodePolyfills()
  ],
  server: {
    port: 9091,
    strictPort: true,
    host: '0.0.0.0',
  },
  build: {
    base: urlPath,
    outDir: "dist",
    /* lib.entry config necessary to prevent "Failed to load extension Error" */
    lib: {
      name: "ext-example-basic",
      entry: ['./src/ext-react-basic.tsx'],
      formats: ['es']
    },
    rollupOptions: {
      output: {
        /* preserveEntrySignatures: true => rollup preserves the exact structure of exports in the entry point modules in the output bundle */
        preserveEntrySignatures: true,
        entryFileNames: `[name].js`,
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
