import redirect from './redirect';

function loadUsers(parameters) {
	return {
		type: 'LOAD_USERS',
		payload: parameters,
	};
}

export default {
	redirect,
	loadUsers,
};
