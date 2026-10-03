import { mock } from '@talend/react-cmf';
import { matchPath, location } from './expressions';
import CONSTANTS from './constant';

describe('expressions', () => {
	it('should export some expressions', () => {
		expect(matchPath).toBeDefined();
		expect(location).toBeDefined();
	});
	describe('matchPath', () => {
		let state;
		let context;
		beforeEach(() => {
			state = mock.store.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
				},
			};
			context = mock.store.context();
			context.store = {
				getState: () => state,
			};
		});
		it("should return false if it don't match the path", () => {
			const result = matchPath(
				{ context },
				{
					path: '/no-match/possible',
				},
			);
			expect(result).toBe(false);
		});
		it('should return true if it match the path', () => {
			const result = matchPath(
				{ context },
				{
					path: '/foo/:bar',
				},
			);
			expect(result).toBe(true);
		});
		it('should return bar params value if getPath is params.bar', () => {
			const result = matchPath(
				{ context },
				{
					path: '/foo/:bar',
				},
				'params.bar',
			);
			expect(result).toBe('123');
		});
		it('should throw exception if getPath is params', () => {
			const toThrow = () =>
				matchPath(
					{ context },
					{
						path: '/foo/:bar',
					},
					'params',
				);
			expect(toThrow).toThrow(CONSTANTS.ERROR_ROUTER_DONT_GET_PARAMS);
		});
	});
	describe('location', () => {
		it('should return current location object', () => {
			const state = mock.store.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
					query: {},
				},
			};
			const context = mock.store.context();
			context.store = {
				getState: () => state,
			};
			expect(location({ context })).toBe(state.routing.locationBeforeTransitions);
		});
		it('should return part of the current location object with getPath argument', () => {
			const state = mock.store.state();
			state.routing = {
				locationBeforeTransitions: {
					pathname: '/foo/123',
					query: {},
				},
			};
			const context = mock.store.context();
			context.store = {
				getState: () => state,
			};
			expect(location({ context }, 'pathname')).toBe('/foo/123');
		});
	});
});

describe('expressions edge cases', () => {
	const context = {
		store: {
			getState: () => ({
				routing: { locationBeforeTransitions: { pathname: '/foo/12', search: '?a=1' } },
			}),
		},
	};

	it('matchPath should return the value at getPathArg or the default value', () => {
		expect(matchPath({ context }, { path: '/foo/:id' }, 'params.id')).toBe('12');
		expect(matchPath({ context }, { path: '/foo/:id' }, 'params.nope', 'dft')).toBe('dft');
		expect(matchPath({ context }, { path: '/bar' }, 'params.id', 'dft')).toBe('dft');
	});

	it('matchPath should return a boolean without getPathArg', () => {
		expect(matchPath({ context }, { path: '/foo/:id' })).toBe(true);
		expect(matchPath({ context }, { path: '/bar' })).toBe(false);
	});

	it('matchPath should refuse getPathArg "params"', () => {
		// KNOWN BUG pinned before the router upgrade: the message constant
		// ERROR_ROUTER_DONT_GET_PARAMS does not exist so the error message is empty.
		expect(() => matchPath({ context }, { path: '/foo/:id' }, 'params')).toThrow(Error);
		expect(() => matchPath({ context }, { path: '/foo/:id' }, 'params')).toThrow(/^$/);
		expect(CONSTANTS.ERROR_ROUTER_DONT_GET_PARAMS).toBeUndefined();
	});

	it('location should return the whole location or one of its keys', () => {
		expect(location({ context })).toEqual({ pathname: '/foo/12', search: '?a=1' });
		expect(location({ context }, 'search')).toBe('?a=1');
	});
});
