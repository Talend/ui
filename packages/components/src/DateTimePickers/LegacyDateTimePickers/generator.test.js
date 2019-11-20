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

	describe('buildWeeks', () => {
		it('should take monday as default first day of week', () => {
			// when
			const result = buildWeeks(2018, 5);

			// then
			expect(result).toEqual([
				[
					new Date(2018, 4, 28),
					new Date(2018, 4, 29),
					new Date(2018, 4, 30),
					new Date(2018, 4, 31),
					new Date(2018, 5, 1),
					new Date(2018, 5, 2),
					new Date(2018, 5, 3),
				],
				[
					new Date(2018, 5, 4),
					new Date(2018, 5, 5),
					new Date(2018, 5, 6),
					new Date(2018, 5, 7),
					new Date(2018, 5, 8),
					new Date(2018, 5, 9),
					new Date(2018, 5, 10),
				],
				[
					new Date(2018, 5, 11),
					new Date(2018, 5, 12),
					new Date(2018, 5, 13),
					new Date(2018, 5, 14),
					new Date(2018, 5, 15),
					new Date(2018, 5, 16),
					new Date(2018, 5, 17),
				],
				[
					new Date(2018, 5, 18),
					new Date(2018, 5, 19),
					new Date(2018, 5, 20),
					new Date(2018, 5, 21),
					new Date(2018, 5, 22),
					new Date(2018, 5, 23),
					new Date(2018, 5, 24),
				],
				[
					new Date(2018, 5, 25),
					new Date(2018, 5, 26),
					new Date(2018, 5, 27),
					new Date(2018, 5, 28),
					new Date(2018, 5, 29),
					new Date(2018, 5, 30),
					new Date(2018, 6, 1),
				],
				[
					new Date(2018, 6, 2),
					new Date(2018, 6, 3),
					new Date(2018, 6, 4),
					new Date(2018, 6, 5),
					new Date(2018, 6, 6),
					new Date(2018, 6, 7),
					new Date(2018, 6, 8),
				],
			]);
		});

		it('should generate weeks starting with provided day of week', () => {
			// when
			const result = buildWeeks(2018, 5, 2);

			// then
			expect(result).toEqual([
				[
					new Date(2018, 4, 29),
					new Date(2018, 4, 30),
					new Date(2018, 4, 31),
					new Date(2018, 5, 1),
					new Date(2018, 5, 2),
					new Date(2018, 5, 3),
					new Date(2018, 5, 4),
				],
				[
					new Date(2018, 5, 5),
					new Date(2018, 5, 6),
					new Date(2018, 5, 7),
					new Date(2018, 5, 8),
					new Date(2018, 5, 9),
					new Date(2018, 5, 10),
					new Date(2018, 5, 11),
				],
				[
					new Date(2018, 5, 12),
					new Date(2018, 5, 13),
					new Date(2018, 5, 14),
					new Date(2018, 5, 15),
					new Date(2018, 5, 16),
					new Date(2018, 5, 17),
					new Date(2018, 5, 18),
				],
				[
					new Date(2018, 5, 19),
					new Date(2018, 5, 20),
					new Date(2018, 5, 21),
					new Date(2018, 5, 22),
					new Date(2018, 5, 23),
					new Date(2018, 5, 24),
					new Date(2018, 5, 25),
				],
				[
					new Date(2018, 5, 26),
					new Date(2018, 5, 27),
					new Date(2018, 5, 28),
					new Date(2018, 5, 29),
					new Date(2018, 5, 30),
					new Date(2018, 6, 1),
					new Date(2018, 6, 2),
				],
				[
					new Date(2018, 6, 3),
					new Date(2018, 6, 4),
					new Date(2018, 6, 5),
					new Date(2018, 6, 6),
					new Date(2018, 6, 7),
					new Date(2018, 6, 8),
					new Date(2018, 6, 9),
				],
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
