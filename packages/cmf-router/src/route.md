# Routes

In your cmf application, you can provide routes & child routes in your settings :

```json
{
	"routes": {
		"path": "/",
		"component": "App",
		"documentTitle": "Data Catalog | Talend",
		"indexRoute": {
			"component": "Redirect",
			"view": "indexRouteRedirect"
		},
		"childRoutes": [
			{
				"path": "datasets",
				"component": "HomeListView",
				"view": "datasets"
			},
			{
				"path": ":id/view",
				"component": "ViewDataset",
				"componentId": "default"
			}
		]
	}
}
```

We can have the paths declared in children as this.
On a child declaration, we can have :

* path : the url path that activate the component
* component : the component rendered for a given url, this is the displayName registered in the CMF registry
* componentId : the component id that can be defined in the props entry of the settings
* view : DEPRECATED (legacy). the component view can be passed to give props to the component.

For the document title handler, you have to use the documentTitle saga in this repo.
