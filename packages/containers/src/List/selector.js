import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

function contains(listItem, query, columns) {
	let item = listItem;
	if (Map.isMap(listItem)) {
		item = listItem.toJS();
	}
	for (const column of columns) {
		if (typeof item[column.key] === 'string') {
			if (item[column.key].toLowerCase().indexOf(query.toLowerCase()) !== -1) {
				return true;
			}
		}
	}
	return false;
}

function getCollection(state, collectionId) {
	return state.cmf
		.collections
		.get(collectionId);
}

function getCollectionItems(state, collectionId) {
	const collection = getCollection(state, collectionId);

	if (Map.isMap(collection)) {
		return collection.get('items');
	}
	return collection;
}

export function configureGetPagination(state, { collectionId }) {
	const collection = getCollection(state, collectionId);

	if (Map.isMap(collection)) {
		return collection.get('pagination');
	}

	return null;
}

export function configureGetFilteredItems(configure) {
	const localConfig = configure;

	const getCollectionData = state => getCollectionItems(state, localConfig.collectionId);

	const getComponentState = state => state.cmf
		.components.getIn(['Container(List)', localConfig.collectionId || 'default']);

	const getFilteredList = createSelector(
		[getCollectionData, getComponentState],
		(items, componentState) => {
			let results = items || localConfig.items;
			if (componentState) {
				const searchQuery = componentState.get('searchQuery');
				if (searchQuery && results) {
					results = results.filter(item => contains(item, searchQuery, localConfig.columns));
				}
			}
			return results;
		},
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
						const aValue = `${a.get(sortBy) || ''}`.toLowerCase();
						const bValue = `${b.get(sortBy) || ''}`.toLowerCase();
						if (aValue < bValue) {
							return -1;
						}
						if (aValue > bValue) {
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
		},
	);

	return createSelector(
		[getSortedList, getComponentState],
		items => items,
	);
}
