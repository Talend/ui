import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeSliderForm } from './BadgeSliderForm.component';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';
import getDefaultT from '../../../translate';

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

describe('BadgeSliderForm', () => {
	it('should mount a default badge', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount a default badge in edit mode', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		wrapper.find('.tc-badge-value-unit').first().simulate('click');
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'customId',
			onSubmit,
			onChange: jest.fn(),
			value: '45',
			feature: 'quality',
			editing: true,
			t: getDefaultT(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		wrapper.find('.tc-badge-value-unit').first().simulate('click');
		expect(wrapper.find('input[type="number"]').first().props().value).toEqual('45');

		const submitButton = wrapper.find('button[type="submit"]').first();
		submitButton.simulate('submit');

		expect(onSubmit).toHaveBeenCalled();
	});
});
