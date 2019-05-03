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
	beforeEach(() => {
		document.cookie = 'csrfToken=foo-token';
		document.cookie = 'otherToken=other-token';
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
	it('should call fetch and return the results', done => {
		triggers({}, { trigger, schema, properties }).then(data => {
			expect(data.errors).toEqual({});
			expect(fetch).toHaveBeenCalled();
			done();
		});
	});
	it('should support remote property', done => {
		const specialTrigger = {
			type: 'dotnotfecth',
			remote: false,
			action: 'localAction',
			familly: 'WhatEver',
			parameters: [{ key: 'url', path: 'obj.url' }],
		};
		triggers({}, { trigger: specialTrigger, schema, properties, errors: {} }).then(data => {
			expect(data.errors).toEqual({});
			expect(fetch).not.toHaveBeenCalled();
			done();
		});
	});
	it('should handle security by default', done => {
		triggers({}, { trigger, schema, properties }).then(() => {
			expect(fetch.mock.calls[0][1].headers['X-CSRF-Token']).toBe('foo-token');
			done();
		});
	});
	it('should handle security specified by config', done => {
		triggers = createTriggers({
			url: '/foo',
			security: {
				CSRFTokenCookieKey: 'otherToken',
				CSRFTokenHeaderKey: 'X-CSRF-OTHER',
			},
		});
		triggers({}, { trigger, schema, properties }).then(() => {
			expect(fetch.mock.calls[0][1].headers['X-CSRF-OTHER']).toBe('other-token');
			done();
		});
	});
	it('should handle security specified by default', done => {
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
		triggers({}, { trigger, schema, properties }).then(() => {
			expect(fetch.mock.calls[0][1].headers['X-CSRF-OTHER']).toBe('other-token');
			done();
		});
	});
	it('should handle trigger status code 500', done => {
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
		triggers({}, { trigger, schema, properties, errors }).then(data => {
			expect(errors).toEqual({});
			expect(data.errors).toEqual({
				'obj.url': 'Internal Server Error',
			});
			done();
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
	it('should throw error if status >= 300', done => {
		const expected = { message: 'foo' };
		const response = { ok: true, status: 300, text: jest.fn(() => Promise.resolve(expected)) };
		toJSON(response).then(undefined, result => {
			expect(response.text).toHaveBeenCalled();
			expect(result).toEqual({ error: expected });
			done();
		});
	});
});

describe('toQueryParam', () => {
	it('should return encoded queryParams', () => {
		expect(toQueryParam({ foo: 'foo space', bar: 'bar' })).toEqual('foo=foo%20space&bar=bar');
	});
});
