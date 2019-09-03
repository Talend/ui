import onError from '../src/onError';
import { store as mock } from '../src/mock';

describe('onError', () => {
	let store;
	let state;
	let config;
	beforeEach(() => {
		state = { foo: { ok: 'should be kept', password: 'secret' } };
		store = mock.store(state);
		store.dispatch = jest.fn();
		config = {
			settingsURL: '/foo/bar.json',
			onError: {
				reportURL: '/api/v1/report',
				sensibleKeys: [],
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
	});
	describe('report', () => {
		it('should dispatch http action', () => {
			expect(store.dispatch).not.toHaveBeenCalled();
			const error = new Error('my');
			onError.report(error);
			expect(store.dispatch).toHaveBeenCalled();
			const action = store.dispatch.mock.calls[0][0];
			expect(action.type).toBe('POST');
			expect(action.url).toBe(config.onError.reportURL);
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
