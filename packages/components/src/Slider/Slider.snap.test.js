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

		it('should render a range', () => {
			// given
			const props = {
				id: 'selectable',
				value: [10, 25],
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
		it('should render Slider with captionActions', () => {
			// given
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
			// when
			const wrapper = shallow(<Slider captionActions={actions} value={76} />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should render Slider disabled', () => {
			// given
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
			// when
			const wrapper = shallow(<Slider captionActions={actions} value={76} disabled />);
			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
