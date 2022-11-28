import { dateToString } from './date';

describe('dateToString', () => {
	it('should return null if the value is null', () => {
		expect(dateToString(null)).toBe(null);
	});

	it('should return the formatted timestamp for a given date', () => {
		expect(dateToString('1385251200000')).toBe('2013-11-24T00:00:00.000Z');
	});

	it('should return the value if it is not a date', () => {
		expect(dateToString('value not a timestamp')).toBe('value not a timestamp');
	});
});
