import { buildDayNames, buildMonths, buildWeeks, buildYears } from './generator';

describe('Date generator', () => {
	describe('buildDayNames', () => {
		it('should take monday as default first day of week', () => {
			// when
			const result = buildDayNames();

			// then
			expect(result).toEqual([
				{ abbr: 'M', full: 'Monday' },
				{ abbr: 'T', full: 'Tuesday' },
				{ abbr: 'W', full: 'Wednesday' },
				{ abbr: 'T', full: 'Thursday' },
				{ abbr: 'F', full: 'Friday' },
				{ abbr: 'S', full: 'Saturday' },
				{ abbr: 'S', full: 'Sunday' },
			]);
		});

		it('should generate week names starting with provided day of week', () => {
			// when
			const result = buildDayNames(2);

			// then
			expect(result).toEqual([
				{ abbr: 'T', full: 'Tuesday' },
				{ abbr: 'W', full: 'Wednesday' },
				{ abbr: 'T', full: 'Thursday' },
				{ abbr: 'F', full: 'Friday' },
				{ abbr: 'S', full: 'Saturday' },
				{ abbr: 'S', full: 'Sunday' },
				{ abbr: 'M', full: 'Monday' },
			]);
		});
	});

	describe('buildMonths', () => {
		it('should generate months', () => {
			// when
			const result = buildMonths(3);

			// then
			expect(result).toEqual([
				[
					{ index: 0, name: 'January' },
					{ index: 1, name: 'February' },
					{ index: 2, name: 'March' },
				],
				[
					{ index: 3, name: 'April' },
					{ index: 4, name: 'May' },
					{ index: 5, name: 'June' },
				],
				[
					{ index: 6, name: 'July' },
					{ index: 7, name: 'August' },
					{ index: 8, name: 'September' },
				],
				[
					{ index: 9, name: 'October' },
					{ index: 10, name: 'November' },
					{ index: 11, name: 'December' },
				],
			]);
		});
	});

	describe('buildYears', () => {
		it('should generate years window', () => {
			// when
			const result = buildYears(2015, 5);

			// then
			expect(result).toEqual([2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]);
		});

		it('should generate years with default window', () => {
			// when
			const result = buildYears(2015);

			// then
			expect(result).toEqual([2012, 2013, 2014, 2015, 2016, 2017, 2018]);
		});
	});
});
