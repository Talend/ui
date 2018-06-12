import { assertTypeOf } from '../src/assert';

const options = {
	string: 'string',
	number: 3,
	object: {},
	func: function func() {},
	array: [],
};

function toThrow(attr, type) {
	return () => assertTypeOf(options, attr, type);
}

describe('assertTypeOf', () => {
	it('should not throw on all types', () => {
		expect(toThrow('string', 'string')).not.toThrow();
		expect(toThrow('object', 'object')).not.toThrow();
		expect(toThrow('func', 'function')).not.toThrow();
		expect(toThrow('array', 'Array')).not.toThrow();
		expect(toThrow('number', 'number')).not.toThrow();
	});
	it('should handle type string', () => {
		expect(toThrow('string', 'string')).not.toThrow();
		expect(toThrow('object', 'string')).toThrow();
		expect(toThrow('func', 'string')).toThrow();
		expect(toThrow('array', 'string')).toThrow();
		expect(toThrow('number', 'string')).toThrow();
	});
	it('should handle type object', () => {
		expect(toThrow('string', 'object')).toThrow();
		expect(toThrow('object', 'object')).not.toThrow();
		expect(toThrow('func', 'object')).toThrow();
		expect(toThrow('array', 'object')).toThrow();
		expect(toThrow('number', 'object')).toThrow();
	});
	it('should handle type function', () => {
		expect(toThrow('string', 'function')).toThrow();
		expect(toThrow('object', 'function')).toThrow();
		expect(toThrow('func', 'function')).not.toThrow();
		expect(toThrow('array', 'function')).toThrow();
		expect(toThrow('number', 'function')).toThrow();
	});
	it('should handle type Array', () => {
		expect(toThrow('string', 'Array')).toThrow();
		expect(toThrow('object', 'Array')).toThrow();
		expect(toThrow('func', 'Array')).toThrow();
		expect(toThrow('array', 'Array')).not.toThrow();
		expect(toThrow('number', 'Array')).toThrow();
	});
	it('should handle type number', () => {
		expect(toThrow('string', 'number')).toThrow();
		expect(toThrow('object', 'number')).toThrow();
		expect(toThrow('func', 'number')).toThrow();
		expect(toThrow('array', 'number')).toThrow();
		expect(toThrow('number', 'number')).not.toThrow();
	});
});
