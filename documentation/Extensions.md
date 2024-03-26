# Extensions

Each extension should be a JavaScript module which exports a single function named `activate`.
When using typescript, `activate` should be declared using the syntax:

```typescript
import type { ExtensionScaffoldApi } from '@moesol/es-runtime/build/es-api'

// .. declare the activate function

export async function activate(scaffold: ExtensionScaffoldApi, baseUrl: string) { ... }
```

Once the browser has downloaded (or loaded from cache) the JavaScript module,
the `es-runtime` will call the exported `activate` method.

During the `activate` call extensions can use the `ExtensionScaffoldApi`
to add, remove, show, hide, maximize, and minimize panels.
> NOTE: Each panel that is added with `addPanel` must have a unique ID.

The panel layout is managed using a grid layout.

![Grid Layout](out/Grid-Layout/Grid-Layout.svg)

## Sequence Diagram for an Extension Adding Panel

![Extension Adding Panel](out/Extension-Adding-Panel/Extension-Adding-Panel.svg)

## Building extensions for Vite

Vite bundles resources in the `dist` folder differently than snowpack, not preserving folder structure nor a
human-readable format for generated files. Therefore, if you wish to export extensions (ie. `ext-lit-element.js`)
in a format that will usable by `es-home/data/extensions/<ext>.json` and be available at the given `url`
you must follow the below instructions.  

In order for extensions to be bundled in human-readable format in the `dist` folder by vite, 
they must be exported by your `ensure-build.ts` in the `src` directory. 
For example, to export 'ext-lit-element.ts' in 'es-extension-examples/ext-example-lit-element':

1.) create an `ensure-build.ts` file in 'ext-example-lit-element/src' and add `import('./ext-lit-element')` to it 
2.) import `ensure-build` into the index.ts inside your `src` directory (if you don't have an index.ts inside src,
either create one or choose a file that will act as an entrypoint. usually, this is the file designated in
your root index.html in the `script` tag `<script type="module" src="/src/index.ts"></script>`. Vite uses this file 
as an entrypoint to your library)
3.) run 'rush build' and ensure that the `ext-lit-element.js` now appears in your generated `dist` folder. (it should be at the root
and will not have the same folder structure as the src folder it is copied from)
4.) Go to where the extension is registered in `es-home/data/extensions/<ext>.json` and look at the 'url' section. 
Ensure the url matches the location where the extension file currently exists in the generated `dist` folder. 
For example, here is the extension for 'network-extension.json': `"url": "/es/ui/dist/network-extension.js"`. This
means that 'network-extension' must exist in the root of the 'dist' folder.
(Note that the proxy (example.conf) dictates that '/es/ui' is redirected to 'es-home')
4.) restart application and ensure that the extension is loaded without 404 error in the network tab 

