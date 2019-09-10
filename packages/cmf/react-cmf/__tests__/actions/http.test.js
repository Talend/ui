import http from '../../src/actions/http';
import {
	HTTP_METHODS,
	ACTION_TYPE_HTTP_REQUEST,
	ACTION_TYPE_HTTP_RESPONSE,
	ACTION_TYPE_HTTP_ERRORS,
} from '../../src/middlewares/http/constants';

describe('actions.http', () => {
	let url;
	let data;
	let config;
	beforeEach(() => {
		url = '/foo/bar';
		data = { foo: 'bar' };
		config = { Accept: 'json' };
	});
	it('should be a function', () => {
		expect(typeof http).toBe('function');
	});
	it('should has get / post / ... shortcut', () => {
		expect(typeof http.get).toBe('function');
		expect(typeof http.post).toBe('function');
		expect(typeof http.delete).toBe('function');
		expect(typeof http.patch).toBe('function');
		expect(typeof http.put).toBe('function');
		expect(typeof http.head).toBe('function');
	});
	it('should call create an action', () => {
		const action = http({
			method: 'POST',
			url,
			data,
			...config,
		});
		expect(action.type).toBe(HTTP_METHODS.POST);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
		expect(action.body).toBe(data);
	});
	it('should http.get return an action', () => {
		const action = http.get(url, config);
		expect(action.type).toBe(HTTP_METHODS.GET);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
	});
	it('should http.post return an action', () => {
		const action = http.post(url, data, config);
		expect(action.type).toBe(HTTP_METHODS.POST);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
		expect(action.body).toBe(data);
	});
	it('should http.delete return an action', () => {
		const action = http.delete(url, config);
		expect(action.type).toBe(HTTP_METHODS.DELETE);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
	});
	it('should http.patch return an action', () => {
		const action = http.patch(url, data, config);
		expect(action.type).toBe(HTTP_METHODS.PATCH);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
		expect(action.body).toBe(data);
	});
	it('should http.put return an action', () => {
		const action = http.put(url, data, config);
		expect(action.type).toBe(HTTP_METHODS.PUT);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
		expect(action.body).toBe(data);
	});
	it('should http.head return an action', () => {
		const action = http.head(url, config);
		expect(action.type).toBe(HTTP_METHODS.HEAD);
		expect(action.url).toBe(url);
		expect(action.Accept).toBe('json');
	});
	it('should httpRequest create action', () => {
		url = '//foo/bar';
		config = { method: 'GET' };
		const action = http.onRequest(url, config);
		expect(action.type).toBe(ACTION_TYPE_HTTP_REQUEST);
		expect(action.url).toBe(url);
		expect(action.config).toBe(config);
	});
	it('should httpError create action', () => {
		const error = { message: 'something goes wrong' };
		const action = http.onError(error);
		expect(action.type).toBe(ACTION_TYPE_HTTP_ERRORS);
		expect(action.error).toBe(error);
	});
	it('should httpResponse create action', () => {
		const response = { id: '2312321323' };
		const action = http.onResponse(response);
		expect(action.type).toBe(ACTION_TYPE_HTTP_RESPONSE);
		expect(action.data).toBe(response);
	});
	it('should onError create action', () => {
		const error = { message: 'something goes wrong' };
		const action = {
			type: 'DONT_CARE',
			onError: 'CALL_ME_BACK',
		};
		const newAction = http.onActionError(action, error);
		expect(newAction.type).toBe('CALL_ME_BACK');
		expect(newAction.error).toBe(error);

		action.onError = jest.fn();
		http.onActionError(action, error);
		expect(action.onError.mock.calls.length).toBe(1);
		expect(action.onError.mock.calls[0][0]).toBe(error);
	});

	it('should onResponse create action', () => {
		const response = { msg: 'you have a response' };
		const action = {
			type: 'DONT_CARE',
			onResponse: 'CALL_ME_BACK',
		};
		const headers = {
			'content-type': 'application/json'
		};
		const newAction = http.onActionResponse(action, response, headers);
		expect(newAction.type).toBe('CALL_ME_BACK');
		expect(newAction.response).toBe(response);
		expect(newAction.headers).toBe(headers);

		action.onResponse = jest.fn();
		http.onActionResponse(action, response, headers);
		expect(action.onResponse.mock.calls.length).toBe(1);
		expect(action.onResponse.mock.calls[0][0]).toBe(response);
		expect(action.onResponse.mock.calls[0][1]).toBe(headers);
	});
});
