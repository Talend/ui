import redirect from './redirect';

export function loadUsers(parameters) {
	return {
		type: 'LOAD_USERS',
		payload: parameters,
	};
}

export function sortUsers(sortOptions) {
	return {
		type: 'SORT_USERS',
		payload: sortOptions,
	};
}

export default {
	redirect,
	loadUsers,
	sortUsers,
};
