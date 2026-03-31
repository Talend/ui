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

	it('should onRequest call interceptors every request', async () => {
		const config = await interceptors.onRequest({});
		expect(config.foo).toBe('foo');
	});
	it('should onResponse in interceptors', async () => {
		const response = await interceptors.onResponse({});
		expect(response.bar).toBe('bar');
	});
	it('should interceptor requestError be called if JS Error has been thrown', async () => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			request: () => {
				throw error;
			},
			requestError: vi.fn(e => e),
		};
		interceptors.push(failInterceptor);
		await interceptors.onRequest({}).finally(() => {});
		expect(failInterceptor.requestError).toHaveBeenCalledWith(error);
	});
	it('should interceptor requestError be called if interceptor.request promise rejected', async () => {
		const msg = 'reject in interceptor';
		const failInterceptor = {
			request: () =>
				new Promise((resolve, reject) => {
					return reject(msg);
				}),
			requestError: vi.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		await interceptors.onRequest({});
		expect(failInterceptor.requestError).toHaveBeenCalledWith(msg);
	});
	it('should interceptor response be called onResponse', async () => {
		const res = { data: 'foo' };
		const response = await interceptors.onResponse(res);
		expect(interceptor.response).toHaveBeenCalledWith(res);
		expect(response.bar).toBe('bar');
		expect(response.data).toBe('foo');
	});
	it('should interceptor responseError be called if JS Error has been thrown', async () => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			response: () => {
				throw error;
			},
			responseError: vi.fn(e => e),
		};
		interceptors.push(failInterceptor);
		await interceptors.onResponse({}).finally(() => {});
		expect(failInterceptor.responseError).toHaveBeenCalledWith(error);
	});
	it('should interceptor responseError be called if response reject', async () => {
		const msg = 'reject in interceptor response';
		const failInterceptor = {
			response: () => new Promise((resolve, reject) => reject(msg)),
			responseError: vi.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		await interceptors.onResponse({});
		expect(failInterceptor.responseError).toHaveBeenCalledWith(msg);
	});
});
