import onError from '../src/onError';
import { store as mock } from '../src/mock';

window.addEventListener = jest.fn();
window.removeEventListener = jest.fn();

function activateSentry() {
	window.Sentry = {
		captureException: jest.fn(),
		configureScope: jest.fn(),
		init: jest.fn(c => {
			if (c.dsn === 'fail') {
				throw new Error('mock fail');
			}
		}),
		withScope: jest.fn(),
	};
}

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
		process.env.NODE_ENV = 'production';
		onError.bootstrap(config, store);
		jest.clearAllMocks();
	});

	afterEach(() => {
		delete process.env.NODE_ENV;
		delete window.Sentry;
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
				sensitive: true,
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
		it('report should call captureException', () => {
			config = {
				onError: {},
			};
			activateSentry();
			onError.bootstrap(config, store);
			const error = new Error('foo');
			onError.report(error);
			expect(window.Sentry.captureException).toHaveBeenCalledWith(error);
		});

		it('report should call withScope with options.tags', () => {
			config = {
				onError: {},
			};
			activateSentry();
			onError.bootstrap(config, store);
			const options = { tags: [{ key: 'tag', value: 'value' }] };
			const error = new Error('foo');
			const setTag = jest.fn();
			onError.report(error, options);
			expect(window.Sentry.withScope).toHaveBeenCalled();
			const onScope = window.Sentry.withScope.mock.calls[0][0];
			onScope({ setTag });
			expect(setTag).toHaveBeenCalledWith('tag', 'value');
		});
	});
});
