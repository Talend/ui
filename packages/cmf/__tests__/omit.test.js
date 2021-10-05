import omit from '../src/omit';

describe('omit', () => {
	it('should omit props', () => {
		const props = { foo: 'bar', extra: true };
		const result = omit(props, ['extra']);
		const expected = { foo: 'bar' };
		expect(result).toEqual(expected);
		// check no mutation happens
		expect(props).toEqual({ foo: 'bar', extra: true });
	});
});
