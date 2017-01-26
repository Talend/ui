import toFlat from './toflat';

const a = {
	b: {
		d: true,
	},
	c: 'hello world',
	arrayInt: [
		1, 2, 3, 4,
	],
	arrayOb: [
		{ foo: 'bar' },
	],
};

describe('toFlat', () => {
	it('should flat the object', () => {
		const res = toFlat(a);
		expect(typeof res).toBe('object');
		const keys = Object.keys(res);
		expect(keys.length).toBe(7);
		expect(res['$[\'b\'][\'d\']']).toBe(true);
		expect(res['$[\'arrayInt\'][1]']).toBe(2);
		expect(res['$[\'arrayOb\'][0][\'foo\']']).toBe('bar');
	});
});
