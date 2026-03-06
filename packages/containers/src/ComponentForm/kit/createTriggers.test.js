import cmf from '@talend/react-cmf';

import createTriggers, {
	extractParameters,
	createCacheKey,
	toJSON,
	toQueryParam,
	getPathWithArrayIndex,
} from './createTriggers';

const trigger = {
	action: 'urlValidation',
	familly: 'WhatEver',
	parameters: [{ key: 'url', path: 'obj.url' }],
	type: 'validation', // to call defaultRegistry.validation
};
const schema = { key: 'obj.url' };
const properties = {
	obj: {
		url: 'http://foo.com',
		user: 'me',
		password: 'secret',
	},
};

describe('createTriggers', () => {
	let triggers;
	let response;
	const getDefaultFetchResponse = () => ({
		ok: true,
		status: 200,
		json: () => Promise.resolve(response),
	});

	beforeEach(() => {
		document.cookie = 'csrfToken=foo-token';
		document.cookie = 'otherToken=other-token';
		global.fetch = vi.fn((unusedUrl, options = {}) =>
			Promise.resolve(options.response || getDefaultFetchResponse()),
		);
		fetch.mockClear();
		response = { body: { status: 'OK' } };
		triggers = createTriggers({
			url: '/foo',
			customRegistry: {
				// we declare a local trigger function
				dotnotfecth: jest.fn(args => ({ ...args })),
			},
			fetchConfig: {
				response: { ok: true, status: 200, json: () => Promise.resolve(response) },
			},
		});
	});
	afterEach(() => {
		document.cookie = 'csrfToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
		document.cookie = 'otherToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
	});
	it('should be a function', () => {
		expect(typeof triggers).toBe('function');
	});
	it('should call fetch and return the results', async () => {
		const data = await triggers({}, { trigger, schema, properties });
		expect(data.errors).toEqual({});
		expect(fetch).toHaveBeenCalled();
	});
	it('should support remote property', async () => {
		const specialTrigger = {
			type: 'dotnotfecth',
			remote: false,
			action: 'localAction',
			familly: 'WhatEver',
			parameters: [{ key: 'url', path: 'obj.url' }],
		};
		const data = await triggers({}, { trigger: specialTrigger, schema, properties, errors: {} });
		expect(data.errors).toEqual({});
		expect(fetch).not.toHaveBeenCalled();
	});
	it('should handle security by default', async () => {
		await triggers({}, { trigger, schema, properties });
		expect(fetch.mock.calls[0][1].headers['X-CSRF-Token']).toBe('foo-token');
	});
	it('should handle security specified by config', async () => {
		triggers = createTriggers({
			url: '/foo',
			security: {
				CSRFTokenCookieKey: 'otherToken',
				CSRFTokenHeaderKey: 'X-CSRF-OTHER',
			},
		});
		await triggers({}, { trigger, schema, properties });
		expect(fetch.mock.calls[0][1].headers['X-CSRF-OTHER']).toBe('other-token');
	});
	it('should handle security specified by default', async () => {
		cmf.sagas.http.getDefaultConfig = jest.fn();
		cmf.sagas.http.getDefaultConfig.mockReturnValue({
			security: {
				CSRFTokenCookieKey: 'otherToken',
				CSRFTokenHeaderKey: 'X-CSRF-OTHER',
			},
		});
		triggers = createTriggers({
			url: '/foo',
		});
		await triggers({}, { trigger, schema, properties });
		expect(fetch.mock.calls[0][1].headers['X-CSRF-OTHER']).toBe('other-token');
	});
	it('should handle trigger status code 500', async () => {
		const errors = {};
		triggers = createTriggers({
			url: '/foo',
			fetchConfig: {
				response: {
					ok: false,
					status: 500,
					text: () => Promise.resolve('{ "message": "Internal Server Error" }'),
				},
			},
		});
		const data = await triggers({}, { trigger, schema, properties, errors });
		expect(errors).toEqual({});
		expect(data.errors).toEqual({
			'obj.url': 'Internal Server Error',
		});
	});
});

describe('getPathWithArrayIndex', () => {
	it('should return first param if no schema', () => {
		expect(getPathWithArrayIndex('foo.bar')).toBe('foo.bar');
	});
	it('should return first param if no schema.key', () => {
		expect(getPathWithArrayIndex('foo.bar', {})).toBe('foo.bar');
	});
	it('should return first param if no schema.key', () => {
		expect(getPathWithArrayIndex('foo.bar', { key: ['foo'] })).toBe('foo.bar');
	});
	it('should return', () => {
		const specPath = 'obj.array[].field';
		const arraySchema = {
			key: ['obj', 'array', 0, 'field'],
		};
		const expectedPath = 'obj.array[0].field';
		expect(getPathWithArrayIndex(specPath, arraySchema)).toBe(expectedPath);
	});
});

describe('extractParameters', () => {
	it('should return object with extracted value from properties', () => {
		expect(extractParameters(trigger.parameters, properties, schema)).toEqual({
			url: properties.obj.url,
		});
	});
	it('should return extract complex values (object/array)', () => {
		const parameters = [{ path: 'obj.myArray', key: 'lol-array' }];
		const complexProperties = {
			obj: {
				myArray: ['lol', { toto: 'mdr' }],
			},
		};
		expect(extractParameters(parameters, complexProperties, {})).toEqual({
			'lol-array[0]': 'lol',
			'lol-array[1].toto': 'mdr',
		});
	});
	it('should return empty object if no parameters', () => {
		expect(extractParameters(undefined, properties, schema)).toEqual({});
	});
});

describe('createCacheKey', () => {
	it('should return undefined if not suggestions', () => {
		expect(createCacheKey({ type: 'foo' })).toBeUndefined();
	});
	it('return undefined if is a suggestions but has no parameters', () => {
		expect(createCacheKey({ type: 'suggestions' })).toBeUndefined();
	});
	it('return undefined if is a suggestions with empty parameters', () => {
		expect(createCacheKey({ type: 'suggestions', parameters: [] })).toBeUndefined();
	});
	it('return key if is a suggestions with parameters', () => {
		expect(
			createCacheKey({
				type: 'suggestions',
				family: 'myfamily',
				action: 'suggestFields',
				parameters: [{ path: 'obj.attr' }, { path: 'obj.array' }],
			}),
		).toEqual('suggestions:myfamily:suggestFields:obj.attr:obj.array');
	});
});
describe('toJSON', () => {
	it('should return response.json()', () => {
		const expected = { foo: 'foo' };
		const response = { ok: true, status: 200, json: jest.fn(() => expected) };
		const result = toJSON(response);
		expect(response.json).toHaveBeenCalled();
		expect(result).toBe(expected);
	});
	it('should throw error if status >= 300', async () => {
		const expected = { message: 'foo' };
		const response = { ok: true, status: 300, text: jest.fn(() => Promise.resolve(expected)) };
		await expect(toJSON(response)).rejects.toEqual({ error: expected });
		expect(response.text).toHaveBeenCalled();
	});
});

describe('toQueryParam', () => {
	it('should return encoded queryParams', () => {
		expect(toQueryParam({ foo: 'foo space', bar: 'bar' })).toEqual('foo=foo%20space&bar=bar');
	});
});
