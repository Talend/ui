import store from '../src/store';

describe('CMF store', () => {
	it('shoud expose a function', () => {
		expect(typeof store.initialize).toBe('function');
	});
	it('should initialize the store', () => {
		function reducer() {
			return {};
		}
		const initialState = {};
		const s = store.initialize(reducer, initialState);
		expect(typeof s.dispatch).toBe('function');
		expect(typeof s.subscribe).toBe('function');
		expect(typeof s.getState).toBe('function');
		expect(typeof s.replaceReducer).toBe('function');
		const state = s.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
	});
	it('should initialize the store without args', () => {
		const s = store.initialize();
		const state = s.getState();
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
		const s = store.initialize(reducer);
		const state = s.getState();
		expect(typeof state.routing).toBe('object');
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
		expect(typeof state.heyImRoot).toBe('object');
	});
});
