const { sortObject } = require('./cmf-settings.utils');

describe('cmf-settings.utils', () => {
	describe('#sortObject', () => {
		it('should sort the object', () => {
			expect(sortObject({ c: 1, a: 2, b: 3 })).toEqual({ a: 2, b: 3, c: 1 });
		});
	});
});
