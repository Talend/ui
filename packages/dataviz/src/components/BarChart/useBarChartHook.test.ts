import { getPrimaryBarValue, getSecondaryBarValue } from './useBarChart.hook';

describe('useBarChart utils', () => {
	describe('getPrimaryBarValue', () => {
		it('Should return filtered value when available', () => {
			expect(
				getPrimaryBarValue({
					key: '',
					value: 10,
					filteredValue: 20,
				}),
			).toEqual(20);
		});
		it('Should return dataset value when no filtered value available', () => {
			expect(
				getPrimaryBarValue({
					key: '',
					value: 10,
				}),
			).toEqual(10);
		});
	});
	describe('getSecondaryBarValue', () => {
		it('Should return not filtered value when filtered value is available', () => {
			expect(
				getSecondaryBarValue({
					key: '',
					value: 20,
					filteredValue: 10,
				}),
			).toEqual(10);
		});
		it('Should return nothing when no filtered value available', () => {
			expect(
				getSecondaryBarValue({
					key: '',
					value: 10,
				}),
			).toEqual(null);
		});
		it('Should return nothing when no dataset value available', () => {
			expect(
				getSecondaryBarValue({
					key: '',
					filteredValue: 20,
				}),
			).toEqual(null);
		});
	});
});
