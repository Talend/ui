import { put, takeEvery } from 'redux-saga/effects';
import Connected from './List.connect';
import Constants from './List.constant';

export function* onFilterChange(data) {
	yield put(
		Connected.setStateAction(
			{
				searchQuery: data.payload.query,
			},
			data.props.collectionId || 'default',
		),
	);
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
}

function* defaultHandler() {
	yield takeEvery(Constants.LIST_TOGGLE_FILTER, onToggleFilter);
	yield takeEvery(Constants.LIST_FILTER_CHANGE, onFilterChange);
	yield takeEvery(Constants.LIST_CHANGE_SORT_ORDER, onChangeSortChange);
}

export default {
	'List#root': defaultHandler,
};
