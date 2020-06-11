import { call } from 'redux-saga/effects';
import { HTTP_METHODS } from './http.constants';
import { httpFetch } from './http.common';
import http from './generators';

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
