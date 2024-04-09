import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
dotenv.config();

const urlPath = process.env.URLPATH || ''

export default defineConfig({
  base: urlPath,
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
    outDir: "build",
    minify: false,
    rollupOptions: {
      preserveEntrySignatures: true,
      external: (id) => id.startsWith('src') && (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".css")),
      output: {
        treeshake: false,
        preserveModules: true,
        minifyInternalExports: false,
        entryFileNames: (chunkInfo) => {
          // extract the path from `src/` onwards
          const pathFromSrc = chunkInfo.facadeModuleId.split('/src/')[1];
          if (pathFromSrc) {
            // check if the file is a typeScript file and replace '.ts' with '.js'
            if (pathFromSrc.endsWith('.ts')) {
              return `${pathFromSrc.replace(/\.ts$/, '.js')}`;
            }
            // for CSS files, just use the same name
            else if (pathFromSrc.endsWith('.css')) {
              return pathFromSrc;
            }
          } else {
            // fallback filename pattern
            return `[name].js`;
          }
        },
        chunkFileNames: `[name].js`,
        assetFileNames: `[name].[ext]`
      }
    }
  },
});