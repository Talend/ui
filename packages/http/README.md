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

### Promise version

```javascript
import { http } from '@talend/http';

async function test() {
	const response = await http.get('/api/v1/my-resource');
}
```

### Generator version

```javascript
import { call } from 'redux-saga/effects';
import { http } from '@talend/http/lib/generators';

export function* test() {
	return yield call(http.get, '/api/v1/my-resource');
}
```
