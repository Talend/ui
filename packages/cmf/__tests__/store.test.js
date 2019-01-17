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
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
	});
	it('should initialize the store without args', () => {
		const s = store.initialize();
		const state = s.getState();
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
		expect(typeof state.cmf.settings).toBe('object');
		expect(typeof state.app).toBe('object');
		expect(typeof state.heyImRoot).toBe('object');
	});
});

describe('addPreReducer', () => {
	it('should add a reducer called by the cmf reducer', () => {
		const myreducer = jest.fn();
		store.addPreReducer(myreducer);
		const reducer = store.getReducer();
		reducer(undefined, {});
		expect(myreducer.mock.calls.length).toBe(1);
	});
});

describe('getMiddlewares', () => {
	it('should return array of middleware', () => {
		const middlewares = store.getMiddlewares();
		expect(Array.isArray(middlewares)).toBe(true);
	});
	it('should support first attr as function', () => {
		const fn = jest.fn();
		const middlewares = store.getMiddlewares(fn);
		expect(middlewares).toContain(fn);
	});
	it('should support first attr as array', () => {
		const fn1 = jest.fn();
		const fn2 = jest.fn();
		const middlewares = store.getMiddlewares([fn1, fn2]);
		expect(middlewares).toContain(fn1);
		expect(middlewares).toContain(fn2);
	});
});
