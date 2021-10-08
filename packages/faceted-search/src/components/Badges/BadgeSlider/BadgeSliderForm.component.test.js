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

	it('should mount a badge with a greaterThan slider', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
			operator: { name: 'greaterThan' },
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

	it('should mount an badge with an equals slider', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			t: getDefaultT(),
			onChange: jest.fn(),
			operator: { name: 'equals' },
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

	it('should mount a default badge in error mode (oor)', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			value: 666,
			min: 6,
			max: 76,
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		expect(wrapper.find('.tc-badge-slider-form-error').first().text()).toBe(
			'The value must be between 6 and 76',
		);
		expect(wrapper.find('button[type="submit"]').first().props().disabled).toEqual(true);
	});

	it('should mount a default badge in error mode (decimal)', () => {
		// Given
		const props = {
			id: 'customId',
			onSubmit: jest.fn(),
			feature: 'quality',
			value: 5.6,
			decimal: false,
			t: getDefaultT(),
			onChange: jest.fn(),
		};
		// When
		const wrapper = mount(
			<BadgeFacetedProvider value={badgeFacetedContextValue}>
				<BadgeSliderForm {...props} />
			</BadgeFacetedProvider>,
		);

		expect(wrapper.find('.tc-badge-slider-form-error').first().text()).toBe(
			'Please fill with an integer value',
		);
		expect(wrapper.find('button[type="submit"]').first().props().disabled).toEqual(true);
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
