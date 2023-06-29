import {
	HTTP,
	HTTP_RESPONSE_INTERCEPTORS,
	addHttpResponseInterceptor,
	getDefaultConfig,
	removeHttpResponseInterceptor,
	setDefaultConfig,
	setDefaultLanguage,
} from './config';

describe('Configuration service', () => {
	describe('setDefaultLanguage', () => {
		beforeEach(() => {
			HTTP.defaultConfig = null;
		});

		afterEach(() => {
			HTTP.defaultConfig = null;
		});

		it('should not redefine the Accept Language if no defaultConfig', () => {
			expect(() => {
				setDefaultLanguage('ja');
			}).toThrow('');
		});

		it('should redefine the Accept Language', () => {
			setDefaultConfig({
				headers: {},
			});
			setDefaultLanguage('ja');

			expect(getDefaultConfig()).toEqual({ headers: { 'Accept-Language': 'ja' } });
		});

		it('should throw error on second call', () => {
			setDefaultConfig({
				headers: {},
			});

			expect(() => {
				setDefaultConfig({
					headers: {},
				});
			}).toThrow(
				'ERROR: setDefaultConfig should not be called twice, if you wish to change the language use setDefaultLanguage api.',
			);
		});
	});

	describe('Http interceptors', () => {
		beforeEach(() => {
			for (const key in HTTP_RESPONSE_INTERCEPTORS) {
				if (HTTP_RESPONSE_INTERCEPTORS.hasOwnProperty(key)) {
					delete HTTP_RESPONSE_INTERCEPTORS[key];
				}
			}
		});

		it('should add a new interceptor when the name is not already used', () => {
			const interceptor = jest.fn();
			addHttpResponseInterceptor('myInterceptor', interceptor);
			expect(HTTP_RESPONSE_INTERCEPTORS).toEqual({
				myInterceptor: interceptor,
			});
		});

		it('should throw an error when the name is already used', () => {
			const interceptor1 = jest.fn();
			const interceptor2 = jest.fn();
			addHttpResponseInterceptor('myInterceptor', interceptor1);
			expect(() => addHttpResponseInterceptor('myInterceptor', interceptor2)).toThrowError(
				'Interceptor myInterceptor already exists',
			);
			expect(HTTP_RESPONSE_INTERCEPTORS).toEqual({
				myInterceptor: interceptor1,
			});
		});

		it('should remove an existing interceptor', () => {
			const interceptor1 = jest.fn();
			addHttpResponseInterceptor('myInterceptor', interceptor1);

			removeHttpResponseInterceptor('myInterceptor');
			expect(HTTP_RESPONSE_INTERCEPTORS).toEqual({});
		});

		it('should throw an error when the interceptor does not exist', () => {
			const interceptor2 = jest.fn();
			addHttpResponseInterceptor('myInterceptor2', interceptor2);
			expect(() => removeHttpResponseInterceptor('myInterceptor')).toThrowError(
				'Interceptor myInterceptor does not exist',
			);
			expect(HTTP_RESPONSE_INTERCEPTORS).toEqual({ myInterceptor2: interceptor2 });
		});
	});
});
