import http from '../../src/middlewares/http';

import {
	DEFAULT_HTTP_HEADERS,
	isHTTPRequest,
	getMethod,
	mergeOptions,
	mergeConfiguredHeader,
	httpMiddleware,
	HTTPError,
	status,
	handleResponse,
} from '../../src/middlewares/http/middleware';
import interceptors from '../../src/httpInterceptors';

import {
	HTTP_METHODS,
	HTTP_STATUS,
} from '../../src/middlewares/http/constants';

describe('CMF http middleware', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should be available from middlewares/http', () => {
		expect(http).toBe(httpMiddleware);
	});
	it('should DEFAULT_HTTP_HEADERS be json', () => {
		expect(DEFAULT_HTTP_HEADERS.Accept).toBe('application/json');
		expect(DEFAULT_HTTP_HEADERS['Content-Type']).toBe('application/json');
	});
	it('should isHTTPRequest check action type', () => {
		const action = {
			type: HTTP_METHODS.POST,
		};
		expect(isHTTPRequest(action)).toBe(true);
		action.type = 'POST';
		expect(isHTTPRequest(action)).toBe(true);
		expect(HTTP_METHODS.POST).toBe('POST');
		action.type = 'HTTP/POST';
		expect(isHTTPRequest(action)).toBe(false);
	});
	it('should isHTTPRequest check action.cmf.http', () => {
		const action = {
			type: 'WHAT_EVER_YOU_WANT',
			cmf: {
				http: {},
			},
		};
		expect(isHTTPRequest(action)).toBe(true);
	});
	it('should getMethod find HTTP method in action type', () => {
		expect(getMethod({ type: HTTP_METHODS.POST })).toBe('POST');
		expect(getMethod({ type: HTTP_METHODS.OPTIONS })).toBe('OPTIONS');
		expect(getMethod({ type: HTTP_METHODS.GET })).toBe('GET');
		expect(getMethod({ type: HTTP_METHODS.HEAD })).toBe('HEAD');
		expect(getMethod({ type: HTTP_METHODS.PUT })).toBe('PUT');
		expect(getMethod({ type: HTTP_METHODS.DELETE })).toBe('DELETE');
		expect(getMethod({ type: HTTP_METHODS.TRACE })).toBe('TRACE');
		expect(getMethod({ type: HTTP_METHODS.CONNECT })).toBe('CONNECT');
	});

	it('should mergeOptions create action with default headers/credentials', () => {
		const action = {
			type: HTTP_METHODS.POST,
			extra: 'hello world',
			body: { label: 'new label' },
		};
		const options = mergeOptions(action);
		expect(options.type).toBe(undefined);
		expect(options.method).toBe('POST');
		expect(options.extra).toBe('hello world');
		expect(options.body).toBe('{"label":"new label"}');
		expect(options.credentials).toBe('same-origin');
	});

	it('should mergeOptions create action with the specify credential', () => {
		const action = {
			type: HTTP_METHODS.POST,
			extra: 'hello world',
			body: { label: 'new label' },
			credentials: 'omit',
		};
		const options = mergeOptions(action);
		expect(options.type).toBe(undefined);
		expect(options.method).toBe('POST');
		expect(options.extra).toBe('hello world');
		expect(options.body).toBe('{"label":"new label"}');
		expect(options.credentials).toBe('omit');
	});

	it('should merged additional headers to current one', () => {
		const httpConfig = {
			headers: {
				'Accept-Language': 'fr-FR',
			}
		};
		const defaultOptions = { url: '/url1', headers: { Accept: 'application/json'} };
		const options = mergeConfiguredHeader(httpConfig)(defaultOptions);
		expect(options.url).toBe('/url1');
		expect(options.headers.Accept).toBe('application/json');
		expect(options.headers['Accept-Language']).toBe('fr-FR');
		expect(options.headers['Content-Type']).toBe('application/json');
	});

	it('should override config headers when giving action headers', () => {
		const httpConfig = {
			headers: {
				'Accept-Language': 'fr-FR',
			}
		};
		const defaultOptions = {
			url: '/url1',
			headers: { Accept: 'application/json', 'Accept-Language': 'en-US', }
		};
		const options = mergeConfiguredHeader(httpConfig)(defaultOptions);
		expect(options.url).toBe('/url1');
		expect(options.headers.Accept).toBe('application/json');
		expect(options.headers['Accept-Language']).toBe('en-US');
		expect(options.headers['Content-Type']).toBe('application/json');
	});

	it('should override default http header', () => {
		const httpConfig = {
			headers: {
				'Accept-Language': 'fr-FR',
			}
		};
		const actionOptions = {
			url: '/url1',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'a content type',
			}
		};
		const options = mergeConfiguredHeader(httpConfig)(actionOptions);
		expect(options.url).toBe('/url1');
		expect(options.headers.Accept).toBe('application/json');
		expect(options.headers['Accept-Language']).toBe('fr-FR');
		expect(options.headers['Content-Type']).toBe('a content type');
	});

	it('should remove content type when data is a FormData', () => {
		const httpConfig = {
			headers: {
				'Accept-Language': 'fr-FR',
			}
		};
		const actionOptions = {
			url: '/url1',
			body: new FormData(),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'a content type',
			}
		};
		const options = mergeConfiguredHeader(httpConfig)(actionOptions);
		expect(options.url).toBe('/url1');
		expect(options.headers.Accept).toBe('application/json');
		expect(options.headers['Accept-Language']).toBe('fr-FR');
		expect(options.headers['Content-Type']).toBeUndefined();
	});

	it('should httpMiddleware return function', () => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const middleware = httpMiddleware(store)(next);
		expect(typeof middleware).toBe('function');
	});

	it('return a promise when is given an action', done => {
		function json() {
			return new Promise(resolve => resolve({ foo: 'bar' }));
		}

		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			url: 'foo',
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CALL_ME_BACK on error',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
		};
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		const config = {
			body: '{"label":"great test"}',
			credentials: 'same-origin',
			headers: DEFAULT_HTTP_HEADERS,
			method: 'POST',
			onError: 'CALL_ME_BACK on error',
			onResponse: 'CALL_ME_BACK on response',
			onSend: 'CALL_ME_BACK on send',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
			url: 'foo',
		};

		newState.then(() => {
			expect(global.fetch.mock.calls[0]).toEqual(['foo', config]);
			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
	});

	it('pass FormData to the fetch function without tempering if given as action body', done => {
		function json() {
			return new Promise(resolve => resolve({ foo: 'bar' }));
		}

		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const formData = new FormData();
		const action = {
			url: 'foo',
			type: HTTP_METHODS.POST,
			body: formData,
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CALL_ME_BACK on error',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
		};
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		const config = {
			body: formData,
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
			},
			method: 'POST',
			onError: 'CALL_ME_BACK on error',
			onResponse: 'CALL_ME_BACK on response',
			onSend: 'CALL_ME_BACK on send',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
			url: 'foo',
		};

		newState.then(() => {
			expect(global.fetch.mock.calls[0]).toEqual(['foo', config]);
			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
	});

	it('should httpMiddleware handle response promise with error', done => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			response: {
				ok: false,
				status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
				statusText: 'Internal Server Error',
				type: 'basic',
				url: '//foo/bar',
				clone: () => ({
					text: () => new Promise(resolve => resolve('{"foo":"bar"}')),
				}),
			},
		};
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		newState.then(() => {
			expect(store.dispatch.mock.calls.length).toBe(3);
			const errorHTTPAction = store.dispatch.mock.calls[2][0];
			expect(errorHTTPAction.type).toBe('@@HTTP/ERRORS');
			expect(errorHTTPAction.error.stack.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
			expect(errorHTTPAction.error.stack.statusText).toBe('Internal Server Error');
			expect(errorHTTPAction.error.stack.response).toBe('{"foo":"bar"}');
			expect(errorHTTPAction.error.stack.messageObject).toEqual({
				foo: 'bar',
			});
			done();
		});
	});

	it('should httpMiddleware handle response promise with error same if the body is not a JSON', done => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			response: {
				ok: false,
				status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
				statusText: 'Internal Server Error',
				type: 'basic',
				url: '//foo/bar',
				clone: () => ({
					text: () => new Promise(resolve => resolve('invalid json')),
				}),
			},
		};
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		newState
			.then(() => {
				expect(store.dispatch.mock.calls.length).toBe(3);
				const errorHTTPAction = store.dispatch.mock.calls[2][0];
				expect(errorHTTPAction.type).toBe('@@HTTP/ERRORS');
				expect(errorHTTPAction.error.stack.status).toBe(HTTP_STATUS.INTERNAL_SERVER_ERROR);
				expect(errorHTTPAction.error.stack.statusText).toBe('Internal Server Error');
				expect(errorHTTPAction.error.stack.messageObject).toBe(undefined);
				expect(errorHTTPAction.error.stack.response).toBe('invalid json');
				done();
			})
			.catch(error => console.error(error));
	});

	it('should handle onError callback if this action property is a typeof function', done => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: () => ({
				type: 'CUSTOM_ACTION',
			}),
			response: {
				ok: false,
				status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
				statusText: 'Internal Server Error',
				type: 'basic',
				url: '//foo/bar',
				clone: () => ({
					text: () => new Promise(resolve => resolve('invalid json')),
				}),
			},
		};
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		newState.then(() => {
			expect(store.dispatch.mock.calls.length).toBe(3);
			const errorCallbackAction = store.dispatch.mock.calls[2][0];
			expect(errorCallbackAction.type).toBe('CUSTOM_ACTION');
			done();
		});
	});
});

describe('HTTPError', () => {
	it('should create a new instance', () => {
		const response = {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
			statusText: 'Internal Server Error',
			ok: false,
		};
		const err = new HTTPError(response);
		expect(JSON.parse(JSON.stringify(err))).toMatchSnapshot();
	});
});

describe('status function', () => {
	it('should reject if status >= 300', () => {
		const response = {
			status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
		};
		return status(response).catch(err => {
			expect(JSON.parse(JSON.stringify(err))).toMatchSnapshot();
		});
	});
	it('should resolve if status >= HTTP_STATUS.OK & < 300', () => {
		const response = {
			status: HTTP_STATUS.NO_CONTENT,
		};
		return status(response).then(r => {
			expect(r).toBe(response);
		});
	});
});

describe('json function', () => {
	it('should reject if no json function on response', () => {
		const response = {
			status: HTTP_STATUS.BAD_GATEWAY,
		};
		return handleResponse(response).catch(err => {
			expect(JSON.parse(JSON.stringify(err))).toMatchSnapshot();
		});
	});
	it('should resolve if attr json is on response', () => {
		const response = {
			status: HTTP_STATUS.OK,
			headers: {
				'content-type': 'application/json',
			},
			json: () => new Promise(resolve => resolve({ foo: 'bar' })),
		};
		return handleResponse(response).then(r => {
			expect(r).toMatchSnapshot();
		});
	});
	it('should resolve status HTTP_STATUS.NO_CONTENT but without json function', () => {
		const response = {
			status: HTTP_STATUS.NO_CONTENT,
		};
		return handleResponse(response).then(r => {
			expect(r).toMatchSnapshot();
		});
	});
});

describe('httpMiddleware configuration', () => {
	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should use its parameter for CSRF handling if a security configuration is given', done => {
		// given
		function json() {
			return new Promise(resolve => resolve({ foo: 'bar' }));
		}
		const httpDefaultConfig = {
			security: {
				CSRFTokenCookieKey: 'cookieKey',
				CSRFTokenHeaderKey: 'headerKey',
			},
		};

		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			url: 'foo',
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CALL_ME_BACK on error',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
		};

		const expectedBody = '{"label":"great test"}';
		const expectedCredentials = 'same-origin';
		const expectedMethod = 'POST';
		const expectedOnError = 'CALL_ME_BACK on error';
		const expectedOnResponse = 'CALL_ME_BACK on response';
		const expectedOnSend = 'CALL_ME_BACK on send';
		const expectedurl = 'foo';
		const expectedAccept = 'application/json';
		const expectedContentType = 'application/json';
		const expectedCSRFKeyValue = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

		document.cookie = `cookieKey=${expectedCSRFKeyValue}; dwf_section_edit=True;`;

		// when
		const middleware = httpMiddleware(httpDefaultConfig)(store)(next);
		expect(typeof middleware).toBe('function');
		middleware(action).then(() => {

			// then
			const firstCall = global.fetch.mock.calls[0];
			const firstCallSecondParam = firstCall[1];
			expect(firstCall[0]).toEqual('foo');
			expect(firstCallSecondParam).toHaveProperty('body', expectedBody);
			expect(firstCallSecondParam).toHaveProperty('credentials', expectedCredentials);
			expect(firstCallSecondParam).toHaveProperty('headers.Accept', expectedAccept);
			expect(firstCallSecondParam).toHaveProperty(
				'headers.Content-Type',
				expectedContentType,
			);
			expect(firstCallSecondParam).toHaveProperty('headers.headerKey', expectedCSRFKeyValue);
			expect(firstCallSecondParam).toHaveProperty('method', expectedMethod);
			expect(firstCallSecondParam).toHaveProperty('onError', expectedOnError);
			expect(firstCallSecondParam).toHaveProperty('onResponse', expectedOnResponse);
			expect(firstCallSecondParam).toHaveProperty('onSend', expectedOnSend);
			expect(firstCallSecondParam).toHaveProperty('url', expectedurl);
			expect(firstCallSecondParam).toHaveProperty('response.ok', true);
			expect(firstCallSecondParam).toHaveProperty('response.status', HTTP_STATUS.OK);
			expect(firstCallSecondParam).toHaveProperty('response.json', json);

			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
		document.cookie = `cookieKey=${expectedCSRFKeyValue}; dwf_section_edit=True; Max-Age=0`;
	});

	it('should use defaults CSRF handling parameter if no security configuration is given', done => {
		// given
		function json() {
			return new Promise(resolve => resolve({ foo: 'bar' }));
		}

		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			url: 'foo',
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CALL_ME_BACK on error',
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
			},
		};

		const expectedBody = '{"label":"great test"}';
		const expectedCredentials = 'same-origin';
		const expectedMethod = 'POST';
		const expectedOnError = 'CALL_ME_BACK on error';
		const expectedOnResponse = 'CALL_ME_BACK on response';
		const expectedOnSend = 'CALL_ME_BACK on send';
		const expectedurl = 'foo';
		const expectedAccept = 'application/json';
		const expectedContentType = 'application/json';
		const expectedCSRFKeyValue = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

		document.cookie = `csrfToken=${expectedCSRFKeyValue}; dwf_section_edit=True;`;

		// when
		const middleware = httpMiddleware()(store)(next);
		expect(typeof middleware).toBe('function');
		middleware(action).then(() => {
			// then
			const firstCall = global.fetch.mock.calls[0];
			const firstCallSecondParam = firstCall[1];
			expect(firstCall[0]).toEqual('foo');
			expect(firstCallSecondParam).toHaveProperty('body', expectedBody);
			expect(firstCallSecondParam).toHaveProperty('credentials', expectedCredentials);
			expect(firstCallSecondParam).toHaveProperty('headers.Accept', expectedAccept);
			expect(firstCallSecondParam).toHaveProperty(
				'headers.Content-Type',
				expectedContentType,
			);
			expect(firstCallSecondParam).toHaveProperty(
				'headers.X-CSRF-Token',
				expectedCSRFKeyValue,
			);
			expect(firstCallSecondParam).toHaveProperty('method', expectedMethod);
			expect(firstCallSecondParam).toHaveProperty('onError', expectedOnError);
			expect(firstCallSecondParam).toHaveProperty('onResponse', expectedOnResponse);
			expect(firstCallSecondParam).toHaveProperty('onSend', expectedOnSend);
			expect(firstCallSecondParam).toHaveProperty('url', expectedurl);
			expect(firstCallSecondParam).toHaveProperty('response.ok', true);
			expect(firstCallSecondParam).toHaveProperty('response.status', HTTP_STATUS.OK);
			expect(firstCallSecondParam).toHaveProperty('response.json', json);

			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			document.cookie = '';
			done();
		});
	});
	it('should call interceptor at every levels', done => {
		// given
		const response = { foo: 'bar' };
		function json() {
			return new Promise(resolve => resolve(response));
		}

		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			url: 'foo',
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			response: {
				ok: true,
				status: HTTP_STATUS.OK,
				json,
				headers: {},
			},
		};
		const interceptor = {
			request: jest.fn(config => config),
			response: jest.fn(r => r),
		};
		interceptors.push(interceptor);
		// when
		const middleware = httpMiddleware()(store)(next);
		const result = middleware(action);

		// then
		result.then(() => {
			expect(interceptor.request).toHaveBeenCalled();
			const augmentedConfig = interceptor.request.mock.calls[0][0];
			expect(augmentedConfig.url).toBe(action.url);
			expect(interceptor.response).toHaveBeenCalledWith({ data: response, headers: {}});
			// eslint-disable-next-line no-underscore-dangle
			interceptors._clear();
			done();
		});
	});
});
