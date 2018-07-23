import flatten from './flatten';

function noop() {}

describe('flatten', () => {
	it('should flat nested data structure', () => {
		const foo = {
			root: {
				nest: {
					bar: 'foo',
				},
			},
		};
		expect(flatten(foo)).toEqual({ 'root.nest.bar': 'foo' });
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
