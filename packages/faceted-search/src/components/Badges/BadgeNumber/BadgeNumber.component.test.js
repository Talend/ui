import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeNumber } from './BadgeNumber.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeNumber', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			label: 'Price',
			id: 'myId',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumber {...props} />
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
			label: 'Price',
			value: '2981723',
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumber {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(
			wrapper
				.find('#customId-badge-number-action-overlay')
				.first()
				.text(),
		).toEqual('2981723');
	});
});
