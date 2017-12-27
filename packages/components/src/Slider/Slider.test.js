import { getSelectedIconPosition } from './Slider.component';

describe('Slider component tests', () => {
	describe('getSelectedIconPosition()', () => {
		it('should return the selected position', () => {
			// given
			const icons = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5'];
			// when
			const result = getSelectedIconPosition(icons, 46, 0, 100);
			// then
			expect(result).toBe(2);
		});

		it('should return -1 when value is null', () => {
			// given
			const icons = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5'];
			// when
			const result = getSelectedIconPosition(icons, null, 0, 100);
			// then
			expect(result).toBe(-1);
		});
	});
});
