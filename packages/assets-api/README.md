# @talend/assets-api

Assets are files from a npm package which can be needeed at some point by a web application. It can be a stylesheet, a SVG icon, a js script, a json file, etc...

At Talend our web applications may rely on a CDN to load libraries like lodash, d3 but also @talend/design-system using UMD distribution format. An application rely on a CDN depending of the execution context; We are following 12 factors principals. So the same code base must work in both case so an asset url may change from '/cdn/my-package/1.2.3/dist/my-assets.svg`to`https://mycdn.talend.com/my-package/1.2.3/dist/my-assets.svg`.

This is made possible using custom configuration of `@talend/dynamic-cdn-webpack-plugin`. Now we also need to be able to load translations, icons and more **assets** from the code.

This package exposes a simple and friendly API to let developers access assets without the complexity of computing URL depending on the context (CDN or not).

## Learn with examples

First you need to ensure you have setup the [babel plugin](https://npmjs.com/package/@talend/babel-plugin-assets-api) or you use @talend/scripts-core to build your lib / project.

Then we can start with this global example:

```javascript
import assetsAPI from '@talend/assets-api';

// The lowest level API is the ability to get the URL of anything. Here, a CSS file.
const href = assetsApi.getURL('/dist/styles/ag-grid.css', 'ag-grid-community');
// babel will add all missing arguments and at runtime you will have
console.log(href);
// -> 'https://unpkg.com/ag-grid-community@25.0.0/dist/styles/ag-grid.css';

// Higher level APIs enable users to get a JSON file for locales, timezones, etc...
async function getTopology(file) {
	const locales = await assetsAPI.getJSON(
		`/dist/assets/maps/${file}.topo.json`,
	);
}


// We can also lazy load a component from a UMD.
// This one is a bit more complex. You have to know that React.lazy wants a default esModule from a Promise. This is what getUMD + toDefaultModule give you.
const AgGridReact = React.lazy(() =>
	assetsApi
		.getUMD('ag-grid-community')
		.then(() => assetsApi.getUMD('ag-grid-react'))
		.then(mod => assetsApi.toDefaultModule(mod.AgGridReact))
);


// Finally, this is how we load styles from a lazy loaded component.
export default function DataGrid(props) {
	//...
	useEffect(() => {
		const href = assetsApi.getURL('/dist/styles/ag-grid.css', 'ag-grid-community');
		assetsApi.addStyle({ href });
	}, []);
	//...
	return <React.Suspense fallback={}>AgGridReact</React.Suspense>
}
```

## Requirements

- devs do not have to write the version: it is injected at build time thanks to [babel plugin](https://npmjs.com/package/@talend/babel-plugin-assets-api)
- the assets' version is implicitly specified by the consumer webapp (`talend-scripts` adds global data that is then read by the API at runtime)
- the inject.js script will be able to control this version (it should update meta value)
- `sessionStorage` is used to let anyone override a version locally
- the API is compatible with `React.Suspense` / lazy React APIs
- for UMDs, the path is computed form `module-to-cdn` and injected at build time thanks to the babel plugin
- for relative paths in a package, the name of the package is optional

## How to configure the CDN to use ?

The assets API uses a global function to compute the URL: `window.Talend.getCDNUrl()`. By default the package will add it for you. This version will use a global `CDN_URL` with the following shape:

```javascript
`${CDN_URL}/${info.name}/${info.version}${info.path}`;
```

but fallbacks to unpkg.com public CDN if no CDN_URL is provided.
