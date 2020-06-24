/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { BadgeFacetedProvider } from '../../context/badgeFaceted.context';

import { BadgeCheckboxes } from './BadgeCheckboxes.component';
import getDefaultT from '../../../translate';

const t = getDefaultT();

const operator = {
	label: 'My Operator',
	name: 'my-operator',
};

const badgeFacetedContextValue = {
	onDeleteBadge: jest.fn(),
	onHideOperator: jest.fn(),
	onSubmitBadge: jest.fn(),
};

const BadgeWithContext = props => (
	<BadgeFacetedProvider value={badgeFacetedContextValue}>
		<BadgeCheckboxes {...props} />
	</BadgeFacetedProvider>
);

describe('BadgeCheckboxes', () => {
	it('should return "All" when there is no value', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
		};
		// When
		const wrapper = mount(<BadgeWithContext {...props} />);
		// Then
		expect(wrapper.find('span').at(2).text()).toBe('All');
	});
	it('should return "All" when value is empty', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [],
		};
		// When
		const wrapper = mount(<BadgeWithContext {...props} />);
		// Then
		expect(wrapper.find('span').at(2).text()).toBe('All');
	});
	it('should return the amount of values when values are equal or greater than 4', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [
				{ label: 'one', checked: true },
				{ label: 'two', checked: true },
				{ label: 'three', checked: true },
				{ label: 'four', checked: true },
				{ label: 'five', checked: true },
			],
		};
		// When
		const wrapper = mount(<BadgeWithContext {...props} />);
		// Then
		expect(wrapper.find('span').at(2).text()).toBe('5 value');
	});
	it('should return only the checked values', () => {
		// Given
		const props = {
			id: 'myId',
			label: 'My Label',
			operator,
			operators: ['contains', 'equals'],
			t,
			value: [
				{ label: 'one', checked: true },
				{ label: 'two', checked: true },
				{ label: 'three', checked: false },
				{ label: 'four', checked: false },
				{ label: 'five', checked: true },
			],
		};
		// When
		const wrapper = mount(<BadgeWithContext {...props} />);
		// Then
		expect(wrapper.find('span').at(2).text()).toEqual('one');
		expect(wrapper.find('span').at(3).text()).toEqual('two');
		expect(wrapper.find('span').at(4).text()).toEqual('five');
	});
});
