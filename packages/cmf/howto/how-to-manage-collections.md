# How to manage collections

CMF has a system to manage collections by a combination of middleware, action, reducer.

By using those entities, you will have the collections in your app state `state.cmf.collections`. This object is a dictionary that stores a collection under unique identifiers.

**Pre-requisite**
You can store anything you want in the collections dictionary, but to use the element operations (delete/mutate collection) :
* the collection must be an array or a map
* in an array, each item has an `id` property
* in a map, the key is the id


## Add or replace a collection

The example will insert the collection in `state.cmf.collections.datastores`.

**Via middleware**
```javascript
const insertAction = {
    response: [], // your collection
    cmf: {
        collectionId: 'datastores' // the collection id in collections store
    }
};

dispatch(insertAction);
```

**Via actions utility**
```javascript
import { actions } from '@talend/react-cmf';

const insertAction = actions.collectionsActions.addOrReplaceCollection('datastores', []);
dispatch(insertAction);
```

addOrReplaceCollection(collectionId, data)

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| collectionId | string | The collection identifier | true |
| data | object &#124; array | The collection to store | true |

## Remove a collection

The example will remove the collection `state.cmf.collections.datastores`.

```javascript
import { actions } from '@talend/react-cmf';

const removeAction = actions.collectionsActions.removeCollection('datastores');
dispatch(removeAction);
```

removeCollection(collectionId)

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| collectionId | string | The collection identifier | true |

## Mutate a collection

The example will mutate the collection in `state.cmf.collections.datastores`.

```javascript
import { actions } from '@talend/react-cmf';

const mutationAction = actions.collectionsActions.mutateCollection('datastores', {
    add: [{ id: 'new_element_id', ... }, { id: 'next_new_element_id', ... }],
    delete: ['old_element_id'],
    update: { 'existing_element_id': {id: 'existing_element_id', ... }, ... }
});
dispatch(mutationAction);
```

removeCollection(collectionId, operations)

| Argument | Type | Description | Mandatory |
|---|---|---|---|
| collectionId | string | The collection identifier | true |
| operations | object | The operations to perform.<br>`add` : function or object : elements to insert<br>`delete` : array : the elements ids to remove<br>`update` : map : the new elements by id. The elements identified by the ids will be replaced by the new ones. | true |

## HTTP usage

The [http](../src/middlewares/http/index.md) middleware/actions utility fits well with the collection system.

```javascript
import { actions } from '@talend/react-cmf';

export function fetchDataSets() {
	return actions.http.get('/remote/datasets', {
		onSend: GETTING_DATASETS,
		onError: ERROR_GETTING_DATASETS,
		// collectionId is the key where the result will be stored in app state
		cmf: {
			collectionId: 'datasets',
		},
		transform(data) {
			return data.map((row) => {
				const { datastore, ...rest } = row;
				return {
					datastore: datastore.label,
					...rest,
				};
			});
		},
	});
}

...

dispatch(fetchDataSets());
```

This will add or replace the result of the GET request into the `datasets` collection.
