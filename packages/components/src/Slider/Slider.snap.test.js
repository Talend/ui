import React from 'react';
import { shallow } from 'enzyme';

import Slider, { getSelectedIconPosition } from './Slider.component';

describe('Slider component', () => {
	describe('renderers', () => {
		it('should render Slider', () => {
			// given
			const props = {
				id: 'selectable',
				emptyValueLabel: 'no label',
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render Slider with icons on status', () => {
			// given
			const props = {
				id: 'selectable',
				value: 45,
				label: 'Heeey',
				captionIcons: [
					'talend-smiley-rating',
					'talend-most-trusted',
					'talend-network',
					'talend-streams',
					'talend-tdc-negative',
				],
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render Slider with captionTextStepNumber', () => {
			// given
			const captionsFormat = value => `${value}%`;
			const props = {
				id: 'selectable',
				value: 45,
				label: 'Heeey',
				captionTextStepNumber: 5,
				captionsFormat,
			};
			// when
			const wrapper = shallow(<Slider {...props} />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('getSelectedIconPosition()', () => {
		it('should return the selected position', () => {
			// given
			const icons = ['icon1', 'icon2', 'icon3', 'icon4', 'icon5'];
			// when
			const result = getSelectedIconPosition(icons, 46, 0, 100);
			// then
			expect(result).toBe(2);
		});
	});
});
