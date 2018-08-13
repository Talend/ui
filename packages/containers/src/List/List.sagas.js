import { put, takeEvery, take } from 'redux-saga/effects';
import Connected from './List.connect';
import Constants from './List.constant';

export function* onToggleFilter(data) {
	yield put(
		Connected.setStateAction({
			filterDocked: !data.payload.filterDocked,
			searchQuery: '',
		}),
	);
}

export function* onFilterChange(data) {
	yield put(
		Connected.setStateAction({
			searchQuery: data.payload.query,
		}),
	);
}

export function* onChangeSortChange(data) {
	yield put(
		Connected.setStateAction({
			sortOn: data.payload.field,
			sortAsc: !data.payload.isDescending,
		}),
	);
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
