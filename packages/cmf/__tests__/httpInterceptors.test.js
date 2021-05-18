import { interceptors } from '@talend/http';
/* eslint-disable no-underscore-dangle */

describe('interceptors', () => {
	let interceptor;
	beforeEach(() => {
		interceptor = {
			request: jest.fn(config => Object.assign({ foo: 'foo' }, config)),
			response: jest.fn(resp => Object.assign({ bar: 'bar' }, resp)),
		};
		interceptors.push(interceptor);
	});
	afterEach(() => {
		interceptors._clear();
	});

	it('should onRequest call interceptors every request', done => {
		interceptors.onRequest({}).then(config => {
			expect(config.foo).toBe('foo');
			done();
		});
	});
	it('should onResponse in interceptors', done => {
		interceptors.onResponse({}).then(response => {
			expect(response.bar).toBe('bar');
			done();
		});
	});
	it('should interceptor requestError be called if JS Error has been thrown', done => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			request: () => {
				throw error;
			},
			requestError: jest.fn(e => e),
		};
		interceptors.push(failInterceptor);
		interceptors.onRequest({}).finally(() => {
			expect(failInterceptor.requestError).toHaveBeenCalledWith(error);
			done();
		});
	});
	it('should interceptor requestError be called if interceptor.request promise rejected', done => {
		const msg = 'reject in interceptor';
		const failInterceptor = {
			request: () =>
				new Promise((resolve, reject) => {
					return reject(msg);
				}),
			requestError: jest.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		interceptors.onRequest({}).then(() => {
			expect(failInterceptor.requestError).toHaveBeenCalledWith(msg);
			done();
		});
	});
	it('should interceptor response be called onResponse', done => {
		const res = { data: 'foo' };
		interceptors.onResponse(res).then(response => {
			expect(interceptor.response).toHaveBeenCalledWith(res);
			expect(response.bar).toBe('bar');
			expect(response.data).toBe('foo');
			done();
		});
	});
	it('should interceptor responseError be called if JS Error has been thrown', done => {
		const error = new Error('ERROR fail in interceptor');
		const failInterceptor = {
			response: () => {
				throw error;
			},
			responseError: jest.fn(e => e),
		};
		interceptors.push(failInterceptor);
		interceptors.onResponse({}).finally(() => {
			expect(failInterceptor.responseError).toHaveBeenCalledWith(error);
			done();
		});
	});
	it('should interceptor responseError be called if response reject', done => {
		const msg = 'reject in interceptor response';
		const failInterceptor = {
			response: () => new Promise((resolve, reject) => reject(msg)),
			responseError: jest.fn((e, v) => v),
		};
		interceptors.push(failInterceptor);
		interceptors.onResponse({}).then(() => {
			expect(failInterceptor.responseError).toHaveBeenCalledWith(msg);
			done();
		});
	});
});
