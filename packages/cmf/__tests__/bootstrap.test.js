import React from 'react';
import ReactDOM from 'react-dom';
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
jest.mock('redux-saga', () => ({
	__esModule: true, // this property makes it work
	default: (() => {
		const run = jest.fn();
		const middleware = jest.fn(() => ({ reduxSagaMocked: true, run }));
		middleware.run = run;
		middleware.clearRun = () => run.mockClear();
		return middleware;
	})(),
	effects: {
		spawn: jest.fn(),
	},
}));
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
		ReactDOM.render.mockClear();
	});
	describe('error management', () => {
		it('should bootstrap onError', async () => {
			const options = {
				onError: {
					reportURL: '/api/v1/report',
					sensibleKeys: [],
				},
			};
			await bootstrap(options);
			expect(onError.bootstrap).toHaveBeenCalled();
			const call = onError.bootstrap.mock.calls[0];
			expect(call[0]).toMatchObject(options);
		});
	});
	describe('registry', () => {
		it('should check options', async () => {
			try {
				await bootstrap({ appId: {} });
				fail();
			} catch (e) {
				expect(e.message).toBe('appId must be a string but got object');
			}
		});
		it('should call registerInternals', async () => {
			await bootstrap({});
			expect(registerInternals).toHaveBeenCalled();
		});
		it('should register options.registry using registry.registerMany', async () => {
			registry.registerMany.mockClear();
			const options = {
				registry: {
					foo: jest.fn(),
				},
			};
			await bootstrap(options);
			expect(registry.registerMany).toHaveBeenCalledWith(options.registry);
		});
		it('should register options.components using component.registerMany', async () => {
			component.registerMany.mockClear();
			const options = {
				components: {
					foo: jest.fn(),
				},
			};
			await bootstrap(options);
			expect(component.registerMany).toHaveBeenCalledWith(options.components);
		});
		it('should register options.expressions using expression.registerMany', async () => {
			expression.registerMany.mockClear();
			const options = {
				expressions: {
					foo: jest.fn(),
				},
			};
			await bootstrap(options);
			expect(expression.registerMany).toHaveBeenCalledWith(options.expressions);
		});
		it('should register options.actionCreators using actionCreator.registerMany', async () => {
			actionCreator.registerMany.mockClear();
			const options = {
				actionCreators: {
					foo: jest.fn(),
				},
			};
			await bootstrap(options);
			expect(actionCreator.registerMany).toHaveBeenCalledWith(options.actionCreators);
		});
		it('should register options.sagas using sagas.registerMany', async () => {
			sagas.registerMany.mockClear();
			const options = {
				sagas: {
					foo: jest.fn(),
				},
			};
			await bootstrap(options);
			expect(sagas.registerMany).toHaveBeenCalledWith(options.sagas);
		});
	});
	describe('saga', () => {
		it('should call createSagaMiddleware and run the middleware', async () => {
			createSagaMiddleware.mockClear();
			createSagaMiddleware.clearRun();
			await bootstrap({});
			expect(createSagaMiddleware).toHaveBeenCalled();
			expect(createSagaMiddleware.run).toHaveBeenCalled();
		});
	});
	describe('redux', () => {
		it('should call storeAPI.addPreReducer if options.preReducer', async () => {
			const options = {
				preReducer: jest.fn(),
			};
			await bootstrap(options);
			expect(storeAPI.addPreReducer).toHaveBeenCalledWith(options.preReducer);
		});
		it('should call storeAPI.setHttpMiddleware if options.preReducer', async () => {
			const options = {
				httpMiddleware: jest.fn(),
			};
			await bootstrap(options);
			expect(storeAPI.setHttpMiddleware).toHaveBeenCalledWith(options.httpMiddleware);
		});
		it('should call storeAPI.initialize with all options', async () => {
			storeAPI.initialize.mockClear();
			createSagaMiddleware.mockClear();
			const options = {
				reducer: { app: jest.fn() },
				preloadedState: {},
				middlewares: [],
			};
			await bootstrap(options);
			expect(storeAPI.initialize).toHaveBeenCalled();
			expect(storeAPI.initialize.mock.calls[0][0]).toBe(options.reducer);
			expect(storeAPI.initialize.mock.calls[0][1]).toBe(options.preloadedState);
			// only the default enhancer
			expect(storeAPI.initialize.mock.calls[0][2]).toBe(internals.bactchedSubscribe);
			expect(Array.isArray(storeAPI.initialize.mock.calls[0][3])).toBe(true);
			// the only middleware is redux-saga one (mocked)
			expect(storeAPI.initialize.mock.calls[0][3][0].reduxSagaMocked).toBe(true);
		});
		it('should support options.settingsURL to fetch them', async () => {
			const options = {
				settingsURL: '/foo/settings.json',
				storeCallback: store => {
					expect(store.dispatch).toHaveBeenCalled();
					expect(store.dispatch.mock.calls[0][0].url).toBe('/foo/settings.json');
				},
			};
			await bootstrap(options);
		});
		it('should work without settings', async () => {
			const options = {
				storeCallback: store => {
					expect(store.dispatch).not.toBeCalled();
				},
			};
			await bootstrap(options);
		});
		it('should bootstrap in element', async () => {
			const div = document.createElement('div');
			const options = {
				root: div,
			};
			expect(ReactDOM.render).not.toHaveBeenCalled();
			await bootstrap(options);
			expect(ReactDOM.render).toHaveBeenCalled();
			const args = ReactDOM.render.mock.calls[0];
			expect(args[1]).toBe(div);
		});
	});
});
