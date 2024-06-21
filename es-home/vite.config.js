import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import fs from "fs";
import path from "path";
import dotenv from 'dotenv';
dotenv.config();

const urlPath = process.env.URLPATH || ''

function listTsFiles(options) {
    const { srcDir, ignoredPaths = [], ignoreSubDirs = false } = options;
    let entries = {};

    function exploreDirectory(dir) {
        const files = fs.readdirSync(dir, { withFileTypes: true });
        files.forEach(dirent => {
            const fullPath = path.join(dir, dirent.name);
            if (dirent.isDirectory()) {
                // Check if ignoring all subdirectories or specific directories
                if (!ignoreSubDirs && !ignoredPaths.includes(dirent.name)) {
                    exploreDirectory(fullPath);
                }
            } else if (dirent.name.endsWith('.ts')) {
                const entryKey = fullPath.replace(new RegExp(`^${path.resolve(srcDir)}\/|\.ts$`, 'g'), '').replace(/\//g, '_');
                entries[entryKey] = fullPath;
            }
        });
    }

    exploreDirectory(srcDir);
    return entries;
}

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
      lib: {
      name: "es-home",
      entry: listTsFiles({
          srcDir: "./src",
          ignoreSubDirs: false
      }),
      formats: ['es']
    },
    rollupOptions: {
      preserveEntrySignatures: true,
      external: (id) => id.startsWith('src') && (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".css")),
      output: {
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
