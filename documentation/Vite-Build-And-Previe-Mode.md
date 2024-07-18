## Vite Preview Mode

In order to test how vite will work in production, run in 'vite preview' mode by adding the
`PREVIEW_MODE=true` environment variable to your .env or directly to your docker compose command:

Running in Preview Mode
```bash
$ PREVIEW_MODE=true docker-compose up --build
```

Running in Dev Mode
```bash
$ docker-compose up --build
```

### Explanation of package.json scripts

In the package.json, before running `vite preview` it is necessary to run `vite build` and copy the /dist
directory into a nested dist/dist directory:

```json
{
  "build": "vite build && mkdir -p temp && cp -rf dist/* temp/ && mv temp dist/dist"
}
```

This is done because vite preview serves its files from the /dist directory 
instead of the root (as in dev mode). And the paths for the extensions will
be relative to the root. See, for example, the following URL:

```
/es/ui/dist/extensions/console-extension.js
```

In dev mode, 'es/ui' represents the root folder of the project, and will look for the extension here:

```
<root>/dist/<extension.json>
```

In preview mode, 'es/ui' represents the /dist folder itself, and the project will look for the extension in the nested /dist here:

```
<root>/dist/dist/<extension.json>
```

Note: One should not try to solve this issue using the flag `--outDir .`