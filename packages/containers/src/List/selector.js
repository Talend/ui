import cmf from '@talend/react-cmf';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';

function contains(listItem, query, columns) {
	let item = listItem;
	if (
		listItem != null &&
		!Array.isArray(listItem) &&
		typeof listItem === 'object' &&
		typeof listItem.toJS === 'function'
	) {
		item = listItem.toJS();
	}
	return columns.some(
		column =>
			typeof item[column.key] === 'string' &&
			item[column.key].toLowerCase().indexOf(query.toLowerCase()) !== -1,
	);
}

function getCollection(state, collectionId) {
	if (collectionId == null) return undefined;
	return cmf.selectors.collections.get(state, collectionId);
}

export function getCollectionItems(state, collectionId) {
	const collection = getCollection(state, collectionId);

	if (collection != null && !Array.isArray(collection) && typeof collection === 'object') {
		const items = typeof collection.get === 'function' ? collection.get('items') : collection.items;
		return items !== undefined ? items : collection;
	}
	return collection;
}

export function configureGetPagination(state, { collectionId }) {
	const collection = getCollection(state, collectionId);

	if (collection != null && !Array.isArray(collection) && typeof collection === 'object') {
		return typeof collection.get === 'function'
			? collection.get('pagination')
			: collection.pagination;
	}

	return null;
}

function getComponentState(collectionId) {
	return state =>
		cmf.selectors.components.getComponentState(state, 'Container(List)', collectionId || 'default');
}

export function configureGetFilteredItems(configure) {
	const localConfig = configure;

	const getFilteredList = createSelector(
		getComponentState(localConfig.collectionId),
		componentState => {
			let results = localConfig.items;
			if (componentState) {
				const searchQuery = componentState?.searchQuery;
				if (searchQuery && results) {
					results = results.filter(item => contains(item, searchQuery, localConfig.columns));
				}
			}
			return results;
		},
	);

	return createSelector([getFilteredList, getComponentState], items => items);
}

export function compare(sortBy) {
	return (a, b) => {
		let aValue = typeof a.get === 'function' ? a.get(sortBy) : a[sortBy];
		let bValue = typeof b.get === 'function' ? b.get(sortBy) : b[sortBy];

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			aValue = aValue.toLowerCase();
			bValue = bValue.toLowerCase();

			return aValue.localeCompare(bValue);
		}

		if (typeof aValue === 'number' && typeof bValue === 'number') {
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
}

export function getSortedResults(componentState, config, listItems) {
	if (listItems == null || typeof listItems.filter !== 'function') {
		return [];
	}
	let results = listItems;
	if (!isEmpty(componentState)) {
		const sortBy = componentState.sortOn;
		const sortAsc = componentState.sortAsc;
		const sortedColumn = get(config, 'columns', []).find(column => column.key === sortBy);

		if (get(sortedColumn, 'sortFunction')) {
			// Immutable sort method returns sorted array
			results = results.sort(
				cmf.registry.getFromRegistry(sortedColumn.sortFunction)(sortBy, sortAsc),
			);
		} else {
			results = results.sort(compare(sortBy));
		}

		if (!sortAsc) {
			results = results.reverse();
		}
	}
	return results;
}

export function configureGetSortedItems(config, listItems) {
	const getSortedList = createSelector(getComponentState(config.collectionId), componentState =>
		getSortedResults(componentState, config, listItems),
	);

	return createSelector([getSortedList, getComponentState], items => items);
}

export function configureGetPagedItems(configure, listItems) {
	const getPagedList = createSelector(getComponentState(configure.collectionId), componentState => {
		let results = listItems;
		if (componentState) {
			const startIndex = componentState.startIndex;
			const itemsPerPage = componentState.itemsPerPage;

			if (itemsPerPage > 0 && startIndex > 0) {
				results = results.slice(
					startIndex - 1,
					Math.min(startIndex + itemsPerPage - 1, results.size),
				);
			}
		}
		return results;
	});

	return createSelector([getPagedList, getComponentState], items => items);
}
