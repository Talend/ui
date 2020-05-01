import { Headers, Response } from 'node-fetch';
import { HTTP_METHODS, HTTP_STATUS } from '../src/middlewares/http/constants';

import {
	handleBody,
	handleError,
	handleHttpResponse,
	httpFetch,
	HTTPError,
	encodePayload,
	HTTP,
	setDefaultLanguage,
	setDefaultConfig,
	getDefaultConfig,
} from '../src/http';

const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';

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
		document.cookie = `${defaultHttpConfiguration.security.CSRFTokenCookieKey}=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		HTTP.defaultConfig = null;
		document.cookie = `${defaultHttpConfiguration.security.CSRFTokenCookieKey}=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
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
