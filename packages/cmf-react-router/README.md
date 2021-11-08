# @talend/cmf-react-router

This module is like cmf-router but for React router v5 (and more recent) where @talend/cmf-router is tied up with react-router v3.

It takes an array of configurations with the following properties:

- sagaRouterConfig
- startOnAction

```javascript
import { getCmfReactRouterModule } from '@talend/router-bridge';

const datasetRouterConfig = {
	sagaRouterConfig: [{
		'/datasets/add': function* addDatasetSaga() {
			yield race({
				onCancel: call(
					redirectOnEvent,
					AddDatasetForm.events.DATASET_CREATION_CANCELED,
					DATASET_LIST_ROUTE,
				),
				onAddDatastore: call(
					redirectOnEvent,
					AddDatasetForm.events.DATASET_CREATION_PAUSED_AND_ADD_DATASTORE,
					'/datasets/add/connection/add',
				),
				onSubmit: call(redirectOnSuccessEvent, AddDatasetForm.events.DATASET_CREATION_DONE),
			});
		},
	}],
	routerFunctions: {},
};

const routerConfigs = [datasetRouterConfig, otherConfigs];
const routerModule = getSagaRouterModule(...routerConfigs),
```
