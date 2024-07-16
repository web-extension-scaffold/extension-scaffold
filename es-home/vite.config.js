import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';
import dotenv from 'dotenv';
dotenv.config();
const fs = require('fs');
const path = require('path');

const EXT_PATH = "./src/extensions";

const urlPath = process.env.URLPATH || '';

const getAllExtensions = (dir) => {
  const files = fs.readdirSync(dir);
  let fileList = {};

  files.forEach(file => {
    const fullPath = path.join(dir, file);
    const relativePath = path.relative('./src', fullPath).replace(/\\/g, '/'); // for windows compatibility
    if (fs.statSync(fullPath).isDirectory()) {
      fileList = { ...fileList, ...getAllExtensions(fullPath) };
    } else {
      const key = relativePath.replace(path.extname(file), '');
      fileList[key] = fullPath;
    }
  });

  return fileList;
}

export default defineConfig({
  preview: {
    port: 8080
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
    port: 8080,
    strictPort: true,
    host: '0.0.0.0',
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
      input: {
        index: 'index.html',
        'bcst-bus': './src/bcst-bus.ts',
        ...getAllExtensions(EXT_PATH)
      },
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
