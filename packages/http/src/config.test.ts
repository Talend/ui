import {
	HTTP,
	HTTP_RESPONSE_INTERCEPTORS,
	addHttpResponseInterceptor,
	getDefaultConfig,
	removeHttpResponseInterceptor,
	setDefaultConfig,
	setDefaultLanguage,
	applyInterceptors,
} from './config';
import { HTTP_METHODS, HTTP_STATUS } from './http.constants';
import { TalendRequest } from './http.types';

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
		it('should apply all interceptors', async () => {
			const request: TalendRequest = {
				url: '/api/v1/data',
				method: HTTP_METHODS.GET,
			};
			const response = {
				ok: true,
				status: HTTP_STATUS.OK,
				body: [1, 2, 3],
			} as unknown as Response;

			const interceptor1 = jest
				.fn()
				.mockImplementation((_, resp) => Promise.resolve({ ...resp, body: [...resp.body, 4] }));
			addHttpResponseInterceptor('interceptor-1', interceptor1);

			const interceptor2 = jest.fn().mockImplementation((req, resp) =>
				Promise.resolve({
					...resp,
					body: { interceptor: `interceptor2-${req.method}`, original: resp.body },
				}),
			);
			addHttpResponseInterceptor('interceptor-2', interceptor2);

			const interceptedResponse = await applyInterceptors(request, response);

			expect(interceptor1).toHaveBeenCalledWith(request, response);
			expect(interceptor2).toHaveBeenLastCalledWith(
				request,
				expect.objectContaining({ body: [1, 2, 3, 4] }),
			);
			expect(interceptedResponse).toEqual({
				...response,
				body: { interceptor: 'interceptor2-GET', original: [1, 2, 3, 4] },
			});
		});
		it('should return response if no interceptors', () => {
			const request: TalendRequest = {
				url: '/api/v1/data',
				method: HTTP_METHODS.GET,
			};
			const response = {
				ok: true,
				status: HTTP_STATUS.OK,
				body: [1, 2, 3],
			} as unknown as Response;

			expect(applyInterceptors(request, response)).resolves.toEqual(response);
		});
	});
});
