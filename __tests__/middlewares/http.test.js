import {
	DEFAULT_HTTP_HEADERS,
	isHTTPRequest,
	getMethod,
	httpRequest,
	httpErrors,
	httpResponse,
	mergeOptions,
	onResponse,
	onError,
	httpMiddleware,
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
	it('should httpErrors create action', () => {
		const error = { msg: 'something goes wrong' };
		const action = httpErrors(error);
		expect(action.type).toBe(HTTP_ERRORS);
		expect(action.errors).toBe(error);
	});
	it('should httpResponse create action', () => {
		const response = { id: '2312321323' };
		const action = httpResponse(response);
		expect(action.type).toBe(HTTP_RESPONSE);
		expect(action.data).toBe(response);
	});
	it('should mergeOptions create action', () => {
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
		const errors = { msg: 'something goes wrong' };
		const action = {
			type: 'DONT_CARE',
			onError: 'CALL_ME_BACK',
		};
		const newAction = onError(action, errors);
		expect(newAction.type).toBe('CALL_ME_BACK');
		expect(newAction.errors).toBe(errors);

		action.onError = jest.fn();
		onError(action, errors);
		expect(action.onError.mock.calls.length).toBe(1);
		expect(action.onError.mock.calls[0][0]).toBe(errors);
	});
	it('should httpMiddleware return function', () => {
		const store = {
			dispatch: jest.fn(),
		};
		const next = jest.fn();
		const action = {
			type: HTTP_METHODS.POST,
			body: { label: 'great test'},
			onSend: 'CALL_ME_BACK on send',
			onResponse: 'CALL_ME_BACK on response',
			onError: 'CALL_ME_BACK on error',
		};
		const middleware = httpMiddleware(store)(next);
		expect(typeof middleware).toBe('function');
		const newState = middleware(action);
		expect(fetch.mock.calls.length).toBe(1);
	});
});
