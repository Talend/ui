import React from 'react';
// eslint-disable-next-line import/no-extraneous-dependencies
import { mount } from 'enzyme';
import { BadgeTextForm } from './BadgeTextForm.component';
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
			id: 'myId',
			onSubmit: jest.fn(),
			feature: 'name',
			t: () => 'Apply',
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTextForm {...props} />
			</BadgeFacetedProvider>,
		);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should mount a badge with some other values', () => {
		// Given
		const onSubmit = jest.fn();
		const props = {
			id: 'potatoId',
			category: 'potato',
			onSubmit,
			value: 'init value',
			feature: 'name',
			t: () => 'Apply',
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeTextForm {...props} />
			</BadgeFacetedProvider>,
		);

		// Then
		expect(wrapper.find('input[type="text"]').first().props().value).toEqual('init value');

		const submitButton = wrapper.find('button[type="submit"]').first();
		submitButton.simulate('submit');

		expect(onSubmit).toHaveBeenCalled();
	});
});
