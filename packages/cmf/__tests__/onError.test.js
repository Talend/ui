import React from 'react';
import { mount } from 'enzyme';
import { captureException, withScope, init } from '@sentry/browser';
import onError from '../src/onError';
import CONSTANTS from '../src/constant';
import { store as mock } from '../src/mock';


jest.mock('@sentry/browser', () => {
	return {
		captureException: jest.fn(),
		withScope: jest.fn(),
		init: jest.fn(config => {
			if (config.dsn === 'fail') {
				throw new Error('mock fail');
			}
		}),
	};
});

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

describe('onError', () => {
	let store;
	let state;
	let config;
	beforeEach(() => {
		state = { foo: { ok: 'should be kept', password: 'secret', keyUndefined: undefined } };
		store = mock.store(state);
		window.addEventListener.mockClear();
		store.dispatch = jest.fn();
		console.error = jest.fn();
		config = {
			onError: {
				reportURL: '/api/v1/report',
			},
		};
		onError.bootstrap(config, store);
		jest.clearAllMocks();
	});
	describe('bootstrap', () => {
		it('should call add event listener on window', () => {
			// because of the reset after bootstrap we recall bootstrap
			onError.bootstrap(config, store);
			expect(window.addEventListener).toHaveBeenCalled();
			const call = window.addEventListener.mock.calls[0];
			expect(call[0]).toBe('error');
			const onJSError = call[1];
			expect(onJSError({})).toBeUndefined();
			const event = { error: new Error('My error listener') };
			expect(onJSError(event)).toBeUndefined();
			const action = store.dispatch.mock.calls[0][0];
			expect(action.type).toBe('POST');
			expect(action.body).toContain('My error listener');
		});
	});
	describe('getReportInfo', () => {
		it('should fill internal values', () => {
			expect(onError.hasReportURL()).toBe(true);
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions).toEqual([]);
			expect(info.browser.startsWith('Mozilla')).toBeTruthy();
			expect(info.error).toMatchObject({
				message: 'my',
				name: 'Error',
				stack: expect.anything(),
			});
		});
	});
	describe('report', () => {
		it('should dispatch http action if serverURL', () => {
			expect(store.dispatch).not.toHaveBeenCalled();
			const error = new Error('my');
			onError.report(error);
			expect(store.dispatch).toHaveBeenCalled();
			const action = store.dispatch.mock.calls[0][0];
			expect(action.type).toBe('POST');
			expect(action.url).toBe(config.onError.reportURL);
		});
		it('should dispatch ERROR action if no serverURL', () => {
			config = {
				onError: {},
			};
			onError.bootstrap(config, store);
			expect(store.dispatch).not.toHaveBeenCalled();
			const error = new Error('my');
			onError.report(error);
			expect(store.dispatch).toHaveBeenCalled();
			const action = store.dispatch.mock.calls[0][0];
			expect(action.type).toBe('REACT_CMF.ERROR');
			expect(action.reported).toBe(false);
			expect(action.error.message).toBe('my');
		});
	});
	describe('middleware', () => {
		it('should let normal action happens', () => {
			const mid = onError.middleware();
			const next = jest.fn();
			const action = {
				type: 'TEST',
			};
			mid(next)(action);
			expect(next).toHaveBeenCalledWith(action);
		});
		it('should report if next throw exception', () => {
			const mid = onError.middleware();
			const next = () => {
				throw new Error('sth bad');
			};
			const action = {
				type: 'TEST',
			};
			expect(console.error).not.toHaveBeenCalled();
			mid(next)(action);
			expect(console.error).toHaveBeenCalled();
			const log = console.error.mock.calls[0][0];
			expect(log.message).toBe('sth bad');
			const dispatched = store.dispatch.mock.calls[0][0];
			expect(dispatched.type).toBe('POST');
			expect(dispatched.body).toContain('sth bad');
		});
		it('should add action in singleton', () => {
			const mid = onError.middleware();
			const next = jest.fn();
			const action = {
				type: 'FOO',
				'sensitive': true,
			};
			mid(next)(action);
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(1);
			expect(info.actions[0]).toBe('FOO');
		});
		it('should keep last 20 actions', () => {
			// eslint-disable-next-line no-plusplus
			const mid = onError.middleware();
			const next = jest.fn();
			for (let index = 0; index < 30; index++) {
				mid(next)({ type: `FOO ${index}`, password: 'secret' });
			}
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(20);
			expect(info.actions[0]).toBe('FOO 10');
		});
	});
	describe('createObjectURL', () => {
		it('should use window.URL.createObjectURL', () => {
			window.URL.createObjectURL = jest.fn();
			const error = new Error('sth bad 2');
			onError.createObjectURL(error);
			expect(window.URL.createObjectURL).toHaveBeenCalled();
			const blob = window.URL.createObjectURL.mock.calls[0][0];

			expect(blob.name).toBe('report.json');
			expect(blob.type).toBe('application/json');
			expect(blob.size).toBeGreaterThan(0);
		});
	});
	describe('revokeObjectURL', () => {
		it('should use window.URL.revokeObjectURL', () => {
			const url = {};
			window.URL.revokeObjectURL = jest.fn();
			onError.revokeObjectURL(url);
			expect(window.URL.revokeObjectURL).toHaveBeenCalledWith(url);
		});
	});
	describe('sentry', () => {
		it('bootstrap should support SENTRY_DSN key', () => {
			expect(init).not.toHaveBeenCalled();
			expect(window.removeEventListener).not.toHaveBeenCalled();
			config = {
				onError: {
					SENTRY_DSN: 'http://app@sentry.io/project',
				},
			};
			onError.bootstrap(config, store);
			expect(init).toHaveBeenCalledWith({ dsn: config.onError.SENTRY_DSN });
			const onJSError = window.addEventListener.mock.calls[0][1];
			expect(window.removeEventListener).toHaveBeenCalledWith('error', onJSError);
		});
		it('should support init throw', () => {
			config = {
				onError: {
					SENTRY_DSN: 'fail',
				},
			};
			onError.bootstrap(config, store);
			// then we expect a console.error and addEventListener been called
			expect(console.error).toHaveBeenCalled();
			expect(window.addEventListener).toHaveBeenCalledTimes(2);
		});
		it('middleware should init on settings', () => {
			onError.middleware()(jest.fn())({
				type: CONSTANTS.REQUEST_OK,
				settings: {
					env: {
						SENTRY_DSN: 'foo',
					},
				},
			});
			expect(init).toHaveBeenCalledWith({ dsn: 'foo' });
		});
		it('report should call captureException', () => {
			config = {
				onError: {
					SENTRY_DSN: 'http://app@sentry.io/project',
				},
			};
			onError.bootstrap(config, store);
			const error = new Error('foo');
			onError.report(error);
			expect(captureException).toHaveBeenCalledWith(error);
		});
		it('report should call withScope with options.tags', () => {
			config = {
				onError: {
					SENTRY_DSN: 'http://app@sentry.io/project',
				},
			};
			onError.bootstrap(config, store);
			const options = { tags: [{ key: 'tag', value: 'value' }]};
			const error = new Error('foo');
			const setTag = jest.fn();
			onError.report(error, options);
			expect(withScope).toHaveBeenCalled();
			const onScope = withScope.mock.calls[0][0];
			onScope({ setTag });
			expect(setTag).toHaveBeenCalledWith('tag', 'value');
		});
	});
});
