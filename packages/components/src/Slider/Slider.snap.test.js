import React from 'react';
import { shallow } from 'enzyme';

import { Slider, getSelectedIconPosition } from './Slider.component';

describe('SliderSpec', () => {
	describe('Slider renderers', () => {
		it('should render Slider', () => {
			// given
			const props = {
				id: 'selectable',
				emptyValueLabel: 'no label',
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getNode()).toMatchSnapshot();
		});

		it('should render Slider with icons everywhere', () => {
			// given
			const props = {
				id: 'selectable',
				value: 45,
				label: 'Heeey',
				icons: [
					'talend-smiley-rating',
					'talend-most-trusted',
					'talend-network',
					'talend-streams',
					'talend-tdc-negative',
				],
				labelIcon: 'talend-logo-square',
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getNode()).toMatchSnapshot();
		});
		it('should render Slider with icons everywhere', () => {
			// given
			const props = {
				id: 'selectable',
				value: 35,
				label: 'Heeey',
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getNode()).toMatchSnapshot();
		});
	});

	describe('Tests on getSelectedIconPosition method', () => {
		it('should return -1 when no array is given', () => {
			// given
			const icons = null;
			// when
			const result = getSelectedIconPosition(icons, 22, 0, 100);
			// then
			expect(result).toBe(-1);
		});

		it('should return -1 when empty array is given', () => {
			// given
			const icons = [];
			// when
			const result = getSelectedIconPosition(icons, 22, 0, 100);
			// then
			expect(result).toBe(-1);
		});

		it('should return -1 when array with one icon is given', () => {
			// given
			const icons = [];
			// when
			const result = getSelectedIconPosition(icons, 22, 0, 100);
			// then
			expect(result).toBe(-1);
		});

		it('should return -1 when array with one icon is given', () => {
			// given
			const icons = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5'];
			// when
			const result = getSelectedIconPosition(icons, 46, 0, 100);
			// then
			expect(result).toBe(2);
		});
	});
});

/*
it('should return -1 when no array is given', () => {
	// given
	// when
	// then
});
*/
