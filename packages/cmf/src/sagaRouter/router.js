import 'babel-polyfill';
import { spawn, take, cancel } from 'redux-saga/effects';
import isEqual from 'lodash/isEqual';

import matchPath from './matchPath';

function shouldStartSaga(maybeSaga, match) {
	if (match) {
		if (!maybeSaga || (maybeSaga && maybeSaga.saga && !maybeSaga.saga.isRunning())) {
			return true;
		}
	}
	return false;
}
function shouldCancelSaga(maybeSaga, match) {
	if (maybeSaga && maybeSaga.saga.isRunning()) {
		if (!match) {
			return true;
		}
	}
	return false;
}
function shouldRestartSaga(maybeSaga, match) {
	if (match) {
		if (maybeSaga) {
			if (!isEqual(maybeSaga.match.params, match.params)) {
				return true;
			}
		}
	}
	return false;
}

export default function* routerSaga(history, routes) {
	const sagas = {};
	while (true) {
		yield take('@@router/LOCATION_CHANGE');
		const currentLocation = history.getCurrentLocation();
		const routeFragments = Object.keys(routes);
		for (let index = 0; index < routeFragments.length;) {
			const routeFragment = routeFragments[index];
			const match = matchPath(currentLocation.pathname, { path: routeFragment });
			const maybeSaga = sagas[routeFragment];
			if (shouldStartSaga(maybeSaga, match)) {
				sagas[routeFragment] = {
					saga: yield spawn(routes[routeFragment], match.params),
					match,
				};
			} else if (shouldCancelSaga(maybeSaga, match)) {
				if (maybeSaga) {
					yield cancel(maybeSaga.saga);
				}
			} else if (shouldRestartSaga(maybeSaga, match)) {
				if (maybeSaga) {
					yield cancel(maybeSaga.saga);
				}
				sagas[routeFragment] = {
					saga: yield spawn(routes[routeFragment], match.params),
					match,
				};
			}
			index += 1;
		}
	}
}
