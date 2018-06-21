import React from 'react';
import { shallow } from 'enzyme';

import YearPicker from './YearPicker.component';

describe('YearPicker', () => {
	it('should render', () => {
		const wrapper = shallow(<YearPicker
			yearSelected={2012}
		/>);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should have exactly one selected year', () => {
		const wrapper = shallow(<YearPicker
			yearSelected={2012}
		/>);

		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.length).toBe(5);

		const unselectedActions = actions.filterWhere(action => action.prop('isSelected') === false);
		const selectedActions = actions.filterWhere(action => action.prop('isSelected') === true);

		expect(unselectedActions.length).toBe(4);
		expect(selectedActions.length).toBe(1);

		unselectedActions.forEach(action => {
			expect(action.prop('label')).not.toBe('2012');
		});

		selectedActions.forEach(action => {
			expect(action.prop('label')).toBe('2012');
		});
	});

	it('should callback with the year picked', () => {
		const yearToSelect = 2013;
		const spy = jest.fn();

		const wrapper = shallow(<YearPicker
			yearSelected={2012}
			onYearSelected={spy}
		/>);

		const nextYearAction = wrapper.findWhere(n =>
			n.name() === 'PickerAction'
			&& n.prop('label') === yearToSelect.toString()
		);

		expect(nextYearAction.length).toBe(1);

		nextYearAction.simulate('click');

		expect(spy).toHaveBeenCalledTimes(1);
		expect(spy).toHaveBeenCalledWith(yearToSelect);
	});

	it('should default render with current year in middle when "yearSelected" prop not provided', () => {
		const wrapper = shallow(<YearPicker />);
		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');
		const now = new Date();
		const currentYear = now.getFullYear().toString();

		expect(actions.at(2).prop('label')).toBe(currentYear);
	});

	it('should render with "yearSelected" prop as the middle year if provided', () => {
		const year = 2005;
		const wrapper = shallow(<YearPicker
			yearSelected={year}
		/>);
		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.at(2).prop('label')).toBe(year.toString());
	});

	it('should not update the years range if the selected year change', () => {
		const defaultYear = 2005;
		const yearToSelect = 2020;

		const wrapper = shallow(<YearPicker
			yearSelected={defaultYear}
		/>);
		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.at(2).prop('label')).toBe(defaultYear.toString());

		// When year selected change
		wrapper.setProps({
			yearSelected: yearToSelect,
		});

		// The middle year still remain the same
		const newActions = wrapper.findWhere(n => n.name() === 'PickerAction');
		expect(newActions.at(2).prop('label')).toBe(defaultYear.toString());
	});
});
