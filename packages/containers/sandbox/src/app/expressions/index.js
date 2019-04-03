import { selectors } from '@talend/react-cmf';

function getUsersCollectionAsArray({ context }, collectionPath) {
	const list = selectors.collections.get(context.store.getState(), collectionPath);

	return list && list.toJS() ? list.toJS() : [];
}

export default { getUsersCollectionAsArray };
