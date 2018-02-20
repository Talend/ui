import { spawn, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import sagaRouter from '../../src/sagaRouter/router';
import { sagaRouter as sagaRouterFromRoot } from '../../src';

describe('sagaRouter import', () => {
	it('shouldBe defined', () => {
		expect(sagaRouter).toBeDefined();
		expect(sagaRouter).toBe(sagaRouterFromRoot);
	});
});

describe('sagaRouter RouteChange', () => {
	it('start the configured saga if route equals current location,' +
		" additionnaly add a second param to the started saga set to 'true'", () => {
		// given
		const mockedHistory = {
			location: { pathname: '/matchingroute' },
		};
		const routes = {
			'/matchingroute': function* matchingSaga(notUsed, isExact) {
				if (isExact) {
					yield take('SOMETHING');
				}
			},
		};

		// when
		const gen = sagaRouter(mockedHistory, routes);

		// then
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {}, true),
		);
	});

	it(`start the configured  saga if route is a fragment of current location additionnaly add a second param
	to the started saga set to 'false'`, () => {
		// given
		const mockedHistory = {
			location: { pathname: '/matchingroute/childroute' },
		};
		const routes = {
			'/matchingroute': function* matchingSaga(notused, isExact) {
				if (isExact) {
					yield take({ type: 'NOT_DISPATCHED' });
				}
				yield take('SOMETHING');
			},
		};

		// when
		const gen = sagaRouter(mockedHistory, routes);

		// then
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {}, false),
		);
	});

	it('keep running a saga if its route is a fragment of the new route', () => {
		const mockTask = createMockTask();
		const mockedHistory = {
			location: { pathname: '/matchingroute' },
		};
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {}, true),
		);

		// when
		mockedHistory.location = { pathname: '/matchingroute/test' };

		// then:
		// since the saga should be kept running the router to be able to handle a new route change
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			take('@@router/LOCATION_CHANGE'),
		);
	});

	it("stop the saga if its route don't match the current location", () => {
		// given
		const mockTask = createMockTask();
		const mockedHistory = {
			location: { pathname: '/matchingroute' },
		};
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {}, true),
		);

		// when
		mockedHistory.location = { pathname: '/anotherroute' };

		// then
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
	});

	it('stop unmatched saga before spawning new ones, no matter the declaration order', () => {
		// given
		const mockTask = createMockTask();
		const mockedHistory = {
			location: { pathname: '/toCancelFirst' },
		};
		const routes = {
			'/toStartAfter': function* matchingSaga() {
				yield take('SOMETHING');
			},
			'/toCancelFirst': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/toCancelFirst'], {}, true),
		);

		mockedHistory.location = { pathname: '/toStartAfter' };
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);

		const alternateRoutes = {
			'/toCancelFirst': function* matchingSaga() {
				yield take('SOMETHING');
			},
			'/toStartAfter': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};

		// when
		mockedHistory.location = { pathname: '/toCancelFirst' };
		const anotherGen = sagaRouter(mockedHistory, alternateRoutes);

		// then
		expect(anotherGen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(anotherGen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(alternateRoutes['/toCancelFirst'], {}, true),
		);

		// when
		mockedHistory.location = { pathname: '/toStartAfter' };

		// then
		expect(anotherGen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const anotherExpectedCancelYield = cancel(mockTask);
		expect(anotherGen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			anotherExpectedCancelYield,
		);
	});

	it('stop a saga with \'runOnExactMatch\' parameter if its route is a fragment of the new route', () => {
		// given
		const mockTask = createMockTask();
		const routes = {
			'/resources': {
				runOnExactMatch: true,
				saga: function* resourcesSaga(params, isExact) {
					if (isExact) {
						yield take('SOMETHING');
					}
				},
			},
			'/resources/action': function* resourcesActionSaga() {
				yield take('SOMETHING');
			},
		};
		const mockedHistory = {
			location: { pathname: '/resources' },
		};
		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
				spawn(routes['/resources'].saga, {}, true),
		);

		// when
		mockedHistory.location = { pathname: '/resources/action' };

		// then
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
	});

	it(`does not start the configured saga with 'runOnExactMatch' parameter,
	if route is a fragment of current location`, () => {
		// given
		const mockedHistory = {
			location: { pathname: '/matchingroute/childroute' },
		};
		const routes = {
			'/matchingroute': {
				runOnExactMatch: true,
				saga: function* matchingSaga(notused, isExact) {
					if (isExact) {
						yield take({ type: 'NOT_DISPATCHED' });
					}
					yield take('SOMETHING');
				},
			},
		};

		// when
		const gen = sagaRouter(mockedHistory, routes);

		// then
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			take('@@router/LOCATION_CHANGE')
		);
	});

	it('restart a saga with `restartOnRouteChange` parameter if the route it was matched on is now a subset of another location', () => {
		// given
		const mockTask = createMockTask();
		const routes = {
			'/resources': {
				restartOnRouteChange: true,
				saga: function* resourcesSaga(params, isExact) {
					if (isExact) {
						yield take('SOMETHING');
					}
				},
			},
			'/resources/action': function* resourcesActionSaga() {
				yield take('SOMETHING');
			},
		};
		const mockedHistory = {
			location: { pathname: '/resources' },
		};
		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/resources'].saga, {}, true),
		);

		// when
		mockedHistory.location = { pathname: '/resources/action' };

		// then: if saga restarted, it will cancel it first and then start it.
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(
				spawn(routes['/resources'].saga, {}, false),
		);
	});
});

describe('sagaRouter route and route params', () => {
	it('route params should be given to target saga as object', () => {
		// given
		const mockedHistory = {
			location: { pathname: '/matchingroute/anId' },
		};
		const routes = {
			'/matchingroute/:id': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};

		// when
		const gen = sagaRouter(mockedHistory, routes);

		// then
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' }, true),
		);
	});

	it('if route params change, then matchings sagas should be cancel and restarted', () => {
		// given
		const mockTask = createMockTask();
		const mockedHistory = {
			location: { pathname: '/matchingroute/anId' },
		};
		const routes = {
			'/matchingroute/:id': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};

		const gen = sagaRouter(mockedHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' }, true),
		);

		// when
		mockedHistory.location = { pathname: '/matchingroute/anotherId' };

		// then
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anotherId' }, true),
		);
	});
});
