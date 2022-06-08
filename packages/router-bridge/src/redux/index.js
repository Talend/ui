import { isLegacy } from '../router';

export function push(url, state, baseAction) {
	if (!isLegacy) {
		try {
			const { push: connectedPush } = require('connected-react-router');
			return connectedPush(url, state);
		} catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error(
					'@talend/router-bridge: you need to install connected-react-router to use the router-bridge push action creator',
				);
			}
		}
	}
	return {
		...baseAction,
		cmf: {
			routerPush: url,
		},
	};
}

export function replace(url, state, baseAction) {
	if (!isLegacy) {
		try {
			const { replace: connectedReplace } = require('connected-react-router');
			return connectedReplace(url, state);
		} catch (e) {
			if (process.env.NODE_ENV !== 'production') {
				console.error(
					'@talend/router-bridge: you need to install connected-react-router to use the router-bridge push action creator',
				);
			}
		}
	}
	return {
		...baseAction,
		cmf: {
			routerReplace: url,
		},
	};
}
