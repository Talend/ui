# Sagas

This modules contains a set of saga ready to use in CMF to write your business code

# HTTP Saga

The http saga is here to help you execute some http request from inside any saga.

## basic usage

```javascript
const { data, response } = yield call(http.get, `${API['dataset-sample']}/${datasetId}`);
		if (response.ok) {
			yield put(
				cmfActions.collectionsActions.mutateCollection('sample', {
					update: {
						loading: false,
						message: null,
						data: data.data,
					},
				}),
			);
		} else if (response.status === 404) {
			yield put(
				cmfActions.collectionsActions.mutateCollection('sample', {
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

you can provide to your code an instance of the http Saga with preconfigured behaviors

how ?

```javascript
import http from '@talend/react-cmf/lib/sagas/http';

const configuredHttp = http.create();

const { data, response } = yield call(configuredHttp.get, `${API['dataset-sample']}/${datasetId}`);
```

importing the saga, allow you to statically call any member function `get, post ...` but also `create` which return an object with the exact same API.

`create` also allow you to provide a configuration object.

```javascript
import http from '@talend/react-cmf/lib/sagas/http';
const configuredHttp = http.create();
const config = {
	headers: {
		'X-header': 'my-specific-value'
	}
};
const cmf = {
	silent: true
};
const { data, response } = yield call(configuredHttp.get, `${API['dataset-sample']}/${datasetId}`, config, cmf);
```
* The config object allow you to customize your http request
 + ```headers```, ```credentials```, ```method```, ```body``` will be merged recursively against other provided arguments and override those values.
 + ```security``` will be resolved and then merged

* The cmf object allows you to configure cmf behavior.

  + ```responseSelector``` is lodash.get compatible parameters that allows to select the part of the response that you are interested in.
  + ```transform``` is a function where you are free to preprocess your data before storing it
  + ```collectionId``` is the name of the collection where the data will be stored
  + ```onSend```, ```onResponse```,  ```onError``` can be either a string that will be the type of dispatched action, or a custom function that will be executed
  + ```silent``` is a boolean to avoid cmf to dispatch automatically ```@@HTTP/REQUEST```, ```@@HTTP/RESPONSE```, ```@@HTTP/ERRORS```<br/>
  It could be usefull if you want to avoid generic computation of the request error and deal with it within your own saga.

## CSRF token handling
you can configure the `http saga` with a security configuration, which will help you to manage CSRF TOKEN provided on a cookie.

```javascript
import http from '@talend/react-cmf/lib/sagas/http';

const httpDefaultConfig = {
	security: {
		CSRFTokenCookieKey: 'cookieKey',
		CSRFTokenHeaderKey: 'headerKey',
	},
};
const configuredHttp = http.create(defaultHttpConfiguration);

const { data, response } = yield call(configuredHttp.get, `${API['dataset-sample']}/${datasetId}`);
```

The above configuration allow the configured instance of `http saga` to automatically inject into http call a CSRF token under `headerKey` header, which was retrieved from `cookieKey` cookie.

# Component Saga

First you have to plug all the thing to make it work :
- In the configure.js :

```javascript
import { api } from '@talend/react-cmf';
// ...
// where you init your saga router
yield all([
	// ...
	fork(api.sagas.component.handle),
	// ...
]);
// where you init other things ( like register your app )
api.registerInternals();
api.saga.registerMany(sagasToRegister);
```

Then, we can add some cmf configuration :

```json
{
    "MyComponent#default": {
      "saga": "mySaga",
      "coolProps": "coolData"
    }
}
```

Then, in your app, if you do that ( with a cmfConnected component ) :

```jsx
<MyComponent otherProps="otherData"/>
```

When the component mount, an action creator will be dispatched to start a saga, here : mySaga

```javascript
function* mySaga(props){
	console.log(props.coolProps); // print coolData
	console.log(props.otherData); // print otherData
}
```
