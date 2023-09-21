# @talend/http

`@talend/http` is a fetch wrapper module to handle CSRF token.

## Configuration

### Global configuration

If you want to provide a global configuration for the calls, you can use this method :

```javascript
import { setDefaultConfig } from '@talend/http/config';

setDefaultConfig({ credentials: 'same-origin' });
```

### Default Language

If you want to provide the default language to be embedded in the header you can use this method :

```javascript
import { setDefaultLanguage } from '@talend/http/config';

setDefaultLanguage('fr');
```

## Usage

### Parameters

- url : the current endpoint targeted by the request
- config : specific fetch configuration for this call https://github.github.io/fetch/
- payload : payload embedded in the call

### Methods available

- get(url, config)
- delete(url, config)
- post(url, payload, config)
- put(url, payload, config)
- patch(url, payload, config)

```javascript
import { http } from '@talend/http';

async function test() {
	const response = await http.get('/api/v1/my-resource');
}
```

## Interceptors

You can add global response interceptors to catch or modify responses before resolve.

```es6
import { addHttpResponseInterceptor, http, HTTP_METHODS } from '@talend/http';
import type { TalendRequest } from '@talend/http';

addHttpResponseInterceptor('my-interceptor', async (response: Response, request: TalendRequest) => {
	if (request.method === HTTP_METHODS.GET) {
		// your custom logic here
	}

	return response;
});
```

You can add multiple interceptors. Each will be called in the order of registration and will receive the same request parameter, but response parameter will be the one returned by previous interceptor. If interceptor returns void, then it'll return received response.

Once your interceptor is not needed anymore, you can unregister it with `removeHttpResponseInterceptor` function of `@talend/http` package.

You can identify some requests in interceptor by using `context` property in fetch function config:

```es6
import { addHttpResponseInterceptor, http, HTTP_METHODS } from '@talend/http';

http.get('/api/v1/data', { context: { intercept: true } });

addHttpResponseInterceptor('my-interceptor', async (response: Response, request: TalendRequest) => {
	const { context } = request;
	if (request.method === HTTP_METHODS.GET && context.intercept) {
		// your custom logic here
	}
	return response;
});
```
