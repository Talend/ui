import twoDigits from './twoDigits';

describe('twoDigits', () => {
	it('should return the exact input if number already have exactly 2 digits in string format', () => {
		expect(twoDigits(45)).toBe('45');
	});

	it('should return the exact input if number already have more than 2 digits in string format', () => {
		expect(twoDigits(123)).toBe('123');
	});

	it('should return the input number preprend with 0 digit if have only 1 digit initially, in string format', () => {
		expect(twoDigits(6)).toBe('06');
	});
});
