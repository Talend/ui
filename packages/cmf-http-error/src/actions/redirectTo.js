import get from 'lodash/get';

export const specializedErrorPages = [404, 403, 500];

export function mapStatusCodeToPage(code) {
	if (code === undefined) {
		return '/internet-connection-problem';
	}
	if (specializedErrorPages.includes(code)) {
		return `/${code}`;
	}

	return '/500';
}

/**
 * @param {Object} cmf error
 * @returns {Object} that will change webapp location to either /404 /403 or /500
 */
export function redirectToStatusCodePage(code) {
	return {
		type: '@@router/CALL_HISTORY_METHOD',
		payload: {
			method: 'push',
			args: [mapStatusCodeToPage(code)],
		},
	};
}

export function logout() {
	window.location.assign('/logout');
}

/**
 * action creator
 * @param {Event} event which trigger this action
 * @param {Object} data {model,action} sub objects
 * @returns {Object} action
 */
export function redirectByAction(event, data = {}) {
	let path = get(data, 'action.path', '');
	if (data.model && data.model.id) {
		path = path.replace('$id', data.model.id);
	} else if (data.model && data.model.get) {
		path = path.replace('$id', data.model.get('id'));
	}
	return {
		type: '@@router/CALL_HISTORY_METHOD',
		payload: {
			method: 'push',
			args: [path],
		},
	};
}

export default {
	redirectByAction,
	redirectToStatusCodePage,
	logout,
};
