import { convertDate } from './Date.utils';

describe('DateWidget utils', () => {
	describe('convertDate', () => {
		it('should convert date to iso format', () => {
			const schema = {
				format: 'iso-datetime',
			};
			const value = new Date(Date.UTC(2019, 8, 30));

			const converted = convertDate(value, '', schema);
			expect(converted).toBe('2019-09-30T00:00:00.000Z');
		});
		it('should convert date to timestamp', () => {
			const schema = {
				type: 'number',
			};
			const value = new Date(Date.UTC(2019, 8, 30));

			const converted = convertDate(value, '', schema);
			expect(converted).toBe(1569801600000);
		});
		it('should return string of date when no format specified', () => {
			const value = new Date(Date.UTC(2019, 8, 30));

			const converted = convertDate(value, '2019-09-30', {});
			expect(converted).toBe('2019-09-30');
		});
	});
});
