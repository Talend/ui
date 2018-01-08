# CMF Sagas

## Use

```javascript
import { sagas, store } from '@talend/react-cmf';
import { all, call } from 'redux-saga/effects';
import createSagaMiddleware from 'redux-saga';

// init the saga middleware
const sagaMiddleware = createSagaMiddleware();

// declare the errors to globally manage in the app
const httpErrorSaga = sagas.getHttpErrorsSaga({
  on401: function* on401() {...},
  on403: function* on403() {...},
  on404: function* on404() {...},
});

// load the saga used by your application
sagaMiddleware.run(function* sagaMiddleware(
  yield all([
    call(httpErrorSaga),
    call(sagas.changeDocumentTitle),
  ])
));

// intiilize the cmf application with the saga middleware
store.initialize({}, {}, undefined, [
  sagaMiddleware,
]);
```

## The different sagas

| Saga name                                   | Need to load in the middleware |
| ------------------------------------------- | :----------------------------: |
| [changeDocumentTitle](#changeDocumentTitle) |              YES               |
| [httpErrorSaga](#httpErrorSaga)             |              YES               |
| [http](#http)                               |               NO               |

## <a name="changeDocumentTitle"></a>changeDocumentTitle

### Description

Set the document title when the route changed.

### Use

Define on the cmf's settings, the title to use in each route.

```json
"routes": [{
  "path": "/path1",
  "documentTitle": "Title for path1",
  }, {
  "path": "/path2",
  "documentTitle": "Title for path2",
}]
```

## <a name="httpErrorSaga"></a>HTTP Errors

### Description

Lauch a saga when 401, 403, 404 occurs in the application.

### Use

```javascript
const httpErrorSaga = sagas.getHttpErrorsSaga({
	on401: function* on401() {
		// when 401 occurs do...
	},
	on403: function* on403() {
		// when 403 occurs do...
	},
	on404: function* on404() {
		/// when 404 occurs do...
	},
});
```

## <a name="http"></a>HTTP

### Description

Use the saga http to fetch the api.

### Documentation

| HTTP Method |                         API                         |
| ----------- | :-------------------------------------------------: |
| GET         |      `yield call(sagas.http.get(url, config))`      |
| POST        | `yield call(sagas.http.post(url, payload, config))` |
| PUT         | `yield call(sagas.http.put(url, payload, config))`  |
| DELETE      |    `yield call(sagas.http.delete(url, config))`     |

### Use

```javascript
const answer = sagas.http.get('/foo');
if (!answer instanceof Error) {
	// an action @@HTTP/ERRORS is set in the middleware by sagas.http
	// do something when the api returns code < 200 or >= 300
}

console.log(answer.data);
```
