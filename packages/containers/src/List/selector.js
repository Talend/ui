import cmf from '@talend/react-cmf';
import get from 'lodash/get';
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
	return state.cmf.collections.get(collectionId);
}

export function getCollectionItems(state, collectionId) {
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

function getComponentState(collectionId) {
	return state => state.cmf.components.getIn(['Container(List)', collectionId || 'default']);
}

export function configureGetFilteredItems(configure) {
	const localConfig = configure;

	const getFilteredList = createSelector(
		getComponentState(localConfig.collectionId),
		componentState => {
			let results = localConfig.items;
			if (componentState) {
				const searchQuery = componentState.get('searchQuery');
				if (searchQuery && results) {
					results = results.filter(item => contains(item, searchQuery, localConfig.columns));
				}
			}
			return results;
		},
	);

	return createSelector([getFilteredList, getComponentState], items => items);
}

export function configureGetSortedItems(configure, listItems) {
	const localConfig = configure;

	const getSortedList = createSelector(
		getComponentState(localConfig.collectionId),
		componentState => {
			if (!List.isList(listItems)) {
				return new List();
			}
			let results = listItems;
			if (componentState) {
				const sortBy = componentState.get('sortOn');
				const sortAsc = componentState.get('sortAsc');
				let compare = (a, b) => {
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

				const sortedColumn = get(localConfig, 'columns', [])
					.filter(column => column.key === sortBy)
					.pop();
				if (sortedColumn && sortedColumn.sortFunction) {
					compare = cmf.registry.getFromRegistry(sortedColumn.sortFunction)(sortBy);
				}
				results = results.sort(compare);
				if (!sortAsc) {
					results = results.reverse();
				}
			}
			return results;
		},
	);

	return createSelector([getSortedList, getComponentState], items => items);
}

export function configureGetPagedItems(configure, listItems) {
	const getPagedList = createSelector(
		getComponentState(configure.collectionId),
		componentState => {
			let results = listItems;
			if (componentState) {
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
