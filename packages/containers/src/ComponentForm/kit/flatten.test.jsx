import flatten from './flatten';

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
			'root.nest.bool': false,
			'root.nest.number': 3,
			'root.nest.string': 'foo',
		});
	});
	it('should flatten arrays', () => {
		const foo = {
			root: {
				array: ['foo'],
			},
		};
		expect(flatten(foo)).toEqual({
			'root.array[0]': 'foo',
		});
	});
	it('should include objects sub-flatten in payload', () => {
		const foo = {
			root: {
				array: ['foo'],
			},
		};
		expect(flatten(foo, { includeObjects: true })).toEqual({
			root: { '.array': { '[0]': 'foo' }, '.array[0]': 'foo' },
			'root.array': { '[0]': 'foo' },
			'root.array[0]': 'foo',
		});
	});
});
