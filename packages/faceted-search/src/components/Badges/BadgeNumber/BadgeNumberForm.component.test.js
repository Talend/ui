import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeNumberForm } from './BadgeNumberForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeTextForm', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			t: () => 'Apply',
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumberForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'customId',
			onSubmit,
			value: 'i230982903',
			t: () => 'Apply',
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeNumberForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(
			wrapper
				.find('input[type="number"]')
				.first()
				.props().value,
		).toEqual('i230982903');

		const submitButton = wrapper.find('button[type="submit"]').first();
		submitButton.simulate('submit');

		expect(onSubmit).toHaveBeenCalled();
	});
});
