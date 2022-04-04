/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';

import { BadgeOperatorPopover } from './BadgeOperatorPopover.component';

describe('BadgeOperatorPopover', () => {
	const operators = [
		{
			name: 'operatorIconEqual',
			label: 'My icon operator equal',
			iconName: 'my-icon-equal',
		},
		{
			name: 'operatorIconNotEqual',
			label: 'My icon operator not equal',
			iconName: 'my-icon-not-equal',
		},
	];
	it('should render the html output', () => {
		// Given
		const props = {
			id: 'my-id',
			operators,
			onClick: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgeOperatorPopover {...props} />);
		// Then
		expect(wrapper.html()).toMatchSnapshot();
	});
	it('should render a button with icon per operators', () => {
		// Given
		const props = {
			id: 'my-id',
			operators,
			onClick: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgeOperatorPopover {...props} />);
		// Then
		expect(
			wrapper
				.find('button')
				.at(0)
				.prop('aria-label'),
		).toEqual('My icon operator equal');
		expect(
			wrapper
				.find('Icon')
				.at(0)
				.prop('name'),
		).toEqual('talend-my-icon-equal');
		expect(
			wrapper
				.find('button')
				.at(1)
				.prop('aria-label'),
		).toEqual('My icon operator not equal');
		expect(
			wrapper
				.find('Icon')
				.at(1)
				.prop('name'),
		).toEqual('talend-my-icon-not-equal');
		expect(wrapper.find('button')).toHaveLength(2);
		expect(wrapper.find('Icon')).toHaveLength(2);
	});
	it('should render a button with text as operator', () => {
		// Given
		const props = {
			id: 'my-id',
			operators: [
				{
					name: 'myTextOperator',
					label: 'Label',
				},
			],
			onClick: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgeOperatorPopover {...props} />);
		// Then
		expect(
			wrapper
				.find('button')
				.at(0)
				.prop('aria-label'),
		).toEqual('Label');
		expect(wrapper.find('button')).toHaveLength(1);
	});
	it('should trigger on click', () => {
		// Given
		const onClick = jest.fn();
		const props = {
			id: 'my-id',
			operators,
			onClick,
		};
		// When
		const wrapper = mount(<BadgeOperatorPopover {...props} />);
		wrapper
			.find('button')
			.at(0)
			.simulate('click');
		// Then
		expect(onClick.mock.calls.length).toBe(1);
		expect(onClick.mock.calls[0][1]).toBe('operatorIconEqual');
	});
});
