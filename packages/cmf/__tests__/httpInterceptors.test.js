import { vi } from 'vitest';
import interceptors from '../src/httpInterceptors';
/* eslint-disable no-underscore-dangle */

describe('interceptors', () => {
	let interceptor;
	beforeEach(() => {
		interceptor = {
			request: vi.fn(config => Object.assign({ foo: 'foo' }, config)),
			response: vi.fn(resp => Object.assign({ bar: 'bar' }, resp)),
		};
		interceptors.push(interceptor);
	});
	afterEach(() => {
		interceptors._clear();
	});

	it('should onRequest call interceptors every request', () => {
		return interceptors.onRequest({}).then(config => {
			expect(config.foo).toBe('foo');
		});
	});
	it('should onResponse in interceptors', () => {
		return interceptors.onResponse({}).then(response => {
			expect(response.bar).toBe('bar');
		});
	});
	it('should interceptor requestError be called if JS Error has been thrown', () => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			request: () => {
				throw error;
			},
			requestError: vi.fn(e => e),
		};
		interceptors.push(failInterceptor);
		return interceptors.onRequest({}).finally(() => {
			expect(failInterceptor.requestError).toHaveBeenCalledWith(error);
		});
	});
	it('should interceptor requestError be called if interceptor.request promise rejected', () => {
		const msg = 'reject in interceptor';
		const failInterceptor = {
			request: () =>
				new Promise((resolve, reject) => {
					return reject(msg);
				}),
			requestError: vi.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		return interceptors.onRequest({}).then(() => {
			expect(failInterceptor.requestError).toHaveBeenCalledWith(msg);
		});
	});
	it('should interceptor response be called onResponse', () => {
		const res = { data: 'foo' };
		return interceptors.onResponse(res).then(response => {
			expect(interceptor.response).toHaveBeenCalledWith(res);
			expect(response.bar).toBe('bar');
			expect(response.data).toBe('foo');
		});
	});
	it('should interceptor responseError be called if JS Error has been thrown', () => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			response: () => {
				throw error;
			},
			responseError: vi.fn(e => e),
		};
		interceptors.push(failInterceptor);
		return interceptors.onResponse({}).finally(() => {
			expect(failInterceptor.responseError).toHaveBeenCalledWith(error);
		});
	});
	it('should interceptor responseError be called if response reject', () => {
		const msg = 'reject in interceptor response';
		const failInterceptor = {
			response: () => new Promise((resolve, reject) => reject(msg)),
			responseError: vi.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		return interceptors.onResponse({}).then(() => {
			expect(failInterceptor.responseError).toHaveBeenCalledWith(msg);
		});
	});
});
