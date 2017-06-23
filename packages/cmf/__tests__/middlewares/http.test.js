import {
	DEFAULT_HTTP_HEADERS,
	isHTTPRequest,
	getMethod,
	httpRequest,
	httpError,
	httpResponse,
	mergeOptions,
	onResponse,
	onError,
	httpMiddleware,
	HTTPError,
	status,
	handleResponse,
} from '../../src/middlewares/http/middleware';
import http from '../../src/middlewares/http';
import {
	HTTP_METHODS,
	HTTP_REQUEST,
	HTTP_RESPONSE,
	HTTP_ERRORS,
} from '../../src/middlewares/http/constants';

describe('CMF http middleware', () => {
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
	it('should httpRequest create action', () => {
		const url = '//foo/bar';
		const config = { method: 'GET' };
		const action = httpRequest(url, config);
		expect(action.type).toBe(HTTP_REQUEST);
		expect(action.url).toBe(url);
		expect(action.config).toBe(config);
	});
	it('should httpError create action', () => {
		const error = { message: 'something goes wrong' };
		const action = httpError(error);
		expect(action.type).toBe(HTTP_ERRORS);
		expect(action.error).toBe(error);
	});
	it('should httpResponse create action', () => {
		const response = { id: '2312321323' };
		const action = httpResponse(response);
		expect(action.type).toBe(HTTP_RESPONSE);
		expect(action.data).toBe(response);
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

	it('should onResponse create action', () => {
		const response = { msg: 'you have a response' };
		const action = {
			type: 'DONT_CARE',
			onResponse: 'CALL_ME_BACK',
		};
		const newAction = onResponse(action, response);
		expect(newAction.type).toBe('CALL_ME_BACK');
		expect(newAction.response).toBe(response);

		action.onResponse = jest.fn();
		onResponse(action, response);
		expect(action.onResponse.mock.calls.length).toBe(1);
		expect(action.onResponse.mock.calls[0][0]).toBe(response);
	});
	it('should onError create action', () => {
		const error = { message: 'something goes wrong' };
		const action = {
			type: 'DONT_CARE',
			onError: 'CALL_ME_BACK',
		};
		const newAction = onError(action, error);
		expect(newAction.type).toBe('CALL_ME_BACK');
		expect(newAction.error).toBe(error);

		action.onError = jest.fn();
		onError(action, error);
		expect(action.onError.mock.calls.length).toBe(1);
		expect(action.onError.mock.calls[0][0]).toBe(error);
	});
	it('should httpMiddleware return function', () => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const middleware = httpMiddleware(store)(next);
		expect(typeof middleware).toBe('function');
	});

	it('should httpMiddleware handle response promise', (done) => {
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
				status: 200,
				json,
			},
		};
		const middleware = httpMiddleware(store)(next);
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
				status: 200,
				json,
			},
			url: 'foo',
		};

		expect(global.fetch.mock.calls[0]).toEqual([
			'foo',
			config,
		]);

		newState.then(() => {
			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
	});

	it('should httpMiddleware with formData', (done) => {
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
				status: 200,
				json,
			},
		};
		const middleware = httpMiddleware(store)(next);
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
				status: 200,
				json,
			},
			url: 'foo',
		};

		expect(global.fetch.mock.calls[1]).toEqual([
			'foo',
			config,
		]);

		newState.then(() => {
			expect(next.mock.calls.length).toBe(1);
			const newAction = next.mock.calls[0][0];
			expect(newAction.response.foo).toBe('bar');
			done();
		});
	});

	it('should httpMiddleware handle response promise with error', (done) => {
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
				status: 500,
				statusText: 'Internal Server Error',
				type: 'basic',
				url: '//foo/bar',
				clone: () => ({
					text: () => new Promise(resolve => resolve('{"foo":"bar"}')),
				}),
			},
		};
		const middleware = httpMiddleware(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		newState.then(() => {
			expect(store.dispatch.mock.calls.length).toBe(3);
			const errorHTTPAction = store.dispatch.mock.calls[2][0];
			expect(errorHTTPAction.type).toBe('@@HTTP/ERRORS');
			expect(errorHTTPAction.error.stack.status).toBe(500);
			expect(errorHTTPAction.error.stack.statusText).toBe('Internal Server Error');
			expect(errorHTTPAction.error.stack.response).toBe('{"foo":"bar"}');
			expect(errorHTTPAction.error.stack.messageObject).toEqual({
				foo: 'bar',
			});
			done();
		});
	});

	it('should httpMiddleware handle response promise with error same if the body is not a JSON', (done) => {
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
				status: 500,
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
			expect(store.dispatch.mock.calls.length).toBe(3);
			const errorHTTPAction = store.dispatch.mock.calls[2][0];
			expect(errorHTTPAction.type).toBe('@@HTTP/ERRORS');
			expect(errorHTTPAction.error.stack.status).toBe(500);
			expect(errorHTTPAction.error.stack.statusText).toBe('Internal Server Error');
			expect(errorHTTPAction.error.stack.messageObject).toBe(undefined);
			expect(errorHTTPAction.error.stack.response).toBe('invalid json');
			done();
		}).catch(error => console.error(error));
	});

	it('should httpMiddleware handle callback onError', (done) => {
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
				status: 500,
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
			status: 500,
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
			status: 500,
		};
		return status(response).catch((err) => {
			expect(JSON.parse(JSON.stringify(err))).toMatchSnapshot();
		});
	});
	it('should resolve if status >= 200 & < 300', () => {
		const response = {
			status: 204,
		};
		return status(response).then((r) => {
			expect(r).toBe(response);
		});
	});
});

describe('json function', () => {
	it('should reject if no json function on response', () => {
		const response = {
			status: 502,
		};
		return handleResponse(response).catch((err) => {
			expect(JSON.parse(JSON.stringify(err))).toMatchSnapshot();
		});
	});
	it('should resolve if attr json is on response', () => {
		const response = {
			status: 200,
			json: () => new Promise(resolve => resolve({ foo: 'bar' })),
		};
		return handleResponse(response).then((r) => {
			expect(r).toMatchSnapshot();
		});
	});
	it('should resolve status 204 but without json function', () => {
		const response = {
			status: 204,
		};
		return handleResponse(response).then((r) => {
			expect(r).toMatchSnapshot();
		});
	});
});
