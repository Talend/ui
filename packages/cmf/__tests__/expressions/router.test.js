import * as router from '../../src/expressions/router';
import CONSTANTS from '../../src/constant';
import mock from '../../src/mock';

describe('expressions', () => {
	it('should export some expressions', () => {
		expect(router.matchPath).toBeDefined();
		expect(router.location).toBeDefined();
	});
	describe('matchPath', () => {
		let state;
		let context;
		beforeEach(() => {
			state = mock.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
				},
			};
			context = mock.context();
			context.store = {
				getState: () => state,
			};
		});
		it('should return false if it don\'t match the path', () => {
			const result = router.matchPath({ context }, {
				path: '/no-match/possible',
			});
			expect(result).toBe(false);
		});
		it('should return true if it match the path', () => {
			const result = router.matchPath({ context }, {
				path: '/foo/:bar',
			});
			expect(result).toBe(true);
		});
		it('should return bar params value if getPath is params.bar', () => {
			const result = router.matchPath({ context }, {
				path: '/foo/:bar',
			}, 'params.bar');
			expect(result).toBe('123');
		});
		it('should throw exception if getPath is params', () => {
			const toThrow = () => router.matchPath({ context }, {
				path: '/foo/:bar',
			}, 'params');
			expect(toThrow).toThrow(CONSTANTS.ERROR_ROUTER_DONT_GET_PARAMS);
		});
	});
	describe('location', () => {
		it('should return current location object', () => {
			const state = mock.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
					query: {},
				},
			};
			const context = mock.context();
			context.store = {
				getState: () => state,
			};
			expect(router.location({ context })).toBe(state.routing.locationBeforeTransitions);
		});
		it('should return part of the current location object with getPath argument', () => {
			const state = mock.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
					query: {},
				},
			};
			const context = mock.context();
			context.store = {
				getState: () => state,
			};
			expect(router.location({ context }, 'pathname')).toBe('/foo/123');
		});
	});
});
