import { shallow } from 'enzyme';
import { getCaptionsValue, getSelectedIconPosition, renderActions } from './Slider.component';

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

		it('should return -1 when value is undefined', () => {
			// given
			const icons = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5'];
			// when
			const result = getSelectedIconPosition(icons, undefined, 0, 100);
			// then
			expect(result).toBe(-1);
		});
	});
});

describe('getActions', () => {
	it('should render some action', () => {
		// Given
		const actions = [
			{
				id: 'icon1',
				label: 'Click Me',
				icon: 'talend-smiley-angry',
				'data-feature': 'action',
				link: true,
				hideLabel: true,
			},
			{
				id: 'icon2',
				label: 'Click Me',
				icon: 'talend-smiley-neutral',
				'data-feature': 'action',
				link: true,
				hideLabel: true,
			},
			{
				id: 'icon3',
				label: 'Click Me',
				icon: 'talend-smiley-satisfied',
				'data-feature': 'action',
				link: true,
				hideLabel: true,
			},
		];
		// When
		const wrapper = shallow(renderActions(actions, 76, 0, 100, false));
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('getCaptionsValue', () => {
	it('should return the values based on the length of the captions', () => {
		expect(getCaptionsValue(5, 0, 100)).toEqual([0, 25, 50, 75, 100]);
	});
});
