import flatten from './flatten';

function noop() {}

describe('flatten', () => {
	it('should flat nested data structure', () => {
		const foo = {
			root: {
				nest: {
					string: 'foo',
					number: 3,
					bool: false,
				},
			},
		};
		expect(flatten(foo)).toEqual({
			'root.nest.string': 'foo',
			'root.nest.number': 3,
			'root.nest.bool': false,
		});
	});
	it('should flat arrays', () => {
		const foo = {
			root: {
				array: ['foo'],
			},
		};
		expect(flatten(foo)).toEqual({ 'root.array[0]': 'foo' });
	});
	it('should skip function', () => {
		const foo = {
			root: {
				noop,
			},
		};
		expect(flatten(foo)).toEqual({ 'root.noop': undefined });
	});
});
