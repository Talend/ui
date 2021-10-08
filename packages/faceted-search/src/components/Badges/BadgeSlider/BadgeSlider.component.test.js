import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeSlider } from './BadgeSlider.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeSlider', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			label: 'Invalid',
			id: 'myId',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSlider {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const props = {
			id: 'customId',
			initialOpenedOperator: true,
			label: 'Invalid',
			value: '45',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSlider {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.find('#customId-badge-slider-action-overlay').first().text()).toEqual('45');
	});
});
