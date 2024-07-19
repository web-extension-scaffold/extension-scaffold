import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills'
import dotenv from 'dotenv';
dotenv.config();

// Check for the existence of the old environment variable
if (process.env.ES_SECURITY_URL_development || process.env.ES_SECURITY_URL_production) {
  throw new Error(`
    The environment variable 'ES_SECURITY_URL' has been deprecated.
    Please use 'VITE_ES_SECURITY_URL' instead.
  `);
}

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  preview: {
    port: 8082
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
    port: 8082,
    strictPort: true,
    host: '0.0.0.0',
    base: '/',
  },
  build: {
    base: urlPath,
    outDir: "dist",
    /* lib.entry config necessary to prevent "Failed to load extension Error" */
    lib: {
      name: "es-common-extensions",
      entry: ['./src/index.ts', './src/debug-metrics.tsx', './src/theme-extension.tsx'],
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
