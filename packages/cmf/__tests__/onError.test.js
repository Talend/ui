import onError from '../src/onError';
import { store as mock } from '../src/mock';

/**
	report,
	getErrors,
	middleware,
	createObjectURL,
 */


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
		it('shoud fill internal values', () => {
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
			onError.report(new Error('my'));
			expect(store.dispatch).toHaveBeenCalled();
			const action = store.dispatch.mock.calls[0][0];
			expect(action.type).toBe('POST');
			expect(action.url).toBe(config.onError.reportURL);
		});
	});
});
