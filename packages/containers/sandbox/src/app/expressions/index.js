import { selectors } from '@talend/react-cmf';
import { memoize } from 'lodash';

function getUsersCollectionAsArray({ context }, collectionPath) {
	const list = selectors.collections.get(context.store.getState(), collectionPath);

	return list && list.toJS() ? list.toJS() : [];
}

export default {
	getUsersCollectionAsArray: memoize(getUsersCollectionAsArray),
};
