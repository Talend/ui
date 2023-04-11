import { buildWeeks } from './generator';

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
