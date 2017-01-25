import http from '../../src/actions/http';
import { HTTP_METHODS } from '../../src/middlewares/http/constants';

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
});
