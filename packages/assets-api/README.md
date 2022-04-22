# @talend/assets-api

This package exposes a simple API covering the following requirements:

- devs do not have to write the version: it is injected at build time thanks to [babel plugin](https://npmjs.com/package/@talend/babel-plugin-assets-api)
- the assets version is implicitly specified by the webapp (talend-scripts add global data read by the api at runtime)
- the inject.js script will be able to control this version (it should update meta value)
- the sessionStorage is used to let anyone try a new version
- the API is friend / compatible with suspense / lazy react api
- for UMD, the path is computed form module-to-cdn and injected at build time thanks to the babel plugin
- for relative path in current package, the name of the package is optional

## Learn by examples

First you need to ensure you have setup the [babel plugin](https://npmjs.com/package/@talend/babel-plugin-assets-api) or you use @talend/scripts-core to build your lib / project.

```javascript
import assetsAPI from '@talend/assets-api';

// First the most low level API is to get URL of anything like a css here
const href = assetsApi.getURL('/dist/styles/ag-grid.css', 'ag-grid-community');
// babel will add all missing arguments and at runtime you will have
href === 'https://unpkg.com/ag-grid-community@25.0.0/dist/styles/ag-grid.css';


// Then we have higher level API to get a JSON file for locales, timezones, etc...
async function getTopology(file) {
	const locales = await assetsAPI.getJSON(
		`/dist/assets/maps/${file}.topo.json`,
	);
}


// Then we have lazy load of a component from UMD
// this one is a bit more complex. You have to know React.lazy want a default esModule from a Promise. This is what getUMD + toDefaultModule give you.
const AgGridReact = React.lazy(() =>
	assetsApi
		.getUMD('ag-grid-community')
		.then(() => assetsApi.getUMD('ag-grid-react'))
		.then(mod => assetsApi.toDefaultModule(mod.AgGridReact))
);


// Last example is on how to load styles from a lazy loaded component
// you can use
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

## How to configure the CDN to use ?

assets API use a global function to compute the url: `window.Talend.getCDNUrl`. By default the package will add it for you. This version will use a global CDN_URL with the following shape:

```javascript
`${CDN_URL}/${info.name}/${info.version}${info.path}`;
```

but fallback to unpkg.com public cdn if no CDN_URL is provided.
