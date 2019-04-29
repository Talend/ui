import { interceptors as cmfInterceptors } from '../src';
import interceptors from '../src/interceptors';
/* eslint-disable no-underscore-dangle */

describe('interceptors', () => {
	it('should be available at cmf root level', () => {
		expect(interceptors).toBe(cmfInterceptors);
	});

	it('should push interceptor in interceptors', done => {
		const interceptor = {
			request: jest.fn(config => Object.assign({ foo: 'foo' }, config)),
		};
		interceptors.push(interceptor);
		interceptors.onRequest({}).then(config => {
			expect(config.foo).toBe('foo');
			interceptors._clear();
			done();
		});
	});
});
