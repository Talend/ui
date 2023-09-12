import { valued } from './types.util';

describe('types.util', () => {
	describe('valued', () => {
		it('Filter array with null and undefined values', () => {
			const result = ['Terra', undefined, 'Mars', 'Baal', null, 'Valhalla'].filter(valued);

			expect(result).toBeDefined();
			expect(result.length).toEqual(4);
			expect(result).toContain('Terra');
			expect(result).toContain('Mars');
			expect(result).toContain('Baal');
			expect(result).toContain('Valhalla');
		});
	});
});
