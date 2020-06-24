/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { BadgeCheckboxesForm } from './BadgeCheckboxesForm.component';
import getDefaultT from '../../../translate';

const checkboxValues = [
	{
		id: 'checkbox-one',
		label: 'Checkbox One',
	},
	{
		id: 'checkbox-two',
		label: 'Checkbox Two',
	},
	{
		id: 'checkbox-three',
		label: 'Checkbox Three',
	},
];

const t = getDefaultT();

describe('BadgeCheckboxesForm', () => {
	it('should render three checkboxes', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(wrapper.find('span').at(0).text()).toBe('Checkbox One');
		expect(wrapper.find('span').at(1).text()).toBe('Checkbox Two');
		expect(wrapper.find('span').at(2).text()).toBe('Checkbox Three');
		expect(wrapper.find('input[type="checkbox"]')).toHaveLength(3);
	});
	it('should trigger on change callback when checkbox generated from checkbox values are clicked', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			checkboxValues,
			id: 'myId',
			onChange,
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		expect(wrapper.find('input[type="checkbox"]').at(0).prop('checked')).toBe(false);
		wrapper
			.find('input[type="checkbox"]')
			.at(0)
			.simulate('change', { target: { checked: true } });
		// Then
		expect(onChange).toHaveBeenCalledTimes(1);
		expect(onChange.mock.calls[0][1]).toEqual([
			{ checked: true, id: 'checkbox-one', label: 'Checkbox One' },
		]);
	});
	it('should display checkbox one checked', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [
				{
					checked: true,
					id: 'checkbox-one',
					label: 'Checkbox One',
				},
			],
			feature: 'Connection type',
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(wrapper.find('input[id="checkbox-one-checkbox"]').prop('checked')).toBe(true);
	});
	it('should filter the displayed checkbox using the filter bar', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			feature: 'Connection type',
			value: [],
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		expect(wrapper.find('input[id="checkbox-one-checkbox"]')).toHaveLength(1);
		expect(wrapper.find('input[id="checkbox-two-checkbox"]')).toHaveLength(1);
		expect(wrapper.find('input[id="checkbox-three-checkbox"]')).toHaveLength(1);
		act(() => {
			wrapper.find('input[type="search"]').simulate('change', { target: { value: 'one' } });
		});
		wrapper.update();
		// Then
		expect(wrapper.find('input[id="checkbox-one-checkbox"]')).toHaveLength(1);
		expect(wrapper.find('input[id="checkbox-two-checkbox"]')).toHaveLength(0);
		expect(wrapper.find('input[id="checkbox-three-checkbox"]')).toHaveLength(0);
	});

	it('should call the submit callback', () => {
		const onSubmit = jest.fn();
		// Give
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit,
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		wrapper.find('button[type="submit"]').simulate('submit');
		// Then
		expect(onSubmit).toHaveBeenCalledTimes(1);
	});
	it('should display a button "Apply"', () => {
		// Give
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [],
			feature: 'Connection type',
			t,
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		// Then
		expect(wrapper.find('button[type="submit"]').text()).toBe('Apply');
	});
});
