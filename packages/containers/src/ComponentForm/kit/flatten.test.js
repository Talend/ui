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
			root: {
				'.nest': { '.bool': false, '.number': 3, '.string': 'foo' },
				'.nest.bool': false,
				'.nest.number': 3,
				'.nest.string': 'foo',
			},
			'root.nest': { '.bool': false, '.number': 3, '.string': 'foo' },
			'root.nest.bool': false,
			'root.nest.number': 3,
			'root.nest.string': 'foo',
		});
	});
	it('should flat arrays', () => {
		const foo = {
			root: {
				array: ['foo'],
			},
		};
		expect(flatten(foo)).toEqual({
			root: { '.array': { '[0]': 'foo' }, '.array[0]': 'foo' },
			'root.array': { '[0]': 'foo' },
			'root.array[0]': 'foo',
		});
	});
});
