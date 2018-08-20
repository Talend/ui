import { createSelector } from 'reselect';
import { getComponentState } from './utils';

export default function configureGetPagedItems(configure) {
	const getPagedList = createSelector(
		[getComponentState(configure.collectionId)],
		componentState => {
			let results = configure.items;
			if (componentState) {
				results = componentState.get('items', results);
				const startIndex = componentState.get('startIndex');
				const itemsPerPage = componentState.get('itemsPerPage');
				if (itemsPerPage > 0 && startIndex > 0) {
					results = results.slice(
						startIndex - 1,
						Math.min(startIndex + itemsPerPage - 1, results.size),
					);
				}
			}
			return results;
		},
	);
	return createSelector([getPagedList, getComponentState], items => items);
}
