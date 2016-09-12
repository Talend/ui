import initializeStore from '../src/store';

describe('CMF store', () => {
	it('shoud expose a function', () => {
		expect(typeof initializeStore).toBe('function');
	});
	it('should initialize the store', () => {
		const reducer = {};
		const initialState = {};
		const store = initializeStore(reducer, initialState);
		expect(typeof store.dispatch).toBe('function');
		expect(typeof store.subscribe).toBe('function');
		expect(typeof store.getState).toBe('function');
		expect(typeof store.replaceReducer).toBe('function');
		const state = store.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
	});
	it('should initialize the store without args', () => {
		const store = initializeStore();
		const state = store.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
	});
});
