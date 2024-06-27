# Example Vite

This is an example of an extension using vite as its bundler.

#### vite.config.js:

  - adding the setting `root: '.'` tells Vite where entry files such as index.html are located. 
In a monorepo which might run separate instances of Vite, this is crucial for creating boundaries.

  - Running Vite in `lib` mode prevents a "Failed to load extension Error" for 'ext-react-vite.js'. This is 
likely happening because in 'lib' mode, Vite configures the output to be more universally compatible with various 
environments and avoids unnecessary optimizations.

  - `lib.entry` - single path or list of paths that vite should not bundle together

  - `lib.format: [es]` ensures the output is ECMAScript; helps maintain import/export statements as 
they exist in the src, which helps preserve structure, references, and function names

  - `rollupOptions.output.preserveEntrySignatures` => one of the settings that tells rollup to preserve the structure 
of exports in the entry point modules

  - `rollupOptions.output.entryFileNames` => ensures proper name and ext of file

#### paths in es-home/data 

- make sure paths in es-home/data/applications/<example>.json & es-home/data/extensions/<extension>.json match the 
location of the extension in the generated /build ("/ext-example-vite/dist/ext-react-vite.js")


