import onError from '../src/onError';
import { store as mock } from '../src/mock';

// eslint-disable-next-line
const EMAIL = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

describe('onError', () => {
	let store;
	let state;
	let config;
	beforeEach(() => {
		state = { foo: { ok: 'should be kept', password: 'secret' } };
		store = mock.store(state);
		store.dispatch = jest.fn();
		config = {
			settingsURL: '/settings',
			onError: {
				reportURL: '/api/v1/report',
				sensibleKeys: [EMAIL],
			},
		};
		onError.bootstrap(config, store);
		jest.resetAllMocks();
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
			expect(info.uiState).toMatchObject({
				foo: { ok: 'should be kept' },
			});
			expect(info.uiState.foo.password).not.toBe('secret');
			expect(info.uiState.foo.password.length).toBe(6);
		});
	});
	describe('addAction', () => {
		it('should add action in singleton', () => {
			onError.addAction({ type: 'FOO', password: 'secret' });
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(1);
			expect(info.actions[0]).toMatchObject({
				type: 'FOO',
				password: expect.anything(),
			});
			expect(info.actions[0].password).not.toBe('secret');
		});
		it('should keep last 20 actions', () => {
			// eslint-disable-next-line no-plusplus
			for (let index = 0; index < 30; index++) {
				onError.addAction({ type: `FOO ${index}`, password: 'secret' });
			}
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(20);
			expect(info.actions[0]).toMatchObject({
				type: 'FOO 10',
				password: expect.anything(),
			});
		});
		it('should delete props of DID_MOUNT_SAGA_START', () => {
			onError.addAction({ type: 'DID_MOUNT_SAGA_START', props: {} });
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(1);
			expect(info.actions[0].props).toBeUndefined();
		});
		it('should delete settings of REACT_CMF.REQUEST_SETTINGS_OK', () => {
			onError.addAction({ type: 'REACT_CMF.REQUEST_SETTINGS_OK', settings: {} });
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(1);
			expect(info.actions[0].settings).toBeUndefined();
		});
		it('should delete settings of REACT_CMF.REQUEST_SETTINGS_OK', () => {
			onError.addAction({ type: 'FOO', url: config.settingsURL, response: {} });
			const info = onError.getReportInfo(new Error('my'));
			expect(info.actions.length).toBe(1);
			expect(info.actions[0].response).toBeUndefined();
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
				onError: {
					sensibleKeys: [],
				},
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
	describe('getErrors', () => {
		it('should return reported errors', () => {
			const error = new Error('my');
			onError.report(error);
			const errors = onError.getErrors();
			expect(errors.length).toBe(1);
			expect(errors[0].error.name).toBe(error.name);
			expect(errors[0].error.message).toBe(error.message);
			expect(errors[0].reported).toBe(false);
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
			expect(() => mid(next)(action)).toThrow();
			expect(onError.getErrors()[0].error.message).toBe('sth bad');
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
});
