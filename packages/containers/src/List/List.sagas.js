import { put, takeEvery, take, call } from 'redux-saga/effects';
import Connected from './List.connect';
import Constants from './List.constant';
import { getCollectionItems, sortList, filterList } from './selector';

export function* updateList(data) {
	const collectionId = data.props.collectionId || 'default';
	const state = data.context.store.getState();
	const componentState = state.cmf.components.getIn(['Container(List)', collectionId]);
	const items = getCollectionItems(state, collectionId);

	let results = items || data.props.config.items;
	results = sortList(componentState, results, data.props.config);
	results = filterList(componentState, results, data.props.config);
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
	yield take('DO_NOT_QUIT');
}

export default {
	'List#default': defaultHandler,
};
