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

All extensions used by a package (`theme-extension`, `ext-lit-element`, ect) need to be added to vite.config.js under 
`build.lib.entry`, along with an `index.ts` file (which will export these extension):

``` 
// vite.config.js:
build: {
    lib: {
        entry: ['./src/ext-lit-element.ts', './src/theme-extension.ts', './src/index.ts']
    }
}
```

```javascript
// add to /src/index.ts
import('./theme-extension')
import('./ext-lit-element')
```

After this is done, run 'rush build' and ensure that the `ext-lit-element.js` now appears in your generated `dist` 
or `build` folder. 

Then, go to where the extension is registered in `es-home/data/extensions/<ext>.json` and look at the 'url' section. 
Ensure the url matches the location where the extension file currently exists in the generated `dist` folder. 
For example, here is the extension for 'network-extension.json': `"url": "/es/ui/dist/network-extension.js"`. This
means that 'network-extension' must exist in the root of the 'dist' folder.
(Note that the proxy (example.conf) dictates that '/es/ui' is redirected to 'es-home')

Now restart application and ensure that the extension is loaded without 404 error in the network tab 

