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
	it('try to find the collection if collectionPath is a string', () => {
		expect(router.getPath(state)).toEqual(state.routing.locationBeforeTransitions.pathname);
	});
});
