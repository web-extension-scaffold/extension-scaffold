import reactRefresh from '@vitejs/plugin-react';
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
  ],
  server: {
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
    base: '/',
  },
  build: {
    /* "Failed to load extension" error if "minify: true"  */
    minify: false,
    base: urlPath,
    outDir: "dist",
    /* lib.entry config necessary to prevent "Failed to load extension Error" */
    lib: {
      name: "es-home",
      entry: [
          './src/index.ts',
          './src/bcst-bus.ts',
          './src/extensions/console-extension.ts',
          './src/extensions/help-about-extension.ts',
          './src/extensions/network-extension.ts',
      ],
      formats: ['es']
    },
    rollupOptions: {
      output: {
        format: 'es',
        /* preserveEntrySignatures: true => rollup preserves the exact structure of exports in the entry point modules in the output bundle */
        preserveEntrySignatures: true,
        /* entryFileNames function prevents error "Failed to fetch dynamically imported module"  */
        entryFileNames: (chunkInfo) => {
          const pathFromSrc = chunkInfo.facadeModuleId.split('/src/')[1];
          return pathFromSrc ? `${pathFromSrc.replace(/\.ts$/, '.js')}`: `[name].js`;
        },
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});
