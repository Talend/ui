import cmf from '@talend/react-cmf';
import get from 'lodash/get';
import isEmpty from 'lodash/isEmpty';
import { createSelector } from 'reselect';
import { Map, List } from 'immutable';

function contains(listItem, query, columns) {
	let item = listItem;
	if (Map.isMap(listItem)) {
		item = listItem.toJS();
	}
	return columns.some(
		column =>
			typeof item[column.key] === 'string' &&
			item[column.key].toLowerCase().indexOf(query.toLowerCase()) !== -1,
	);
}

function getCollection(state, collectionId) {
	return state.cmf.collections.get(collectionId);
}

function compareNumbers(aValue, bValue) {
	if (aValue < bValue) {
		return -1;
	}
	if (aValue > bValue) {
		return 1;
	}
	return 0;
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

export function compare(sortBy) {
	return (a, b) => {
		let aValue = a.get(sortBy);
		let bValue = b.get(sortBy);

		if (typeof aValue === 'string' && typeof bValue === 'string') {
			aValue = aValue.toLowerCase();
			bValue = bValue.toLowerCase();

			let aMaybeNumber = aValue.split('/').map(item => parseInt(item));
			let bMaybeNumber = bValue.split('/').map(item => parseInt(item));

			if(aMaybeNumber.length === 2
				&& bMaybeNumber.length === 2
				&& typeof aMaybeNumber[0] === 'number'
				&& typeof aMaybeNumber[1] === 'number'
				&& typeof bMaybeNumber[0] === 'number'
				&& typeof bMaybeNumber[1] === 'number') {
					return compareNumbers(aMaybeNumber[0], bMaybeNumber[0]);
				}

			return aValue.localeCompare(bValue);
		}
		
		if(typeof aValue === 'number' && typeof bValue === 'number') {
			return compareNumbers(aValue, bValue);
		}

		if (!b[sortBy]) {
			return 0;
		}
		return -1;
	};
}

export function getSortedResults(componentState, config, listItems) {
	if (!List.isList(listItems)) {
		return new List();
	}
	let results = listItems;
	if (!isEmpty(componentState)) {
		const sortBy = componentState.get('sortOn');
		const sortAsc = componentState.get('sortAsc');
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
	});

	return createSelector([getPagedList, getComponentState], items => items);
}
