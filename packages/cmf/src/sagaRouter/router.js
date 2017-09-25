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

function parseSagaState(routeFragments, sagas, currentLocation, index) {
	const routeFragment = routeFragments[index];
	return {
		routeFragment,
		match: matchPath(currentLocation.pathname, { path: routeFragment }),
		maybeSaga: sagas[routeFragment],
	};
}

export default function* routerSaga(history, routes) {
	const sagas = {};
	const routeFragments = Object.keys(routes);
	while (true) {
		yield take('@@router/LOCATION_CHANGE');
		const shouldStart = [];
		const currentLocation = history.getCurrentLocation();
		for (let index = 0; index < routeFragments.length;) {
			const { routeFragment, match, maybeSaga } = parseSagaState(
				routeFragments,
				sagas,
				currentLocation,
				index,
			);
			console.log('match', match);
			if (shouldCancelSaga(maybeSaga, match)) {
				yield cancel(maybeSaga.saga);
			} else if (shouldRestartSaga(maybeSaga, match)) {
				yield cancel(maybeSaga.saga);
				shouldStart.push({ routeFragment, match });
			} else if (shouldStartSaga(maybeSaga, match)) {
				shouldStart.push({ routeFragment, match });
			}
			index += 1;
		}
		for (let index = 0; index < shouldStart.length;) {
			const { routeFragment, match } = shouldStart[index];
			sagas[routeFragment] = {
				saga: yield spawn(routes[routeFragment], match.params),
				match,
			};
			index += 1;
		}
	}
}
