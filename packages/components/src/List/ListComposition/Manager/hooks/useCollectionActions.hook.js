import { useMemo } from 'react';

export default function useCollectionActions(collection, actions = [], persistentActions = []) {
	return useMemo(
		() =>
			collection.map(item => ({
				...item,
				actions,
				persistentActions,
			})),
		[collection, actions, persistentActions],
	);
}
