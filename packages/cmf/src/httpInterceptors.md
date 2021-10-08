# HTTP Interceptors

Complelty taken from https://docs.angularjs.org/api/ng/service/$http#interceptors
So please be sure to have read this first.

Interceptors are called at the different steps of every http requests done using CMF apis.

## How to create my interceptor

You can create a file which exports an array of interceptors.

```javascript

function getHeaders() {
	// do sth asyn and return it in promise {Authorization: `Bearer ...`}
}

function onRequest(config) {
	return getHeader()
		.then(headers => {
			const newConfig = Object.assign({}, config);
			Object.assign(newConfig.headers, headers);
			return newConfig;
		})
		.catch(error => {
			console.error(error);
			return config;
		});
}
export default {
	request: onResquest,
};
```

Then you can register it in cmf using cmf.bootstrap api under `httpInterceptors`;

## How to integrate to fetch

Context: I want to use fetch myself but I want to plug my fetch call into interceptors.

So before you have

```javascript
function mySuperUseOfFetch(url) {
	return fetch(url);
}
```

So you can do the following:

```javascript
import cmf from '@talend/react-cmf';

function mySuperUseOfFetch(url) {
	return cmf.interceptors
		.onRequest({ url })
		.then(config => fetch(config.url, config))
		.then(cmf.interceptors.onResponse)
}
```
