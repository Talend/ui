import React from 'react';
import { mount } from 'enzyme';
import onError from '../src/onError';
import { store as mock } from '../src/mock';

// eslint-disable-next-line
const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

window.addEventListener = jest.fn();

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
			settingsURL: '/settings',
			onError: {
				reportURL: '/api/v1/report',
			},
		};
		onError.bootstrap(config, store);
		jest.resetAllMocks();
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
				settingsURL: '/foo/bar.json',
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
});
