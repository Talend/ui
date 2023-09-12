import { filterUndefinedOrNull } from './types.util';

describe('types.util', () => {
	describe('filterUndefinedOrNull', () => {
		it('Filter array with null and undefined values', () => {
			const result = ['Terra', undefined, 'Mars', 'Baal', null, 'Valhalla'].filter(
				filterUndefinedOrNull,
			);

			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
			expect(result).toContain('Terra');
			expect(result).toContain('Mars');
			expect(result).toContain('Baal');
			expect(result).toContain('Valhalla');
		});
	});
});
