import initializeStore from '../src/store';

describe('CMF store', () => {
	it('shoud expose a function', () => {
		expect(typeof initializeStore).toBe('function');
	});
	it('should initialize the store', () => {
		function reducer() {
			return {};
		}
		const initialState = {};
		const store = initializeStore(reducer, initialState);
		expect(typeof store.dispatch).toBe('function');
		expect(typeof store.subscribe).toBe('function');
		expect(typeof store.getState).toBe('function');
		expect(typeof store.replaceReducer).toBe('function');
		const state = store.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
	});
	it('should initialize the store without args', () => {
		const store = initializeStore();
		const state = store.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('undefined');
	});
	it('should support object as reducer config', () => {
		const reducer = {
			heyImRoot() {
				return {};
			},
			app() {
				return {};
			},
		};
		const store = initializeStore(reducer);
		const state = store.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
		expect(typeof state.heyImRoot).toBe('object');
	});
});
