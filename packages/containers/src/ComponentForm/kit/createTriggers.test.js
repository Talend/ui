import createTriggers, {
	normalizePath,
	extractParameters,
	createCacheKey,
	toJSON,
	toURL,
} from './createTriggers';

describe('createTriggers', () => {
	let triggers;
	const trigger = {
		action: 'urlValidation',
		familly: 'WhatEver',
		parameters: [{ key: 'arg0', path: 'obj.attr' }],
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
	let response;
	beforeEach(() => {
		response = { body: { status: 'OK' } };
		triggers = createTriggers({
			url: '/foo',
			fetchConfig: {
				response: { ok: true, status: 200, json: () => Promise.resolve(response) },
			},
		});
	});
	it('should be a function', () => {
		expect(typeof triggers).toBe('function');
	});
	it('should call fetch and return the results', done => {
		triggers({}, { trigger, schema, properties }).then(data => {
			expect(data.errors).toEqual({});
			done();
		});
	});
});
