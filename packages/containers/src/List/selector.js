import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

export function contains(ob, query) {
	let item = ob;
	if (Map.isMap(ob)) {
		item = ob.toJS();
	}
	for (const pp of Object.keys(item)) {
		if (typeof item[pp] === 'string') {
			if (item[pp].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
				return true;
			}
		}
	}
	return false;
}

export default function configureGetFilteredItems(configure) {
	const localConfig = configure;

	const getCollectionData = state => state.cmf
		.collections
		.get(localConfig.collectionId);

	const getComponentState = state => state.cmf
		.components.getIn(['List', localConfig.collectionId || 'default']);

	const getFilteredList = createSelector(
		[getCollectionData, getComponentState],
		(items, componentState) => {
			let results = items || localConfig.items;
			if (componentState) {
				const searchQuery = componentState.get('searchQuery');
				if (searchQuery !== '' && !!searchQuery) {
					results = results.filter((item) => {
						return contains(item, searchQuery);
					});
				}
			}
			return results;
		}
	);

	const getSortedList = createSelector(
		[getFilteredList, getComponentState],
		(items, componentState) => {
			if (!List.isList(items)) {
				return new List();
			}
			let results = items;
			if (componentState) {
				const sortBy = componentState.get('sortOn');
				const sortAsc = componentState.get('sortAsc');
				const compare = (a, b) => {
					if (a.get(sortBy)) {
						if (a.get(sortBy).localCompare) {
							return a.get(sortBy).localeCompare(b.get(sortBy));
						}
						if (a.get(sortBy) < b.get(sortBy)) {
							return -1;
						}
						if (a.get(sortBy) > b.get(sortBy)) {
							return 1;
						}
						return 0;
					}
					if (!b[sortBy]) {
						return 0;
					}
					return -1;
				};
				results = results.sort(compare);
				if (!sortAsc) {
					results = results.reverse();
				}
			}
			return results;
		}
	);

	return createSelector(
		[getSortedList, getComponentState],
		items => items
	);
}
