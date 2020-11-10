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
