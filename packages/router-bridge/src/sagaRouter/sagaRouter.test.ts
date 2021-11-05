import { spawn, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';

import { sagaRouter, SAGA_ROUTER_HISTORY_CHANGE } from './sagaRouter';

describe('sagaRouter RouteChange', () => {
	it(`start the configured saga if route equals current location, additionnaly add a second param
	to the started saga set to 'true'`, () => {
		const mockHistory: any = {
			location: {
				pathname: '/matchingroute',
			},
		};
		const routes: any = {
			'/matchingroute': function* matchingSaga(_: any, isExact: boolean) {
				if (isExact) {
					yield take('SOMETHING');
				}
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next().value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
	});

	it(`start the configured  saga if route is a fragment of current location additionnaly add a second param
		to the started saga set to 'false'`, () => {
		const mockHistory: any = {
			location: {
				pathname: '/matchingroute/childroute',
			},
		};
		const routes: any = {
			'/matchingroute': function* matchingSaga(notused: any, isExact: boolean) {
				if (isExact) {
					yield take('NOT_DISPATCHED');
				}
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, false));
	});

	it('keep running a saga if its route is a fragment of the new route', () => {
		const mockTask = createMockTask();
		const mockHistory: any = {
			location: {
				pathname: '/matchingroute',
			},
		};
		const routes: any = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		// since the saga should be kept running the router to be able to handle a new route change
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(
			take(SAGA_ROUTER_HISTORY_CHANGE),
		);
	});

	it("stop the saga if its route don't match the current location", () => {
		const mockTask = createMockTask();
		const mockHistory: any = {
			location: {
				pathname: '/matchingroute',
			},
		};
		const routes: any = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		mockHistory.location.pathname = '/noMatching';
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(expectedCancelYield);
	});

	it('stop unmatched saga before spawning new ones, no matter the declaration order', () => {
		const mockTask = createMockTask();

		const mockHistory: any = {
			location: {
				pathname: '/toCancelFirst',
			},
		};

		// mockHistory.location.pathname = '/toStartAfter';

		const routes: any = {
			'/toStartAfter': function* matchingSaga() {
				yield take('SOMETHING');
			},
			'/toCancelFirst': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/toCancelFirst'], {}, true));
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		mockHistory.location.pathname = '/toStartAfter';
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(expectedCancelYield);

		const alternateRoutes: any = {
			'/toCancelFirst': function* matchingSaga() {
				yield take('SOMETHING');
			},
			'/toStartAfter': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		mockHistory.location.pathname = '/toCancelFirst';

		const anotherGen = sagaRouter(mockHistory, alternateRoutes);
		expect(anotherGen.next().value).toEqual(spawn(alternateRoutes['/toCancelFirst'], {}, true));
		expect(anotherGen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		const anotherExpectedCancelYield = cancel(mockTask);
		mockHistory.location.pathname = '/toStartAfter';
		expect(anotherGen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(
			anotherExpectedCancelYield,
		);
	});

	it('stop a saga with "runOnExactMatch" parameter if its route is a fragment of the new route', () => {
		// GIVEN
		const mockTask = createMockTask();
		const routes: any = {
			'/resources': {
				runOnExactMatch: true,
				saga: function* resourcesSaga(params: any, isExact: boolean) {
					if (isExact) {
						yield take('SOMETHING');
					}
				},
			},
			'/resources/action': function* resourcesActionSaga() {
				yield take('SOMETHING');
			},
		};

		const mockHistory: any = {
			location: {
				pathname: '/resources',
			},
		};

		// WHEN
		const gen = sagaRouter(mockHistory, routes);
		// EXPECT
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, true));
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		mockHistory.location.pathname = '/resources/action';
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(expectedCancelYield);
	});

	it(`does not start the configured saga with 'runOnExactMatch' parameter,
		if route is a fragment of current location`, () => {
		const mockHistory: any = {
			location: {
				pathname: '/matchingroute/childroute',
			},
		};
		const routes: any = {
			'/matchingroute': {
				runOnExactMatch: true,
				saga: function* matchingSaga(notused: any, isExact: boolean) {
					if (isExact) {
						yield take('NOT_DISPATCHED');
					}
					yield take('SOMETHING');
				},
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(
			take(SAGA_ROUTER_HISTORY_CHANGE),
		);
	});

	it('restart a saga with `restartOnRouteChange` parameter if the route it was matched on is now a subset of another location', () => {
		// GIVEN
		const mockTask = createMockTask();
		const routes: any = {
			'/resources': {
				restartOnRouteChange: true,
				saga: function* resourcesSaga(params: any, isExact: boolean) {
					if (isExact) {
						yield take('SOMETHING');
					}
				},
			},
			'/resources/action': function* resourcesActionSaga() {
				yield take('SOMETHING');
			},
		};
		const mockHistory: any = {
			location: {
				pathname: '/resources',
			},
		};

		// WHEN
		const gen = sagaRouter(mockHistory, routes);
		// EXPECT
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, true));
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		// if saga restarted, it will cancel it first and then start it.
		mockHistory.location.pathname = '/resources/action';
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, false));
	});

	describe('sagaRouter route and route params', () => {
		it('route params should be given to target saga as object', () => {
			const mockHistory: any = {
				location: {
					pathname: '/matchingroute/anId',
				},
			};

			const routes: any = {
				'/matchingroute/:id': function* matchingSaga() {
					yield take('SOMETHING');
				},
			};
			const gen = sagaRouter(mockHistory, routes);

			expect(gen.next().value).toEqual(spawn(routes['/matchingroute/:id'], { id: 'anId' }, true));
			expect(gen.next().value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		});
	});

	it('if route params change, then matchings sagas should be cancel and restarted', () => {
		const mockTask = createMockTask();

		const mockHistory: any = {
			location: {
				pathname: '/matchingroute/anId',
			},
		};

		const routes: any = {
			'/matchingroute/:id': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' }, true),
		);
		expect(gen.next(mockTask).value).toEqual(take(SAGA_ROUTER_HISTORY_CHANGE));
		mockHistory.location.pathname = '/matchingroute/anotherId';
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: SAGA_ROUTER_HISTORY_CHANGE }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anotherId' }, true),
		);
	});
});
