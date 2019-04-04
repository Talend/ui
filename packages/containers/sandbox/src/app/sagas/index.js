import { call, put, all, select, takeLatest } from 'redux-saga/effects';
import { actions, sagas, selectors } from '@talend/react-cmf';
import { loadUsers as loadUsersActionCreator } from '../actions';


const USERS_API_URL = '/api/infinite-scroll/users';

/**
 * Transforms a key/value object to an HTTP GET query string
 * @param {object} params
 * @returns {string}
 */
function querifyObject(params) {
	const keys = Object.keys(params);

	if (keys.length === 0) {
		return '';
	}

	const queryString = keys
		.reduce((strings, key) => [...strings, `${key}=${params[key]}`], [])
		.join('&');

	return `?${queryString}`;
}

function* loadUsers({ payload }) {
	const {
		startIndex,
		stopIndex,
		sortBy = 'number',
		sortDirection = 'ASC',
	} = payload;

	const params = { startIndex, stopIndex, sortBy, sortDirection };

	const resp = yield call(sagas.http.get, `${USERS_API_URL}${querifyObject(params)}`);

	if (resp.response.ok) {
		const { items, totalUserCount } = resp.data;

		const currentUsersList = yield select(state => selectors.collections.get(state, 'users'));

		const newUsersList = currentUsersList ? currentUsersList.toJS() : [];

		// Add items to the index where we want them
		items.forEach((item, index) => {
			newUsersList[index + startIndex] = item;
		});

		yield put(actions.collections.addOrReplace('users', newUsersList));
		yield put(actions.collections.addOrReplace('totalUsersCount', totalUserCount));
	}
}

function* sortUsers({ payload }) {
	// Reset collection
	yield put(actions.collections.addOrReplace('users', []));

	// Trigger data (re)loading
	const { sortBy, sortDirection } = payload;

	const loadUsersPayload = {
		sortBy,
		sortDirection,
		startIndex: 0,
		stopIndex: 20,
	};

	yield put(loadUsersActionCreator(loadUsersPayload));
}

export default function* () {
	yield all([
		takeLatest('LOAD_USERS', loadUsers),
		takeLatest('SORT_USERS', sortUsers),
	]);
}
