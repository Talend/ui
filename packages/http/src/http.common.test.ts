import fetchMock from 'fetch-mock';
import { Response, Headers } from 'node-fetch';
import { HTTP_METHODS, HTTP_STATUS } from './http.constants';

import { HTTP, getDefaultConfig, setDefaultConfig } from './config';
import { httpFetch, handleBody, encodePayload, handleHttpResponse } from './http.common';

const CSRFToken = 'hNjmdpuRgQClwZnb2c59F9gZhCi8jv9x';
const defaultBody = { is: 'ok' };
const defaultPayload = {
	bar: 42,
};

beforeEach(() => {
	jest.clearAllMocks();
});

describe('handleBody', () => {
	it('should manage the body of the response like text if no header', async () => {
		const response = new Response('{"foo": 42}', {});
		const result = await handleBody(response as any);

		expect(result.data).toBe('{"foo": 42}');
	});

	it('should manage the body of the response like a json', async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		const result = await handleBody(
			new Response('{"foo": 42}', {
				headers,
			}) as any,
		);

		expect(result.data).toEqual({
			foo: 42,
		});
	});

	it('should manage the body of the response like a blob', async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'application/zip');

		const blob = jest.fn(() => Promise.resolve());

		await handleBody({ blob, headers } as any);

		expect(blob).toHaveBeenCalled();
	});

	it('should manage the body of the response like a text', async () => {
		const headers = new Headers();
		headers.append('Content-Type', 'text/plain');

		const result = await handleBody(
			new Response('foo', {
				headers,
			}) as any,
		);

		expect(result.data).toBe('foo');
	});

	it('should manage the body of the response like a text by default', async () => {
		const result = await handleBody(new Response('') as any);
		expect(result.data).toBe('');
	});

	describe('#handleHttpResponse', () => {
		it('should handle the response with 2xx code', async () => {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');

			const result = await handleHttpResponse(
				new Response('{"foo": 42}', {
					status: HTTP_STATUS.OK,
					headers,
				}) as any,
			);

			expect(result.data).toEqual({
				foo: 42,
			});
		});

		it('should throw with a code different of 2xx', async () => {
			const headers = new Headers();
			headers.append('Content-Type', 'application/json');

			try {
				await handleHttpResponse(
					new Response('{"foo": 42}', {
						status: HTTP_STATUS.FORBIDDEN,
						headers,
					}) as any,
				);
			} catch (e) {
				// @ts-ignore
				expect(e.message).toEqual('403');
			}
		});

		it('should handle the response with NO_CONTENT code', async () => {
			const result = await handleHttpResponse(
				new Response('', {
					status: HTTP_STATUS.NO_CONTENT,
				}) as any,
			);

			expect(result.data).toBe('');
		});

		it('should handle the response with an error http code', async () => {
			await expect(
				handleHttpResponse(
					new Response('', {
						status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
					}) as any,
				),
			).rejects.toThrow(`${HTTP_STATUS.INTERNAL_SERVER_ERROR}`);
		});

		it('should return response in error from handle request', async () => {
			expect.assertions(2);

			try {
				await handleHttpResponse(
					new Response('', {
						status: HTTP_STATUS.INTERNAL_SERVER_ERROR,
					}) as any,
				);
			} catch (e) {
				// @ts-ignore
				expect(e.response instanceof Response).toBe(true);
				// @ts-ignore
				expect(e.response.status).toEqual(500);
			}
		});
	});
});

describe('#encodePayload', () => {
	it('should json stringify the payload if content-type is application/json', () => {
		const headers = {
			'Content-Type': 'application/json',
		};
		const test = { abc: 'def' };

		expect(encodePayload(headers, test)).toEqual('{"abc":"def"}');
	});
	it('should return the payload as it is if it is a string', () => {
		const test = 'FooBar';

		expect(encodePayload({}, test)).toEqual('FooBar');
	});

	it('should not json stringify the payload if content-type is not application/json', () => {
		const headers = {
			'Content-Type': 'plain/text',
		};
		const test = { abc: 'def' };

		expect(encodePayload(headers, test)).toEqual({ abc: 'def' });
	});

	it('should not json stringify the payload if it is a FormData instance', () => {
		const headers = {
			'Content-Type': 'application/json',
		};

		expect(encodePayload(headers, new FormData()) instanceof FormData).toBe(true);
	});
});

describe('#httpFetch with `CSRF` token', () => {
	beforeAll(() => {
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True;`;
	});

	afterAll(() => {
		fetchMock.restore();
		document.cookie = `csrfToken=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});
	it('should get the CRFS token', async () => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		fetchMock.mock(url, { body: defaultBody, status: 200 });
		const result = await httpFetch(url, {}, HTTP_METHODS.GET, defaultPayload);

		expect(result.data).toEqual(defaultBody);
		expect(fetchMock.calls()[0][1]).toEqual({
			body: JSON.stringify(defaultPayload),
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'X-CSRF-Token': CSRFToken,
			},
			method: 'GET',
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
		fetchMock.restore();
		document.cookie = `${defaultHttpConfiguration.security.CSRFTokenCookieKey}=${CSRFToken}; dwf_section_edit=True; Max-Age=0`;
	});

	it('check if httpFetch is called with the security configuration', async () => {
		setDefaultConfig(defaultHttpConfiguration);

		expect(getDefaultConfig()).toEqual(defaultHttpConfiguration);
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		fetchMock.mock(url, { body: defaultBody, status: 200 });

		const result = await httpFetch(url, {}, HTTP_METHODS.GET, defaultPayload);

		expect(result.data).toEqual(defaultBody);
		expect(fetchMock.calls()[0][1]).toEqual({
			body: JSON.stringify(defaultPayload),
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				[defaultHttpConfiguration.security.CSRFTokenHeaderKey]: CSRFToken,
			},
			security: {
				CSRFTokenCookieKey: 'customCookieKey',
				CSRFTokenHeaderKey: 'customHeaderKey',
			},
			method: 'GET',
		});
	});
});

describe('#httpFetch', () => {
	afterEach(() => {
		HTTP.defaultConfig = null;
		fetchMock.restore();
	});

	it('should fetch the request', async () => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		fetchMock.mock(url, { body: defaultBody, status: 200 });

		const result = await httpFetch(url, {}, HTTP_METHODS.GET, defaultPayload);

		expect(result.data).toEqual(defaultBody);
		expect(fetchMock.calls()[0][1]).toEqual({
			body: JSON.stringify(defaultPayload),
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});
	});

	it('should fetch the request with the default settings', async () => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');

		setDefaultConfig({
			headers: {
				'Accept-Language': 'fr',
			},
		});

		fetchMock.mock(url, { body: defaultBody, status: 200 });

		const result = await httpFetch(url, {}, HTTP_METHODS.GET, defaultPayload);

		expect(result.data).toEqual(defaultBody);
		expect(fetchMock.calls()[0][1]).toEqual({
			body: JSON.stringify(defaultPayload),
			credentials: 'same-origin',
			headers: {
				Accept: 'application/json',
				'Accept-Language': 'fr',
				'Content-Type': 'application/json',
			},
			method: 'GET',
		});
	});

	it('should fetch the request with a FormData', async () => {
		const url = '/foo';
		const headers = new Headers();
		headers.append('Content-Type', 'application/json');
		const payload = new FormData();

		fetchMock.mock(url, { body: '{"foo": 42}', status: 200 });

		const result = await httpFetch(url, {}, HTTP_METHODS.GET, payload);
		expect(result.data).toEqual('{"foo": 42}');

		const mockCalls = fetchMock.calls();
		expect(mockCalls[0][1]?.credentials).toEqual('same-origin');
		expect(mockCalls[0][1]?.headers).toEqual({ Accept: 'application/json' });
	});
});
