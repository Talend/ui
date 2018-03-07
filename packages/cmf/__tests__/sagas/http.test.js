import { Headers, Response } from 'node-fetch';
import { call, put } from 'redux-saga/effects';
import {
	ACTION_TYPE_HTTP_ERRORS,
	HTTP_METHODS,
	HTTP_STATUS,
} from '../../src/middlewares/http/constants';

import http, {
	handleBody,
	handleError,
	handleHttpResponse,
	httpFetch,
	HTTPError,
	wrapFetch,
	httpGet,
	httpPost,
	httpPut,
} from '../../src/sagas/http';

const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('http.get', () => {
	it('should fetch /foo with a GET method', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};

		const gen = http.get('/foo', config);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.GET, undefined));
		expect(gen.next().done).toBe(true);
	});
});

describe('http.post', () => {
	it('should fetch /foo with a POST method', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};
		const payload = {
			bar: 42,
		};

		const gen = http.post('/foo', payload, config);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.POST, payload));
		expect(gen.next().done).toBe(true);
	});
});

describe('http.patch', () => {
	it('should fetch /foo with a PATCH method', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};
		const payload = {
			bar: 42,
		};

		const gen = http.patch('/foo', payload, config);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PATCH, payload));
		expect(gen.next().done).toBe(true);
	});
});

describe('http.put', () => {
	it('should fetch /foo with a PUT method', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};
		const payload = {
			bar: 42,
		};

		const gen = http.put('/foo', payload, config);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next().done).toBe(true);
	});
});

describe('http.delete', () => {
	it('should fetch /foo with a DELETE method', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};

		const gen = http.delete('/foo', config);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.DELETE, undefined));
		expect(gen.next().done).toBe(true);
	});
});

describe('handleBody', () => {
	it('should manage the body of the response like a json', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		handleBody(
			new Response('{"foo": 42}', {
				headers,
			}),
		).then(({ data, response }) => {
			expect(data).toEqual({
				foo: 42,
			});
			expect(response instanceof Response).toBe(true);
			done();
		});
	});

	it('should manage the body of the response like a text', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');

		handleBody(
			new Response('foo', {
				headers,
			}),
		).then(({ data, response }) => {
			expect(data).toBe('foo');
			expect(response instanceof Response).toBe(true);
			done();
		});
	});

	it('should manage the body of the response like a text by default', done => {
		handleBody(new Response('')).then(({ data, response }) => {
			expect(data).toBe('');
			expect(response instanceof Response).toBe(true);
			done();
		});
	});
});

describe('#handleHttpResponse', () => {
	it('should handle the response with 2xx code', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		handleHttpResponse(
			new Response('{"foo": 42}', {
				status: HTTP_STATUS.OK,
				headers,
			}),
		).then(({ data, response }) => {
			expect(data).toEqual({
				foo: 42,
			});
			expect(response instanceof Response).toBe(true);
			done();
		});
	});

	it('should handle the response with a code different of 2xx', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		handleHttpResponse(
			new Response('{"foo": 42}', {
				status: HTTP_STATUS.FORBIDDEN,
				headers,
			}),
		).catch(response => {
			expect(response instanceof Response).toBe(true);
			done();
		});
	});

	it('should handle the response with NO_CONTENT code', done => {
		handleHttpResponse(
			new Response('', {
				status: HTTP_STATUS.NO_CONTENT,
			}),
		).then(({ data, response }) => {
			expect(data).toBe('');
			expect(response instanceof Response).toBe(true);
			done();
		});
	});
});

describe('#handleError', () => {
	it('should manage the error', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		handleError(
			new Response('{"foo": 42}', {
				status: HTTP_STATUS.FORBIDDEN,
				statusText: 'Forbidden',
				headers,
			}),
		).then(error => {
			expect(error instanceof Error).toBe(true);
			expect(error.data).toEqual({
				foo: 42,
			});
			expect(error.response instanceof Response).toBe(true);
			done();
		});
	});
});

describe('#httpFetch', () => {
	it('should wrap the request with action', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};
		const payload = {
			bar: 42,
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);

		expect(
			gen.next({
				data: { ok: true },
			}).value,
		).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next().done).toBe(true);
	});

	it('should wrap the request and notify errors', () => {
		const url = '/foo';
		const config = {
			'Content-Type': 'application/json',
		};
		const payload = {
			bar: 42,
		};

		const httpError = new HTTPError({
			data: {
				message: 'Error occured',
			},
			response: {
				status: HTTP_STATUS.FORBIDDEN,
			},
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next(httpError).value).toEqual(
			put({
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.FORBIDDEN,
					},
				},
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});
});

describe('#httpFetch', () => {
	it('should fetch the request', done => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const config = {
			response: new Response('{"foo": 42}', {
				status: HTTP_STATUS.OK,
				headers,
			}),
		};
		const payload = {
			bar: 42,
		};

		httpFetch(url, config, HTTP_METHODS.GET, payload).then(body => {
			expect(body.data).toEqual({
				foo: 42,
			});
			expect(body.response instanceof Response).toBe(true);
			done();
		});

		expect(fetch).toHaveBeenCalledWith(url, {
			body: '{"bar":42}',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: HTTP_METHODS.GET,
			response: config.response,
		});
	});

	it('should fetch the request with a FormData', done => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const config = {
			response: new Response('{"foo": 42}', {
				status: HTTP_STATUS.OK,
				headers,
			}),
		};
		const payload = new FormData();

		httpFetch(url, config, HTTP_METHODS.GET, payload).then(body => {
			expect(body.data).toEqual({
				foo: 42,
			});
			expect(body.response instanceof Response).toBe(true);
			done();
		});

		expect(fetch).toHaveBeenCalledWith(url, {
			body: payload,
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
			},
			method: HTTP_METHODS.GET,
			response: config.response,
		});
	});

	it('should fail the request', done => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const config = {
			response: new Response('{"foo": 42}', {
				status: HTTP_STATUS.FORBIDDEN,
				headers,
			}),
		};
		const payload = {
			bar: 42,
		};

		httpFetch(url, config, HTTP_METHODS.GET, payload).then(body => {
			expect(body instanceof Error).toBe(true);
			expect(body.data).toEqual({
				foo: 42,
			});
			expect(body.response instanceof Response).toBe(true);
			done();
		});

		expect(fetch).toHaveBeenCalledWith(url, {
			body: '{"bar":42}',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: HTTP_METHODS.GET,
			response: config.response,
		});
	});
});

describe('#HTTPError', () => {
	it('should wrap an HTTP Error', () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const response = new Response('{"foo": 42}', {
			status: HTTP_STATUS.FORBIDDEN,
			headers,
		});

		const httpError = new HTTPError({
			data: { foo: 42 },
			response,
		});

		expect(httpError instanceof Error).toBe(true);
		expect(httpError.data).toEqual({
			foo: 42,
		});
		expect(httpError.response).toBe(response);
	});
});

describe('http module with instance created', () => {
	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		const url = '/url';
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, {}));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url, config);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, config));
	});

	it(`check that httpPost is called with an url, payload and empty config object 
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(call(httpPost, url, payload, {}));
	});

	it(`check that httpPost is called with an url, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(call(httpPost, url, payload, config));
	});

	it(`check that httpPut is called with an url, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload);
		// then
		expect(gen.next().value).toEqual(call(httpPut, url, payload, {}));
	});

	it(`check that httpPut is called with an url, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(call(httpPut, url, payload, config));
	});
});

describe('http module with instance created with no CSRF handling configuration', () => {
	beforeAll(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});
	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		const url = '/url';
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'TEST',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'TEST',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.get(url, config);
		// then
		const value = gen.next().value;
		expect(value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpPost is called with an url, payload and empty config object 
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPost, url, payload, expectedConfig),
		);
	});

	it(`check that httpPost is called with an url, payload and config object 
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPost, url, payload, expectedConfig),
		);
	});

	it(`check that httpPut is called with an url, payload and empty config object 
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const expectedConfig = {
			headers: {
				'X-CSRF-Token': CSRFToken,
			},
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, {});
		// then
		expect(gen.next().value).toEqual(
			call(httpPut, url, payload, expectedConfig),
		);
	});

	it(`check that httpPut is called with an url, payload and config object 
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				'X-CSRF-Token': CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPut, url, payload, expectedConfig),
		);
	});
});

describe('http module with instance created with CSRF handling configuration', () => {
	const defaultHttpConfiguration = {
		security: {
			CSRFTokenCookieKey: 'customCookieKey',
			CSRFTokenHeaderKey: 'customHeaderKey',
		},
	};

	beforeAll(() => {
		document.cookie = `${
			defaultHttpConfiguration.security.CSRFTokenCookieKey
		}=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		document.cookie = `${
			defaultHttpConfiguration.security.CSRFTokenCookieKey
		}=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});

	it(`check that httpGet is called with only an url and empty config object literal
    when http.get is called only with an url`, () => {
		// given
		document.cookie = `customCookieKey=${CSRFToken}; dwf_section_edit=True;`;
		const url = '/url';
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.get(url);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpGet is called with only an url and config object
    when http.get is called with an url and config object`, () => {
		// given
		const url = '/url';
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.get(url, config);
		// then
		expect(gen.next().value).toEqual(call(httpGet, url, expectedConfig));
	});

	it(`check that httpPost is called with an url, payload and empty config object
    when http.post is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create(defaultHttpConfiguration);
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		// when
		const gen = httpInstance.post(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPost, url, payload, expectedConfig),
		);
	});

	it(`check that httpPost is called with an url, payload and config object
        when http.post is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.post(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPost, url, payload, expectedConfig),
		);
	});

	it(`check that httpPut is called with an url, payload and empty config object
        when http.put is called only with an url and a payload`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const httpInstance = http.create(defaultHttpConfiguration);
		const expectedConfig = {
			headers: {
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
		};
		// when
		const gen = httpInstance.put(url, payload);
		// then
		expect(gen.next().value).toEqual(
			call(httpPut, url, payload, expectedConfig),
		);
	});

	it(`check that httpPut is called with an url, payload and config object
        when http.put is called with an url and a payload and a config object`, () => {
		// given
		const url = '/url';
		const payload = { payload: 'payload' };
		const config = {
			headers: {
				'Content-Type': 'overloaded nested header',
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const expectedConfig = {
			headers: {
				'Content-Type': 'overloaded nested header',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			credentials: 'overloaded non nested config',
			newConfig: 'newConfig element',
		};
		const httpInstance = http.create(defaultHttpConfiguration);
		// when
		const gen = httpInstance.put(url, payload, config);
		// then
		expect(gen.next().value).toEqual(
			call(httpPut, url, payload, expectedConfig),
		);
	});
});
