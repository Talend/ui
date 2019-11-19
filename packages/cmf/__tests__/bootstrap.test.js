import createSagaMiddleware from 'redux-saga';

import bootstrap, * as internals from '../src/bootstrap';
import { registerInternals } from '../src/register';
import actionCreator from '../src/actionCreator';
import component from '../src/component';
import expression from '../src/expression';
import registry from '../src/registry';
import storeAPI from '../src/store';
import sagas from '../src/sagas';
import onError from '../src/onError';

jest.mock('react-dom', () => ({
	render: jest.fn(),
}));
jest.mock('redux-saga', () => {
	const run = jest.fn();
	const middleware = jest.fn(() => ({ reduxSagaMocked: true, run }));
	middleware.run = run;
	middleware.clearRun = () => run.mockClear();
	return middleware;
});
jest.mock('../src/onError', () => ({
	report: jest.fn(),
	bootstrap: jest.fn(),
}));
jest.mock('../src/registry', () => ({
	registerMany: jest.fn(),
}));
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
	initialize: jest.fn(() => ({ dispatch: jest.fn(), applyMiddleware: jest.fn() })),
}));

describe('bootstrap', () => {
	beforeEach(() => {
		onError.bootstrap.mockClear();
	});
	describe('error management', () => {

		it('should bootstrap onError', () => {
			const options = {
				onError: {
					reportURL: '/api/v1/report',
					sensibleKeys: [],
				},
			};
			bootstrap(options);
			expect(onError.bootstrap).toHaveBeenCalled();
			const call = onError.bootstrap.mock.calls[0];
			expect(call[0]).toMatchObject(options);
		});
	});
	describe('registry', () => {
		it('should check options', () => {
			const toThrow = () => bootstrap({ appId: {} });
			expect(toThrow).toThrow('appId must be a string but got object');
		});
		it('should call registerInternals', () => {
			bootstrap({});
			expect(registerInternals).toHaveBeenCalled();
		});
		it('should register options.registry using registry.registerMany', () => {
			registry.registerMany.mockClear();
			const options = {
				registry: {
					foo: jest.fn(),
				},
			};
			bootstrap(options);
			expect(registry.registerMany).toHaveBeenCalledWith(options.registry);
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
				reducer: { app: jest.fn() },
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
		it('should work without settings', () => {
			const options = {
				storeCallback: store => {
					expect(store.dispatch).not.toBeCalled();
				},
			};
			bootstrap(options);
		});
	});
});
