# Router Saga

## Purpose

To provide a way to start or stop saga, depending on current route of the application.

Those saga can now provide some side effect based on route context.

## Problems example that are solved.

### Basic routing problems

Lets say that our application handle shortcut navigation, "Escape" button triggering change of route.

We can now declare for each route, where the `ESCAPE` action type should direct the user.

```javascript
import { sagaRouter } from '@talend/react-cmf';
import { browserHistory as history } from 'react-router';

const CANCEL_ACTION = 'CANCEL_ACTION';
// route configuration, a url fragment match with a generator
const routes = {
  "/datasets/add": function* addDataset() {
    yield take(CANCEL_ACTION);
    yield put({
      type: REDIRECT_ADD_DATASET_CANCEL,
      cmf: {
        routerReplace: "/datasets"
      }
    });
  },
  "/connections/:datastoreId/edit/add-dataset": function* addDataset({
    datastoreId
  }) {
    yield take(CANCEL_ACTION);
    yield put({
      type: REDIRECT_CONNECTION_ADD_DATASET_CANCEL,
      cmf: {
        routerReplace: `/connections/${datastoreId}/edit`
      }
    });
  }
};

// router saga is spawned and given router history, and route configuration
yield spawn(routerSaga, history, routes);
```

## Matching pattern
```javascript
const routes = {
  "/datasets/add": saga1,
  "/connections/:datastoreid/edit/add-dataset": saga2
};
```

keys of the saga object are matched against the current webapp url.

### Simple matching

Given the webapp url is `localhost/datasets/add`

and that we have the following configuration

```javascript
const routes = {
  "/datasets": datasets,
  "/datasets/add": datasetsSaga,
  "/connections/add": connectionsSaga
};
```

only `datasets` and `datasetsSaga` will be executed.

Note: The sagaRouter is updated each time an action of the type `@@router/LOCATION_CHANGE`
is sent to redux to decide if he has to start, restart or cancel a saga.
If you want your saga to be run once you have to make it unfinishable.
By convention we use the following task:

```javascript
yield take('DO_NOT_QUIT');
```

### Simple matching with route change

Given the webapp url is `localhost/datasets/add`

and that we have the following configuration

```javascript
const routes = {
  "/datasets/add": datasetsSaga,
  "/connections/add": connectionsSaga
};
```
only `datasetsSaga` will be executed.

Now the route is changed to `localhost/connections/add`

`datasetsSaga` is canceled if it is still running and connectionsSaga is started.

### Match exact route

You can check if it's an exact match in saga generator by `isExact`, which is passed as the second parameter,

Given the webapp url is `localhost/datasets`,
then `isExact` will be passed to saga generator as true, because it's an exact match.

when route changes to `localhost/datasets/add`, saga of `/datasets` will be restarted,
and `isExact` will be passed to saga generator as false, because it's a partial match.

To achieve this, you need to pass a configuration `restartOnRouteChange` as true,
so saga of `/datasets` will be restarted when route changes.

Optionally, if you want to run a saga only on exact match, you can pass a configuration `runOnExactMatch` as true,
then saga will be started when its route exactly match current location, and will be stopped when change to any other route.


```javascript
import { sagaRouter } from '@talend/react-cmf';
import { browserHistory as history } from 'react-router';

const CANCEL_ACTION = 'CANCEL_ACTION';
// route configuration, a url fragment match with a generator
const routes = {
  '/datasets': {
    // runOnExactMatch: true,
    restartOnRouteChange: true,
    saga: function* datasets(notUsed, isExact) {
      if (!isExact) {
        return;
      }
      yield take(CANCEL_ACTION);
      yield put({
        type: REDIRECT_CONNECTION_ADD_DATASET_CANCEL,
        cmf: {
          routerReplace: `/connections/${datastoreId}/edit`,
        },
      });
    },
  },
  '/datasets/add': function* addDataset() {}
};
```


### Partial route matching

Given the webapp url is `localhost/datasets/add/connection/add`

and that we have the following configuration

```javascript
const routes = {
  "/datasets/add": datasetsSaga,
  "/connections/add": connectionsSaga
};
```
only `datasetsSaga` will be executed.

because the route key can be matched on any part of the url.

Which lead us to the next step

### Partial route matching and parallel saga execution.

Given the webapp url is `localhost/datasets/add/connection/add`

and that we have the following configuration

```javascript
const routes = {
  "/datasets/add": datasetsSaga,
  "/datasets/add/connection/add": datasetConnectionsSaga,
  "/connection/add": connectionsSaga,
};
```
`datasetsSaga`, `datasetConnectionSaga` and `connectionSaga` are running.

### Route matching and route parameters.
Given the webapp url is `localhost/datasets/50/edit`

and that we have the following configuration

```javascript
function* editDatasetSaga ({datasetId}){
  // do something
}

const routes = {
  "/datasets/add": datasetsSaga,
  "/datasets/:datasetId/edit": editDatasetSaga
};
```
only `editDatasetsSaga` will be executed and :datasetId will be resolved and given to the running saga as a parameter.

url parameters are resolved and given to the executed saga in form of an object, because we can match on many of them.

```javascript
function* connectionSaga ({connectionId, datasetId}){
  // do something
}

const routes = {
  "/datasets/add": datasetsSaga,
  "/datasets/:datasetId/edit": editDatasetSaga,
  "/datasets/:datasetId/connections/:connectionId": connectionSaga
};
```

### Route matching with route parameter change
Given the webapp url is `localhost/datasets/50/edit`

and that we have the following configuration

```javascript
function* editDatasetSaga ({datasetId}){
  // do something
}

const routes = {
  "/datasets/add": datasetsSaga,
  "/datasets/:datasetId/edit": editDatasetSaga
};
```

only `editDatasetsSaga`will be executed and `:datasetId` will be resolved and given to the running saga as a parameter.

if the webapp url change to `localhost/datasets/51/edit`

the `editDatasetsSaga` is cancelled, and when its done, restarted with the new value of the parameter.

Only sagas matching on a route which parameter change are restarted.

### Route matching with optionnal parameters
Given the webapp url is `localhost/datasets/add/550`

and that we have the following configuration

```javascript
function* editDatasetSaga ({datasetId}){
  // do something
}

const routes = {
  "/datasets/add/:connectionId?": datasetsSaga,
  "/datasets/:datasetId/edit": editDatasetSaga
};
```
datasetSaga will be executed

if the route change to `localhost/datasets/add`

the `datasetsSaga` will be restarted since it still match on `/datasets/add/:connectionId?` route and that the parameter has changed from being a value to being absent.

the ? at the end of the parameter define that it is optional.
