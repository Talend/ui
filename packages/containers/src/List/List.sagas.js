import { put, takeEvery, call } from 'redux-saga/effects';
import { List } from 'immutable';
import Connected from './List.connect';
import Constants from './List.constant';
import { getCollectionItems, sortCurried, filterList } from './utils';

const getFilteredItems = filterListFn => (componentState, config, results) => {
	const filterItemsCurried = sortCurried(componentState, config);
	return filterItemsCurried(filterListFn(componentState, config, results));
};

export function* updateList({ props, context }) {
	const collectionId = props.collectionId || 'default';
	const state = context.store.getState();
	const stateItems = getCollectionItems(state, collectionId);
	const componentState = state.cmf.components.getIn(['Container(List)', collectionId]);

	const items = stateItems || props.config.items || new List();
	const results = getFilteredItems(filterList)(componentState, props.config, items);
	yield put(
		Connected.setStateAction(
			{
				items: results,
			},
			collectionId,
		),
	);
}

export function* onFilterChange(data) {
	yield put(
		Connected.setStateAction(
			{
				searchQuery: data.payload.query,
			},
			data.props.collectionId || 'default',
		),
	);
	yield call(updateList, data);
}

export function* onToggleFilter(data) {
	const filterData = data;
	yield put(
		Connected.setStateAction(
			{
				filterDocked: !filterData.payload.filterDocked,
				searchQuery: '',
			},
			filterData.props.collectionId,
		),
	);
	if (!filterData.payload.filterDocked && filterData.payload.searchQuery) {
		filterData.payload.searchQuery = '';
		yield call(onFilterChange, filterData);
	}
}

export function* onChangeSortChange(data) {
	yield put(
		Connected.setStateAction(
			{
				sortOn: data.payload.field,
				sortAsc: !data.payload.isDescending,
			},
			data.props.collectionId || 'default',
		),
	);
	yield call(updateList, data);
}

function* defaultHandler() {
	yield takeEvery(Constants.LIST_TOGGLE_FILTER, onToggleFilter);
	yield takeEvery(Constants.LIST_FILTER_CHANGE, onFilterChange);
	yield takeEvery(Constants.LIST_CHANGE_SORT_ORDER, onChangeSortChange);
}

export default {
	'List#root': defaultHandler,
};
