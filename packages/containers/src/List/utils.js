import cmf from '@talend/react-cmf';
import get from 'lodash/get';
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

export function getComponentState(collectionId) {
	return state => state.cmf.components.getIn(['Container(List)', collectionId || 'default']);
}

export function sortList(componentState, localConfig, items) {
	if (!List.isList(items)) {
		return new List();
	}
	let results = items;
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
}

export function filterList(componentState, localConfig, items) {
	let results = items;
	if (componentState && componentState.get('searchQuery')) {
		results = items.filter(item =>
			contains(item, componentState.get('searchQuery'), localConfig.columns),
		);
	}
	return results;
}

export const sortCurried = (componentState, localConfig) =>
		results => sortList(componentState, localConfig, results);
