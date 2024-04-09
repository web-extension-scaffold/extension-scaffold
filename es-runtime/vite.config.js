import reactRefresh from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';
import fs from "fs";
import path from "path";

dotenv.config();

const urlPath = process.env.URLPATH || ''

function listTsFiles(dir, basePath = '', seenNames = {}) {
    const fullPath = path.join(dir, basePath);
    const filesAndDirs = fs.readdirSync(fullPath, { withFileTypes: true });
    let result = {};

    for (const dirent of filesAndDirs) {
        if (dirent.isDirectory()) {
            // Recursively list files in subdirectories
            const subDirResult = listTsFiles(dir, path.join(basePath, dirent.name), seenNames);
            result = { ...result, ...subDirResult };
        } else if (dirent.name.endsWith('.ts')) {
            const fileNameWithoutExt = path.basename(dirent.name, '.ts');
            let key = fileNameWithoutExt;

            // If the file name has been seen before, prepend the directory structure to ensure uniqueness
            if (seenNames.hasOwnProperty(fileNameWithoutExt)) {
                key = path.join(basePath, fileNameWithoutExt).replace(/\//g, '/');
                // Modify key for the original file if this is the first duplicate
                if (typeof seenNames[fileNameWithoutExt] === 'string') {
                    const originalPath = seenNames[fileNameWithoutExt];
                    const originalKey = originalPath.replace(/^\.\/src\/|\.ts$/g, '').replace(/\//g, '/');
                    seenNames[fileNameWithoutExt] = true; // Mark as processed
                    result[originalKey] = `./${originalPath}`;
                }
            } else {
                seenNames[fileNameWithoutExt] = `./src/${path.join(basePath, dirent.name)}`;
            }

            result[key] = `./src/${path.join(basePath, dirent.name)}`;
        }
    }
    return result;
}

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
    lib: {
      name: "es-runtime",
      entry: listTsFiles('./src'),
      formats: ['es']
    },
    rollupOptions: {
      preserveEntrySignatures: true,
      external: (id) => id.startsWith('src') && (id.endsWith(".js") || id.endsWith(".ts") || id.endsWith(".css")),
      output: {
        treeshake: false,
        preserveModules: true,
        preserveModulesRoot: "src",
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