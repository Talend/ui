import React from 'react';
import { shallow } from 'enzyme';

import YearPicker from './YearPicker.component';

describe('YearPicker', () => {
	it('should render', () => {
		const wrapper = shallow(<YearPicker
			selectedYear={2012}
			onSelect={() => {}}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have exactly one selected year', () => {
		const wrapper = shallow(<YearPicker
			selectedYear={2012}
			onSelect={() => {}}
		/>);

		const actions = wrapper.find('PickerAction');

		expect(actions.length).toBe(5);

		const selectedActions = actions.filterWhere(action => action.prop('isSelected') === true);

		expect(selectedActions.length).toBe(1);

		selectedActions.forEach(action => {
			expect(action.prop('label')).toBe('2012');
		});
	});

	it('should callback with the year picked', () => {
		const yearToSelect = 2013;
		const onSelect = jest.fn();

		const wrapper = shallow(<YearPicker
			selectedYear={2012}
			onSelect={onSelect}
		/>);

		const nextYearAction = wrapper
			.find('PickerAction')
			.findWhere(n => n.prop('label') === yearToSelect.toString());

		nextYearAction.simulate('click');

		expect(onSelect).toHaveBeenCalledWith(yearToSelect);
	});

	it('should default render with current year in middle when "selectedYear" prop not provided', () => {
		const wrapper = shallow(<YearPicker
			onSelect={() => {}}
		/>);
		const actions = wrapper.find('PickerAction');
		const now = new Date();
		const currentYear = now.getFullYear().toString();

		expect(actions.at(2).prop('label')).toBe(currentYear);
	});

	it('should not update the years range if the selected year change', () => {
		const defaultYear = 2005;
		const yearToSelect = 2020;

		const wrapper = shallow(<YearPicker
			selectedYear={defaultYear}
			onSelect={() => {}}
		/>);
		const actions = wrapper.find('PickerAction');

		expect(actions.at(2).prop('label')).toBe(defaultYear.toString());

		// When year selected change
		wrapper.setProps({
			selectedYear: yearToSelect,
		});

		// The middle year still remain the same
		const newActions = wrapper.find('PickerAction');
		expect(newActions.at(2).prop('label')).toBe(defaultYear.toString());
	});
});
