import * as router from './selectors';

const state = {
	routing: {
		locationBeforeTransitions: {
			pathname: 'foo/bar',
		},
	},
};

describe('selectors.router.getLocation', () => {
	it('should return the current location', () => {
		expect(router.getLocation(state)).toEqual(state.routing.locationBeforeTransitions);
	});
});

describe('selectors.router.getPath', () => {
	it('should get the pathname', () => {
		expect(router.getPath(state)).toEqual(state.routing.locationBeforeTransitions.pathname);
	});
	it('should get the pathname with hash based routing', () => {
		const hashState = {
			routing: {
				locationBeforeTransitions: {
					pathname: 'foo/bar',
					hash: '#toto',
				},
			},
		};
		expect(router.getPath(hashState, true)).toEqual('foo/bar#toto');
	});
});

describe('selectors with the real store shape', () => {
	// KNOWN BUG pinned before the router upgrade: the reducer is mounted on `state.router`
	// ({ location, action }) but the selectors read the react-router-redux v3 `state.routing`.
	const realState = { router: { location: { pathname: '/foo', hash: '#h' }, action: 'PUSH' } };

	it('getLocation throws on state.router (known bug)', () => {
		expect(() => router.getLocation(realState)).toThrow(/locationBeforeTransitions/);
	});

	it('getPath should append the hash only when asked and present', () => {
		const withHash = { routing: { locationBeforeTransitions: { pathname: '/a', hash: '#h' } } };
		const noHash = { routing: { locationBeforeTransitions: { pathname: '/a', hash: '' } } };
		expect(router.getPath(withHash)).toBe('/a');
		expect(router.getPath(withHash, true)).toBe('/a#h');
		expect(router.getPath(noHash, true)).toBe('/a');
	});

	it('matchPath should combine getPath and cmf matchPath', () => {
		const state = { routing: { locationBeforeTransitions: { pathname: '/foo/12' } } };
		expect(router.matchPath(state, { path: '/foo/:id' }).params).toEqual({ id: '12' });
		expect(router.matchPath(state, { path: '/bar' })).toBeNull();
	});
});
