import { getFractionDigits } from './formatters';

describe('Formatters', () => {
	describe('getFractionDigits', () => {
		it('Should handle decimal', () => {
			expect(getFractionDigits(2.789)).toEqual(3);
		});
		it('Should handle integer', () => {
			expect(getFractionDigits(2)).toEqual(0);
		});
		it('Should handle exponential notation', () => {
			expect(getFractionDigits(2e-18)).toEqual(18);
		});
	});
});
