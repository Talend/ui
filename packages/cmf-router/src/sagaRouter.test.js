import { spawn, take, cancel } from 'redux-saga/effects';
import { createMockTask } from '@redux-saga/testing-utils';
import sagaRouter from './sagaRouter';

describe('sagaRouter import', () => {
	it('shouldBe defined', () => {
		expect(sagaRouter).toBeDefined();
	});
});

describe('sagaRouter RouteChange', () => {
	it(`start the configured saga if route equals current location, additionnaly add a second param
	to the started saga set to 'true'`, () => {
		const mockHistory = {
			getCurrentLocation() {
				return {
					pathname: '/matchingroute',
				};
			},
		};
		const routes = {
			'/matchingroute': function* matchingSaga(notUsed, isExact) {
				if (isExact) {
					yield take('SOMETHING');
				}
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
	});

	it(`start the configured  saga if route is a fragment of current location additionnaly add a second param
	to the started saga set to 'false'`, () => {
		const mockHistory = {
			getCurrentLocation() {
				return {
					pathname: '/matchingroute/childroute',
				};
			},
		};
		const routes = {
			'/matchingroute': function* matchingSaga(notused, isExact) {
				if (isExact) {
					yield take({ type: 'NOT_DISPATCHED' });
				}
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, false));
	});

	it('keep running a saga if its route is a fragment of the new route', () => {
		const mockTask = createMockTask();
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/matchingroute',
						};
					}
					return {
						pathname: '/matchingroute/test',
					};
				},
			};
		}
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		// since the saga should be kept running the router to be able to handle a new route change
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			take('@@router/LOCATION_CHANGE'),
		);
	});

	it("stop the saga if its route don't match the current location", () => {
		const mockTask = createMockTask();
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/matchingroute',
						};
					}
					return {
						pathname: '/anotherroute',
					};
				},
			};
		}
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute'], {}, true));
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
	});

	it('stop unmatched saga before spawning new ones, no matter the declaration order', () => {
		const mockTask = createMockTask();
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0 || count === 2) {
						count = 1;
						return {
							pathname: '/toCancelFirst',
						};
					}
					return {
						pathname: '/toStartAfter',
					};
				},
			};
		}
		const routes = {
			'/toStartAfter': function* matchingSaga() {
				yield take('SOMETHING');
			},
			'/toCancelFirst': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(spawn(routes['/toCancelFirst'], {}, true));
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

		const anotherGen = sagaRouter(getMockedHistory(), alternateRoutes);
		expect(anotherGen.next().value).toEqual(spawn(alternateRoutes['/toCancelFirst'], {}, true));
		expect(anotherGen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const anotherExpectedCancelYield = cancel(mockTask);
		expect(anotherGen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			anotherExpectedCancelYield,
		);
	});

	it('stop a saga with "runOnExactMatch" parameter if its route is a fragment of the new route', () => {
		// GIVEN
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
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/resources',
						};
					}
					return {
						pathname: '/resources/action',
					};
				},
			};
		}
		// WHEN
		const gen = sagaRouter(getMockedHistory(), routes);
		// EXPECT
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, true));
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
	});

	it(`does not start the configured saga with 'runOnExactMatch' parameter,
	if route is a fragment of current location`, () => {
		const mockHistory = {
			getCurrentLocation() {
				return {
					pathname: '/matchingroute/childroute',
				};
			},
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
		const gen = sagaRouter(mockHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			take('@@router/LOCATION_CHANGE'),
		);
	});

	it('restart a saga with `restartOnRouteChange` parameter if the route it was matched on is now a subset of another location', () => {
		// GIVEN
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
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/resources',
						};
					}
					return {
						pathname: '/resources/action',
					};
				},
			};
		}
		// WHEN
		const gen = sagaRouter(getMockedHistory(), routes);
		// EXPECT
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, true));
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		// if saga restarted, it will cancel it first and then start it.
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(spawn(routes['/resources'].saga, {}, false));
	});
});

describe('sagaRouter route and route params', () => {
	it('route params should be given to target saga as object', () => {
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/matchingroute/anId',
						};
					}
					return {
						pathname: '/anotherroute',
					};
				},
			};
		}
		const routes = {
			'/matchingroute/:id': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(getMockedHistory(), routes);

		expect(gen.next().value).toEqual(spawn(routes['/matchingroute/:id'], { id: 'anId' }, true));
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
	});

	it('if route params change, then matchings sagas should be cancel and restarted', () => {
		const mockTask = createMockTask();
		function getMockedHistory() {
			let count = 0;
			return {
				getCurrentLocation() {
					if (count === 0) {
						count = 1;
						return {
							pathname: '/matchingroute/anId',
						};
					}
					return {
						pathname: '/matchingroute/anotherId',
					};
				},
			};
		}
		const routes = {
			'/matchingroute/:id': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = sagaRouter(getMockedHistory(), routes);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' }, true),
		);
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anotherId' }, true),
		);
	});
});
