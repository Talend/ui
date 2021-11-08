import { History } from 'history';
import isEqual from 'lodash/isEqual';
import { Task } from 'redux-saga';
import { spawn, take, cancel } from 'redux-saga/effects';

import { matchPath, match as Match } from 'react-router-dom';

export interface Location {
	pathname: string;
}

export interface RunningTasks {
	[key: string]: MaybeSaga;
}

export interface RouteParams {
	[key: string]: number;
}

export interface MaybeSaga {
	saga: Task;
	match: Match;
}

export interface RouteSaga {
	saga: MaybeSaga;
	params: RouteParams;
	runOnExactMatch: boolean;
	restartOnRouteChange: boolean;
}

export interface RoutesConfig {
	[key: string]: RouteSaga;
}

/**
 * Determine if a saga should be restarted with the following rules :
 */
function shouldStartSaga(maybeSaga: MaybeSaga, match: Match | null, routeSaga: RouteSaga) {
	if (match) {
		if (!maybeSaga || (maybeSaga && maybeSaga.saga && !maybeSaga.saga.isRunning())) {
			if (routeSaga.runOnExactMatch === true) {
				return match.isExact;
			}
			return true;
		}
	}
	return false;
}

/**
 * Determine if a saga should be canceled with the following rules :
 */
function shouldCancelSaga(maybeSaga: MaybeSaga, match: Match | null, routeSaga: RouteSaga) {
	if (maybeSaga && maybeSaga.saga.isRunning()) {
		if (!match || routeSaga.runOnExactMatch === true) {
			return true;
		}
	}
	return false;
}

/**
 * Determine if a saga should be restarted with the following rules:
 */
function shouldRestartSaga(maybeSaga: MaybeSaga, match: Match | null, routeSaga: RouteSaga) {
	if (match) {
		if (maybeSaga) {
			if (
				routeSaga.restartOnRouteChange === true ||
				!isEqual(maybeSaga.match.params, match.params)
			) {
				return true;
			}
		}
	}
	return false;
}

/**
 * for a route a list of running saga and current location return a
 * match object and a saga
 */
function parseSagaState(routeFragment: string, sagas: RunningTasks, currentLocation: Location) {
	return {
		match: matchPath(currentLocation.pathname, { path: routeFragment }),
		maybeSaga: sagas[routeFragment],
	};
}

export const SAGA_ROUTER_HISTORY_CHANGE = 'SAGA_ROUTER_HISTORY_CHANGE';
/**
 * responsible to start and cancel saga based on application current url,
 * restart saga if necessary
 * @param {object} history - react router history
 * @param {RoutesConfig} routes
 */
export function* sagaRouter(history: History, routes: RoutesConfig): any {
	const sagas: RunningTasks = {};
	const routeFragments = Object.keys(routes);
	while (true) {
		const shouldStart = [];
		const currentLocation = history.location;
		for (let index = 0; index < routeFragments.length; ) {
			const routeFragment = routeFragments[index];
			const routeSaga = routes[routeFragment];
			const { match, maybeSaga } = parseSagaState(routeFragment, sagas, currentLocation);
			if (shouldCancelSaga(maybeSaga, match, routeSaga)) {
				yield cancel(maybeSaga.saga);
			} else if (shouldRestartSaga(maybeSaga, match, routeSaga)) {
				yield cancel(maybeSaga.saga);
				shouldStart.push({ routeFragment, match });
			} else if (shouldStartSaga(maybeSaga, match, routeSaga)) {
				shouldStart.push({ routeFragment, match });
			}
			index += 1;
		}
		for (let index = 0; index < shouldStart.length; ) {
			const { routeFragment, match } = shouldStart[index];
			let routeSaga: RouteSaga | MaybeSaga = routes[routeFragment];
			if (typeof routes[routeFragment] === 'object') {
				routeSaga = routes[routeFragment].saga;
			}
			sagas[routeFragment] = {
				saga: yield spawn(routeSaga as any, match?.params, match?.isExact),
				match,
			} as MaybeSaga;
			index += 1;
		}

		yield take(SAGA_ROUTER_HISTORY_CHANGE);
	}
}
