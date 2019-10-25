/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import { act } from 'react-dom/test-utils';
import { BadgeCheckboxesForm } from './BadgeCheckboxesForm.component';

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

describe('BadgeCheckboxesForm', () => {
	it('should render three checkboxes', () => {
		// Given
		const props = {
			checkboxValues,
			id: 'myId',
			onChange: jest.fn(),
			onSubmit: jest.fn(),
			value: [],
			t: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		// Then
		// expect(wrapper.html()).toMatchSnapshot();
		expect(
			wrapper
				.find('span')
				.at(0)
				.text(),
		).toBe('Checkbox One');
		expect(
			wrapper
				.find('span')
				.at(1)
				.text(),
		).toBe('Checkbox Two');
		expect(
			wrapper
				.find('span')
				.at(2)
				.text(),
		).toBe('Checkbox Three');
		expect(wrapper.find('input[test-id="checkbox-selected-values-only"]')).toHaveLength(1);
		expect(wrapper.find('input[type="checkbox"]')).toHaveLength(4);
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
			t: jest.fn(),
		};
		// When
		const wrapper = mount(<BadgeCheckboxesForm {...props} />);
		expect(
			wrapper
				.find('input[type="checkbox"]')
				.at(0)
				.prop('checked'),
		).toBe(false);
		wrapper
			.find('input[type="checkbox"]')
			.at(0)
			.simulate('change');
		// Then
		expect(onChange).toHaveBeenCalled();
	});
});
