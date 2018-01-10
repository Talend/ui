import http from '../../src/middlewares/http';

import {
	DEFAULT_HTTP_HEADERS,
	isHTTPRequest,
	getMethod,
	mergeOptions,
	httpMiddleware,
	HTTPError,
	status,
	handleResponse,
} from '../../src/middlewares/http/middleware';

import {
	HTTP_METHODS,
	ACTION_TYPE_HTTP_ERRORS,
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
		expect(options.headers).toEqual(DEFAULT_HTTP_HEADERS);
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
		expect(options.headers).toEqual(DEFAULT_HTTP_HEADERS);
		expect(options.credentials).toBe('omit');
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

		expect(global.fetch.mock.calls[0]).toEqual(['foo', config]);

		newState.then(() => {
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

		expect(global.fetch.mock.calls[0]).toEqual(['foo', config]);

		newState.then(() => {
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

	it('should dispatch an action defines in onError', done => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			type: HTTP_METHODS.POST,
			body: { label: 'great test' },
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CUSTOM_ACTION',
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
		const middleware = httpMiddleware(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		newState.then(() => {
			expect(store.dispatch.mock.calls.length).toBe(4);
			const errorTextAction = store.dispatch.mock.calls[2][0];
			expect(errorTextAction.type).toBe('CUSTOM_ACTION');
			const errorGlobalAction = store.dispatch.mock.calls[3][0];
			expect(errorGlobalAction.type).toBe(ACTION_TYPE_HTTP_ERRORS);
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
		const newState = middleware(action);

		// then

		expect(global.fetch.mock.calls[0][0]).toEqual('foo');
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('body', expectedBody);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('credentials', expectedCredentials);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('headers.Accept', expectedAccept);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty(
			'headers.Content-Type',
			expectedContentType,
		);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('headers.headerKey', expectedCSRFKeyValue);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('method', expectedMethod);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onError', expectedOnError);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onResponse', expectedOnResponse);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onSend', expectedOnSend);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('url', expectedurl);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.ok', true);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.status', HTTP_STATUS.OK);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.json', json);

		newState.then(() => {
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
		const newState = middleware(action);

		// then

		expect(global.fetch.mock.calls[0][0]).toEqual('foo');
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('body', expectedBody);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('credentials', expectedCredentials);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('headers.Accept', expectedAccept);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty(
			'headers.Content-Type',
			expectedContentType,
		);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty(
			'headers.X-CSRF-Token',
			expectedCSRFKeyValue,
		);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('method', expectedMethod);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onError', expectedOnError);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onResponse', expectedOnResponse);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('onSend', expectedOnSend);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('url', expectedurl);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.ok', true);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.status', HTTP_STATUS.OK);
		expect(global.fetch.mock.calls[0][1]).toHaveProperty('response.json', json);

		newState.then(() => {
			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
	});
});
