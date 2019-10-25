import { useMemo } from 'react';

export default function useCollectionActions(
	collection = [],
	actions = [],
	persistentActions = [],
) {
	return useMemo(
		() =>
			collection.map(item => ({
				...item,
				actions: typeof actions === 'function' ? actions(item) : actions,
				persistentActions:
					typeof persistentActions === 'function' ? persistentActions(item) : persistentActions,
			})),
		[collection, actions, persistentActions],
	);
}
