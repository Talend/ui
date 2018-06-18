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

		const nextYearAction = wrapper.findWhere(n => n.name() === 'PickerAction' && n.prop('label') === yearToSelect.toString());

		expect(nextYearAction.length).toBe(1);

		nextYearAction.simulate('click');

		// One call
		expect(spy.mock.calls.length).toBe(1);
		// One argument
		expect(spy.mock.calls[0].length).toBe(1);
		// The correct index
		expect(spy.mock.calls[0][0]).toBe(yearToSelect);
	});

	it('should default render with current year in middle', () => {
		const wrapper = shallow(<YearPicker />);
		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');
		const now = new Date();
		const currentYear = now.getFullYear().toString();

		expect(actions.at(2).prop('label')).toBe(currentYear);
	});

	it('should render with yearSelected prop as the middle year if provided', () => {
		const year = 2005;
		const wrapper = shallow(<YearPicker
			yearSelected={year}
		/>);
		const actions = wrapper.findWhere(n => n.name() === 'PickerAction');

		expect(actions.at(2).prop('label')).toBe(year.toString());
	});
});
