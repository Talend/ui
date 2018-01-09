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
} from '../../src/sagas/http';

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
				status: HTTP_STATUS.PAYMENT_REQUIRED,
			},
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next(httpError).value).toEqual(
			put({
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.PAYMENT_REQUIRED,
					},
				},
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});

	it('should wrap the request, notify 401 and notify errors', () => {
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
				status: HTTP_STATUS.UNAUTHORIZED,
			},
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next(httpError).value).toEqual(
			put({
				type: `${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.UNAUTHORIZED}`,
			}),
		);

		expect(gen.next().value).toEqual(
			put({
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.UNAUTHORIZED,
					},
				},
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});

	it('should wrap the request, notify 403 and notify errors', () => {
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
				type: `${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.FORBIDDEN}`,
			}),
		);

		expect(gen.next().value).toEqual(
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

	it('should wrap the request, notify 404 and notify errors', () => {
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
				status: HTTP_STATUS.NOT_FOUND,
			},
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);

		expect(gen.next().value).toEqual(call(httpFetch, url, config, HTTP_METHODS.PUT, payload));
		expect(gen.next(httpError).value).toEqual(
			put({
				type: `${ACTION_TYPE_HTTP_ERRORS}/${HTTP_STATUS.NOT_FOUND}`,
			}),
		);

		expect(gen.next().value).toEqual(
			put({
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.NOT_FOUND,
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
