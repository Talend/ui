## CmfRegisteredSaga Component

To launch a saga registered in the cmf registry, you need to put the CmfRegisteredSaga component, it will automatically launch the saga related to the saga id and pass the props.
The saga is automatically stopped when the component is unmounted.

```javascript
import { CmfRegisteredSaga } from '@talend/react-cmf';

function myComponent() {
	return (
		<>
			<CmfRegisteredSaga sagaId="dataset:initDatasets" sagaAttributes={{ attr: 'ibutes' }} />
			<MyComponentStuff />
		</>
	);
}
```

## Saga Component

### How to use

To launch a saga, you need to put the Saga component, it will automatically launch the saga and pass the props.
The attribute passed to the saga is only executed once.

The saga is automatically stopped when the component is unmounted.

```javascript
import { Saga } from '@talend/react-cmf';

function* saga(params: any) {
	// your saga stuff
	console.log('params', params);
	yield takeEvery('UPDATE_DATASET_LIST', onDatasetUpdate);
}

function myComponent() {
	return (
		<>
			<Saga saga={saga} sagaAttributes={{ attr: 'ibutes' }} />
			<MyComponentStuff />
		</>
	);
}
```
