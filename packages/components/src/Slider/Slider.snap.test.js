import React from 'react';
import { shallow } from 'enzyme';

import Slider from './Slider.component';

describe('Slider component snaps', () => {
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
});
