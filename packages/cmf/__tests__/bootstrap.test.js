import { render } from 'react-dom';
import { routerMiddleware, syncHistoryWithStore } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';

import bootstrap, * as internals from '../src/bootstrap';
import { registerInternals } from '../src/register';
import actionCreator from '../src/actionCreator';
import component from '../src/component';
import expression from '../src/expression';
import storeAPI from '../src/store';
import sagas from '../src/sagas';

jest.mock('react-dom', () => ({
	render: jest.fn(),
}));
jest.mock('react-router-redux', () => ({
	routerMiddleware: jest.fn(() => ({ routerMiddlewareMocked: true })),
	syncHistoryWithStore: jest.fn((history, store) => ({ mockedSync: true, history, store })),
}));
jest.mock('redux-saga', () => {
	const run = jest.fn();
	const middleware = jest.fn(() => ({ reduxSagaMocked: true, run }));
	middleware.run = run;
	middleware.clearRun = () => run.mockClear();
	return middleware;
});

// we mock all internal dependencies
jest.mock('../src/actionCreator', () => ({
	registerMany: jest.fn(),
}));
jest.mock('../src/component', () => ({
	registerMany: jest.fn(),
}));
jest.mock('../src/expression', () => ({
	registerMany: jest.fn(),
}));
jest.mock('../src/sagas', () => ({
	registerMany: jest.fn(),
}));
jest.mock('../src/register', () => ({
	registerInternals: jest.fn(),
}));

jest.mock('../src/store', () => ({
	addPreReducer: jest.fn(),
	setHttpMiddleware: jest.fn(),
	setRouterMiddleware: jest.fn(),
	initialize: jest.fn(() => ({ dispatch: jest.fn(), applyMiddleware: jest.fn(), })),
}));

describe('bootstrap', () => {
	describe('registry', () => {
		it('should check options', () => {
			const toThrow = () => bootstrap({ appId: {} });
			expect(toThrow).toThrow('appId must be a string but got object');
		});
		it('should call registerInternals', () => {
			registerInternals.mockClear();
			bootstrap({});
			expect(registerInternals).toHaveBeenCalled();
		});
		it('should register options.components using component.registerMany', () => {
			component.registerMany.mockClear();
			const options = {
				components: {
					foo: jest.fn(),
				},
			};
			bootstrap(options);
			expect(component.registerMany).toHaveBeenCalledWith(options.components);
		});
		it('should register options.expressions using expression.registerMany', () => {
			expression.registerMany.mockClear();
			const options = {
				expressions: {
					foo: jest.fn(),
				},
			};
			bootstrap(options);
			expect(expression.registerMany).toHaveBeenCalledWith(options.expressions);
		});
		it('should register options.actionCreators using actionCreator.registerMany', () => {
			actionCreator.registerMany.mockClear();
			const options = {
				actionCreators: {
					foo: jest.fn(),
				},
			};
			bootstrap(options);
			expect(actionCreator.registerMany).toHaveBeenCalledWith(options.actionCreators);
		});
		it('should register options.sagas using sagas.registerMany', () => {
			sagas.registerMany.mockClear();
			const options = {
				sagas: {
					foo: jest.fn(),
				},
			};
			bootstrap(options);
			expect(sagas.registerMany).toHaveBeenCalledWith(options.sagas);
		});
	});
	describe('saga', () => {
		it('should call createSagaMiddleware and run the middleware', () => {
			createSagaMiddleware.mockClear();
			createSagaMiddleware.clearRun();
			bootstrap({});
			expect(createSagaMiddleware).toHaveBeenCalled();
			expect(createSagaMiddleware.run).toHaveBeenCalled();
		});
	});
	describe('redux', () => {
		it('should call storeAPI.addPreReducer if options.preReducer', () => {
			const options = {
				preReducer: jest.fn(),
			};
			bootstrap(options);
			expect(storeAPI.addPreReducer).toHaveBeenCalledWith(options.preReducer);
		});
		it('should call storeAPI.setHttpMiddleware if options.preReducer', () => {
			const options = {
				httpMiddleware: jest.fn(),
			};
			bootstrap(options);
			expect(storeAPI.setHttpMiddleware).toHaveBeenCalledWith(options.httpMiddleware);
		});
		it('should call storeAPI.initialize with all options', () => {
			storeAPI.initialize.mockClear();
			createSagaMiddleware.mockClear();
			const options = {
				reducer: jest.fn(),
				preloadedState: {},
				middlewares: [],
			};
			bootstrap(options);
			expect(storeAPI.initialize).toHaveBeenCalled();
			expect(storeAPI.initialize.mock.calls[0][0]).toBe(options.reducer);
			expect(storeAPI.initialize.mock.calls[0][1]).toBe(options.preloadedState);
			// only the default enhancer
			expect(storeAPI.initialize.mock.calls[0][2]).toBe(internals.bactchedSubscribe);
			expect(Array.isArray(storeAPI.initialize.mock.calls[0][3])).toBe(true);
			// the only middleware is redux-saga one (mocked)
			expect(storeAPI.initialize.mock.calls[0][3][0].reduxSagaMocked).toBe(true);
		});
		it('should support options.settingsURL to fetch them', () => {
			const options = {
				settingsURL: '/foo/settings.json',
				storeCallback: store => {
					expect(store.dispatch).toHaveBeenCalled();
					expect(store.dispatch.mock.calls[0][0].url).toBe('/foo/settings.json');
				},
			};
			bootstrap(options);
		});
	});
	it('should call storeAPI.setRouterMiddleware if options.history is passed', () => {
		routerMiddleware.mockClear();
		storeAPI.setRouterMiddleware.mockClear();
		const options = {
			history: { foo: 'bar' },
		};
		bootstrap(options);
		expect(routerMiddleware).toHaveBeenCalled();
		expect(storeAPI.setRouterMiddleware).toHaveBeenCalledWith({ routerMiddlewareMocked: true });
	});
	it('should return an object with render function which renders with good options', () => {
		const options = {};
		bootstrap(options);
		expect(render).toHaveBeenCalled();
		expect(syncHistoryWithStore).toHaveBeenCalled();
	});
});
