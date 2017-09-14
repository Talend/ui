import { spawn, take, cancel } from 'redux-saga/effects';
import { createMockTask } from 'redux-saga/utils';
import routerSaga from '../../src/sagaRouter/router';

describe('routerSaga RouteChange', () => {
	it('start the configured saga if route equals current location', () => {
		const mockHistory = {
			getCurrentLocation() {
				return {
					pathname: '/matchingroute',
				};
			},
		};
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = routerSaga(mockHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {})
		);
	});

	it('start the configured  saga if route is a fragment of current location', () => {
		const mockHistory = {
			getCurrentLocation() {
				return {
					pathname: '/matchingroute/childroute',
				};
			},
		};
		const routes = {
			'/matchingroute': function* matchingSaga() {
				yield take('SOMETHING');
			},
		};
		const gen = routerSaga(mockHistory, routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {})
		);
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
		const gen = routerSaga(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {})
		);
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		// since the saga should be kept running the router to be able to handle a new route change
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			take('@@router/LOCATION_CHANGE')
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
		const gen = routerSaga(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute'], {})
		);
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
	});
});

describe('routerSaga route and route params', () => {
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
		const gen = routerSaga(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' })
		);
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
		const gen = routerSaga(getMockedHistory(), routes);
		expect(gen.next().value).toEqual(take('@@router/LOCATION_CHANGE'));
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(
			spawn(routes['/matchingroute/:id'], { id: 'anId' })
		);
		expect(gen.next(mockTask).value).toEqual(take('@@router/LOCATION_CHANGE'));
		const expectedCancelYield = cancel(mockTask);
		expect(gen.next({ type: '@@router/LOCATION_CHANGE' }).value).toEqual(expectedCancelYield);
		expect(gen.next().value).toEqual(spawn(routes['/matchingroute/:id'], { id: 'anotherId' }));
	});
});
