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


# INTERNALS: route API

The route api manages the components to load on a route.
In a common use of CMF, this can be considered as internal api as CMF manage entirely the routes.

## getRoutesFromSettings
```javascript
import { api } from 'react-cmf';

api.route.getRoutesFromSettings(context, settings);
```

It creates the router configuration by loading and configuring the components, based on the registry and the settings.
* get the routes settings
* replace the `components` ids by the real components from registry
* replace the `componentId` ids by the component props from settings
* replace the `hooks` ids (onEnter, ...) by the functions from registry

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| context | object | The CMF react context (injected by CMF connector). See [how to connect a container to CMF]({{ site.baseurl }}{% link _posts/2017-02-28-how-to-connect-a-container-to-cmf-.md %}) | true |
| settings | object | The app settings. See [core concept: settings]({{ site.baseurl }}{% link _posts/2017-02-28-core-settings.md %}) | true |

It returns the react-router configuration.

## registerFunction
```javascript
import { api } from 'react-cmf';

const registerFunction = api.route.registerFunction;
registerFunction(id, func);
```

It register a function in the registry. This is used for example to register react-router hooks (onEnter, ...).

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | The function identifier | true |
| func | function | The function to register | true |

## getFunction
```javascript
import { api } from 'react-cmf';

api.route.getFunction(id);
```

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| id | string | The function identifier | true |

It returns the registered function from CMF registry.
