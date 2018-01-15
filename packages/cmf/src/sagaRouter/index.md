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

// router saga is forked and given router history, and route configuration
yield fork(routerSaga, history, routes);
```

### Match exact route

```javascript
import { sagaRouter } from '@talend/react-cmf';
import { browserHistory as history } from 'react-router';

const CANCEL_ACTION = 'CANCEL_ACTION';
// route configuration, a url fragment match with a generator
const routes = {
  "/datasets/add": function* addDataset(notUsed, isExact) {
    if (!isExact) {
      return;
    }
    yield take(CANCEL_ACTION);
    yield put({
      type: REDIRECT_CONNECTION_ADD_DATASET_CANCEL,
      cmf: {
        routerReplace: `/connections/${datastoreId}/edit`
      }
    });
  },
};
```
