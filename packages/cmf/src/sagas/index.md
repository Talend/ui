# Sagas

This module contains a set of saga ready to use in CMF to write your business code

# HTTP Saga

The http saga is here to help you execute some http request from inside any saga.

## basic usage

```javascript
const { data, response } = yield call(http.get, `${API['dataset-sample']}/${datasetId}`);
if (response.ok) {
	yield put(
		cmf.actions.collections.mutate('sample', {
			update: {
				loading: false,
				message: null,
				data: data.data,
			},
		}),
	);
} else if (response.status === 404) {
	yield put(
		cmf.actions.collections.mutate('sample', {
			update: {
				loading: false,
				warning: true,
				message: 'Sample is not available',
				data: null,
			},
		}),
	);
}
```

Calling http.get will return an object containing two element, the `data` which is the body of the response and `response` which contain meta data about how the request was handled.

Here we can see that we check if the server answered with a `response.ok` evaluated at `true` and then put a slice of the data inside the `cmf store` trought the `dispatch` of an `action`

## configuration

### setDefaultConfig

`setDefaultConfig` also allow you to provide a default config object which will be use at each http call.
This in the host application, and children library that use the same version of CMF

**Note** those children library should not use setDefaultConfig !

**Only** the host application only should use setDefaultConfig !
calling `setDefaultConfig` twice will not change the first setup defaultConfig and throw an error.

```javascript
import cmf from '@talend/react-cmf';

cmf.sagas.http.setDefaultConfig({
	'Accept-Language': 'fr',
});

const config = {
	headers: {
		'X-header': 'my-specific-value'
	}
};

const options = {
	silent: true
};

const { data, response } = yield call(http.get, `${API['dataset-sample']}/${datasetId}`, config, options);
```

#### Config

The config object allow you to customize your http request

- `headers`, `credentials`, `method`, `body` will be merged recursively against other provided arguments and override those values.
- `security` will be resolved and then merged

#### Options

The options object allow you to configure cmf behavior.

- The `silent` property to `true` avoid that cmf dispatch an action of type `@@HTTP/ERRORS`.<br/>
  It could be usefull if you want to treat the request error on a specific way only and deal with it within your own saga.

- The other properties are passed in the dispatched error action. You can pass whatever option you want, to pass them to you app error handler.

Example

```javascript
const options = {
    toto: false,
    tata: false,
};

const { data, response } = yield call(http.get, `${API['dataset-sample']}/${datasetId}`, config, options);
```

On error, cmf will dispatch an action of type `@@HTTP/ERRORS`. Your onHttpErrorNotification saga will get the options object, and perform any action accordingly.

### http.create

you can provide to your code an instance of the http Saga with preconfigured behaviors

```
import cmf from '@talend/react-cmf';

const http = cmf.sagas.http.create({
	headers: {
		'content-type': 'application/json',
	},
});

http.get('/foo'); // call with the header 'content-type': 'application/json',
```

### Priority for the config

1. config passed by the http.{get|put|post|patch|delete}
2. http.create
3. setDefaultConfig

## CSRF token handling

You can configure the `http saga` with a security configuration, which will help you to manage CSRF TOKEN provided on a cookie.

```javascript
import cmf from '@talend/react-cmf';

const httpDefaultConfig = {
	security: {
		CSRFTokenCookieKey: 'cookieKey',
		CSRFTokenHeaderKey: 'headerKey',
	},
};

cmf.sagas.http.setDefaultConfig(httpDefaultConfig);

const { data, response } = yield call(cmf.sagas.http.get, `${API['dataset-sample']}/${datasetId}`);
```

The above configuration allow `http saga` to automatically inject into http call a CSRF token under `headerKey` header, which was retrieved from `cookieKey` cookie.

## Changing the http defaultConfig `Accept-Language` headers

To change dynamically this setting during the lifecycle of the application the `setDefaultLanguage` api is provided by the http module.

If the defaultConfig is not already set this will create an error.

```javascript
import cmf from '@talend/react-cmf';

cmf.sagas.http.setDefaultLanguage('fr-FR');
```

# Component Saga

CMF let you register saga so a saga can be spawned/cancelled with the component life.

let s add settings for a component :

```json
{
	"MyComponent#default": {
		"saga": "MyComponent#mySaga",
		"coolProps": "coolData"
	}
}
```

Then, in your app, if you do that ( with a cmfConnected component ) :

```jsx
<MyComponent otherProps="otherData" />
```

When the component mount, an action creator will be dispatched to start a saga, here : mySaga

```javascript
import MyComponent from './MyComponent';

function* mySaga(info) {
	console.log(info.componentId);
	// so you can read/write in the state of MyComponent
	MyComponent.setStateAction({ status: 'loading' }, componentId);
}
export default {
	'MyComponent#mySaga': mySaga,
};
```

which has to be registred along `MyComponent`.

In some case you will need to pass other arguments to the saga.
To do so you can use this syntax:

```json
{
	"MyComponent#default": {
		"saga": {
			"id": "MyComponent#mySaga",
			"args": ["datasets"]
		}
	}
}
```

So the saga will receive that in arguments:

```javascript
function* mySaga(info, type) {
	console.log(type); // will be dataset
	// ...
}
```
