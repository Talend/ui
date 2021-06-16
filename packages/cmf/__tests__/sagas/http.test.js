import { Headers, Response } from 'node-fetch';
import { call, put } from 'redux-saga/effects';
import {
	ACTION_TYPE_HTTP_ERRORS,
	HTTP_METHODS,
	HTTP_STATUS,
} from '../../src/middlewares/http/constants';
import interceptors from '../../src/httpInterceptors';

import http, {
	getDefaultConfig,
	handleBody,
	handleError,
	handleHttpResponse,
	httpFetch,
	HTTPError,
	encodePayload,
	wrapFetch,
	httpGet,
	httpHead,
	httpDelete,
	httpPatch,
	httpPost,
	httpPut,
	setDefaultConfig,
	setDefaultLanguage,
	handleDefaultHttpConfiguration,
	HTTP,
} from '../../src/sagas/http';

const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

beforeEach(() => {
	jest.clearAllMocks();
});

describe('http.get', () => {
	it('should fetch /foo with a GET method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const gen = http.get('/foo', config);
		const $config = { url, method: HTTP_METHODS.GET, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('http.head', () => {
	it('should fetch /foo with a HEAD method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const gen = http.head('/foo', config);
		const $config = { url, method: HTTP_METHODS.HEAD, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.HEAD, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('http.post', () => {
	it('should fetch /foo with a POST method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const payload = {
			bar: 42,
		};

		const gen = http.post('/foo', payload, config);
		const $config = { url, method: HTTP_METHODS.POST, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.POST, payload),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('http.patch', () => {
	it('should fetch /foo with a PATCH method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const payload = {
			bar: 42,
		};

		const gen = http.patch('/foo', payload, config);
		const $config = { url, method: HTTP_METHODS.PATCH, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PATCH, payload),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('http.put', () => {
	it('should fetch /foo with a PUT method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const payload = {
			bar: 42,
		};

		const gen = http.put('/foo', payload, config);
		const $config = { url, method: HTTP_METHODS.PUT, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PUT, payload),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('http.delete', () => {
	it('should fetch /foo with a DELETE method', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const gen = http.delete('/foo', config);
		const $config = { url, method: HTTP_METHODS.DELETE, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.DELETE, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
});

describe('handleBody', () => {
	it('should manage the body of the response like text if no header', done => {
		handleBody(new Response('{"foo": 42}', {})).then(({ data, response }) => {
			expect(data).toBe('{"foo": 42}');
			expect(response instanceof Response).toBeTruthy();
			done();
		});
	});

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

	it('should manage the body of the response like a blob', done => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/zip');

		const blob = jest.fn(() => Promise.resolve());

		handleBody({ blob, headers }).then(() => {
			expect(blob).toHaveBeenCalled();
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

	it('should handle the response for HEAD requests', done => {
		handleHttpResponse(
			new Response('{"foo": 42}', {
				status: HTTP_STATUS.OK,
			}),
			{ method: HTTP_METHODS.HEAD }
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

describe('#encodePayload', () => {
	it('should json stringify the payload if content-type is application/json', () => {
		const headers = {
			'Content-Type': 'application/json',
		};
		const test = { abc: 'def' };

		// eslint-disable-next-line quotes
		expect(encodePayload(headers, test)).toEqual('{"abc":"def"}');
	});
	it('should return the payload as it is if it is a string', () => {
		const test = 'FooBar';

		// eslint-disable-next-line quotes
		expect(encodePayload({}, test)).toEqual('FooBar');
	});

	it('should not json stringify the payload if content-type is not application/json', () => {
		const headers = {
			'Content-Type': 'plain/text',
		};
		const test = { abc: 'def' };

		// eslint-disable-next-line quotes
		expect(encodePayload(headers, test)).toEqual({ abc: 'def' });
	});

	it('should not json stringify the payload if it is a FormData instance', () => {
		const headers = {
			'Content-Type': 'application/json',
		};

		// eslint-disable-next-line quotes
		expect(encodePayload(headers, new FormData()) instanceof FormData).toBe(true);
	});
});

describe('#httpFetch', () => {
	it('should wrap the request as a GET by default and provide an undefined payload', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.GET);
		const $config = { url, method: HTTP_METHODS.GET, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a GET when options are given', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const options = {
			aCmfOption: true,
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.GET, undefined, options);
		const $config = { url, method: HTTP_METHODS.GET, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a POST when options are given and, if error send it, if option is provided and silent is false', () => {
		const url = '/foo';
		const headers = { 'Content-Type': 'application/json' };
		const message = 'Error occured';
		const status = HTTP_STATUS.FORBIDDEN;
		const payload = {
			bar: 42,
		};
		const config = {
			headers,
		};
		const options = {
			silent: false,
		};
		const error = new HTTPError({
			data: {
				message,
			},
			response: {
				status,
			},
		});
		const gen = wrapFetch(url, config, HTTP_METHODS.POST, payload, options);
		const $config = { url, method: HTTP_METHODS.POST, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.POST, payload),
		);
		gen.next(error);
		expect(gen.next(error).value).toEqual(
			put({
				config,
				options,
				error: {
					message,
					stack: {
						status,
					},
				},
				method: HTTP_METHODS.POST,
				payload,
				url,
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a POST when options are given and if error senit if no option are provided', () => {
		const url = '/foo';
		const headers = { 'Content-Type': 'application/json' };
		const message = 'Error occured';
		const status = HTTP_STATUS.FORBIDDEN;
		const payload = {
			bar: 42,
		};
		const config = {
			headers,
		};
		const error = new HTTPError({
			data: {
				message,
			},
			response: {
				status,
			},
		});
		const gen = wrapFetch(url, config, HTTP_METHODS.POST, payload);
		const $config = { url, method: HTTP_METHODS.POST, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.POST, payload),
		);
		gen.next(error);
		expect(gen.next(error).value).toEqual(
			put({
				config: {
					headers,
				},
				options: undefined,
				error: {
					message,
					stack: {
						status,
					},
				},
				method: HTTP_METHODS.POST,
				payload,
				url,
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a POST when options are given and, if error send it, if option is provided and silent is undefined', () => {
		const url = '/foo';
		const headers = { 'Content-Type': 'application/json' };
		const message = 'Error occured';
		const status = HTTP_STATUS.FORBIDDEN;
		const payload = {
			bar: 42,
		};
		const config = {
			headers,
		};
		const options = {};
		const error = new HTTPError({
			data: {
				message,
			},
			response: {
				status,
			},
		});
		const gen = wrapFetch(url, config, HTTP_METHODS.POST, payload, options);
		const $config = { url, method: HTTP_METHODS.POST, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.POST, payload),
		);
		gen.next(error);
		expect(gen.next(error).value).toEqual(
			put({
				config: {
					headers,
				},
				options,
				error: {
					message,
					stack: {
						status,
					},
				},
				method: HTTP_METHODS.POST,
				payload,
				url,
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a GET when options are given and do not send error if silent is true', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const options = {
			silent: true,
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.GET, undefined, options);
		const $config = { url, method: HTTP_METHODS.GET, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request as a POST when options are given and, if error send it, if option is provided and silent is an object', () => {
		const url = '/foo';
		const headers = { 'Content-Type': 'application/json' };
		const message = 'Error occured';
		const status = HTTP_STATUS.FORBIDDEN;
		const payload = {
			bar: 42,
		};
		const config = {
			headers,
		};
		const options = {
			silent: {
				notify: false,
				redirect: true,
			},
		};
		const error = new HTTPError({
			data: {
				message,
			},
			response: {
				status,
			},
		});
		const gen = wrapFetch(url, config, HTTP_METHODS.POST, payload, options);
		const $config = { url, method: HTTP_METHODS.POST, payload, ...config, data: { ok: true } };
		gen.next();

		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.POST, payload),
		);
		gen.next(error);
		expect(gen.next(error).value).toEqual(
			put({
				config: {
					headers,
				},
				options,
				error: {
					message,
					stack: {
						status,
					},
				},
				method: HTTP_METHODS.POST,
				payload,
				url,
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request with action', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const payload = {
			bar: 42,
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);
		const $config = { url, method: HTTP_METHODS.PUT, payload, ...config, data: { ok: true } };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PUT, payload),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the DELETE request and an undefined payload', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.DELETE);
		const $config = { url, method: HTTP_METHODS.DELETE, ...config, data: { ok: true } };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.DELETE, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});

	it('should wrap the DELETE request when options are given', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const options = {
			aCmfOption: true,
		};

		const gen = wrapFetch(url, config, HTTP_METHODS.DELETE, undefined, options);
		const $config = { url, method: HTTP_METHODS.DELETE, ...config, data: { ok: true } };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.DELETE, undefined),
		);
		gen.next();
		expect(gen.next().done).toBe(true);
	});

	it('should wrap the request and notify business error', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
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
		const $config = { url, method: HTTP_METHODS.PUT, payload, ...config };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PUT, payload),
		);
		gen.next(httpError);
		expect(gen.next(httpError).value).toEqual(
			put({
				config: {
					headers: {
						'Content-Type': 'application/json',
					},
				},
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.FORBIDDEN,
					},
				},
				method: 'PUT',
				payload: {
					bar: 42,
				},
				url: '/foo',
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request and notify enriched business error if response payload follow RFC-7807', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const rfcReponse = {
			type: 'some-documentation-uri',
			title: 'An expected error title',
			detail: 'Some useful detail',
			code: 'business-error-xxx'
		};
		const payload = {
			bar: 42,
		};

		const httpError = new HTTPError({
			data: {
				message: 'Error occured',
				...rfcReponse,
			},
			response: {
				status: HTTP_STATUS.FORBIDDEN,
			},
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);
		const $config = { url, method: HTTP_METHODS.PUT, payload, ...config };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PUT, payload),
		);
		gen.next(httpError);
		expect(gen.next(httpError).value).toEqual(
			put({
				config: {
					headers: {
						'Content-Type': 'application/json',
					},
				},
				options: undefined,
				error: {
					message: 'Error occured',
					stack: {
						status: HTTP_STATUS.FORBIDDEN,
					},
					...rfcReponse,
				},
				method: 'PUT',
				payload: {
					bar: 42,
				},
				url: '/foo',
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});
	it('should wrap the request and notify network error', () => {
		const url = '/foo';
		const config = {
			headers: {
				'Content-Type': 'application/json',
			},
		};
		const payload = {
			bar: 42,
		};
		const response = new TypeError('Failed to fetch');
		const httpError = new HTTPError({
			data: response,
			response,
		});

		const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload);
		const $config = { url, method: HTTP_METHODS.PUT, payload, ...config };
		gen.next();
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.PUT, payload),
		);
		gen.next(httpError);
		expect(gen.next(httpError).value).toEqual(
			put({
				config: {
					headers: {
						'Content-Type': 'application/json',
					},
				},
				error: {
					message: 'Failed to fetch',
					stack: {},
				},
				method: 'PUT',
				payload: {
					bar: 42,
				},
				url: '/foo',
				type: ACTION_TYPE_HTTP_ERRORS,
			}),
		);
		expect(gen.next().value).toEqual(httpError);
		expect(gen.next().done).toBe(true);
	});
	it('should call interceptors at every steps', () => {
		const url = '/foo';
		const config = {};
		const response = { data: 'foo' };
		const gen = wrapFetch(url, config, HTTP_METHODS.GET);
		const $config = { url, method: HTTP_METHODS.GET, undefined };
		expect(gen.next().value).toEqual(call(interceptors.onRequest, $config));
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
		expect(gen.next(response).value).toEqual(call(interceptors.onResponse, response));
	});
});

it('should wrap the request and not notify with generic http error if silent option is set to true ', () => {
	const url = '/foo';
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};
	const options = {
		silent: true,
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

	const gen = wrapFetch(url, config, HTTP_METHODS.PUT, payload, options);
	const $config = { url, ...config, method: HTTP_METHODS.PUT, payload };
	gen.next();

	expect(gen.next($config).value).toEqual(call(httpFetch, url, $config, HTTP_METHODS.PUT, payload));
	gen.next(httpError);
	expect(gen.next(httpError).value).toEqual(httpError);
	expect(gen.next().done).toBe(true);
});

describe('#httpFetch with CRSF token', () => {
	beforeAll(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});
	it('should get the CRFS token', done => {
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
				'X-CSRF-Token': CSRFToken,
			},
			method: HTTP_METHODS.GET,
			response: config.response,
		});
	});
});

describe('#httpFetch with CSRF handling configuration', () => {
	const defaultHttpConfiguration = {
		security: {
			CSRFTokenCookieKey: 'customCookieKey',
			CSRFTokenHeaderKey: 'customHeaderKey',
		},
	};

	beforeAll(() => {
		HTTP.defaultConfig = null;

		document.cookie = `${
			defaultHttpConfiguration.security.CSRFTokenCookieKey
		}=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		HTTP.defaultConfig = null;

		document.cookie = `${
			defaultHttpConfiguration.security.CSRFTokenCookieKey
		}=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});

	it('check if httpFetch is called with the security configuration', done => {
		setDefaultConfig(defaultHttpConfiguration);

		expect(getDefaultConfig()).toEqual(defaultHttpConfiguration);
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
			...defaultHttpConfiguration,
			body: '{"bar":42}',
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			method: HTTP_METHODS.GET,
			response: config.response,
		});
	});
});

describe('#httpFetch', () => {
	afterEach(() => {
		HTTP.defaultConfig = null;
	});

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

	it('should fetch the request with the default settings', done => {
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

		setDefaultConfig({
			headers: {
				'Accept-Language': 'fr',
			},
		});

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
				'Accept-Language': 'fr',
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

describe('Http{Method} calls httpFetch with appropriate method', () => {
	// given
	const url = '/url';
	const config = {
		'Content-Type': 'application/json',
	};
	const options = {
		silent: true,
	};
	it('check that httpFetch is called from httpGet', () => {
		// when
		const gen = httpGet(url, config, options);
		// then
		gen.next();
		const $config = { url, ...config, method: HTTP_METHODS.GET };
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.GET, undefined),
		);
	});
	it('check that httpFetch is called from httpDelete', () => {
		// when
		const gen = httpDelete(url, config, options);
		// then
		gen.next();
		const $config = { url, ...config, method: HTTP_METHODS.DELETE };
		expect(gen.next($config).value).toEqual(
			call(httpFetch, url, $config, HTTP_METHODS.DELETE, undefined),
		);
	});
});
describe('http module with instance created', () => {
	beforeEach(() => {
		HTTP.defaultConfig = null;
		setDefaultConfig({});
	});

	afterEach(() => {
		HTTP.defaultConfig = null;
		setDefaultConfig({});
	});
	it('check that httpGet is called', () => {
		// given
		const url = '/url';
		const options = {};
		const httpInstance = http.create({
			headers: {
				'Accept-Language': 'fr',
			},
		});
		// when
		const gen = httpInstance.get(url, {}, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(
			call(
				httpGet,
				url,
				{
					headers: {
						'Accept-Language': 'fr',
					},
				},
				options,
			),
		);
	});

	it('check that httpDelete is called', () => {
		// given
		const url = '/url';
		const config = {};
		const options = {};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.delete(url, config, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(call(httpDelete, url, config, options));
	});

	it('check that httpPut is called', () => {
		// given
		const url = '/url';
		const payload = {};
		const config = {};
		const options = {};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.put(url, payload, config, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(call(httpPut, url, payload, config, options));
	});

	it('check that httpPost is called', () => {
		// given
		const url = '/url';
		const payload = {};
		const config = {};
		const options = {};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.post(url, payload, config, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(call(httpPost, url, payload, config, options));
	});

	it('check that httpPatch is called', () => {
		// given
		const url = '/url';
		const payload = {};
		const config = {};
		const options = {};
		const httpInstance = http.create();
		// when
		const gen = httpInstance.patch(url, payload, config, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(call(httpPatch, url, payload, config, options));
	});

	it('check that defaultConfig is defined with config', () => {
		// given
		const url = '/url';
		const payload = {};
		const config = {
			headers: {
				'content-type': 'application/json',
			},
		};
		const options = {};
		const httpInstance = http.create({
			headers: {
				'Accept-Language': 'fr',
			},
		});
		// when
		const gen = httpInstance.patch(url, payload, config, options);
		// then
		// url, config = {}, options = {}
		expect(gen.next().value).toEqual(
			call(
				httpPatch,
				url,
				payload,
				{
					headers: {
						'Accept-Language': 'fr',
						'content-type': 'application/json',
					},
				},
				options,
			),
		);
	});
});

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
});

describe('handleDefaultConfiguration', () => {
	it('should return merge of the defaultHttpConfig with httpConfig', () => {
		expect(
			handleDefaultHttpConfiguration({
				headers: {
					'Accept-Language': 'fr',
				},
			})({
				headers: {
					'content-type': 'application/json',
				},
			}),
		).toEqual({
			headers: {
				'Accept-Language': 'fr',
				'content-type': 'application/json',
			},
		});
	});

	it(`should return merge the defaultHttpConfig with httpConfig
	and not store it with partial application of the curryied function`, () => {
		// given
		const defaultHttpConfig = {
			headers: {
				'Accept-Language': 'fr',
			},
		};

		const copyOfDefaultHttpConfig = {
			headers: {
				'Accept-Language': 'fr',
			},
		};

		const httpConfig = {
			headers: {
				'content-type': 'application/json',
			},
		};
		// when
		const configuredHandleDefaultHttpConfiguration = handleDefaultHttpConfiguration(
			defaultHttpConfig,
		);
		configuredHandleDefaultHttpConfiguration(httpConfig);
		const resultTwo = configuredHandleDefaultHttpConfiguration({});
		// expect
		expect(resultTwo).toEqual(copyOfDefaultHttpConfig);
	});
});
